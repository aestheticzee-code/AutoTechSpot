import { Link } from "react-router-dom";
import { Author } from "@/types/author";
import { Badge } from "@/components/ui/badge";
import { Twitter, Linkedin, BadgeCheck } from "lucide-react";

interface AuthorBoxProps {
  author: Author;
}

const AuthorBox = ({ author }: AuthorBoxProps) => {
  return (
    <div className="mt-10 rounded-xl border border-border bg-card p-6">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        About the Author
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Link to={`/author/${author.slug}`} className="shrink-0">
          <img
            src={author.avatar}
            alt={author.name}
            className="h-16 w-16 rounded-full object-cover"
          />
        </Link>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <Link
              to={`/author/${author.slug}`}
              className="font-display text-lg font-bold hover:text-primary transition-colors"
            >
              {author.name}
            </Link>
            <BadgeCheck className="h-5 w-5 shrink-0 text-blue-500" />
          </div>
          <p className="text-sm text-muted-foreground">{author.role}</p>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {author.bio}
          </p>
          <div className="mt-3 flex items-center gap-3">
            {author.expertise.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {author.expertise.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
            {author.socialLinks && (
              <div className="flex items-center gap-2 ml-auto">
                {author.socialLinks.twitter && (
                  <a
                    href={author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on Twitter`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                )}
                {author.socialLinks.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on LinkedIn`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;
