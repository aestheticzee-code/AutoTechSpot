import { Link } from "react-router-dom";
import { Car, Newspaper } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/types/article";

interface FeaturedCategoriesProps {
  className?: string;
}

const categoryIcons = {
  "car-reviews": Car,
  "news": Newspaper,
};

const FeaturedCategories = ({ className }: FeaturedCategoriesProps) => {
  return (
    <div className={cn("rounded-xl bg-primary/5 p-8", className)}>
      <div className="mx-auto max-w-4xl text-center">
        <h3 className="font-display text-2xl font-bold">Explore Our Categories</h3>
        <p className="mt-2 text-muted-foreground">
          Discover in-depth content tailored to your automotive interests.
        </p>
        
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {categories.map((category) => {
            const Icon = categoryIcons[category.slug];
            return (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="group rounded-xl border border-border bg-background p-6 text-left transition-all hover:border-primary hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-display text-lg font-semibold group-hover:text-primary">
                  {category.name}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
