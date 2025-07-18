# 🏏 Cric Shorts – IPL Live Dashboard

A fully responsive IPL match tracker built with Next.js, Chakr UI, and TypeScript. It provides real-time-like information on live, upcoming, and completed matches using a deterministic algorithm to simulate data.

📅 **Last Updated:** 2025-07-18  
📁 **Repo:** [https://github.com/shivang-9357/cric-shorts](https://github.com/shivang-9357/cric-shorts)

---

## 🗂️ Folder Structure

- /app
- /all → Lists all matches (infinite scroll)
- /live → Shows currently live matches
- /upcoming → Matches yet to start
- /completed → Finished matches
- /api -> contains dummy API
- /components → Reusable UI components (cards,layout)
- /lib → Core logic: scoring, status, dummy data
- /public/logos → Team logos
- /types → TypeScript interfaces

🧠 The structure is **intuitive**, **modular**, and **scalable**—allowing easy expansion (e.g. adding filters, graphs, authentication, etc.).

---

## 🌐 Pages Overview

### 🔹 `/all`

- Shows **all 160 matches**
- Implements **infinite scrolling**
- Uses **server-side rendering (SSR)** for initial data
- Dynamically determines match status (`live`, `completed`, `upcoming`)

### 🔹 `/live`

- Shows matches currently **in progress**
- Fetches using SSR and periodic polling
- Description updates with chase details like:
  > _"MI need 45 runs in 28 balls"_

### 🔹 `/upcoming`

- Lists matches yet to start
- Displays venue, date and time
- Uses **server-side rendering (SSR)** for initial data
- Uses SSR for fast initial load

### 🔹 `/completed`

- Uses **server-side rendering (SSR)** for initial data
- Lists finished matches with results like:
  > _"CSK won by 7 wickets"_
- All data is deterministic and consistent across reloads

---

## ⚙️ Key Features & Best Practices

✅ **Server-Side Rendering (SSR)**

- All pages fetch initial data using SSR (`app/.../page.tsx`)
- Reduces time to first byte and improves SEO

✅ **Infinite Scroll**

- Implemented in `/all`,`/upcoming`,`/completed` using intersection observer
- Ensures performance on large datasets

✅ **Deterministic Simulation Engine**

- All scores, tosses, and statuses are generated using **pure mathematical logic**
- No random values = consistent, testable data

✅ **Code Splitting**

- Dynamic components (e.g. match cards) are code-split
- Only needed code is loaded per route

✅ **Chakra UI + Responsive UI**

- Mobile-first UI
- Theme-ready structure

---

## 🔌 Simulated API Overview

All data is powered by custom deterministic algorithms:

### `/api/matches`

- Returns 160 precomputed matches with team names, logos, and venues
- Dates are spaced realistically between **May 23 and August 11, 2025**

---

## 🚧 Limitations & Challenges

### ❗ IPLT20.com Scraping

> I initially attempted to scrape real-time data from [https://www.iplt20.com](https://www.iplt20.com), but the site loads content dynamically via JavaScript. Since server-side scraping with Cheerio/axios can only read static HTML, the actual match data wasn't accessible.

### 📊 Data Limitations

Due to the use of dummy data:

- No player-level stats
- No historical match graphs
- No live commentary or dynamic odds

These features could be added by integrating a live cricket API (e.g. SportRadar, CricAPI).

---

## 🧪 Getting Started (Local Development)

### 1. Clone the repo

```bash
git clone https://github.com/shivang-9357/cric-shorts.git
cd cric-shorts
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the app locally

```bash
npm run dev
```

---

## 👨‍💻 Author

Made with ❤️ by Shivang Yadav
