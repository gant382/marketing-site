# Claude Chatbot Platform - Marketing Website

A professional, responsive landing page for the Claude Chatbot Platform with links to the application login and signup pages.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Fast Loading**: Pure HTML, CSS, and JavaScript - no frameworks needed
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Call-to-Actions**: Multiple CTAs linking to the application at https://chatbots.s-rate.com
- **Contact Form**: Built-in contact form with validation
- **Mobile Menu**: Hamburger menu for mobile navigation

## File Structure

```
marketing-site/
├── index.html          # Main landing page
├── styles.css          # All styling and responsive design
├── script.js           # Interactive functionality
└── README.md          # This file
```

## Quick Start

### Local Development

1. Open `index.html` in your web browser:
   ```bash
   # Windows
   start index.html

   # Or simply double-click the file
   ```

2. For live reload during development, use a simple HTTP server:
   ```bash
   # Using Python
   python -m http.server 8080

   # Using Node.js (http-server)
   npx http-server -p 8080

   # Using PHP
   php -S localhost:8080
   ```

3. Visit `http://localhost:8080` in your browser

## Deployment Options

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Push the `marketing-site` folder contents
3. Go to Settings → Pages
4. Select the branch and folder
5. Your site will be live at `https://yourusername.github.io/repo-name`

### Option 2: Netlify (Free)

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop the `marketing-site` folder
3. Get instant deployment with free SSL
4. Custom domain support available

**Netlify CLI:**
```bash
npm install -g netlify-cli
cd marketing-site
netlify deploy --prod
```

### Option 3: Vercel (Free)

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy:
   ```bash
   cd marketing-site
   vercel --prod
   ```

### Option 4: AWS S3 + CloudFront

1. Create S3 bucket with static website hosting
2. Upload files:
   ```bash
   aws s3 sync . s3://your-bucket-name --acl public-read
   ```
3. Configure CloudFront for CDN and SSL
4. Point your domain to CloudFront

### Option 5: Traditional Web Hosting

Upload files via FTP/SFTP to your web server's public directory:
```bash
# Using SCP
scp -r marketing-site/* user@yourserver.com:/var/www/html/

# Using SFTP
sftp user@yourserver.com
put -r marketing-site/* /var/www/html/
```

### Option 6: Docker + Nginx

Create a `Dockerfile`:
```dockerfile
FROM nginx:alpine
COPY marketing-site/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t chatbot-marketing .
docker run -d -p 80:80 chatbot-marketing
```

## Customization

### Update Application URLs

The site links to `https://chatbots.s-rate.com` by default. To change:

1. Open `index.html`
2. Find and replace all instances of:
   - `https://chatbots.s-rate.com/login`
   - `https://chatbots.s-rate.com/signup`
3. Replace with your actual application URLs

### Update Colors and Branding

Edit `styles.css` and modify the CSS variables:

```css
:root {
    --primary-color: #6366f1;      /* Main brand color */
    --primary-hover: #4f46e5;      /* Hover state */
    --secondary-color: #8b5cf6;    /* Secondary color */
    /* ... other variables */
}
```

### Update Content

Edit `index.html` to modify:
- Hero section text and CTAs
- Features and benefits
- Use cases
- Pricing tiers
- Contact information

### Add Logo

Replace the text logo with an image:

```html
<!-- Replace this in index.html -->
<div class="logo">
    <img src="logo.png" alt="Claude Chatbot Platform" />
</div>
```

### Add Demo Video

Uncomment and implement the video modal in `script.js`:

```javascript
function openDemoModal() {
    // Show modal with embedded video
    // Example: YouTube, Vimeo, or self-hosted
}
```

## Connect Contact Form

The contact form currently shows a success message without sending data. To connect it:

### Option 1: Backend API

Update `script.js`:

```javascript
const response = await fetch('https://your-api.com/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
});
```

### Option 2: Formspree (No Backend Needed)

1. Sign up at [formspree.io](https://formspree.io)
2. Get your form endpoint
3. Update the form in `index.html`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Option 3: EmailJS

1. Sign up at [emailjs.com](https://emailjs.com)
2. Add EmailJS SDK
3. Configure email template
4. Update `script.js` with EmailJS integration

## Analytics Integration

### Google Analytics

Add before closing `</head>` tag in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel

Add before closing `</head>` tag:

```html
<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## Performance Optimization

### Minify Files

```bash
# Install minification tools
npm install -g html-minifier clean-css-cli uglify-js

# Minify HTML
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html

# Minify CSS
cleancss -o styles.min.css styles.css

# Minify JavaScript
uglifyjs script.js -o script.min.js
```

### Enable Caching

Add to your `.htaccess` file (Apache):

```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
</IfModule>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Testing

### Responsive Design

Test on multiple devices:
- Desktop (1920x1080, 1366x768)
- Tablet (768x1024)
- Mobile (375x667, 414x896)

### Browser Testing

Use tools like:
- [BrowserStack](https://browserstack.com)
- [LambdaTest](https://lambdatest.com)

### Performance Testing

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://webpagetest.org/)

## SEO Optimization

### Add Sitemap

Create `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-10-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Add robots.txt

Create `robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

### Meta Tags

Already included in `index.html`:
- Title and description
- Viewport for mobile
- Charset declaration

Consider adding:
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URL

## Custom Domain Setup

### DNS Configuration

Point your domain to the hosting provider:

**For static hosting (Netlify, Vercel):**
- Add CNAME record: `www` → `provider-url`
- Add A record: `@` → Provider's IP

**For AWS CloudFront:**
- Add A record with Alias to CloudFront distribution

**Example DNS records:**
```
Type    Name    Value                           TTL
A       @       192.0.2.1                      3600
CNAME   www     your-app.netlify.app           3600
```

### SSL Certificate

Most hosting providers offer free SSL via Let's Encrypt. Enable HTTPS and redirect HTTP to HTTPS.

## Maintenance

### Regular Updates

- Review and update content quarterly
- Update pricing information as needed
- Add new testimonials and case studies
- Keep contact information current

### Monitor Performance

- Check page load speed monthly
- Review analytics data
- Test forms and CTAs regularly
- Monitor broken links

## Troubleshooting

### Mobile Menu Not Working

Check that JavaScript is enabled and `script.js` is loaded correctly.

### Styles Not Applying

Verify `styles.css` is in the same directory and linked correctly in HTML.

### Forms Not Submitting

Open browser console (F12) to check for JavaScript errors.

### Links Not Working

Verify all URLs are correct and accessible.

## Support

For questions or issues:
- Technical Documentation: See `../TECHNICAL-DOCUMENTATION.md`
- Business Information: See `../BUSINESS-DOCUMENTATION.md`
- Marketing Content: See `../MARKETING-MATERIALS.md`

## License

Copyright © 2025 Claude Chatbot Platform. All rights reserved.

---

**Next Steps:**
1. Customize the content for your brand
2. Update application URLs
3. Connect the contact form
4. Add analytics tracking
5. Deploy to your hosting provider
6. Configure custom domain
7. Test on multiple devices
8. Launch and promote!
