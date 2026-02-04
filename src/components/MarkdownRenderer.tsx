import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Parse markdown tables
  const parseTable = (tableLines: string[]): React.ReactNode => {
    if (tableLines.length < 2) return null;

    const headerLine = tableLines[0];
    const dataLines = tableLines.slice(2); // Skip separator line

    const parseRow = (line: string): string[] => {
      return line
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell, index, arr) => index > 0 && index < arr.length - 1 || cell);
    };

    const headers = parseRow(headerLine).filter(Boolean);
    const rows = dataLines.map((line) => parseRow(line).filter(Boolean));

    return (
      <div className="my-6 overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {headers.map((header, i) => (
                <TableHead key={i} className="font-semibold text-foreground">
                  {formatInlineText(header)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-background" : "bg-muted/30"}
              >
                {row.map((cell, cellIndex) => (
                  <TableCell key={cellIndex}>{formatInlineText(cell)}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  // Format inline text (bold, italic, inline code, links, etc.)
  const formatInlineText = (text: string): React.ReactNode => {
    // Process text through multiple formatting passes
    const processText = (input: string, keyPrefix: string = ""): React.ReactNode[] => {
      const result: React.ReactNode[] = [];
      let remaining = input;
      let partIndex = 0;

      while (remaining.length > 0) {
        // Check for inline code first (highest priority)
        const codeMatch = remaining.match(/^`([^`]+)`/);
        if (codeMatch) {
          result.push(
            <code
              key={`${keyPrefix}code-${partIndex++}`}
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-primary"
            >
              {codeMatch[1]}
            </code>
          );
          remaining = remaining.slice(codeMatch[0].length);
          continue;
        }

        // Check for images ![alt](url)
        const imageMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
        if (imageMatch) {
          result.push(
            <img
              key={`${keyPrefix}img-${partIndex++}`}
              src={imageMatch[2]}
              alt={imageMatch[1]}
              className="my-4 max-w-full rounded-lg"
            />
          );
          remaining = remaining.slice(imageMatch[0].length);
          continue;
        }

        // Check for links [text](url)
        const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          result.push(
            <a
              key={`${keyPrefix}link-${partIndex++}`}
              href={linkMatch[2]}
              className="text-primary underline underline-offset-2 hover:text-primary/80"
              target={linkMatch[2].startsWith("http") ? "_blank" : undefined}
              rel={linkMatch[2].startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {linkMatch[1]}
            </a>
          );
          remaining = remaining.slice(linkMatch[0].length);
          continue;
        }

        // Check for bold **text**
        const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
        if (boldMatch) {
          result.push(
            <strong key={`${keyPrefix}bold-${partIndex++}`} className="font-semibold text-foreground">
              {boldMatch[1]}
            </strong>
          );
          remaining = remaining.slice(boldMatch[0].length);
          continue;
        }

        // Check for italic *text* (single asterisk, not followed by another)
        const italicMatch = remaining.match(/^\*([^*]+)\*/);
        if (italicMatch) {
          result.push(
            <em key={`${keyPrefix}italic-${partIndex++}`} className="italic">
              {italicMatch[1]}
            </em>
          );
          remaining = remaining.slice(italicMatch[0].length);
          continue;
        }

        // Find the next special character or consume regular text
        const nextSpecial = remaining.search(/[`*!\[]/);
        if (nextSpecial === -1) {
          // No more special characters, add remaining text
          result.push(remaining);
          break;
        } else if (nextSpecial === 0) {
          // Special character at start but didn't match patterns, consume it as text
          result.push(remaining[0]);
          remaining = remaining.slice(1);
        } else {
          // Add text before the next special character
          result.push(remaining.slice(0, nextSpecial));
          remaining = remaining.slice(nextSpecial);
        }
      }

      return result;
    };

    return <>{processText(text)}</>;
  };

  // Render standalone image block
  const renderImage = (alt: string, src: string, key: number): React.ReactNode => {
    return (
      <figure key={key} className="my-6">
        <img
          src={src}
          alt={alt}
          className="w-full rounded-lg"
          loading="lazy"
        />
        {alt && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {alt}
          </figcaption>
        )}
      </figure>
    );
  };

  // Render blockquote
  const renderBlockquote = (lines: string[], key: number): React.ReactNode => {
    const content = lines
      .map((line) => line.replace(/^>\s?/, ""))
      .join("\n");

    return (
      <blockquote
        key={key}
        className="my-6 border-l-4 border-primary/50 bg-muted/50 py-4 pl-6 pr-4 italic text-muted-foreground"
      >
        {formatInlineText(content)}
      </blockquote>
    );
  };

  // Render unordered list
  const renderUnorderedList = (lines: string[], key: number): React.ReactNode => {
    return (
      <ul key={key} className="my-4 list-inside list-disc space-y-2 text-muted-foreground">
        {lines.map((line, i) => (
          <li key={i}>{formatInlineText(line.replace(/^-\s?/, ""))}</li>
        ))}
      </ul>
    );
  };

  // Render ordered list
  const renderOrderedList = (lines: string[], key: number): React.ReactNode => {
    return (
      <ol key={key} className="my-4 list-inside list-decimal space-y-2 text-muted-foreground">
        {lines.map((line, i) => (
          <li key={i}>{formatInlineText(line.replace(/^\d+\.\s?/, ""))}</li>
        ))}
      </ol>
    );
  };

  // Render code block with syntax highlighting
  const renderCodeBlock = (code: string, language: string, key: number): React.ReactNode => {
    // Basic syntax highlighting keywords
    const highlightCode = (code: string, lang: string): React.ReactNode => {
      const keywords = {
        js: /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|null|undefined|true|false)\b/g,
        ts: /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|throw|new|this|null|undefined|true|false|type|interface|extends|implements|public|private|protected)\b/g,
        python: /\b(def|class|import|from|return|if|elif|else|for|while|try|except|finally|with|as|lambda|True|False|None|and|or|not|in|is)\b/g,
        css: /\b(color|background|margin|padding|border|display|flex|grid|position|width|height|font|text|align|justify)\b/g,
        html: /(&lt;\/?[a-zA-Z][a-zA-Z0-9]*|&gt;)/g,
      };

      const stringRegex = /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g;
      const commentRegex = /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/gm;
      const numberRegex = /\b(\d+\.?\d*)\b/g;

      let result = code
        // Escape HTML
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Highlight comments (green)
      result = result.replace(commentRegex, '<span class="text-green-500">$1</span>');

      // Highlight strings (amber)
      result = result.replace(stringRegex, '<span class="text-amber-500">$&</span>');

      // Highlight numbers (purple)
      result = result.replace(numberRegex, '<span class="text-purple-400">$1</span>');

      // Highlight keywords based on language
      const langKey = lang.toLowerCase() as keyof typeof keywords;
      const keywordPattern = keywords[langKey] || keywords.js;
      if (keywordPattern) {
        result = result.replace(keywordPattern, '<span class="text-primary font-medium">$&</span>');
      }

      return <span dangerouslySetInnerHTML={{ __html: result }} />;
    };

    return (
      <div key={key} className="my-6 overflow-hidden rounded-lg border border-border">
        {language && (
          <div className="border-b border-border bg-muted/70 px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {language}
          </div>
        )}
        <pre className="overflow-x-auto bg-muted/30 p-4">
          <code className="text-sm leading-relaxed">
            {highlightCode(code, language)}
          </code>
        </pre>
      </div>
    );
  };

  // Main rendering logic
  const renderContent = (): React.ReactNode[] => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;
    let elementKey = 0;

    while (i < lines.length) {
      const line = lines[i];
      const trimmedLine = line.trim();

      // Skip empty lines
      if (!trimmedLine) {
        i++;
        continue;
      }

      // Horizontal rule
      if (trimmedLine === "---" || trimmedLine === "***" || trimmedLine === "___") {
        elements.push(
          <hr key={elementKey++} className="my-8 border-t border-border" />
        );
        i++;
        continue;
      }

      // H1 Header
      if (trimmedLine.startsWith("# ")) {
        elements.push(
          <h1
            key={elementKey++}
            className="mb-4 mt-10 font-display text-3xl font-bold"
          >
            {trimmedLine.replace("# ", "")}
          </h1>
        );
        i++;
        continue;
      }

      // H2 Header
      if (trimmedLine.startsWith("## ")) {
        elements.push(
          <h2
            key={elementKey++}
            className="mb-4 mt-10 font-display text-2xl font-bold"
          >
            {trimmedLine.replace("## ", "")}
          </h2>
        );
        i++;
        continue;
      }

      // H3 Header
      if (trimmedLine.startsWith("### ")) {
        elements.push(
          <h3
            key={elementKey++}
            className="mb-4 mt-8 font-display text-xl font-bold"
          >
            {trimmedLine.replace("### ", "")}
          </h3>
        );
        i++;
        continue;
      }

      // H4 Header
      if (trimmedLine.startsWith("#### ")) {
        elements.push(
          <h4
            key={elementKey++}
            className="mb-3 mt-6 font-display text-lg font-bold"
          >
            {trimmedLine.replace("#### ", "")}
          </h4>
        );
        i++;
        continue;
      }

      // Standalone image block ![alt](url)
      const imageBlockMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageBlockMatch) {
        elements.push(renderImage(imageBlockMatch[1], imageBlockMatch[2], elementKey++));
        i++;
        continue;
      }

      // Code block detection (``` or ```)
      if (trimmedLine.startsWith("```")) {
        const language = trimmedLine.slice(3).trim();
        const codeLines: string[] = [];
        i++; // Skip opening ```
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // Skip closing ```
        elements.push(renderCodeBlock(codeLines.join("\n"), language, elementKey++));
        continue;
      }

      // Table detection
      if (trimmedLine.includes("|") && i + 1 < lines.length) {
        const nextLine = lines[i + 1]?.trim();
        // Check if next line is a separator (contains | and -)
        if (nextLine && nextLine.includes("|") && nextLine.includes("-")) {
          const tableLines: string[] = [];
          while (i < lines.length && lines[i].trim().includes("|")) {
            tableLines.push(lines[i].trim());
            i++;
          }
          elements.push(
            <React.Fragment key={elementKey++}>
              {parseTable(tableLines)}
            </React.Fragment>
          );
          continue;
        }
      }

      // Blockquote
      if (trimmedLine.startsWith(">")) {
        const blockquoteLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          blockquoteLines.push(lines[i].trim());
          i++;
        }
        elements.push(renderBlockquote(blockquoteLines, elementKey++));
        continue;
      }

      // Unordered list items
      if (trimmedLine.startsWith("- ")) {
        const listLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("- ")) {
          listLines.push(lines[i].trim());
          i++;
        }
        elements.push(renderUnorderedList(listLines, elementKey++));
        continue;
      }

      // Ordered list items (1. 2. 3. etc.)
      if (/^\d+\.\s/.test(trimmedLine)) {
        const listLines: string[] = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
          listLines.push(lines[i].trim());
          i++;
        }
        elements.push(renderOrderedList(listLines, elementKey++));
        continue;
      }

      // Regular paragraph
      const paragraphLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() &&
        !lines[i].trim().startsWith("#") &&
        !lines[i].trim().startsWith(">") &&
        !lines[i].trim().startsWith("- ") &&
        !/^\d+\.\s/.test(lines[i].trim()) &&
        !lines[i].trim().startsWith("```") &&
        !lines[i].trim().includes("|") &&
        lines[i].trim() !== "---" &&
        lines[i].trim() !== "***" &&
        lines[i].trim() !== "___"
      ) {
        paragraphLines.push(lines[i].trim());
        i++;
      }

      if (paragraphLines.length > 0) {
        const paragraphText = paragraphLines.join(" ");
        elements.push(
          <p
            key={elementKey++}
            className="my-4 leading-relaxed text-muted-foreground"
          >
            {formatInlineText(paragraphText)}
          </p>
        );
      }
    }

    return elements;
  };

  return <>{renderContent()}</>;
};

export default MarkdownRenderer;
