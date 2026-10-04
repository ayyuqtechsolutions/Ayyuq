/**
 * Client-Side Input Sanitization, Validation & UI Rate Limiting
 * 
 * NOTE ON SECURITY ARCHITECTURE:
 * In accordance with application security best practices, client-side validation
 * and rate limiting provide immediate, interactive user feedback (UX defense-in-depth).
 * Authoritative security (DDoS mitigation, WAF rules, true IP rate-limiting, and
 * server-side input verification) MUST be enforced at the backend/WAF/Reverse Proxy layer.
 */

/**
 * HTML character entity map for safe sanitization without regex backtracking.
 */
const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
};

/**
 * Sanitizes an input string safely without catastrophic backtracking (ReDoS).
 * Uses character substitution and strip of ASCII control characters.
 */
export function sanitizeInput(input: string, maxLength: number = 2000): string {
  if (typeof input !== 'string') return '';

  // 1. Truncate strictly to maximum length
  const sliced = input.slice(0, maxLength);

  // 2. Escape HTML special characters cleanly
  const escaped = sliced.replace(/[&<>"'`\/]/g, (char) => HTML_ESCAPE_MAP[char] || char);

  // 3. Strip NULL bytes and dangerous non-printable control characters (excluding \r \n \t)
  const clean = escaped.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  return clean.trim();
}

/**
 * Checks whether an input contains obvious executable script patterns or dangerous protocols.
 * Evaluates with linear, safe non-backtracking regular expressions.
 */
export function containsMaliciousPayload(input: string): boolean {
  if (typeof input !== 'string' || !input) return false;

  const lower = input.toLowerCase();

  // Linear checks for dangerous scheme protocols and execution vectors
  if (
    lower.includes('<script') ||
    lower.includes('javascript:') ||
    lower.includes('vbscript:') ||
    lower.includes('data:text/html') ||
    lower.includes('<iframe') ||
    lower.includes('<embed') ||
    lower.includes('<object') ||
    lower.includes('eval(') ||
    lower.includes('document.cookie')
  ) {
    return true;
  }

  // Linear check for HTML inline event handlers (e.g. onload=, onerror=, onclick=)
  if (/\bon\w+\s*=/i.test(input)) {
    return true;
  }

  // Path traversal check
  if (/\.\.[\/\\]/.test(input) || /%2e%2e[\/\\]/i.test(input)) {
    return true;
  }

  return false;
}

/**
 * Validates email with safe, non-backtracking regex avoiding ReDoS vulnerabilities.
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length < 3 || trimmed.length > 254) return false;

  // Safe standard RFC-5322 approximation without nested quantifiers
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Validates phone numbers with safe length and format checks.
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return true; // Optional field
  if (typeof phone !== 'string') return false;
  const trimmed = phone.trim();
  if (trimmed.length > 25) return false;
  const phoneRegex = /^[\d\s\+\-\(\)]{6,25}$/;
  return phoneRegex.test(trimmed);
}

/**
 * Rate Limiter for Client UI actions
 * Persists timestamps into sessionStorage so casual page refreshes (F5)
 * do NOT instantly reset rate limiting history.
 */
interface RateLimitRecord {
  attempts: number[];
  lockoutUntil: number;
}

const STORAGE_PREFIX = 'ayyuq_rl_';

function getStorageRecord(actionId: string): RateLimitRecord {
  if (typeof window === 'undefined' || !window.sessionStorage) {
    return { attempts: [], lockoutUntil: 0 };
  }
  try {
    const raw = sessionStorage.getItem(`${STORAGE_PREFIX}${actionId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback if storage disabled
  }
  return { attempts: [], lockoutUntil: 0 };
}

function saveStorageRecord(actionId: string, record: RateLimitRecord): void {
  if (typeof window === 'undefined' || !window.sessionStorage) return;
  try {
    sessionStorage.setItem(`${STORAGE_PREFIX}${actionId}`, JSON.stringify(record));
  } catch {
    // quota exceeded or private mode
  }
}

export interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  retryAfterSeconds: number;
  errorMessage?: string;
}

/**
 * Checks and updates rate limit for a client action scope.
 * Uses sessionStorage to prevent instant bypass upon F5 refresh.
 */
export function checkRateLimit(
  actionId: string,
  maxAttempts: number = 5,
  windowMs: number = 60_000,
  lockoutMs: number = 60_000
): RateLimitResult {
  const now = Date.now();
  const record = getStorageRecord(actionId);

  // Check if currently locked out
  if (now < record.lockoutUntil) {
    const remainingSeconds = Math.ceil((record.lockoutUntil - now) / 1000);
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds: remainingSeconds,
      errorMessage: `Submission rate limit exceeded. Please wait ${remainingSeconds}s before retrying.`,
    };
  }

  // Filter attempts within current rolling window
  record.attempts = record.attempts.filter((ts) => now - ts < windowMs);

  if (record.attempts.length >= maxAttempts) {
    // Trigger lockout
    record.lockoutUntil = now + lockoutMs;
    saveStorageRecord(actionId, record);
    const remainingSeconds = Math.ceil(lockoutMs / 1000);
    return {
      allowed: false,
      remainingAttempts: 0,
      retryAfterSeconds: remainingSeconds,
      errorMessage: `Too many submissions. Please wait ${remainingSeconds}s before trying again.`,
    };
  }

  // Record this attempt
  record.attempts.push(now);
  saveStorageRecord(actionId, record);

  return {
    allowed: true,
    remainingAttempts: maxAttempts - record.attempts.length,
    retryAfterSeconds: 0,
  };
}

/**
 * Honeypot Anti-Bot Verification
 * Checks if invisible trap fields were filled by automated headless spiders or scrapers.
 */
export function isHoneypotTriggered(honeypotValue: string | undefined | null): boolean {
  return typeof honeypotValue === 'string' && honeypotValue.trim().length > 0;
}

/**
 * Human Interaction Velocity Verification
 * Checks whether form was submitted unnaturally fast (< 1.2 seconds from render),
 * a signature of automated scraping tools.
 */
export function isBotVelocitySubmission(renderTimestamp: number, minHumanDurationMs: number = 1200): boolean {
  const elapsed = Date.now() - renderTimestamp;
  return elapsed < minHumanDurationMs;
}

/**
 * Scraper & Headless User-Agent Detection (Client-Side Check)
 */
export function isAutomatedCrawlerEnvironment(): boolean {
  if (typeof window === 'undefined' || !window.navigator) return false;

  const ua = window.navigator.userAgent.toLowerCase();
  
  const suspiciousSignatures = [
    'headlesschrome',
    'puppeteer',
    'selenium',
    'phantomjs',
    'webdriver',
    'scrapy',
    'python-requests',
    'axios/',
    'go-http-client',
    'curl/',
    'wget/',
  ];

  for (const sig of suspiciousSignatures) {
    if (ua.includes(sig)) return true;
  }

  if ((window.navigator as unknown as { webdriver?: boolean }).webdriver === true) {
    return true;
  }

  return false;
}
