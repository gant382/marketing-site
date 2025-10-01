# TALOS mAInd Marketing Site - Deployment Guide

## Overview

This is a fully dockerized marketing website with centralized configuration management. All page variables (logos, URLs, contact info, etc.) are managed through a single `config.json` file.

## Features

- ✅ **Dockerized**: Ready to deploy with Docker and Docker Compose
- ✅ **Configurable**: All site variables in `config.json`
- ✅ **SEO Optimized**: Complete meta tags, Open Graph, Twitter Cards, and JSON-LD structured data
- ✅ **Lightweight**: Nginx Alpine base image (~5MB)
- ✅ **Production Ready**: Gzip compression, caching, security headers
- ✅ **Health Checks**: Built-in health endpoint for monitoring

## Quick Start

### Using Docker Compose (Recommended)

```bash
# Start the site
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the site
docker-compose down
```

The site will be available at `http://localhost:8080`

### Using Docker Only

```bash
# Build the image
docker build -t talos-marketing-site .

# Run the container
docker run -d \
  -p 8080:80 \
  -v $(pwd)/config.json:/usr/share/nginx/html/config.json:ro \
  --name talos-marketing-site \
  talos-marketing-site

# View logs
docker logs -f talos-marketing-site

# Stop and remove
docker stop talos-marketing-site
docker rm talos-marketing-site
```

## Configuration

### Editing Site Content

All configurable content is in `config.json`. Edit this file to customize:

- **Site Information**: Title, description, brand name
- **Logo**: SVG content
- **URLs**: Login, signup, contact form API
- **Hero Section**: Title, subtitle, CTA buttons
- **Statistics**: Numbers and labels
- **Contact Information**: Emails, phone, hours
- **Pricing**: Plans and pricing details
- **Footer**: Company info, copyright

### Example Configuration Change

```json
{
  "site": {
    "title": "Your Company Name",
    "brandName": "Your Brand"
  },
  "urls": {
    "loginUrl": "https://your-app.com/login",
    "signupUrl": "https://your-app.com/signup"
  },
  "contact": {
    "email": "sales@your-company.com"
  }
}
```

### Applying Configuration Changes

Since `config.json` is mounted as a volume, you can update it without rebuilding:

```bash
# Edit config.json
nano config.json

# Restart the container to apply changes
docker-compose restart

# Or just reload the page in browser (config is loaded dynamically)
```

## Production Deployment

### Environment Variables

You can customize the deployment with environment variables in `docker-compose.yml`:

```yaml
environment:
  - NGINX_HOST=yourdomain.com
  - NGINX_PORT=80
```

###  Using a Different Port

Edit `docker-compose.yml`:

```yaml
ports:
  - "80:80"  # Change first port number
```

### Behind a Reverse Proxy

If deploying behind nginx, Apache, or Traefik:

```nginx
# Nginx example
location / {
    proxy_pass http://localhost:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### SSL/HTTPS

Use a reverse proxy like Traefik or nginx-proxy with Let's Encrypt, or configure Cloudflare.

Example with Traefik labels in `docker-compose.yml`:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.marketing.rule=Host(`yourdomain.com`)"
  - "traefik.http.routers.marketing.entrypoints=websecure"
  - "traefik.http.routers.marketing.tls.certresolver=letsencrypt"
```

## SEO Configuration

The site includes comprehensive SEO optimization:

### Meta Tags
- Standard meta tags (description, keywords, author)
- Open Graph tags for Facebook/LinkedIn
- Twitter Card tags
- Canonical URL
- Language and robots directives

### Structured Data
- JSON-LD format for Google rich snippets
- Software Application schema
- Ratings and pricing information

### Update SEO Content

Edit `index.html` meta tags or use `config.json` for dynamic content updates via `config.js`.

## Monitoring

### Health Check

The container includes a health check endpoint:

```bash
curl http://localhost:8080/health
```

### Docker Health Status

```bash
docker ps
# Look for "healthy" status

docker inspect talos-marketing-site | grep -A 10 Health
```

## File Structure

```
marketing-site/
├── index.html              # Main HTML file with SEO tags
├── styles.css              # Stylesheet
├── script.js               # Interactive features
├── config.js               # Configuration loader
├── config.json             # Site configuration (EDIT THIS!)
├── Dockerfile              # Docker image definition
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore           # Files to exclude from Docker build
├── README.md               # Original documentation
└── DEPLOYMENT.md           # This file
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs

# Verify config.json is valid JSON
cat config.json | python -m json.tool
```

### Configuration Not Updating

```bash
# Hard restart
docker-compose down
docker-compose up -d

# Check if volume is mounted correctly
docker inspect talos-marketing-site | grep Mounts -A 20
```

### Port Already in Use

```bash
# Find what's using the port
netstat -ano | findstr :8080

# Change the port in docker-compose.yml
ports:
  - "8081:80"  # Use different port
```

## Updating the Site

### Code Changes

```bash
# Rebuild after code changes
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Configuration Only

```bash
# No rebuild needed, just edit config.json
nano config.json
# Refresh browser
```

## Backup

```bash
# Backup configuration
cp config.json config.json.backup

# Backup entire site
tar -czf marketing-site-backup.tar.gz .
```

## Support

For issues or questions:
- Check Docker logs: `docker-compose logs`
- Verify nginx config: `docker exec talos-marketing-site nginx -t`
- Review health status: `docker ps`

## Performance

The site is optimized for performance:
- Gzip compression enabled
- Static asset caching (1 year for images/CSS/JS)
- Lightweight Alpine Linux base (~5MB)
- No external dependencies

## Security

Security headers are configured:
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: no-referrer-when-downgrade

## License

© 2025 TALOS mAInd. All rights reserved.
