const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

// Pagine statiche (quelle definite in routing.js)

const staticPages = [
  "/",
  "/contatti",
  "/faq",
  "/prodotto",
  "/servizi",
  "/testimonianze",
];

function makeEntry(pathname, params = {}, lastModified = null) {
  const languages = {};
  languages['it'] = `${SITE_URL}${pathname}`;
  return {
    url: languages['it'], // canonical = italiano
    priority: 1,
    lastModified: lastModified || new Date(),
  };
}

// Sitemap
export default async function sitemap() {
  // 1. Pagine statiche
  const staticEntries = staticPages.map((page) => makeEntry(page));
  return [...staticEntries];
}