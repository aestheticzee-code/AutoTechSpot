import { Author } from "@/types/author";

export const authors: Author[] = [
  {
    slug: "alexander-sterling",
    name: "Alexander Sterling",
    avatar: "/images/alexander-sterling.png",
    role: "Automotive Journalist & Editor",
    bio: "Alexander Sterling is an automotive journalist and editor with over 5 years of experience. With dual backgrounds in automotive engineering and business analytics, he provides authoritative insights into vehicle technology, market trends, and sustainable mobility. Alexander has been featured in Automotive News, Car and Driver, and speaks regularly at industry conferences on the future of transportation.",
    expertise: ["Autonomous Vehicles", "Sustainable Engineering", "Automotive Innovation"],
    socialLinks: {
      twitter: "https://twitter.com/alexandersterling",
      linkedin: "https://linkedin.com/in/alexandersterling",
    },
    joinedAt: "2026-02-01",
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((author) => author.slug === slug);
}

export function getAuthorByName(name: string): Author | undefined {
  return authors.find((author) => author.name === name);
}

export function getAllAuthors(): Author[] {
  return authors;
}
