# Production Deployment & Hosting Guide
**Developer Portfolio & Management System — Asif (MERN Stack Developer)**

This guide provides step-by-step instructions for deploying the portfolio to various hosting environments, including traditional cPanel (Node.js App / Static), VPS, and modern cloud platforms.

---

## 1. Prerequisites & Environment Variables

Create your production `.env` file based on `.env.example`:

```env
# Server
PORT=3000
NODE_ENV=production

# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://<db_user>:<db_password>@cluster0.example.mongodb.net/asif_portfolio?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=super_secure_random_jwt_secret_key_change_me
JWT_EXPIRES_IN=7d

# Initial Admin Account (Seeded on first connection)
ADMIN_EMAIL=admin@asifdev.com
ADMIN_PASSWORD=your_secure_admin_password_here

# Cloudinary (Optional, for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# CORS
CORS_ORIGIN=*
```

---

## 2. MongoDB Atlas Setup Guide

1. **Create Account & Cluster**:
   - Sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas).
   - Create a free M0 cluster in your preferred region.

2. **Configure Database User**:
   - Navigate to **Security** > **Database Access**.
   - Click **Add New Database User**.
   - Select **Password Authentication**, create username and secure password.
   - Assign role **Read and write to any database**.

3. **Configure Network Access**:
   - Navigate to **Security** > **Network Access**.
   - Click **Add IP Address**.
   - Choose **Allow Access from Anywhere** (`0.0.0.0/0`) or whitelist your server's static IP.

4. **Retrieve Connection String**:
   - Click **Connect** on your cluster overview > **Drivers** (Node.js).
   - Copy the URI, replace `<password>` and set as `MONGODB_URI` in `.env`.

---

## 3. Cloudinary CDN Setup (Optional)

1. Sign up for a free account at [cloudinary.com](https://cloudinary.com).
2. From the Cloudinary Console Dashboard, copy:
   - **Cloud Name** (`CLOUDINARY_CLOUD_NAME`)
   - **API Key** (`CLOUDINARY_API_KEY`)
   - **API Secret** (`CLOUDINARY_API_SECRET`)
3. If Cloudinary credentials are not supplied, the backend automatically uses safe local disk storage in `public/uploads`.

---

## 4. cPanel Deployment (With "Setup Node.js App" / CloudLinux)

If your cPanel provider includes the **Setup Node.js App** (Passenger / CloudLinux) feature:

1. **Upload Code**:
   - Compress your project root (excluding `node_modules` and `.git`).
   - In cPanel File Manager, upload and extract to `~/asif-portfolio` (outside `public_html`).

2. **Create Node.js Application in cPanel**:
   - Open **Setup Node.js App** from the cPanel dashboard.
   - Click **Create Application**.
   - **Node.js version**: Select `18.x` or `20.x`.
   - **Application mode**: `Production`.
   - **Application root**: `asif-portfolio`.
   - **Application URL**: Select your domain or subdomain (e.g. `portfolio.yourdomain.com`).
   - **Application startup file**: `server.ts` (or `dist/server.cjs` if built with esbuild).

3. **Install Dependencies & Build**:
   - In the cPanel Node.js interface, click **Run NPM Install** or copy the virtualenv command to run in cPanel Terminal:
     ```bash
     cd ~/asif-portfolio
     npm install
     npm run build
     ```

4. **Add Environment Variables**:
   - In the **Environment variables** section inside the cPanel Node.js app screen, add `MONGODB_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, etc.

5. **Start Application**:
   - Click **Restart Application** in cPanel.
   - Visit your domain; the portfolio will serve with full Express API routes, MongoDB connection, and Admin authentication.

---

## 5. cPanel Deployment (Static-Only Hosting)

If your cPanel plan does **NOT** support Node.js (PHP/HTML static hosting only):

1. **Build Static Assets Locally or in CI**:
   ```bash
   npm run build
   ```
   This generates the production static files in the `/dist` directory.

2. **Upload to `public_html`**:
   - In cPanel File Manager, navigate to `public_html`.
   - Upload the contents of the local `/dist` directory directly into `public_html`.

3. **Configure SPA Rewrite (.htaccess)**:
   Create or edit `.htaccess` in `public_html` to route all traffic to `index.html`:
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

4. **Host Backend on Free/Low-Cost Container Platform**:
   - Deploy `/backend` or the root Express server to Render, Railway, or VPS.
   - Point your frontend API calls to your hosted backend URL.

---

## 6. Standard VPS / Cloud Run / Docker Deployment

```bash
# Clone & install
git clone <your-repo-url>
cd portfolio
npm install

# Run build
npm run build

# Start production server
npm start
```

---

## 7. Security Best Practices

- **Never commit `.env`** to GitHub or version control.
- **Change the admin password** after initial setup via the Admin Settings tab or by setting `ADMIN_PASSWORD` in `.env`.
- **Use HTTPS** in production to protect cookies and credentials.
