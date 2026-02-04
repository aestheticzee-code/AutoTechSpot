

# Dedicated FAQ Accordion Component

## Overview
I'll create a new FAQ accordion component with expandable/collapsible sections, where each question-answer pair is displayed in its own styled card. This will replace the current inline markdown rendering of FAQ sections with a polished, interactive experience.

## What You'll Get

### Visual Design
- Each FAQ displayed in an individual rounded card with subtle border
- Smooth expand/collapse animation when clicking questions
- Chevron icon that rotates when expanded
- Question text styled bold with proper hierarchy
- Answer text with muted styling for easy scanning
- Section header with "Frequently Asked Questions" title

### User Experience
- Click any question to expand and reveal the answer
- Click again to collapse
- Only one answer open at a time (single accordion behavior)
- Smooth CSS animations for professional feel

---

## Technical Implementation

### New File: `src/components/FAQAccordion.tsx`

A new reusable component that:
- Accepts an array of FAQ objects `{ question: string, answer: string }`
- Uses the existing Radix UI Accordion primitives from `@/components/ui/accordion`
- Wraps each FAQ in a Card component for the boxed layout
- Applies consistent styling matching the site's design system

**Component Structure:**
```text
FAQAccordion
  Section Title ("Frequently Asked Questions")
  Grid/Stack of Cards
    Each Card contains:
      AccordionItem
        AccordionTrigger (Question + Chevron)
        AccordionContent (Answer)
```

**Key Styling:**
- Cards: `rounded-lg border bg-card shadow-sm`
- Question: `font-semibold text-foreground`
- Answer: `text-muted-foreground leading-relaxed`
- Chevron: Rotates 180 degrees when open

### Update: `src/pages/ArticlePage.tsx`

- Import the new `FAQAccordion` component
- Add a conditional section after the article content that renders the FAQ accordion when `article.faqs` exists and has items
- Position the FAQ section between the tags and related articles

**Placement in Article:**
```text
Article Content
  MarkdownRenderer
  Tags
  FAQ Section (NEW - only if article has FAQs)
Related Articles
```

---

## Files Changed

| File | Change |
|------|--------|
| `src/components/FAQAccordion.tsx` | New file - dedicated FAQ accordion component |
| `src/pages/ArticlePage.tsx` | Import and render FAQAccordion when article has FAQs |

---

## Visual Preview

Each FAQ will look like this when collapsed:
```text
+------------------------------------------+
|  Is the 2026 RAV4 a good value?       v  |
+------------------------------------------+
```

And when expanded:
```text
+------------------------------------------+
|  Is the 2026 RAV4 a good value?       ^  |
|------------------------------------------|
|  Industry reports suggest competitive    |
|  efficiency and features, particularly   |
|  for hybrid-focused buyers...            |
+------------------------------------------+
```

