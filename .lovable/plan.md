

# Guide: Managing Articles on AutoTechSpot

## Overview

Your articles are stored in a single file: `src/data/articles.ts`. This is a TypeScript file containing an array of article objects. To add, edit, or remove articles, you'll modify this file directly.

---

## Part 1: How to Remove Sample Articles

### Step 1: Open the Articles File
Navigate to `src/data/articles.ts` in the code editor (click "Code" in the top-left of Lovable).

### Step 2: Delete Article Objects
The file contains an `articles` array with 5 sample articles. Each article is an object inside curly braces `{ ... }`. To remove an article, delete the entire object from the opening `{` to the closing `}` including the comma.

**Current sample articles to remove:**
- `2024-porsche-911-carrera-review`
- `tesla-model-3-highland-2024`
- `bmw-announces-neue-klasse-platform`
- `2024-honda-civic-type-r-review`
- `ev-sales-record-2024`

### Step 3: Keep the Array Structure
After removing, ensure the file still has valid structure:
```typescript
export const articles: Article[] = [
  // Your new articles will go here
];
```

---

## Part 2: How to Write Your Own Articles

### Article Structure Template

Copy this template for each new article:

```typescript
{
  slug: "your-article-url-slug",           // URL-friendly (lowercase, hyphens)
  title: "Your Article Title Here",
  excerpt: "A brief 1-2 sentence summary that appears on article cards.",
  content: `
## Main Heading

Your article content goes here using Markdown format.

### Subheading

Write your paragraphs here. You can use:
- Bullet points
- **Bold text**
- *Italic text*

### Another Section

More content...
  `,
  featuredImage: "https://example.com/your-image.jpg",  // 1200x630px recommended
  featuredImageAlt: "Descriptive alt text for SEO",
  category: "car-reviews",                  // or "news"
  tags: ["Tag1", "Tag2", "Tag3"],
  author: {
    name: "Alexander Sterling",
    avatar: "/images/alexander-sterling.png",
  },
  publishedAt: "2026-01-30",               // YYYY-MM-DD format
  readingTime: 5,                          // Estimated minutes
  featured: false,                         // Set ONE article to true
  faqs: [                                  // Optional - helps SEO
    {
      question: "Common question about this topic?",
      answer: "Your detailed answer here.",
    },
  ],
},
```

### Field Explanations

| Field | Description | Example |
|-------|-------------|---------|
| `slug` | URL path (no spaces, lowercase) | `"2026-tesla-model-y-review"` |
| `title` | Article headline | `"2026 Tesla Model Y Review"` |
| `excerpt` | Short preview (50-100 words) | Brief teaser text |
| `content` | Full article in Markdown | Use headings, lists, bold |
| `featuredImage` | Main image URL | Unsplash or uploaded image |
| `category` | Must be `"car-reviews"` or `"news"` | `"car-reviews"` |
| `tags` | Keywords for search/SEO | `["Tesla", "EV", "SUV"]` |
| `publishedAt` | Publication date | `"2026-01-30"` |
| `featured` | Show in hero section | `true` or `false` |
| `faqs` | Optional Q&A for SEO | Array of question/answer pairs |

---

## Part 3: What to Update When Publishing

### Checklist for Each New Article

```text
✅ 1. Add article to src/data/articles.ts
✅ 2. Update public/sitemap.xml (add new URL)
✅ 3. Upload images to public/images/ (if using local images)
✅ 4. Click "Publish" to deploy changes
```

### Sitemap Update

Add a new entry to `public/sitemap.xml` for each article:

```xml
<url>
  <loc>https://autotechspot.com/article/your-article-slug</loc>
  <lastmod>2026-01-30</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

---

## Part 4: Adding Images

### Option 1: Use External Images (Easier)
Use free stock photos from Unsplash. Example URL format:
```
https://images.unsplash.com/photo-XXXXXXXXX?w=1200&h=630&fit=crop
```

### Option 2: Upload Your Own Images
1. Upload images to Lovable (drag & drop in chat)
2. Images go to `public/images/`
3. Reference as `/images/your-image-name.jpg`

---

## Example: Complete New Article

```typescript
{
  slug: "2026-ford-mustang-dark-horse-review",
  title: "2026 Ford Mustang Dark Horse Review: American Muscle Evolved",
  excerpt: "Ford's most powerful naturally-aspirated Mustang ever delivers 500 horsepower of pure driving excitement. We test the Dark Horse on track and street.",
  content: `
## Introduction

The 2026 Ford Mustang Dark Horse represents the pinnacle of American muscle car engineering...

### Performance

- **Horsepower:** 500 HP
- **0-60 mph:** 4.1 seconds
- **Top Speed:** 165 mph

### Verdict

This is the Mustang for true enthusiasts...

**Rating: 9.2/10**
  `,
  featuredImage: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=1200&h=630&fit=crop",
  featuredImageAlt: "2026 Ford Mustang Dark Horse in Shadow Black on a mountain road",
  category: "car-reviews",
  tags: ["Ford", "Mustang", "Muscle Car", "American Cars"],
  author: {
    name: "Alexander Sterling",
    avatar: "/images/alexander-sterling.png",
  },
  publishedAt: "2026-01-30",
  readingTime: 6,
  featured: true,
  faqs: [
    {
      question: "How much horsepower does the Mustang Dark Horse have?",
      answer: "The 2026 Mustang Dark Horse produces 500 horsepower from its 5.0-liter V8 engine.",
    },
  ],
},
```

---

## Quick Reference: Categories

| Category Slug | Display Name | Use For |
|--------------|--------------|---------|
| `car-reviews` | Car Reviews | Vehicle reviews and comparisons |
| `news` | Car Updates | Industry news and announcements |

---

## Need Help?

Just ask me to:
- **"Add a new article about [topic]"** - I'll create the full article entry
- **"Remove all sample articles"** - I'll clear the dummy content
- **"Update the sitemap"** - I'll add new article URLs

