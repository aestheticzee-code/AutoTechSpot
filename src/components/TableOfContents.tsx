import { useMemo } from "react";
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

  if (headings.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
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
                block text-sm transition-colors hover:text-primary
                ${heading.level === 2 ? "font-medium text-foreground" : "text-muted-foreground"}
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
