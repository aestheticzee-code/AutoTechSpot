export interface Author {
  slug: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  expertise: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  joinedAt: string;
}

export function getAuthorDisplayName(author: Author): string {
  return author.name;
}
