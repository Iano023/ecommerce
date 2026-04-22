# Frontend System Documentation

> **E-Commerce Frontend** — React 19 / Vite Single-Page Application

---

## Overview

The frontend is a modern single-page application (SPA) built with **React 19** and **Vite**. It provides a complete e-commerce shopping experience including product browsing, cart management, Stripe checkout, user authentication, and an admin dashboard. State management is handled by **Zustand**, styling by **Tailwind CSS**, and animations by **Framer Motion**.

---

## Tech Stack

| Technology       | Purpose                              |
| ---------------- | ------------------------------------ |
| React 19         | UI framework                         |
| Vite             | Build tool & dev server              |
| React Router v7  | Client-side routing                  |
| Zustand          | Global state management              |
| Tailwind CSS     | Utility-first CSS framework          |
| Framer Motion    | Animations & transitions             |
| Axios            | HTTP client for API requests         |
| Recharts         | Charts for analytics dashboard       |
| Stripe.js        | Client-side Stripe integration       |
| Lucide React     | Icon library                         |
| React Hot Toast  | Toast notifications                  |
| React Confetti   | Purchase success celebration effect  |

---

## Project Structure

```
frontend/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── public/                     # Static assets
├── src/
│   ├── main.jsx                # React app bootstrap with BrowserRouter
│   ├── App.jsx                 # Root component — routing & auth check
│   ├── index.css               # Global styles (Tailwind directives)
│   ├── lib/
│   │   └── axios.js            # Axios instance (base URL: /api)
│   ├── stores/
│   │   ├── useUserStore.js     # Auth state (signup, login, logout, checkAuth)
│   │   ├── useProductStore.js  # Product state (CRUD, featured, recommendations)
│   │   └── useCartStore.js     # Cart state (add, remove, update, coupon)
│   ├── pages/
│   │   ├── Homepage.jsx            # Landing page with categories & featured
│   │   ├── SignUpPage.jsx          # User registration form
│   │   ├── LoginPage.jsx           # User login form
│   │   ├── AdminPage.jsx           # Admin dashboard (products & analytics)
│   │   ├── CategoryPage.jsx        # Products filtered by category
│   │   ├── CartPage.jsx            # Shopping cart with order summary
│   │   ├── PurchaseSuccessPage.jsx # Post-checkout success + confetti
│   │   └── PurchaseCancelPage.jsx  # Cancelled checkout page
│   └── components/
│       ├── Navbar.jsx              # Top navigation bar
│       ├── CategoryItem.jsx        # Category link card
│       ├── ProductCard.jsx         # Individual product display card
│       ├── FeaturedProducts.jsx    # Featured products carousel/section
│       ├── PeopleAlsoBought.jsx    # Product recommendations section
│       ├── CartItem.jsx            # Single cart item row
│       ├── Ordersummary.jsx        # Cart totals, coupon, checkout button
│       ├── GiftCouponCard.jsx      # Coupon display & validation card
│       ├── CreateProductForm.jsx   # Admin form to create new products
│       ├── ProductsList.jsx        # Admin product list with actions
│       ├── AnalyticsTab.jsx        # Admin analytics charts (Recharts)
│       └── LoadingSpinner.jsx      # Loading state indicator
```

---

## Pages & Routing

| Route                | Component            | Auth Required | Description                     |
| -------------------- | -------------------- | ------------- | ------------------------------- |
| `/`                  | Homepage             | No            | Landing page with categories    |
| `/signup`            | SignUpPage           | Guest only    | Redirects to `/` if logged in   |
| `/login`             | LoginPage            | Guest only    | Redirects to `/` if logged in   |
| `/secret-dashboard`  | AdminPage            | Admin only    | Redirects to `/login` otherwise |
| `/category/:category`| CategoryPage        | No            | Browse products by category     |
| `/cart`              | CartPage             | Yes           | Redirects to `/login` otherwise |
| `/purchase-success`  | PurchaseSuccessPage  | Yes           | Shown after successful payment  |
| `/purchase-cancel`   | PurchaseCancelPage   | Yes           | Shown after cancelled payment   |

---

## State Management (Zustand Stores)

### `useUserStore`
Manages authentication state and user profile.
- **State**: `user`, `loading`, `checkingAuth`
- **Actions**: `signup()`, `login()`, `logout()`, `checkAuth()`, `refreshToken()`

### `useProductStore`
Manages product data for both customers and admin.
- **State**: `products`, `loading`
- **Actions**: `setProducts()`, `createProduct()`, `fetchAllProducts()`, `fetchProductsByCategory()`, `deleteProduct()`, `toggleFeaturedProduct()`, `fetchFeaturedProducts()`

### `useCartStore`
Manages the shopping cart and coupon functionality.
- **State**: `cart`, `coupon`, `total`, `subtotal`, `isCouponApplied`, `loading`
- **Actions**: `getCartItems()`, `addToCart()`, `removeFromCart()`, `updateQuantity()`, `getMyCoupon()`, `applyCoupon()`, `removeCoupon()`, `calculateTotals()`

---

## Key Features

### Customer Features
- **Browse Products** — View by category, featured items, and recommendations
- **Shopping Cart** — Add/remove products, adjust quantities, persistent via backend
- **Coupon System** — Apply discount codes at checkout
- **Stripe Checkout** — Secure payment via Stripe Checkout Sessions
- **User Auth** — Register, login, logout with JWT-based sessions

### Admin Features
- **Product Management** — Create, delete, and toggle featured status
- **Product List** — View all products with admin controls
- **Analytics Dashboard** — View sales charts and key metrics (Recharts)

---

## API Communication

All API calls go through a shared **Axios instance** configured with:
- **Base URL**: `/api` (proxied to backend in development)
- **Credentials**: `withCredentials: true` (sends cookies automatically)

---

## Design System

- **Theme**: Dark mode with emerald green accents
- **Background**: Gray-900 with radial gradient overlay (emerald tones)
- **Styling**: Tailwind CSS utility classes
- **Animations**: Framer Motion for page transitions and interactive elements
- **Icons**: Lucide React icon library
- **Notifications**: React Hot Toast for user feedback

---

## Running the Frontend

```bash
# Development server (with HMR)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint check
npm run lint
```

In development, Vite proxies `/api` requests to the backend server. In production, the backend serves the built frontend from `frontend/dist`.
