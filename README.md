# 📰 News Aggregation System

A full-stack automated news aggregation system that fetches, stores, and displays news articles with advanced filtering.

## 🔗 Live Demo
- **Frontend:** https://client-flame-rho-64.vercel.app
- **Backend:** https://news-aggregation-system-server.onrender.com

## 🛠 Tech Stack
- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Data Source:** NewsData.io API

## ✨ Features
- Auto fetches news every 6 hours via cron job
- Stores articles in MongoDB (no duplicates)
- Filter by Date Range, Author, Language, Country, Category, Content Type
- Fully decoupled frontend from third-party API

## 🚀 Run Locally

### Backend
```bash
cd server
npm install
node index.js
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## 🔑 Environment Variables (.env)
```
DB_USERNAME=your_mongodb_username
DB_PASSWORD=your_mongodb_password
NEWS_API_KEY=your_newsdata_api_key
PORT=5000
```