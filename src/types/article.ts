export type ArticleCategory = "car-reviews" | "news";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  featuredImageAlt: string;
  category: ArticleCategory;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  featured?: boolean;
  faqs?: FAQ[];
}

export interface CategoryInfo {
  slug: ArticleCategory;
  name: string;
  description: string;
}

export const categories: CategoryInfo[] = [
  {
    slug: "car-reviews",
    name: "Car Reviews",
    description: "In-depth reviews of the latest vehicles, from performance sports cars to practical family SUVs.",
  },
  {
    slug: "news",
    name: "Car Updates",
    description: "Breaking news from the automotive industry, including new releases, recalls, and industry trends.",
  },
];

export function getCategoryInfo(slug: ArticleCategory): CategoryInfo | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
