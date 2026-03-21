# Google Cloud Platform (GCP) Infrastructure

Kids Rides Management is fully integrated with Google Cloud services, managed entirely via the terminal (Google Cloud Shell or local `gcloud` CLI) for Infrastructure as Code (IaC) and deployments.

## Core GCP Architecture

1. **Frontend Hosting (Next.js 15 App Router)**
   - **Service:** Netlify
   - **Why:** Netlify provides a seamless developer experience, native support for Next.js App Router (via its v5 runtime plugin), and zero-configuration Edge functions. It easily connects to GitHub and scales automatically with an incredible free tier.
   - **Deployment:** Handled via Netlify CLI and continuous deployment through GitHub/Netlify linkage.

2. **Database & Data Storage**
   - **Catalog & Orders:** Serverless PostgreSQL (Neon.tech or Supabase). To maintain **strictly $0/month costs**, we are bypassing Google Cloud SQL (which has a minimum $9/mo cost) and using a serverless Postgres provider with a perpetual free tier. We still interact with it using **Drizzle ORM** for maximum type-safety, but the hosting is 100% free.
   - **Product Media:** Google Cloud Storage (GCS) buckets for all images, served via Cloud CDN (heavily leveraging the 5GB free tier).
   - **Session & Caching (State):** Next.js Native Caching and Local Storage (Zustand). Strictly $0 cost.

3. **Event-Driven Async Systems**
   - **Message Broker:** Google Cloud Pub/Sub
   - **Why:** Essential for decoupled e-commerce workflows. For example, when an order is placed, a Pub/Sub event is triggered. Background Cloud Functions or detached Cloud Run workers listen to these events to process payments, send confirmation emails, and update inventory independently without blocking the user's checkout flow.

4. **Authentication & User Sessions**
   - **Service:** Firebase Authentication (Google Identity Platform)
   - **Why:** Seamless Google sign-in integration, secure session management, and JWT validation.

5. **Analytics & Logging**
   - **Logs:** Cloud Logging
   - **Traffic & Events:** Google Analytics 4 (GA4) + Google Tag Manager.

## Terminal Cloud Management (Cloud Shell)

To deploy and manage this infrastructure, we use the `gcloud` CLI. You can run these commands directly in [Google Cloud Shell](https://shell.cloud.google.com/).

### Initialization Script

A `gcp-setup.sh` script is provided in the root directory to automatically provision the required resources:

1. Enable necessary APIs (Cloud Run, Cloud Build, Cloud SQL).
2. Create the Cloud Storage buckets.
3. Set up the IAM service accounts.
