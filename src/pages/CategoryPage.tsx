import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/ArticleCard";
import AdPlaceholder from "@/components/AdPlaceholder";
import { getArticlesByCategory } from "@/data/articles";
import { getCategoryInfo, ArticleCategory, categories } from "@/types/article";

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryInfo(slug as ArticleCategory) : undefined;
  const articles = slug ? getArticlesByCategory(slug) : [];

  if (!category) {
    return (
      <Layout>
        <div className="container flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
          <h1 className="font-display text-4xl font-bold">Category Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            The category you're looking for doesn't exist.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const categoryUrl = `https://autotechspot.com/${category.slug}`;

  return (
    <Layout>
      <Helmet>
        <title>{category.name} | AutoTechSpot</title>
        <meta name="description" content={category.description} />
        <link rel="canonical" href={categoryUrl} />

        <meta property="og:title" content={`${category.name} | AutoTechSpot`} />
        <meta property="og:description" content={category.description} />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content={`${category.name} | AutoTechSpot`} />
        <meta name="twitter:description" content={category.description} />
      </Helmet>

      {/* Category Header */}
      <div className="border-b border-border bg-surface">
        <div className="container py-12 md:py-16">
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <span className="text-foreground">{category.name}</span>
          </nav>
          <h1 className="font-display text-4xl font-bold md:text-5xl">{category.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {category.description}
          </p>

          {/* Category Navigation */}
          <div className="mt-8 flex gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/${cat.slug}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  cat.slug === category.slug
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {/* Ad Banner */}
        <AdPlaceholder size="leaderboard" className="mb-8" />

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No articles found in this category yet.
            </p>
            <Button asChild className="mt-6">
              <Link to="/">Browse all articles</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                article={article}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        )}

        {/* In-content Ad */}
        <AdPlaceholder size="in-article" />
      </div>
    </Layout>
  );
};

export default CategoryPage;
