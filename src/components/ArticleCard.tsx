import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Article, formatDate, getCategoryInfo } from "@/types/article";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ArticleCard = ({ article, featured = false, className, style }: ArticleCardProps) => {
  const category = getCategoryInfo(article.category);

  if (featured) {
    return (
      <Link to={`/article/${article.slug}`} className={cn("group block", className)} style={style}>
        <Card className="overflow-hidden border-0 bg-transparent shadow-none">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl lg:aspect-[4/3]">
              <img
                src={article.featuredImage}
                alt={article.featuredImageAlt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <Badge className="absolute left-4 top-4 bg-primary hover:bg-primary">
                {category?.name}
              </Badge>
            </div>
            <CardContent className="flex flex-col justify-center p-0">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{formatDate(article.publishedAt)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readingTime} min read
                </span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold leading-tight transition-colors group-hover:text-primary md:text-3xl lg:text-4xl">
                {article.title}
              </h2>
              <p className="mt-4 text-muted-foreground">{article.excerpt}</p>
              <div className="mt-6 flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="h-10 w-10 rounded-full object-cover"
                  loading="lazy"
                />
                <span className="font-medium">{article.author.name}</span>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/article/${article.slug}`} className={cn("group block", className)} style={style}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <Badge className="absolute left-3 top-3 bg-primary hover:bg-primary">
            {category?.name}
          </Badge>
        </div>
        <CardContent className="p-5">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>{formatDate(article.publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {article.readingTime} min
            </span>
          </div>
          <h3 className="mt-2 font-display text-lg font-bold leading-tight transition-colors group-hover:text-primary">
            {article.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="h-6 w-6 rounded-full object-cover"
              loading="lazy"
            />
            <span className="text-sm font-medium">{article.author.name}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ArticleCard;
