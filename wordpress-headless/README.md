# Paradise Rentals — Headless WordPress Edition

A complete, transferable version of the Paradise Rentals site that runs the
**React frontend** against a **self-hosted WordPress backend** instead of Base44.

```
wordpress-headless/
├── wordpress/paradise-rentals/   # WP plugin: CPTs, REST API, JWT auth, booking endpoints
│   ├── paradise-rentals.php
│   └── README.txt
├── src/                         # React frontend (Vite + Tailwind)
│   ├── api/wpClient.js          # WP REST client (carts + bookings)
│   ├── api/wpAuth.js            # JWT auth client
│   ├── lib/AuthContext.jsx      # auth state (uses wpAuth, not Base44)
│   ├── components/ProtectedRoute.jsx
│   ├── components/CartDropdown.jsx
│   ├── pages/  (Home, CartDetail, Checkout, Confirmation, Admin, Login, Register, ForgotPassword, ResetPassword)
│   └── ... (UI components copied unchanged — see step 3)
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── .env.example
└── vercel.json
```

## What changed vs. the Base44 app
- **Backend**: Base44 entities/auth/integrations → WordPress (custom post types + REST API + JWT auth, all in one self-contained plugin — no third-party WP plugins required).
- **Frontend data layer**: `base44.entities.Cart.*` → `wpCarts.*`; `base44.entities.Booking.*` → `wpBookings.*`; `base44.auth.*` → `wpAuth.*`. The UI components themselves are unchanged.
- **Booking flow**: still creates a Booking record in WordPress (no payment processing — booking buttons elsewhere still link to FareHarbor).

---

## Setup — 4 parts

### Part 1 — WordPress backend
1. Install WordPress on any host (e.g. your domain, a subdomain, or localhost).
2. Copy `wordpress/paradise-rentals/` into `wp-content/plugins/`.
3. (Recommended) Add to `wp-config.php`:
   ```php
   define('PR_JWT_SECRET', 'change-this-to-a-long-random-string');
   ```
4. Activate **Paradise Rentals Headless API** in wp-admin → Plugins.
5. Create an **Administrator** user in wp-admin → Users → Add New (this is your admin login for the React admin panel). Note the email + password.
6. Add your carts: wp-admin → **Golf Carts** → Add New. Set the title (cart name) and fill the custom fields: `seats`, `hourly_rate`, `daily_rate`, `battery_range`, `top_speed`, `total_inventory`, `status`, `image_url`, `description`.

### Part 2 — Frontend install
```bash
cd wordpress-headless
npm install
cp .env.example .env   # then edit VITE_WP_URL to your WordPress URL
npm run dev
```

### Part 3 — Copy the unchanged UI files from the Base44 app
These files have **no Base44 dependency** and transfer verbatim — copy them from
the original `src/` into `wordpress-headless/src/` (same paths):

```
src/index.css
src/components/ui/            (the whole folder — image.jsx, button.jsx, input.jsx, label.jsx, etc.)
src/components/Navbar.jsx
src/components/Footer.jsx
src/components/CartCard.jsx
src/components/DeliverySection.jsx
src/components/SocialProofSection.jsx
src/components/GallerySection.jsx
src/components/GolfCartFeaturesSection.jsx
src/components/ArrivalOptionsSection.jsx
src/components/NoChargingStressSection.jsx
src/components/ExploreKeyWestSection.jsx
src/components/HowItWorksSection.jsx
src/components/FaqSection.jsx
src/components/FinalBookingCta.jsx
src/components/MobileBookingBar.jsx
src/components/SmartSummaryBar.jsx
src/components/ScrollToTop.jsx
src/components/AuthLayout.jsx
src/components/GoogleIcon.jsx
src/components/UserNotRegisteredError.jsx
src/components/ArrivalDropdown.jsx
src/hooks/                   (use-mobile.jsx, use-size.jsx)
```
> The files already provided in `wordpress-headless/src/` (Home, CartDetail,
> Checkout, Confirmation, Admin, Login, Register, ForgotPassword, ResetPassword,
> CartDropdown, ProtectedRoute, AuthContext, PageNotFound, App, main, and the
> api/ + lib/ files) are the **adapted** versions — use those, don't overwrite them.

If you had SEO location pages (`src/components/LocationPage.jsx`, `src/data/locations.js`,
and their page files), copy those too and add their routes to `src/App.jsx`.

### Part 4 — Build & deploy
```bash
npm run build      # outputs dist/
```
- **Vercel**: import this folder as a new project (Framework: Vite). Set
  `VITE_WP_URL` in Vercel env vars. `vercel.json` already handles SPA routing.
- **Netlify**: build `npm run build`, publish `dist`, add a `_redirects` file
  with `/* /index.html 200`.

---

## How the pieces connect
- **Browsing carts**: `Home.jsx` → `wpCarts.list()` → `GET /wp-json/paradise/v1/carts`
- **Cart detail + availability**: `CartDetail.jsx` → `wpCarts.get(id)` + `wpBookings.filter({cart_id, status})`
- **Checkout**: `Checkout.jsx` → `wpBookings.create()` → `POST /wp-json/paradise/v1/bookings` (public, no login)
- **Admin**: `Admin.jsx` → `wpCarts.*` / `wpBookings.*` (Bearer token required; admin role)
- **Login**: `Login.jsx` → `wpAuth.login()` → `POST /wp-json/paradise/v1/login` → stores JWT in localStorage
- **Auth gate**: `ProtectedRoute` checks the JWT via `wpAuth.me()`

## Notes & limitations
- **No payment processing**: this builds a Booking record but doesn't charge a card. To take payments, add a Stripe/WooCommerce step in Checkout, or keep the FareHarbor buttons as the actual checkout (the marketing site then just collects leads).
- **Email**: the WP plugin uses `wp_mail()` for password resets; make sure your WordPress site sends mail (e.g. via an SMTP plugin).
- **Images**: cart images are referenced by URL in the `image_url` field. The `Image` component still optimizes media.base44.com / wixstatic.com URLs; for new images, upload to WordPress media and paste the URL.
- **SEO**: unlike Base44's auto meta injection, you manage `<title>`/description/OG tags yourself in `index.html` (a starter is included) and add a sitemap manually if needed.