import { Author } from "@/types/author";

export const authors: Author[] = [
  {
    slug: "michael-torres",
    name: "Michael Torres",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    role: "Senior Automotive Editor",
    bio: "Michael Torres has been writing about cars for over 15 years. A former racing driver and certified automotive technician, he brings hands-on expertise to every review. His passion for performance vehicles started in his father's garage, where he learned to appreciate the engineering excellence that goes into every sports car. Michael has driven over 500 vehicles for professional reviews and has been featured in major automotive publications worldwide.",
    expertise: ["Sports Cars", "Performance Vehicles", "German Engineering", "Track Testing"],
    socialLinks: {
      twitter: "https://twitter.com/michaeltorres",
      linkedin: "https://linkedin.com/in/michaeltorres",
    },
    joinedAt: "2019-03-15",
  },
  {
    slug: "sarah-chen",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    role: "Electric Vehicle Specialist",
    bio: "Sarah Chen is an award-winning automotive journalist specializing in electric vehicles and sustainable transportation. With a background in electrical engineering from MIT, she brings technical depth to her coverage of EV technology. Sarah has been at the forefront of the electric revolution, covering the industry since 2015. She's known for her detailed battery technology analysis and her ability to explain complex EV concepts in accessible terms.",
    expertise: ["Electric Vehicles", "Battery Technology", "Sustainable Transportation", "EV Charging Infrastructure"],
    socialLinks: {
      twitter: "https://twitter.com/sarahchen_ev",
      linkedin: "https://linkedin.com/in/sarahchen",
      instagram: "https://instagram.com/sarahchenev",
    },
    joinedAt: "2020-06-01",
  },
  {
    slug: "james-wilson",
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    role: "Industry News Editor",
    bio: "James Wilson covers the latest developments in the automotive industry with a focus on business strategy, market trends, and emerging technologies. With over a decade of experience in automotive journalism and a background in business analysis, James provides insightful coverage of the industry's transformation. He has exclusive connections with major automakers and regularly breaks news stories before they hit mainstream media.",
    expertise: ["Industry News", "Market Analysis", "Automotive Business", "Future Technology"],
    socialLinks: {
      twitter: "https://twitter.com/jameswilson_auto",
      linkedin: "https://linkedin.com/in/jameswilsonauto",
    },
    joinedAt: "2018-09-10",
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
