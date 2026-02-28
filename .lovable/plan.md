

## Add Google Analytics 4 Tracking

Add the GA4 tracking script to `index.html` using the measurement ID `G-FQS81C7GYH`.

### Changes

**`index.html`** — Add the GA4 script tags just before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FQS81C7GYH"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-FQS81C7GYH');
</script>
```

This will track page views, user engagement, traffic sources, and more across all pages. After publishing, data will appear in your GA4 dashboard within 24–48 hours.

