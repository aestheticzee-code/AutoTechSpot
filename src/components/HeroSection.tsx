import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--muted)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="container relative py-16 md:py-24 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="animate-fade-in space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Your Trusted Car Expert
            </div>
            
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Discover the World of{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Automotive Excellence
              </span>
            </h1>
            
            <p className="max-w-lg text-lg text-muted-foreground md:text-xl">
              Expert reviews, breaking news, and in-depth analysis. Stay ahead with the latest from the automotive world.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="gap-2">
                <Link to="/category/car-reviews">
                  Explore Reviews
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/category/news">
                  <Play className="h-4 w-4" />
                  Latest Updates
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-6 md:gap-12">
              <div>
                <p className="font-display text-3xl font-bold text-primary">30+</p>
                <p className="text-sm text-muted-foreground">Total Articles</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-primary">1K+</p>
                <p className="text-sm text-muted-foreground">Monthly Readers</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-primary">3+</p>
                <p className="text-sm text-muted-foreground">Expert Writers</p>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop"
                alt="Luxury sports car on a scenic mountain road"
                className="h-full w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-4 -left-4 rounded-xl border bg-card p-4 shadow-lg md:-bottom-6 md:-left-6 md:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <span className="font-display text-lg font-bold text-primary">⭐</span>
                </div>
                <div>
                  <p className="font-display text-lg font-bold">Trusted Reviews</p>
                  <p className="text-sm text-muted-foreground">By car enthusiasts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
