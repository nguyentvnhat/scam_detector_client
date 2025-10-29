# ChongLuaDao.AI

A community AI platform to detect scam voices through audio analysis.

## Tech Stack

- React + TypeScript
- Vite
- TailwindCSS
- React Router
- Axios
- Framer Motion

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── pages/
│   ├── Landing.tsx      # Landing page with hero and features
│   ├── Login.tsx        # Email login page
│   └── Dashboard.tsx    # Main dashboard with file upload and analysis
├── components/
│   ├── Navbar.tsx       # Navigation bar
│   ├── Footer.tsx       # Footer component
│   ├── FileUploader.tsx # File upload component with drag & drop
│   └── ResultCard.tsx   # Analysis result display component
├── utils/
│   ├── api.ts          # Mock API for audio analysis
│   └── auth.ts         # LocalStorage authentication utilities
├── App.tsx             # Main app with routing
└── main.tsx            # Entry point
```

## Features

- 🎤 Voice to text conversion
- 🔍 Scam pattern detection
- 📊 Risk score evaluation
- 🔐 Simple email-based authentication (localStorage)
- 📱 Responsive design
- ✨ Smooth animations with Framer Motion

## Deployment

This project is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import project in Vercel
3. Vercel will auto-detect Vite and configure build settings
4. Deploy!

