# cPanel Deployment Guide: Asif's MERN Stack Portfolio

This guide outlines two proven deployment workflows to host this MERN Stack Developer Portfolio on typical cPanel shared or VPS hosting environments.

---

## Architecture Options Overview

| Deployment Method | Best For | Complexity | Server Requirements |
| :--- | :--- | :--- | :--- |
| **Option A: cPanel "Setup Node.js App" (Recommended)** | Running full MERN stack (Express API + React UI) directly inside cPanel | Low–Medium | cPanel with CloudLinux "Setup Node.js App" / Phusion Passenger |
| **Option B: Static Frontend + External Backend** | Standard shared hosting without Node.js support | Low | Any standard cPanel with PHP/Apache |

---

## Option A: Deploying via cPanel "Setup Node.js App"

Most modern cPanel hosts (Namecheap, Hostinger, SiteGround, A2 Hosting, etc.) provide the **"Setup Node.js App"** tool powered by Phusion Passenger.

### Step 1: Create the Node.js Application in cPanel
1. Log in to your **cPanel Dashboard**.
2. Under the **Software** section, click **"Setup Node.js App"**.
3. Click the **"Create Application"** button.
4. Fill in the parameters:
   - **Node.js version**: Select `18.x` or `20.x` (LTS recommended).
   - **Application mode**: Select `Production`.
   - **Application root**: `asif-portfolio` (or folder of your choice).
   - **Application URL**: Select your domain or subdomain (e.g., `portfolio.yourdomain.com`).
   - **Application startup file**: `server/server.ts` or `server.js`.
5. Click **Create**.

---

### Step 2: Upload Files to the Application Directory
1. In cPanel, open **File Manager**.
2. Navigate to the application root directory created in Step 1 (`asif-portfolio`).
3. Upload the project repository files (or zip archive and extract it).
   - Ensure hidden files like `.env` and `.htaccess` are shown in File Manager (**Settings** > check **"Show Hidden Files"**).

---

### Step 3: Configure Environment Variables
Create or edit `.env` in the root folder with your production secrets:

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.yourdb.mongodb.net/asif_portfolio?retryWrites=true&w=majority
JWT_SECRET=your_super_strong_random_secret_string_32_characters
ADMIN_EMAIL=admin@asifdev.com
ADMIN_PASSWORD=your_secure_admin_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CORS_ORIGIN=*
```

> **Security Tip**: Never commit real database credentials or JWT keys to public Git repositories.

---

### Step 4: Install Dependencies and Build Frontend
1. Return to **cPanel > Setup Node.js App**.
2. Select your application.
3. Click the **"Run NPM Install"** button.
   - *Alternatively, copy the virtual environment command displayed at the top of the page and run it via cPanel Terminal:*
   ```bash
   source /home/username/nodevenv/asif-portfolio/20/bin/activate
   cd /home/username/asif-portfolio
   npm install
   npm run build
   ```
4. Click **Restart** on your Node.js application in cPanel.

---

## Option B: Static Frontend Export + cPanel Apache

If your cPanel plan only supports static files:

1. **Build the production bundle**:
   ```bash
   npm run build
   ```
2. Open **cPanel File Manager** and go to your domain's web root (`public_html`).
3. Upload all files from the generated `/dist` folder into `public_html`.
4. Ensure the `.htaccess` file is placed in `public_html` to prevent 404 errors on browser page reloads:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

---

## Database Setup: Free MongoDB Atlas

Because shared cPanel hosts usually do not offer local MongoDB instances, MongoDB Atlas (Cloud) is the standard industry standard:

1. Visit [mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free M0 cluster.
2. In **Security > Database Access**, add a database user with read/write permissions.
3. In **Security > Network Access**, click **Add IP Address** and select **"Allow Access from Anywhere (0.0.0.0/0)"** so your cPanel web server can connect.
4. Go to **Clusters > Connect > Drivers**, copy the connection string, replace `<password>`, and paste it into your `.env` as `MONGODB_URI`.

---

## SSL Certificate (HTTPS)

1. In cPanel, navigate to **Security > SSL/TLS Status**.
2. Select your portfolio domain.
3. Click **"Run AutoSSL"** to issue a free automated Let's Encrypt certificate.
4. The provided `.htaccess` file automatically redirects all HTTP traffic to HTTPS.

---

## Troubleshooting Common cPanel Issues

| Symptom | Probable Cause | Resolution |
| :--- | :--- | :--- |
| **503 Service Unavailable** | Node.js process crashed on startup | Check Passenger application error logs in `stderr.log` in your app directory. Verify `.env` syntax. |
| **404 Not Found on Refresh** | Missing Apache rewrite rules for SPA | Ensure `.htaccess` exists in `public_html` with `RewriteRule . /index.html [L]`. |
| **MongoDB Connection Timeout** | MongoDB Atlas IP access list blocking server | Add `0.0.0.0/0` to Network Access in MongoDB Atlas dashboard. |
| **NPM Install Fails** | PHP memory limit or timeout in cPanel web GUI | Run `npm install` via cPanel Terminal using the virtual environment command. |
