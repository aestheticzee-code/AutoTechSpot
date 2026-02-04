
# Enhanced Markdown Rendering for Articles

## Overview
Your article pages currently show raw markdown tables as plain text with pipe characters. I'll enhance the content rendering system to properly display tables, horizontal rules, blockquotes, and additional formatting elements.

## What Will Be Fixed

### Before (Current Issues)
- Tables appear as raw text: `| Column | Column |`
- Horizontal rules show as `---` text
- Blockquotes (`> Note:`) not styled
- H1 headers (`# Title`) not rendered

### After (Improvements)
- Professional styled tables with headers and rows
- Clean horizontal dividers between sections
- Styled blockquote callouts for notes
- All header levels properly rendered

---

## Technical Changes

### File: `src/pages/ArticlePage.tsx`

I'll rewrite the `renderContent` function to handle:

1. **Markdown Tables**
   - Detect table patterns (lines with `|` characters)
   - Parse header row, separator row, and data rows
   - Render using the existing Table UI components
   - Style with proper borders and spacing

2. **Horizontal Rules**
   - Detect `---` on its own line
   - Render as a styled `<hr>` element

3. **Blockquotes**
   - Detect lines starting with `>`
   - Render with left border and muted background

4. **H1 Headers**
   - Add support for `# ` prefix
   - Style consistently with other headers

5. **Improved List Handling**
   - Better detection for lists that start with `-`
   - Handle nested formatting within lists

---

## Component Updates

### Table Rendering
Tables will use your existing UI components:
- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`
- Responsive with horizontal scroll on mobile
- Clean borders matching your design system

### Visual Improvements
- Blockquotes: Gray left border with subtle background
- Horizontal rules: Thin separator matching your theme
- Tables: Alternating row colors for readability
