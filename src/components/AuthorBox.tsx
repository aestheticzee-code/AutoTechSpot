import { Link } from "react-router-dom";
import { Author } from "@/types/author";
import { Badge } from "@/components/ui/badge";

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
          <Link
            to={`/author/${author.slug}`}
            className="font-display text-lg font-bold hover:text-primary transition-colors"
          >
            {author.name}
          </Link>
          <p className="text-sm text-muted-foreground">{author.role}</p>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {author.bio}
          </p>
          {author.expertise.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {author.expertise.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorBox;
