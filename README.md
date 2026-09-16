# Salary_Calc
An easy-to-use tool that assists in calculating the take-home annual salary, take-home monthly salary, total annual deductions, total monthly deductions, etc., of an individual.
# SalaryCalc

A production-ready, responsive full-stack web application for calculating global salary, CTC, taxes, deductions, and take-home pay.

## Features

- **Global Support:** Calculates taxes for India (New & Old Regimes), USA (Federal), and UK.
- **Modular Tax Engine:** Pure, deterministic tax calculation logic isolated from UI.
- **Real-Time Presence:** Features a live visitor count that updates in real-time across connected clients using WebSockets.
- **Modern UI:** "Precision Glass & Deep Space" aesthetic with dark/light themes, smooth transitions, and instant feedback.
- **Responsive:** Full grid support across desktop, tablet, and mobile.

## Prerequisites

- Node.js (v18+)
- npm

## Getting Started (Local Development)

This project uses a custom Next.js server (`server.mjs`) to handle both the Next.js application and the Socket.IO WebSocket server for the live visitor count.

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   This will start both Next.js and the WebSocket server on `http://localhost:3000`.

3. **Verify Real-Time Presence:**
   - Open `http://localhost:3000` in your browser.
   - Open a new incognito window or a different browser to the same URL.
   - Watch the "live visitors" count in the footer instantly increment and decrement as you open and close tabs.

## Production Deployment

### Option 1: Single-Instance Deployment (VPS, Railway, Render)
You can deploy the app exactly as it runs locally (using the custom `server.mjs`). This is suitable for a single-instance environment where all WebSocket connections terminate at the same server.

1. Build the application:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

### Option 2: Serverless Deployment (Vercel) + External Realtime (Supabase)
Next.js custom servers (`server.mjs`) **do not work** on serverless platforms like Vercel. If deploying to Vercel, you must extract the real-time presence to an external service like Supabase.

1. **Setup Supabase:**
   - Create a Supabase project.
   - Obtain your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

2. **Environment Variables (`.env.local`):**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Update `useLiveVisitorCount.ts`:**
   Modify the hook to use Supabase Realtime Channels instead of Socket.IO:
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   
   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
   )
   
   // Subscribe to a 'room' channel using Supabase Presence...
   ```

4. **Deploy:**
   Deploy the Next.js app to Vercel and it will connect directly to Supabase for presence updates.

## Architecture & Code Organization

- `/src/components/layout`: Contains standard layout components (Navbar, Footer, LiveVisitorCount).
- `/src/components/calculator`: The core UI for the salary calculator.
- `/src/components/ui`: Reusable design-system components (Card, Button).
- `/src/tax/engine`: Pure TS functions that calculate the tax breakdown.
- `/src/tax/datasets`: JSON/TS objects containing rules for each jurisdiction and tax year.
- `/server.mjs`: The custom Node.js server wrapping Next.js and Socket.IO.
