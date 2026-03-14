import { useEffect, useRef } from "react";

const WIDGET_ID = "c1af6a44-3d65-478f-81be-5da74a4173da";
const SCRIPT_SRC = `https://sdqvxhrztzmagfkmdcvf.supabase.co/functions/v1/embed-script?id=${WIDGET_ID}&style=card&italic_bio=1&social_labels=1&padding=20&accent=%238b5cf6`;

const AuthorBox = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const widgetDiv = document.createElement("div");
    widgetDiv.id = `authorwidget-${WIDGET_ID}`;
    containerRef.current.appendChild(widgetDiv);

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    containerRef.current.appendChild(script);

    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.setAttribute("data-aw-jsonld", WIDGET_ID);
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Alexander Sterling",
      jobTitle: "Automotive Journalist & Editor",
      image: "https://sdqvxhrztzmagfkmdcvf.supabase.co/storage/v1/object/public/author-avatars/02daf8cb-cc38-4826-8692-b6a4be15a8b6/1773487150397.webp",
      description: "Alexander Sterling is a seasoned automotive journalist and editor with over five years of experience. He delivers expert car reviews, industry analysis, and cutting-edge automotive news, blending technical precision with compelling storytelling for enthusiasts and car buyers alike.",
      sameAs: ["https://Alexandersterling"],
    });
    document.head.appendChild(jsonLd);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      jsonLd.remove();
    };
  }, []);

  return <div ref={containerRef} className="mt-10" />;
};

export default AuthorBox;
