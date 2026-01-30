import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface NewsletterSignupProps {
  className?: string;
  compact?: boolean;
}

const NewsletterSignup = ({ className, compact = false }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Successfully subscribed!",
      description: "You'll receive the latest car news in your inbox.",
    });
    
    setEmail("");
    setIsLoading(false);
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-9 text-sm"
        />
        <Button type="submit" size="sm" disabled={isLoading}>
          {isLoading ? "..." : "Subscribe"}
        </Button>
      </form>
    );
  }

  return (
    <div className={cn("rounded-xl bg-primary/5 p-8", className)}>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-bold">Stay in the Fast Lane</h3>
        <p className="mt-2 text-muted-foreground">
          Get exclusive car reviews, breaking news, and insider tips delivered straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="sm:w-72"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Subscribing..." : "Subscribe Now"}
          </Button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">
          No spam, unsubscribe anytime. We respect your privacy.
        </p>
      </div>
    </div>
  );
};

export default NewsletterSignup;
