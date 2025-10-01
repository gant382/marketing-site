# Use nginx alpine image for lightweight static file serving
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy static website files to nginx html directory
COPY index.html /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY config.js /usr/share/nginx/html/
COPY config.json /usr/share/nginx/html/
COPY README.md /usr/share/nginx/html/

# Create nginx configuration for SPA routing
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    \
    # Enable gzip compression \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_proxied expired no-cache no-store private auth; \
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript; \
    \
    # Security headers \
    add_header X-Frame-Options "SAMEORIGIN" always; \
    add_header X-Content-Type-Options "nosniff" always; \
    add_header X-XSS-Protection "1; mode=block" always; \
    add_header Referrer-Policy "no-referrer-when-downgrade" always; \
    \
    # Cache static assets \
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    \
    # Cache JSON configuration file for shorter period \
    location ~* \.json$ { \
        expires 1h; \
        add_header Cache-Control "public"; \
    } \
    \
    # Serve index.html for all routes (SPA fallback) \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    \
    # Health check endpoint \
    location /health { \
        access_log off; \
        return 200 "healthy\n"; \
        add_header Content-Type text/plain; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
