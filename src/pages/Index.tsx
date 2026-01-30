import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import ArticleCard from "@/components/ArticleCard";
import FeaturedCategories from "@/components/FeaturedCategories";
import AdPlaceholder from "@/components/AdPlaceholder";
import HeroSection from "@/components/HeroSection";
import { getFeaturedArticle, getRecentArticles } from "@/data/articles";

const Index = () => {
  const featuredArticle = getFeaturedArticle();
  const recentArticles = getRecentArticles(6).filter(
    (article) => article.slug !== featuredArticle?.slug
  );

  return (
    <Layout>
      <Helmet>
        <title>AutoTechSpot | Car Reviews & Automotive News</title>
        <meta
          name="description"
          content="Your trusted source for in-depth car reviews, automotive news, and expert insights. Stay updated with the latest from the car world."
        />
        <link rel="canonical" href="https://autotechspot.com" />
      </Helmet>

      {/* Hero Section */}
      <HeroSection />

      <div className="container py-8 md:py-12">
        {/* Featured Article */}
        {featuredArticle && (
          <section className="animate-fade-in">
            <h2 className="mb-6 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Featured Article
            </h2>
            <ArticleCard article={featuredArticle} featured />
          </section>
        )}

        {/* Recent Articles Grid */}
        <section className="mt-12 md:mt-16">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold">Latest Articles</h2>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentArticles.map((article, index) => (
              <ArticleCard
                key={article.slug}
                article={article}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        </section>

        {/* In-content Ad */}
        <AdPlaceholder size="in-article" />

        {/* Featured Categories */}
        <section className="mt-12 md:mt-16">
          <FeaturedCategories />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
