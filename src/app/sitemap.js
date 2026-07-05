export default async function sitemap() {
  const baseUrl = 'https://ideakreasimedia.com';

  const routes = [
    '',
    '/about',
    '/contact-us',
    '/our-works',
    '/services',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
