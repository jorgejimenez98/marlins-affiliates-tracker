# 🐬 Marlins Affiliates Tracker

Track the upcoming and recent games of the **Miami Marlins** and their **minor league affiliates** in a clean, responsive interface.

🌐 [Live Demo](https://marlins-affiliates-tracker.vercel.app)

---

## 🚀 Features

- Affiliate-based filtering
- Game status grouping (Scheduled, In Progress, Final)
- Mobile-first responsive UI
- PWA support
- Multilanguage for English and Spanish
---

## 📸 Previews

| Desktop | Mobile | VS MLB Real Time Data |
|-----------------|----------------| --------------------- |
| ![Desktop View](/public/docs/desktop.png) | ![Mobile View](/public/docs/mobile.png) | ![Mobile View](/public/docs/vs-mlb-data.jpg) |

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Tank Stank Query](https://tanstack.com/query/v5/docs/framework/react/overview)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [Vercel](https://vercel.com/)

---

## 🧰 Requirements

Before you begin, ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | `v24.0.0` | [Download Node.js](https://nodejs.org/en/download/current) |
| pnpm | `v10.14.0` | [Install pnpm](https://pnpm.io/installation) |

---

## ⚙️ Environment Variables

Copy the `.env.example` file and rename it to `.env`. Then fill in any required values:

```bash
cp .env.example .env
```

---

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start the development server**
   ```bash
   pnpm dev
   ```

3. **Open your browser**
   
   Navigate to [http://localhost:5173](http://localhost:5173) to view the application.

---

## 📱 PWA Installation

This application can be installed as a Progressive Web App (PWA) for a native app-like experience:

1. **Desktop (Chrome/Edge)**:
   - Click the install icon in the address bar
   - Or go to Settings → Install App

2. **Mobile (iOS Safari)**:
   - Tap the Share button
   - Select "Add to Home Screen"

3. **Mobile (Android Chrome)**:
   - Tap the menu (three dots)
   - Select "Add to Home Screen"

Once installed, you can access the app directly from your home screen and use it offline.

---

## 🧪 Mock Data

If you're testing the application and the selected date doesn't have games in all states (Scheduled, In Progress, Final), you can enable mock data:

1. Set the environment variable in your `.env` file:
   ```bash
   VITE_MOCK_DATA_ENABLED=true
   ```

2. Restart the development server:
   ```bash
   pnpm dev
   ```

This will populate the interface with sample games in different states, allowing you to see all features in action.

