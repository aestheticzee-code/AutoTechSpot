import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Calendar, Twitter, Linkedin, Instagram } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ArticleCard from "@/components/ArticleCard";
import { getAuthorBySlug } from "@/data/authors";
import { articles } from "@/data/articles";
import { formatDate } from "@/types/article";

const AuthorPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const author = slug ? getAuthorBySlug(slug) : undefined;

  if (!author) {
    return (
      <Layout>
        <div className="container flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
          <h1 className="font-display text-4xl font-bold">Author Not Found</h1>
          <p className="mt-4 text-muted-foreground">
            The author you're looking for doesn't exist or has been removed.
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

  // Get articles by this author
  const authorArticles = articles.filter(
    (article) => article.author.name === author.name
  );

  const authorUrl = `https://autotechspot.com/author/${author.slug}`;

  // Person schema for E-E-A-T signals
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    url: authorUrl,
    image: author.avatar,
    jobTitle: author.role,
    description: author.bio,
    worksFor: {
      "@type": "Organization",
      name: "AutoTechSpot",
      url: "https://autotechspot.com",
    },
    knowsAbout: author.expertise,
    sameAs: [
      author.socialLinks?.twitter,
      author.socialLinks?.linkedin,
      author.socialLinks?.instagram,
    ].filter(Boolean),
  };

  // BreadcrumbList schema
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
        name: "Authors",
        item: "https://autotechspot.com/authors",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: author.name,
        item: authorUrl,
      },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <title>{author.name} - Automotive Expert | AutoTechSpot</title>
        <meta
          name="description"
          content={`${author.name} is a ${author.role} at AutoTechSpot. ${author.bio.substring(0, 120)}...`}
        />
        <link rel="canonical" href={authorUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={`${author.name} | AutoTechSpot`} />
        <meta property="og:description" content={author.bio.substring(0, 160)} />
        <meta property="og:image" content={author.avatar} />
        <meta property="og:type" content="profile" />
        <meta property="profile:first_name" content={author.name.split(" ")[0]} />
        <meta property="profile:last_name" content={author.name.split(" ").slice(1).join(" ")} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${author.name} | AutoTechSpot`} />
        <meta name="twitter:description" content={author.bio.substring(0, 160)} />
        <meta name="twitter:image" content={author.avatar} />

        {/* Schema.org */}
        <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="container py-12">
        {/* Back Link */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to articles
        </Link>

        {/* Author Header */}
        <div className="grid gap-8 md:grid-cols-[280px_1fr] lg:gap-12">
          {/* Author Sidebar */}
          <aside className="space-y-6">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={author.avatar}
                alt={author.name}
                className="aspect-square w-full object-cover"
              />
            </div>

            {/* Social Links */}
            {author.socialLinks && (
              <div className="flex gap-3">
                {author.socialLinks.twitter && (
                  <a
                    href={author.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={`${author.name} on Twitter`}
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {author.socialLinks.linkedin && (
                  <a
                    href={author.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={`${author.name} on LinkedIn`}
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {author.socialLinks.instagram && (
                  <a
                    href={author.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={`${author.name} on Instagram`}
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}

            {/* Author Stats */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Role</span>
                  <span className="font-medium">{author.role}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Articles</span>
                  <span className="font-medium">{authorArticles.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Joined</span>
                  <span className="font-medium">{formatDate(author.joinedAt)}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main>
            <h1 className="font-display text-3xl font-bold md:text-4xl lg:text-5xl">
              {author.name}
            </h1>
            <p className="mt-2 text-lg text-primary">{author.role}</p>

            {/* Expertise Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {author.expertise.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Bio */}
            <div className="mt-8">
              <h2 className="font-display text-xl font-bold">About</h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {author.bio}
              </p>
            </div>

            {/* Articles by Author */}
            {authorArticles.length > 0 && (
              <section className="mt-12">
                <h2 className="font-display text-2xl font-bold">
                  Articles by {author.name.split(" ")[0]}
                </h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {authorArticles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default AuthorPage;
