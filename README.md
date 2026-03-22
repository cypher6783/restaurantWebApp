# REFINED — Luxury Nigerian Dining App

A full-stack restaurant web application built for **REFINED**, a premium Nigerian dining experience. The app lets customers browse the menu, place orders, book reservations, manage their profile, and save favourite dishes — all from a beautifully crafted mobile-first interface.

---

## ✨ Features

### Customer-Facing
- 🍽️ **Interactive Digital Menu** — browse by category, search with debounced filtering, and view full dish details
- 🛒 **Cart System** — add items, adjust quantities, and checkout; cart persists across page refreshes
- 📦 **Order Tracking** — place orders and view order history in your profile
- 🗓️ **Reservations** — book a table as a guest or signed-in user
- ❤️ **Saved Dishes** — favourite any dish and manage your saved list
- 👤 **User Profile** — stats, loyalty points, delivery addresses, payment methods, and settings
- 🔐 **Authentication** — JWT-based register, login, and protected routes

### Technical Highlights
- ⚡ Sub-300ms page transitions with Framer Motion
- 🖼️ Next.js Image optimisation (WebP/AVIF, lazy loading, blur placeholder)
- 🔄 30-second in-memory API response cache (instant repeat visits)
- 💾 Cart & session persisted to `localStorage`
- 🛡️ Tiered rate limiting on all API endpoints
- 🗜️ Gzip compression on all backend responses
- 📋 HTTP `Cache-Control` headers on menu endpoints

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| Icons | Lucide React |
| Backend | Node.js, Express 5 |
| Database | PostgreSQL via Prisma ORM |
| Auth | JSON Web Tokens (JWT) + bcrypt |
| Real-time | Socket.io |
| Rate Limiting | express-rate-limit |
| Compression | compression (gzip) |
| API Docs | Swagger UI |

---

## 📁 Project Structure

```
restaurantApp/
├── frontend/                  # Next.js app
│   ├── app/                   # App Router pages
│   │   ├── page.tsx           # Home / landing page
│   │   ├── menu/              # Menu browsing
│   │   ├── dish/[id]/         # Dish detail page
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout flow
│   │   ├── order-success/     # Post-order confirmation
│   │   ├── reservations/      # Table booking
│   │   ├── profile/           # User profile + sub-pages
│   │   ├── login/             # Authentication
│   │   ├── register/          # New user signup
│   │   ├── about/             # About the restaurant
│   │   └── contact/           # Contact page
│   ├── components/
│   │   ├── layout/            # Header, MobileNav, AdminSidebar
│   │   └── ui/                # Button, Card, Badge, Input, PageTransition
│   └── lib/
│       ├── api.ts             # Typed API client with 30s GET cache
│       ├── cartContext.tsx    # Cart state (localStorage-backed)
│       ├── data.ts            # Static dish & seed data
│       └── utils.ts           # cn(), formatCurrency()
│
└── backend/                   # Express API
    ├── src/
    │   ├── app.js             # Express app setup (compression, cors, routes)
    │   ├── index.js           # Server entry point
    │   ├── controllers/       # Request handlers
    │   ├── services/          # Business logic & Prisma queries
    │   ├── routes/            # Express routers
    │   ├── middlewares/
    │   │   ├── authMiddleware.js    # JWT protect + role authorize
    │   │   ├── rateLimiter.js      # Tiered rate limiting
    │   │   └── validationMiddleware.js  # Zod schema validation
    │   ├── utils/             # Logger, validators
    │   ├── config/            # Prisma client singleton
    │   └── docs/              # Swagger YAML spec
    ├── prisma/
    │   └── schema.prisma      # DB models: User, MenuItem, Order, Reservation, Favorite
    └── tests/
        └── auth.test.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- PostgreSQL database
- Git

### 1. Clone the repo
```bash
git clone https://github.com/cypher6783/restaurantWebApp.git
cd restaurantWebApp
```

### 2. Backend setup
```bash
cd backend
npm install

# Create .env
cp .env.example .env
# Fill in DATABASE_URL and JWT_SECRET
```

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
JWT_SECRET="your-super-secret-key"
PORT=5000
```

```bash
# Run migrations and seed the database
npx prisma migrate dev
npx prisma db seed

# Start the dev server
npm run dev
```

The backend will be available at **http://localhost:5000**  
API docs at **http://localhost:5000/api-docs**

### 3. Frontend setup
```bash
cd ../frontend
npm install   # or: yarn install

# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start the dev server
npm run dev
```

The app will be available at **http://localhost:3000**

---

## 🛡️ Rate Limiting

All API endpoints are protected by tiered rate limiting:

| Tier | Limit | Endpoints |
|---|---|---|
| `authLimiter` | 10 req / 15 min | `POST /auth/login`, `POST /auth/register` |
| `mutationLimiter` | 30 req / 10 min | Order creation, reservations, profile updates, favorites |
| `apiLimiter` | 200 req / 10 min | Menu reads, order history, profile reads |

When a limit is exceeded the API returns:
```json
{ "success": false, "message": "Too many requests...", "data": null }
```
with HTTP status **429** and standard `RateLimit-*` headers.

---

## 🗄️ Database Schema

| Model | Key Fields |
|---|---|
| `User` | id, name, email, phone, password, role, addresses (JSON) |
| `MenuItem` | id, name, price, category, image, special, rating |
| `Order` | id, userId, status, totalAmount, items[] |
| `OrderItem` | orderId, menuItemId, quantity, price |
| `Reservation` | id, userId?, name, email, date, time, guests, status |
| `Favorite` | userId, menuItemId (unique pair) |

---

## 📡 API Reference

Full Swagger docs available at `/api-docs` when the backend is running.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | ❌ | Register a new user |
| POST | `/api/auth/login` | ❌ | Login and receive JWT |
| GET | `/api/auth/me` | ✅ | Get current user |
| GET | `/api/menu` | ❌ | List all menu items (filterable by category) |
| GET | `/api/menu/:id` | ❌ | Get single menu item (supports slug lookup) |
| POST | `/api/orders` | ✅ | Place a new order |
| GET | `/api/orders/my-orders` | ✅ | Get current user's orders |
| POST | `/api/reservations` | ❌ | Create a reservation (guests allowed) |
| GET | `/api/users/profile` | ✅ | Get user profile |
| PUT | `/api/users/profile` | ✅ | Update user profile |
| GET | `/api/users/favorites` | ✅ | List saved dishes |
| POST | `/api/users/favorites/toggle` | ✅ | Toggle a dish as favourite |

---

## 🧪 Running Tests

```bash
cd backend
npm test
```

---

## 🐳 Docker (optional)

```bash
cd backend
docker-compose up --build
```

---

## 📜 License

MIT © 2026 REFINED Culinary Group