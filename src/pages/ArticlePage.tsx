import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/ArticleCard";
import SocialShare from "@/components/SocialShare";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import AdPlaceholder from "@/components/AdPlaceholder";
import { getArticleBySlug, getRelatedArticles } from "@/data/articles";
import { getAuthorByName } from "@/data/authors";
import { formatDate, getCategoryInfo } from "@/types/article";
import FAQAccordion from "@/components/FAQAccordion";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = slug ? getRelatedArticles(slug, 3) : [];

  if (!article) {
    return (
      <Layout>
        <div className="container flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
          <h1 className="font-display text-4xl font-bold">Article Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            The article you're looking for doesn't exist or has been removed.
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

  const category = getCategoryInfo(article.category);
  const author = getAuthorByName(article.author.name);
  const articleUrl = `https://autotechspot.com/article/${article.slug}`;

  // Schema.org Article markup for rich snippets
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    headline: article.title,
    description: article.excerpt,
    image: {
      "@type": "ImageObject",
      url: article.featuredImage,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: article.author.name,
      image: article.author.avatar,
      url: author ? `https://autotechspot.com/author/${author.slug}` : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "AutoTechSpot",
      logo: {
        "@type": "ImageObject",
        url: "https://autotechspot.com/logo.png",
        width: 200,
        height: 60,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    articleSection: category?.name,
    keywords: article.tags.join(", "),
    wordCount: article.content.trim().split(/\s+/).length,
  };

  // BreadcrumbList schema for navigation in search results
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://autotechspot.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category?.name,
        item: `https://autotechspot.com/category/${article.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  // FAQ schema for rich snippets (only if article has FAQs)
  const faqSchema = article.faqs && article.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <Layout>
      <Helmet>
        <title>{article.title} | AutoTechSpot</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={articleUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.featuredImage} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.publishedAt} />
        <meta property="article:author" content={article.author.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.featuredImage} />

        {/* Schema.org */}
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      <article>
        {/* Hero Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-muted">
          <img
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="container">
          <div className="relative -mt-32 rounded-t-2xl bg-background px-6 py-8 md:-mt-40 md:px-12 md:py-12">
            {/* Back Link */}
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to articles
            </Link>

            {/* Article Header */}
            <header>
              <div className="flex flex-wrap items-center gap-3">
                <Link to={`/category/${article.category}`}>
                  <Badge className="bg-primary hover:bg-primary/90">
                    {category?.name}
                  </Badge>
                </Link>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.publishedAt)}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {article.readingTime} min read
                </div>
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
                {article.title}
              </h1>

              <p className="mt-4 text-lg text-muted-foreground">{article.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
                <Link 
                  to={author ? `/author/${author.slug}` : "#"}
                  className="flex items-center gap-3 transition-opacity hover:opacity-80"
                >
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium hover:text-primary">{article.author.name}</p>
                    <p className="text-sm text-muted-foreground">Author</p>
                  </div>
                </Link>
                <SocialShare title={article.title} url={articleUrl} />
              </div>
            </header>

            {/* Article Content */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_300px]">
              <div className="prose prose-lg max-w-none">
                <MarkdownRenderer content={article.content} />

                {/* Tags */}
                <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* FAQ Section */}
                {article.faqs && article.faqs.length > 0 && (
                  <FAQAccordion faqs={article.faqs} />
                )}
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  <AdPlaceholder size="sidebar" />
                </div>
              </aside>
            </div>


            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <section className="mt-12 border-t border-border pt-8">
                <h2 className="font-display text-2xl font-bold">Related Articles</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedArticles.map((relatedArticle) => (
                    <ArticleCard key={relatedArticle.slug} article={relatedArticle} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default ArticlePage;
