

# Reduce FAQ Section Size

## Overview
The FAQ section currently appears too large compared to the article content. I'll reduce the typography, padding, and spacing to create better visual proportion.

## Current vs Proposed Sizing

| Element | Current | Proposed |
|---------|---------|----------|
| Section title | `text-2xl` | `text-xl` |
| Section margin-top | `mt-10` | `mt-8` |
| Section margin-bottom | `mb-6` | `mb-4` |
| Card gap | `space-y-3` | `space-y-2` |
| Question padding | `px-5 py-4` | `px-4 py-3` |
| Question font | `font-semibold` | `font-medium text-sm` |
| Answer padding | `px-5 pb-4` | `px-4 pb-3` |
| Answer font | default | `text-sm` |

## Visual Result

The FAQ section will feel more integrated with the article content rather than standing out as oversized. Each question-answer card will be more compact while remaining fully readable and clickable.

---

## Technical Changes

### File: `src/components/FAQAccordion.tsx`

**Updates:**
- Reduce section title from `text-2xl` to `text-xl`
- Reduce top margin from `mt-10` to `mt-8`
- Reduce title bottom margin from `mb-6` to `mb-4`
- Reduce card spacing from `space-y-3` to `space-y-2`
- Reduce question padding from `px-5 py-4` to `px-4 py-3`
- Change question font from `font-semibold` to `font-medium text-sm`
- Reduce answer padding from `px-5 pb-4` to `px-4 pb-3`
- Add `text-sm` to answer text

