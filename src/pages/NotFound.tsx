import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Home, Car, Newspaper } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRecentArticles } from "@/data/articles";
import { formatDate, getCategoryInfo, categories } from "@/types/article";

const NotFound = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const popularArticles = getRecentArticles(3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to home with search - the search overlay can be triggered there
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Main 404 Section */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6">
            <span className="text-8xl font-bold text-primary">404</span>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-foreground">
            Road Not Found
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Looks like you've taken a wrong turn. The page you're looking for has either moved or doesn't exist.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </div>
          </form>

          {/* Quick Links */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/category/car-reviews">
              <Button variant="outline" className="gap-2">
                <Car className="h-4 w-4" />
                Car Reviews
              </Button>
            </Link>
            <Link to="/category/news">
              <Button variant="outline" className="gap-2">
                <Newspaper className="h-4 w-4" />
                Latest News
              </Button>
            </Link>
          </div>
        </div>

        {/* Popular Articles */}
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-center text-xl font-semibold text-foreground">
            Popular Articles
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {popularArticles.map((article) => {
              const category = getCategoryInfo(article.category);
              return (
                <Link
                  key={article.slug}
                  to={`/article/${article.slug}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.featuredImage}
                      alt={article.featuredImageAlt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {category?.name}
                    </Badge>
                    <h3 className="line-clamp-2 font-medium text-foreground group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Browse Categories */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Browse by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Link key={cat.slug} to={`/category/${cat.slug}`}>
                <Badge
                  variant="outline"
                  className="cursor-pointer px-4 py-2 text-sm transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {cat.name}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
