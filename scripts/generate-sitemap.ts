/**
 * Sitemap Generator Script
 * Generates sitemap.xml at build time by reading articles and authors data
 */

import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'https://autotechspot.com';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatDate(date: string): string {
  // Ensure date is in YYYY-MM-DD format
  return date.split('T')[0];
}

function generateUrlEntry(url: SitemapUrl): string {
  let entry = `  <url>\n    <loc>${escapeXml(url.loc)}</loc>\n`;
  if (url.lastmod) {
    entry += `    <lastmod>${formatDate(url.lastmod)}</lastmod>\n`;
  }
  entry += `    <changefreq>${url.changefreq}</changefreq>\n`;
  entry += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
  entry += `  </url>`;
  return entry;
}

export async function generateSitemap(): Promise<string> {
  // Dynamic imports for the data files
  const { articles } = await import('../src/data/articles');
  const { authors } = await import('../src/data/authors');
  const { categories } = await import('../src/types/article');

  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split('T')[0];

  // Homepage
  urls.push({
    loc: `${BASE_URL}/`,
    lastmod: today,
    changefreq: 'daily',
    priority: 1.0,
  });

  // Category pages
  for (const category of categories) {
    urls.push({
      loc: `${BASE_URL}/category/${category.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8,
    });
  }

  // Article pages
  for (const article of articles) {
    urls.push({
      loc: `${BASE_URL}/article/${article.slug}`,
      lastmod: article.updatedAt || article.publishedAt,
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  // Author pages
  for (const author of authors) {
    urls.push({
      loc: `${BASE_URL}/author/${author.slug}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
    });
  }

  // Static pages
  const staticPages = [
    { path: '/about', priority: 0.5 },
    { path: '/contact', priority: 0.5 },
  ];
  for (const page of staticPages) {
    urls.push({
      loc: `${BASE_URL}${page.path}`,
      changefreq: 'monthly',
      priority: page.priority,
    });
  }

  // Legal pages
  const legalPages = ['/privacy', '/terms', '/disclaimer'];
  for (const page of legalPages) {
    urls.push({
      loc: `${BASE_URL}${page}`,
      changefreq: 'yearly',
      priority: 0.3,
    });
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(generateUrlEntry).join('\n')}
</urlset>`;

  return xml;
}

// CLI execution
async function main() {
  try {
    console.log('🗺️  Generating sitemap...');
    const xml = await generateSitemap();
    
    const outputPath = path.resolve(process.cwd(), 'public/sitemap.xml');
    fs.writeFileSync(outputPath, xml, 'utf-8');
    
    console.log(`✅ Sitemap generated: ${outputPath}`);
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run if executed directly
main();
