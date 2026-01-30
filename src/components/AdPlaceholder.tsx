import { cn } from "@/lib/utils";

// Toggle this to true when your Google AdSense is approved
const SHOW_ADS = false;

type AdSize = "banner" | "sidebar" | "in-article" | "leaderboard";

interface AdPlaceholderProps {
  size: AdSize;
  className?: string;
}

const sizeStyles: Record<AdSize, string> = {
  banner: "h-24 w-full",
  sidebar: "h-64 w-full",
  "in-article": "h-32 w-full my-8",
  leaderboard: "h-24 w-full max-w-4xl mx-auto",
};

const AdPlaceholder = ({ size, className }: AdPlaceholderProps) => {
  // Return null when ads are disabled
  if (!SHOW_ADS) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 text-xs text-muted-foreground",
        sizeStyles[size],
        className
      )}
    >
      <span>Ad Placement Zone</span>
    </div>
  );
};

export default AdPlaceholder;
