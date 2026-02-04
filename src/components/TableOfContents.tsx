import { useMemo, useEffect, useState } from "react";
import { List } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

// Generate slug from heading text
export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  const headings = useMemo(() => {
    const lines = content.split("\n");
    const items: TOCItem[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      
      // Match H2 and H3 headings
      if (trimmed.startsWith("## ") && !trimmed.startsWith("### ")) {
        const text = trimmed.replace("## ", "");
        items.push({ id: generateSlug(text), text, level: 2 });
      } else if (trimmed.startsWith("### ")) {
        const text = trimmed.replace("### ", "");
        items.push({ id: generateSlug(text), text, level: 3 });
      }
    }

    return items;
  }, [content]);

  // Track active section using Intersection Observer
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible heading
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by position in document and take the first one
          const sorted = visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(sorted[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    // Observe all heading elements
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <nav className="mb-8 rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <List className="h-5 w-5 text-primary" />
        <h2 className="font-display text-lg font-semibold">Table of Contents</h2>
      </div>
      <ul className="space-y-2">
        {headings.map((heading, index) => (
          <li
            key={`${heading.id}-${index}`}
            className={heading.level === 3 ? "ml-4" : ""}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`
                block text-sm transition-colors
                ${activeId === heading.id 
                  ? "text-primary font-medium" 
                  : heading.level === 2 
                    ? "font-medium text-foreground hover:text-primary" 
                    : "text-muted-foreground hover:text-primary"
                }
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
