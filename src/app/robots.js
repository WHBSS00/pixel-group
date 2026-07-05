export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/_next/static/', '/api/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/logo-idea.png', '/og-image.png'],
      },
    ],
    sitemap: 'https://ideakreasimedia.com/sitemap.xml',
    host: 'https://ideakreasimedia.com',
  };
}
