# Kids Rides Management 🛍️

Welcome to the **Kids Rides Management** frontend repository! This project is built from the ground up using modern e-commerce best practices to ensure a highly scalable, performant, and maintainable retail platform.

## 🚀 Tech Stack Foundation

- **Framework:** [Next.js (App Router)](https://nextjs.org/) for hybrid static/server-rendered React applications.
- **Language:** [TypeScript](https://www.typescriptlang.org/) for end-to-end type safety.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **Linting & Formatting:** [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) configured for strict code quality.

## 📁 Project Architecture

Our folder structure is designed to separate concerns efficiently and scale cleanly.

```text
src/
├── app/                  # Next.js App Router endpoints, pages, and layouts
├── components/
│   ├── ui/               # Reusable, atomic UI components (buttons, inputs, etc.)
│   └── layout/           # High-level layout components (Header, Footer, Sidebar)
├── config/               # Environment constants, site config, and feature flags
├── hooks/                # Custom React hooks (e.g., useCart, useAuth)
├── lib/                  # Library wrappers and utility instances (e.g., fetchers, analytics)
├── services/             # API interaction layers and external service integrations
├── styles/               # Global CSS files and Tailwind configurations
├── types/                # Global TypeScript declarations and shared interfaces
└── utils/                # Pure helper functions and formatters
```

## 🛠️ Getting Started

First, install the required dependencies using `npm` (ensure you are using a modern Node.js version >= 18).

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📏 Retailer Best Practices Enforced

1. **Performance First:** Next.js allows us to statically generate pages (SSG) for high-performance product catalogs, and server-side render (SSR) dynamic content where needed.
2. **Component Isolation:** UI components are atomic and pure, ensuring they can be reused across different flows (e.g., product page, checkout, cart).
3. **Strict Typing:** TypeScript ensures predictable code and reduces runtime exceptions for complex states like carts or checkouts.
4. **Standardized Formatting:** Prettier enforces consistent code style automatically.

## 📦 Next Steps

- Integrate a state management solution (e.g., Zustand or Redux Toolkit) depending on cart complexity.
- Connect to an eCommerce backend (e.g., Medusa, Shopify Storefront API, or custom).
- Set up automated unit testing (Jest/Vitest + React Testing Library) and E2E testing (Playwright).
