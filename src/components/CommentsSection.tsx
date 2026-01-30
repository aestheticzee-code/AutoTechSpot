import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";

interface CommentsSectionProps {
  articleSlug: string;
}

const CommentsSection = ({ articleSlug }: CommentsSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous giscus instance
    const existingScript = containerRef.current.querySelector("script");
    if (existingScript) {
      existingScript.remove();
    }
    const existingGiscus = containerRef.current.querySelector(".giscus");
    if (existingGiscus) {
      existingGiscus.remove();
    }

    // Detect theme
    const isDark = document.documentElement.classList.contains("dark");
    const theme = isDark ? "dark" : "light";

    // Create and inject Giscus script
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "aestheticzee-code/AutoTechSpot");
    script.setAttribute("data-repo-id", "R_kgDORE2bNg");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDORE2bNs4C1pJ0");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    containerRef.current.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        const scriptEl = containerRef.current.querySelector("script");
        if (scriptEl) scriptEl.remove();
        const giscusEl = containerRef.current.querySelector(".giscus");
        if (giscusEl) giscusEl.remove();
      }
    };
  }, [articleSlug]);

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark");
          const theme = isDark ? "dark" : "light";
          
          const iframe = document.querySelector<HTMLIFrameElement>(
            "iframe.giscus-frame"
          );
          if (iframe) {
            iframe.contentWindow?.postMessage(
              { giscus: { setConfig: { theme } } },
              "https://giscus.app"
            );
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mt-12 border-t border-border pt-8">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="h-6 w-6" />
        <h2 className="font-display text-2xl font-bold">Comments</h2>
      </div>
      
      <div ref={containerRef} className="giscus-container" />
    </section>
  );
};

export default CommentsSection;
