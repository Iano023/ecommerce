# Backend System Documentation

> **E-Commerce Backend** — Node.js / Express.js REST API

---

## Overview

The backend is a RESTful API server built with **Express.js** that handles authentication, product management, shopping cart, coupons, payments, and analytics. It uses **MongoDB** as the primary database, **Redis** for caching/token storage, **Stripe** for payment processing, and **Cloudinary** for image uploads.

---

## Tech Stack

| Technology   | Purpose                          |
| ------------ | -------------------------------- |
| Express.js   | HTTP server & routing framework  |
| MongoDB      | Primary database (via Mongoose)  |
| Redis        | Caching & refresh token storage  |
| Stripe       | Payment processing               |
| Cloudinary   | Image upload & hosting           |
| JWT          | Access & refresh token auth      |
| bcryptjs     | Password hashing                 |
| cookie-parser| HTTP-only cookie management      |
| dotenv       | Environment variable management  |

---

## Project Structure

```
backend/
├── server.js                # App entry point — Express setup & route mounting
├── controllers/
│   ├── auth.controller.js       # Signup, login, logout, refresh token, profile
│   ├── product.controller.js    # CRUD for products, featured/recommended/category
│   ├── cart.controller.js       # Add, remove, get, update cart items
│   ├── coupon.controller.js     # Get & validate discount coupons
│   ├── payment.controller.js    # Stripe checkout session & success handling
│   └── analytics.controller.js  # Admin analytics & daily sales data
├── models/
│   ├── user.model.js            # User schema (name, email, password, cart, role)
│   ├── product.model.js         # Product schema (name, desc, price, image, category)
│   ├── order.model.js           # Order schema (user, products, total, stripeSessionId)
│   └── coupon.model.js          # Coupon schema (code, discount%, expiry, userId)
├── routes/
│   ├── auth.route.js            # /api/auth/*
│   ├── product.route.js         # /api/products/*
│   ├── cart.route.js            # /api/cart/*
│   ├── coupon.route.js          # /api/coupons/*
│   ├── payment.routes.js        # /api/payments/*
│   └── analytics.route.js       # /api/analytics/*
├── middleware/
│   └── auth.middleware.js       # protectRoute (JWT) & adminRoute (role check)
└── lib/
    ├── db.js                    # MongoDB connection
    ├── redis.js                 # Redis (Upstash) client
    ├── stripe.js                # Stripe client instance
    └── cloudinary.js            # Cloudinary config
```

---

## Data Models

### User
| Field      | Type       | Details                              |
| ---------- | ---------- | ------------------------------------ |
| name       | String     | Required                             |
| email      | String     | Required, unique, lowercase, trimmed |
| password   | String     | Required, min 6 chars, hashed (bcrypt) |
| cartItems  | Array      | `[{ quantity, product (ObjectId) }]` |
| role       | String     | `"customer"` (default) or `"admin"`  |
| timestamps | —          | createdAt, updatedAt                 |

### Product
| Field       | Type    | Details                    |
| ----------- | ------- | -------------------------- |
| name        | String  | Required                   |
| description | String  | Required                   |
| price       | Number  | Required, min 0            |
| image       | String  | Required (Cloudinary URL)  |
| category    | String  | Required                   |
| isFeatured  | Boolean | Default `false`            |
| timestamps  | —       | createdAt, updatedAt       |

### Order
| Field          | Type     | Details                                    |
| -------------- | -------- | ------------------------------------------ |
| user           | ObjectId | Ref → User, required                       |
| products       | Array    | `[{ product (ObjectId), quantity, price }]` |
| totalAmount    | Number   | Required, min 0                            |
| stripeSessionId| String   | Unique                                     |
| timestamps     | —        | createdAt, updatedAt                       |

### Coupon
| Field              | Type     | Details                    |
| ------------------ | -------- | -------------------------- |
| code               | String   | Required, unique           |
| discountPercentage | Number   | Required, 0–100            |
| expirationDate     | Date     | Required                   |
| isActive           | Boolean  | Default `true`             |
| userId             | ObjectId | Ref → User, required, unique |
| timestamps         | —        | createdAt, updatedAt       |

