# Complete Deployment Guide for Ubuntu Server with GoDaddy Domain and SSL

This guide covers deploying your OrbitDynamix project on an Ubuntu server with Nginx, configuring your GoDaddy domain, and setting up SSL certificates.

## Step 1: Push Your Project to the Server

### Option A: Using Git (Recommended)
```bash
# On your local machine, push to GitHub/GitLab
git add .
git commit -m "Deploy to production"
git push origin main

# On your Ubuntu server
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### Option B: Using SCP
```bash
# From your local machine
scp -i ~/SSH -r ./dist/* ubuntu@210.79.129.141:~/orbitdynamix/
```

### Option C: Using rsync
```bash
# Exclude node_modules (install fresh on server)
rsync -avz --exclude 'node_modules' ./dist/ ubuntu@210.79.129.141:~/orbitdynamix/
```

## Step 2: Setup Your Applications on Server

```bash
# SSH into your server
ssh -i ~/SSH ubuntu@210.79.129.141

# Create directory for your project
mkdir -p ~/orbitdynamix
cd ~/orbitdynamix

# For React app (already built locally)
# Copy the dist files here

# Install PM2 for process management (if you have a Node.js backend)
sudo npm install -g pm2

# If you have a Node.js backend
pm2 start server.js --name "orbitdynamix-api"
pm2 startup
pm2 save
```

## Step 3: Install and Configure Nginx

```bash
# Install Nginx
sudo apt update
sudo apt install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Configure Nginx for your domain:
```bash
sudo nano /etc/nginx/sites-available/orbitdynamix.com
```

Add this configuration for React SPA:
```nginx
server {
    listen 80;
    server_name orbitdynamix.com www.orbitdynamix.com;

    # Serve React frontend
    root /home/ubuntu/orbitdynamix;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
    gzip_vary on;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:
```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/orbitdynamix.com /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Step 4: Configure GoDaddy Domain

In your GoDaddy DNS settings:

1. **Login to GoDaddy** and go to DNS Management
2. **Add/Update A Records:**
   - Type: A
   - Name: @
   - Value: 210.79.129.141
   - TTL: 600 seconds
   
   - Type: A
   - Name: www
   - Value: 210.79.129.141
   - TTL: 600 seconds

3. **Remove any conflicting records** (CNAME, AAAA for @ or www)

*Note: DNS propagation takes 15 minutes to 48 hours.*

## Step 5: Setup SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d orbitdynamix.com -d www.orbitdynamix.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (recommended)
```

## Step 6: Configure Firewall

```bash
# Allow necessary ports
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable

# Check status
sudo ufw status
```

## Step 7: Auto-renewal for SSL

```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Check if cron job exists
sudo crontab -l

# Add cron job if not exists
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
```

## Step 8: Final Nginx Configuration (After SSL)

Your Nginx config will be automatically updated by Certbot:
```nginx
server {
    listen 80;
    server_name orbitdynamix.com www.orbitdynamix.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name orbitdynamix.com www.orbitdynamix.com;

    ssl_certificate /etc/letsencrypt/live/orbitdynamix.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/orbitdynamix.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    root /home/ubuntu/orbitdynamix;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
    gzip_vary on;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Step 9: Useful Management Commands

```bash
# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Renew SSL manually
sudo certbot renew

# If using PM2 for Node.js backend
pm2 status
pm2 logs
pm2 restart orbitdynamix-api
```

## Quick Deployment Script

Create a `deploy.sh` script for future updates:
```bash
#!/bin/bash
echo "Starting deployment..."

# Build locally first
npm run build

# Copy files to server
rsync -avz --delete ./dist/ ubuntu@210.79.129.141:~/orbitdynamix/

# Set correct permissions on server
ssh -i ~/SSH ubuntu@210.79.129.141 "sudo chown -R www-data:www-data ~/orbitdynamix && sudo chmod -R 755 ~/orbitdynamix"

# Reload Nginx
ssh -i ~/SSH ubuntu@210.79.129.141 "sudo systemctl reload nginx"

echo "Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
./deploy.sh
```

## Troubleshooting

### Common Issues and Solutions

1. **502 Bad Gateway**
   - Check if your app is running: `pm2 status`
   - Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`

2. **Permission Denied**
   - Fix permissions: `sudo chown -R www-data:www-data /home/ubuntu/orbitdynamix`

3. **SSL Certificate Issues**
   - Renew certificate: `sudo certbot renew --force-renewal`
   - Check certificate status: `sudo certbot certificates`

4. **Site Not Loading**
   - Check DNS propagation: `nslookup orbitdynamix.com`
   - Check Nginx config: `sudo nginx -t`
   - Check firewall: `sudo ufw status`

5. **Blank Page on React App**
   - Check browser console for errors
   - Ensure all routes return index.html
   - Check file permissions

## Security Best Practices

1. **Keep system updated**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Setup fail2ban**
   ```bash
   sudo apt install fail2ban -y
   sudo systemctl enable fail2ban
   ```

3. **Disable root login**
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   sudo systemctl restart sshd
   ```

4. **Regular backups**
   ```bash
   # Backup your site
   tar -czf backup-$(date +%Y%m%d).tar.gz ~/orbitdynamix/
   ```

## Summary Checklist

- [ ] ✅ Build project locally (`npm run build`)
- [ ] ✅ Push project to server
- [ ] ✅ Install and configure Nginx
- [ ] ✅ Configure GoDaddy domain DNS
- [ ] ✅ Wait for DNS propagation
- [ ] ✅ Setup SSL with Let's Encrypt
- [ ] ✅ Configure firewall
- [ ] ✅ Test HTTPS access
- [ ] ✅ Setup auto-renewal for SSL
- [ ] ✅ Create deployment script

## Server Details

- **Server IP**: 210.79.129.141
- **User**: ubuntu
- **SSH Key**: ~/SSH
- **Web Root**: /home/ubuntu/orbitdynamix
- **Nginx Config**: /etc/nginx/sites-available/orbitdynamix.com

After completing these steps, your site should be accessible at `https://orbitdynamix.com` with a valid SSL certificate!