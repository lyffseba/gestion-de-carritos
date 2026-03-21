# Kids Rides Management - Architecture & Best Practices

Based on research into the latest (2025/2026) best practices for headless e-commerce storefronts using Next.js 15 App Router.

## Core Fundamentals (Next.js 15 App Router)

1. **Server Components (RSCs) by Default**
   - **Why:** Zero JavaScript shipped to the client for these components. Better SEO, faster Time to Interactive (TTI), and direct access to backend resources (APIs, databases).
   - **Usage:** Fetching catalog data, product details, layouts, header/footer shells.
2. **Client Components (`"use client"`)**
   - **Why:** Necessary for interactivity and browser APIs.
   - **Usage:** Add to cart buttons, shopping cart flyout, product image carousels, faceted search filters, and authentication forms.
   - **Rule:** Push `"use client"` down the component tree as far as possible (leaf nodes) to maximize the amount of the page rendered on the server.

## Data Fetching & Caching Strategy

Next.js 15 provides granular caching control, moving away from page-level `getServerSideProps`/`getStaticProps`.

1. **`fetch` API Caching**
   - By default, Next.js caches `fetch` requests during build time.
   - **Static Data (Product Catalog):** Use `{ cache: 'force-cache' }` (or rely on default) and implement Incremental Static Regeneration (ISR) with `export const revalidate = 3600;` to keep the catalog fast but fresh.
   - **Dynamic Data (Cart/User Session):** Use `{ cache: 'no-store' }` to ensure fresh data on every request.
2. **Parallel Fetching**
   - Initiate requests concurrently using `Promise.all()` to prevent waterfalls.
   - **Example:** Fetching a product, related products, and reviews at the same time in a single Server Component.
3. **Partial Prerendering (PPR)**
   - Delivers an ultra-fast static shell (nav, footer, layout) instantly, while streaming in the dynamic bits (cart count, personalized recommendations) via `<Suspense>`.

## State Management

1. **Global Server State:** Data fetching state is handled inherently by Next.js App Router (RSCs + `fetch` caching).
2. **Global Client State (Zustand):** Since carts need to persist across routes and tabs, we will use a lightweight client-side state manager like **Zustand**. A Context Provider will inject it at the root of the client component tree.
3. **Local State:** Standard `useState`/`useReducer` in individual Client Components.

## SEO & Metadata

1. **Dynamic Metadata:** Use `generateMetadata` in Server Components (`page.tsx`) to dynamically generate titles, descriptions, canonical URLs, and OpenGraph tags for products and collections.
2. **JSON-LD Structured Data:** Inject schema.org JSON-LD via the `next/script` or a plain `<script type="application/ld+json">` tag for Rich Snippets (Product Ratings, Price, Availability).
3. **Next.js 15.2+ Metadata Gotcha:** Ensure metadata streaming doesn't break crawler parsers. Some configurations require disabling streaming `strictNextHead: true` in `next.config.js` to ensure metadata is parsed flawlessly by legacy bots.

## Next Steps for the Codebase

1. Install `zustand` for cart state management.
2. Set up a placeholder Server Actions folder (`src/app/actions/`) for mutations (addToCart, checkout).
3. Implement `Suspense` boundaries in the `src/app/layout.tsx` and `src/app/page.tsx` for optimal streaming.
