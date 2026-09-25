import React from 'react';

/**
 * Local Business & Software Company Schema.org JSON-LD Generator
 * Optimizes local search visibility for Mumbai, Thane, and Indian search intent.
 */
export default function SeoSchema() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['ProfessionalService', 'SoftwareCompany', 'LocalBusiness'],
        '@id': 'https://ayyuq.in/#organization',
        name: 'Ayyuq Tech Solutions',
        alternateName: 'Ayyuq',
        url: 'https://ayyuq.in',
        logo: {
          '@type': 'ImageObject',
          url: 'https://ayyuq.in/logo.png',
          caption: 'Ayyuq Tech Solutions Logo',
        },
        image: 'https://ayyuq.in/og-image.png',
        description:
          'Premier custom website development company and software engineering agency based in Mumbai & Thane. Specializing in sub-second Next.js web applications, mobile apps, and custom enterprise ERP/POS software.',
        telephone: '+919867069971',
        email: 'ayyuqtechsolutions@gmail.com',
        priceRange: '₹₹ - ₹₹₹',
        currenciesAccepted: 'INR, USD, AED, EUR',
        paymentAccepted: 'Bank Transfer, UPI, Credit Card, Razorpay',
        founder: {
          '@type': 'Person',
          '@id': 'https://ayyuq.in/#founder',
          name: 'Hussain Tinwala',
          jobTitle: 'Founder & Principal Software Architect',
          url: 'https://ayyuq.in/founder',
          sameAs: [
            'https://www.linkedin.com/company/ayyuqtechsolutions',
            'https://www.instagram.com/ayyuqtechsolutions',
          ],
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Ghodbunder Road, Thane West',
          addressLocality: 'Thane',
          addressRegion: 'Maharashtra',
          postalCode: '400601',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 19.2183,
          longitude: 72.9781,
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Mumbai',
          },
          {
            '@type': 'City',
            name: 'Thane',
          },
          {
            '@type': 'City',
            name: 'Navi Mumbai',
          },
          {
            '@type': 'State',
            name: 'Maharashtra',
          },
          {
            '@type': 'Country',
            name: 'India',
          },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
            opens: '09:30',
            closes: '20:30',
          },
        ],
        sameAs: [
          'https://www.linkedin.com/company/ayyuqtechsolutions',
          'https://www.instagram.com/ayyuqtechsolutions',
          'https://github.com/ayyuq',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Core Software & Web Engineering Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom Website Development (Next.js & React)',
                description:
                  'High-speed, zero-WordPress bloat web applications engineered with Next.js App Router, Tailwind CSS, and sub-1s load times.',
                serviceType: 'Web Development',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Mobile App Development (iOS & Android)',
                description:
                  'Native and cross-platform mobile apps built with React Native, high-velocity UX, and scalable cloud backends.',
                serviceType: 'Mobile Application Development',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom ERP & POS Software Systems',
                description:
                  'Tailored inventory management, billing, GST-ready invoicing, and custom ERP systems for growing Indian enterprises.',
                serviceType: 'Enterprise Software Development',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Custom CRM & Business Workflow Automation',
                description:
                  'Bespoke CRM software, automated WhatsApp pipelines, and secure cloud database architecture.',
                serviceType: 'Business Automation',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Technical SEO & Performance Engineering',
                description:
                  'Core Web Vitals optimization, Schema.org rich snippets, and localized search dominance for Mumbai and international businesses.',
                serviceType: 'SEO & Performance Consulting',
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
