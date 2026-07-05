export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin',
      },
    ],
    sitemap: 'https://ideakreasimedia.com/sitemap.xml',
  };
}
