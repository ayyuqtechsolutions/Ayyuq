// Local Business & Software Company Schema.org Structured Data
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "SoftwareCompany", "LocalBusiness"],
      "@id": "https://ayyuq.in/#organization",
      "name": "Ayyuq Tech Solutions",
      "alternateName": "Ayyuq",
      "url": "https://ayyuq.in",
      "logo": "https://ayyuq.in/logo.png",
      "image": "https://ayyuq.in/og-image.png",
      "description": "Leading website development company and custom software agency in Mumbai & Thane. Sub-second Next.js web applications, mobile apps, and custom enterprise ERP/POS systems.",
      "telephone": "+919867069971",
      "email": "ayyuqtechsolutions@gmail.com",
      "priceRange": "₹₹ - ₹₹₹",
      "founder": {
        "@type": "Person",
        "@id": "https://ayyuq.in/#founder",
        "name": "Hussain Tinwala",
        "jobTitle": "Founder & Principal Software Architect"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ghodbunder Road, Thane West",
        "addressLocality": "Thane",
        "addressRegion": "Maharashtra",
        "postalCode": "400601",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 19.2183,
        "longitude": 72.9781
      },
      "areaServed": ["Mumbai", "Thane", "Navi Mumbai", "Maharashtra", "India"],
      "sameAs": [
        "https://www.instagram.com/ayyuqtechsolutions",
        "https://www.linkedin.com/company/ayyuqtechsolutions",
        "https://github.com/ayyuq"
      ]
    }
  ]
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(localBusinessSchema);
document.head.appendChild(script);
