import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// Sitemap generator plugin - runs at build time
function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    async buildStart() {
      try {
        // Read and parse data files directly (avoiding alias resolution issues)
        const articlesPath = path.resolve(__dirname, 'src/data/articles.ts');
        const authorsPath = path.resolve(__dirname, 'src/data/authors.ts');
        const typesPath = path.resolve(__dirname, 'src/types/article.ts');
        
        const articlesContent = fs.readFileSync(articlesPath, 'utf-8');
        const authorsContent = fs.readFileSync(authorsPath, 'utf-8');
        const typesContent = fs.readFileSync(typesPath, 'utf-8');
        
        // Extract article data including featured images using regex
        const articleBlocks = articlesContent.split(/\n\s*\{[\s\n]*slug:/g).slice(1);
        const articles = articleBlocks.map(block => {
          const slugMatch = block.match(/^[\s]*["']([^"']+)["']/);
          const publishedMatch = block.match(/publishedAt:\s*["']([^"']+)["']/);
          const updatedMatch = block.match(/updatedAt:\s*["']([^"']+)["']/);
          const imageMatch = block.match(/featuredImage:\s*["']([^"']+)["']/);
          const titleMatch = block.match(/title:\s*["']([^"']+)["']/);
          const altMatch = block.match(/featuredImageAlt:\s*["']([^"']+)["']/);
          const categoryMatch = block.match(/category:\s*["']([^"']+)["']/);
          
          return {
            slug: slugMatch?.[1] || '',
            publishedAt: publishedMatch?.[1] || '',
            updatedAt: updatedMatch?.[1],
            featuredImage: imageMatch?.[1],
            title: titleMatch?.[1],
            featuredImageAlt: altMatch?.[1],
            category: categoryMatch?.[1] || '',
          };
        }).filter(a => a.slug);
        
        // Extract author slugs using regex
        const authorMatches = [...authorsContent.matchAll(/slug:\s*["']([^"']+)["']/g)];
        const authors = authorMatches.map(m => ({ slug: m[1] }));
        
        // Extract category slugs using regex
        const categoryMatches = [...typesContent.matchAll(/slug:\s*["']([^"']+)["']/g)];
        const categories = categoryMatches.map(m => ({ slug: m[1] }));

        const BASE_URL = 'https://autotechspot.com';
        const today = new Date().toISOString().split('T')[0];

        interface SitemapUrl {
          loc: string;
          lastmod?: string;
          changefreq: string;
          priority: number;
          image?: {
            loc: string;
            title?: string;
            caption?: string;
          };
        }

        const urls: SitemapUrl[] = [];
        const escapeXml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

        // Homepage
        urls.push({ loc: `${BASE_URL}/`, lastmod: today, changefreq: 'daily', priority: 1.0 });

        // Categories
        for (const cat of categories) {
          urls.push({ loc: `${BASE_URL}/${cat.slug}`, lastmod: today, changefreq: 'weekly', priority: 0.8 });
        }

        // Articles with images
        for (const article of articles) {
          const url: SitemapUrl = {
            loc: `${BASE_URL}/${article.category}/${article.slug}`,
            lastmod: article.updatedAt || article.publishedAt,
            changefreq: 'monthly',
            priority: 0.7,
          };
          
          // Add image if valid URL (not blob: or placeholder)
          if (article.featuredImage && 
              !article.featuredImage.startsWith('blob:') && 
              !article.featuredImage.includes('placeholder')) {
            url.image = {
              loc: article.featuredImage.startsWith('http') 
                ? article.featuredImage 
                : `${BASE_URL}${article.featuredImage}`,
              title: article.title,
              caption: article.featuredImageAlt,
            };
          }
          
          urls.push(url);
        }

        // Authors
        for (const author of authors) {
          urls.push({ loc: `${BASE_URL}/author/${author.slug}`, lastmod: today, changefreq: 'monthly', priority: 0.6 });
        }

        // Static pages
        urls.push({ loc: `${BASE_URL}/about`, changefreq: 'monthly', priority: 0.5 });
        urls.push({ loc: `${BASE_URL}/contact`, changefreq: 'monthly', priority: 0.5 });

        // Legal pages
        urls.push({ loc: `${BASE_URL}/privacy`, changefreq: 'yearly', priority: 0.3 });
        urls.push({ loc: `${BASE_URL}/terms`, changefreq: 'yearly', priority: 0.3 });
        urls.push({ loc: `${BASE_URL}/disclaimer`, changefreq: 'yearly', priority: 0.3 });

        // Generate XML with image namespace
        const generateUrlEntry = (u: SitemapUrl) => {
          let entry = `  <url>
    <loc>${escapeXml(u.loc)}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod.split('T')[0]}</lastmod>` : ''}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority.toFixed(1)}</priority>`;
          
          if (u.image) {
            entry += `
    <image:image>
      <image:loc>${escapeXml(u.image.loc)}</image:loc>${u.image.title ? `
      <image:title>${escapeXml(u.image.title)}</image:title>` : ''}${u.image.caption ? `
      <image:caption>${escapeXml(u.image.caption)}</image:caption>` : ''}
    </image:image>`;
          }
          
          entry += `\n  </url>`;
          return entry;
        };

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.map(generateUrlEntry).join('\n')}
</urlset>`;

        fs.writeFileSync(path.resolve(__dirname, 'public/sitemap.xml'), xml, 'utf-8');
        console.log('✅ Sitemap generated successfully');
      } catch (error) {
        console.warn('⚠️ Sitemap generation skipped:', error);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && sitemapPlugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
