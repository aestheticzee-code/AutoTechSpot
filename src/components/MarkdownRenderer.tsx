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

  // Format inline text (bold, italic, etc.)
  const formatInlineText = (text: string): React.ReactNode => {
    // Handle bold text
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-foreground">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
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

  // Render list
  const renderList = (lines: string[], key: number): React.ReactNode => {
    return (
      <ul key={key} className="my-4 list-inside list-disc space-y-2 text-muted-foreground">
        {lines.map((line, i) => (
          <li key={i}>{formatInlineText(line.replace(/^-\s?/, ""))}</li>
        ))}
      </ul>
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

      // List items
      if (trimmedLine.startsWith("- ")) {
        const listLines: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("- ")) {
          listLines.push(lines[i].trim());
          i++;
        }
        elements.push(renderList(listLines, elementKey++));
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
