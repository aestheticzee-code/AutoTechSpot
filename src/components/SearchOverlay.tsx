import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { searchArticles } from "@/data/articles";
import { formatDate, getCategoryInfo, getArticleUrl } from "@/types/article";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length >= 2 ? searchArticles(query) : [];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm transition-opacity duration-300",
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "mx-auto mt-20 max-w-2xl px-4 transition-transform duration-300",
          isOpen ? "translate-y-0" : "-translate-y-8"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-xl border border-border bg-card shadow-2xl">
          {/* Search Input */}
          <div className="flex items-center border-b border-border px-4">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {query.length < 2 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Start typing to search articles...
              </p>
            ) : results.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No articles found for "{query}"
              </p>
            ) : (
              <div className="space-y-4">
                {results.map((article) => {
                  const category = getCategoryInfo(article.category);
                  return (
                    <Link
                      key={article.slug}
                      to={getArticleUrl(article)}
                      onClick={onClose}
                      className="block rounded-lg p-3 transition-colors hover:bg-muted"
                    >
                      <div className="flex gap-4">
                        <img
                          src={article.featuredImage}
                          alt={article.featuredImageAlt}
                          className="h-16 w-24 rounded-md object-cover"
                          loading="lazy"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {category?.name}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(article.publishedAt)}
                            </span>
                          </div>
                          <h4 className="mt-1 font-medium leading-tight">
                            {article.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
