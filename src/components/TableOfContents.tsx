import { useMemo, useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

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
  const [isOpen, setIsOpen] = useState(false);

  const headings = useMemo(() => {
    const lines = content.split("\n");
    const items: TOCItem[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
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

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
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

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
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
    <nav
      className="mb-8 rounded-xl border border-border/60 overflow-hidden"
      style={{ backgroundColor: "hsl(var(--secondary))" }}
      aria-label="Table of Contents"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:opacity-80"
      >
        <span className="font-semibold text-base text-foreground">
          📑 Table of Contents
        </span>
        <span
          className="text-xl leading-none text-muted-foreground transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? `${headings.length * 40 + 24}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <ul className="space-y-1 px-5 pb-4">
          {headings.map((heading, index) => (
            <li
              key={`${heading.id}-${index}`}
              className={heading.level === 3 ? "ml-4" : ""}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={`
                  block rounded-md px-2 py-1.5 text-sm transition-colors duration-150
                  ${
                    activeId === heading.id
                      ? "text-primary font-medium bg-primary/5"
                      : heading.level === 2
                        ? "font-medium text-foreground hover:text-primary hover:bg-primary/5"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }
                `}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default TableOfContents;
