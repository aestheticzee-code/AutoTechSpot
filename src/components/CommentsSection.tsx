import { MessageSquare } from "lucide-react";

interface CommentsSectionProps {
  articleSlug: string;
}

const CommentsSection = ({ articleSlug }: CommentsSectionProps) => {
  return (
    <section className="mt-12 border-t border-border pt-8">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6" />
        <h2 className="font-display text-2xl font-bold">Comments</h2>
      </div>
      
      <div className="mt-6 rounded-xl border-2 border-dashed border-border bg-muted/50 p-8 text-center">
        <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 font-display text-lg font-semibold">
          Comments Coming Soon
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          We're integrating a comments system. Check back soon to join the discussion!
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Article ID: {articleSlug}
        </p>
      </div>
    </section>
  );
};

export default CommentsSection;
