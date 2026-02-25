import { Link } from "react-router-dom";
import { ArrowRight, Play, CheckCircle, FileText, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const useCountUp = (end: number, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
};

const stats = [
  { value: 30, suffix: "+", label: "Total Articles", icon: FileText },
  { value: 1, suffix: "K+", label: "Monthly Readers", icon: Users },
  { value: 5, suffix: "+", label: "Years Experience", icon: Award },
];

const StatCard = ({ value, suffix, label, icon: Icon, delay }: { value: number; suffix: string; label: string; icon: typeof FileText; delay: number }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div
      ref={ref}
      className="group relative flex flex-1 flex-col items-center gap-3 rounded-2xl border border-primary/10 bg-card/50 px-6 py-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <p className="font-display text-4xl font-bold text-primary">
        {count}{suffix}
      </p>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
};

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
              Welcome to AutoTechSpot
            </div>
            
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Stay Updated on the Cars{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Everyone Will Be Talking About!
              </span>
            </h1>
            
            <p className="max-w-lg text-lg text-muted-foreground md:text-xl">
              We share early details, release updates, and honest coverage of future vehicles coming to the U.S. market — so you always know what's coming next.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="gap-2">
                <Link to="/car-reviews">
                  Explore Upcoming Cars
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/car-updates">
                  <Play className="h-4 w-4" />
                  Latest Updates
                </Link>
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-col gap-2.5 pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Coverage focused on upcoming U.S. car releases</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Regular updates with accurate information</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Built for automotive enthusiasts and buyers</span>
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
                  <span className="font-display text-lg font-bold text-primary">📰</span>
                </div>
                <div>
                  <p className="font-display text-lg font-bold">New Articles Weekly</p>
                  <p className="text-sm text-muted-foreground">Fresh content every week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats - Centered below grid */}
        <div className="grid grid-cols-1 gap-4 pt-16 sm:grid-cols-3 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={400 + i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
