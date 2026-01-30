

# Formspree Contact Form Integration

## Overview

Integrate Formspree to handle contact form submissions. Formspree is a simple, no-backend solution that sends form submissions directly to your email.

## Prerequisites (Your Action Required)

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and copy your **Form ID** (looks like `xyzabcde`)
3. Share the Form ID with me when ready

## How It Works

```text
┌─────────────────┐      ┌─────────────────┐      ┌─────────────┐
│  Contact Form   │ ──▶  │   Formspree     │ ──▶  │  Your Email │
│  (Your Site)    │      │   (API)         │      │   Inbox     │
└─────────────────┘      └─────────────────┘      └─────────────┘
```

No edge functions or backend code needed - submissions go directly to Formspree.

## What Will Change

### File: `src/pages/ContactPage.tsx`

| Current | After |
|---------|-------|
| Simulated submission with `setTimeout` | Real POST request to Formspree API |
| No actual email sent | Emails delivered to your inbox |

### Code Changes

1. **Add `name` attributes** to all form inputs (required by Formspree)
2. **Replace `handleSubmit`** to POST form data to `https://formspree.io/f/{YOUR_FORM_ID}`
3. **Handle responses** for success, error, and validation states
4. **Add honeypot field** for spam protection (hidden from users)

## Features Included

- Real email notifications to your inbox
- Spam protection via honeypot field
- Loading state while submitting
- Success/error toast messages
- Form resets after successful submission
- No backend infrastructure needed

## Cost

- Formspree free tier: 50 submissions/month
- Paid plans available for higher volume

## Next Step

Share your Formspree Form ID and I'll implement the integration immediately.