---

## API Endpoints

### Authentication — `/api/auth`
| Method | Route            | Auth     | Description               |
| ------ | ---------------- | -------- | ------------------------- |
| POST   | `/signup`        | Public   | Register a new user       |
| POST   | `/login`         | Public   | Login & get tokens        |
| POST   | `/logout`        | Public   | Clear auth cookies        |
| POST   | `/refresh-token` | Public   | Refresh the access token  |
| GET    | `/profile`       | Protected| Get logged-in user profile|

### Products — `/api/products`
| Method | Route              | Auth          | Description                   |
| ------ | ------------------ | ------------- | ----------------------------- |
| GET    | `/`                | Admin only    | Get all products              |
| GET    | `/featured`        | Public        | Get featured products         |
| GET    | `/recommendations` | Public        | Get recommended products      |
| GET    | `/category/:cat`   | Public        | Get products by category      |
| POST   | `/`                | Admin only    | Create a new product          |
| PATCH  | `/:id`             | Admin only    | Toggle featured status        |
| DELETE | `/:id`             | Admin only    | Delete a product              |

### Cart — `/api/cart`
| Method | Route  | Auth      | Description                  |
| ------ | ------ | --------- | ---------------------------- |
| GET    | `/`    | Protected | Get current user's cart      |
| POST   | `/`    | Protected | Add product to cart          |
| DELETE | `/`    | Protected | Remove all items from cart   |
| PUT    | `/:id` | Protected | Update item quantity in cart |

### Coupons — `/api/coupons`
| Method | Route       | Auth      | Description            |
| ------ | ----------- | --------- | ---------------------- |
| GET    | `/`         | Protected | Get user's coupon      |
| POST   | `/validate` | Protected | Validate a coupon code |

### Payments — `/api/payments`
| Method | Route                     | Auth      | Description                    |
| ------ | ------------------------- | --------- | ------------------------------ |
| POST   | `/create-checkout-session`| Protected | Create Stripe checkout session |
| POST   | `/checkout-success`       | Protected | Handle successful payment      |

### Analytics — `/api/analytics`
| Method | Route | Auth       | Description                          |
| ------ | ----- | ---------- | ------------------------------------ |
| GET    | `/`   | Admin only | Get analytics data + 7-day sales    |

---

## Authentication Flow

1. **Signup / Login** → Server generates an **access token** (short-lived) and a **refresh token** (long-lived), both stored as HTTP-only cookies.
2. **Refresh token** is also stored in **Redis** for server-side validation.
3. **Protected routes** use the `protectRoute` middleware that verifies the access token via JWT.
4. **Admin routes** additionally use the `adminRoute` middleware that checks `user.role === "admin"`.
5. **Token refresh** endpoint allows clients to obtain a new access token using the refresh token.

---

## Environment Variables

The following variables are expected in the `.env` file at the project root:

| Variable                 | Description                  |
| ------------------------ | ---------------------------- |
| `PORT`                   | Server port (default: 5000)  |
| `MONGO_URI`              | MongoDB connection string    |
| `UPSTASH_REDIS_URL`      | Redis (Upstash) URL          |
| `ACCESS_TOKEN_SECRET`    | JWT secret for access tokens |
| `REFRESH_TOKEN_SECRET`   | JWT secret for refresh tokens|
| `STRIPE_SECRET_KEY`      | Stripe secret API key        |
| `CLOUDINARY_CLOUD_NAME`  | Cloudinary cloud name        |
| `CLOUDINARY_API_KEY`     | Cloudinary API key           |
| `CLOUDINARY_API_SECRET`  | Cloudinary API secret        |
| `NODE_ENV`               | `development` or `production`|

---

## Running the Backend

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The server starts on the configured `PORT` (default 5000) and connects to MongoDB on startup. In production mode, it also serves the frontend static build from `frontend/dist`.
