# 🚀 AdScribe - AI-Powered Advertising Dashboard

Welcome to AdScribe, a modern advertising campaign management platform!  
This project demonstrates a sleek **Advertising Campaign Dashboard**, built with **React**, **Tailwind CSS**, and powered by **AI** using the lightweight `tinydolphin` model via **Ollama**.  

Create, manage, and analyze your ad campaigns with an intuitive interface and AI-powered copywriting assistance. 🎯

## 🌐 Live Demo

**Demo Link:** [Ad Scribe](https://alemx-ad-scribe.netlify.app)

> ⚠️ **Important Note:** The live demo does not include AI copywriting features as Ollama requires local installation. For full functionality including AI features, please clone and run the project locally following the setup instructions below.

## ⚡ Features

- 🔐 Secure Authentication System (Mock for Demo purposes)
- 📊 Interactive Analytics Dashboard with:
  - Campaign Performance Metrics
  - Location Distribution Charts
  - Click-Through Rate Analysis
- 🎯 Campaign Management:
  - Create & View Campaigns
  - Target Audience Selection
  - Image Banner Upload Support
- 🤖 AI-Powered Ad Copy Generation
- 📱 Responsive Design for Mobile & Desktop

## 🛠️ Tech Stack

- **Frontend:**
  - React + TypeScript
  - Tailwind CSS
  - Shadcn/ui Components
  - React Router for Navigation
  - React Query for Data Management
  - Recharts for Analytics Visualization
- **AI Integration:**
  - Ollama for Local AI Inference
  - Tinydolphin Model for Ad Copy Generation
- **Data Storage:**
  - LocalStorage for Data Persistence
  - Context API for State Management

## 🏗️ How It Was Built

- 🧠 Brainstorming & prompt generation with ChatGPT

- 🎨 Frontend UI created using Lovable (prompt-based UI builder)

- 💻 Project cloned and polished using Cursor for:

    - Debugging

    - Functional improvements

    - Code cleanup and enhancements

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 16+
- npm or yarn
- Ollama (for AI features)

### 1. Clone the Repository

```bash
git clone https://github.com/cyborgsuh/ad-scribe-dashboard-ai.git
cd ad-scribe-dashboard-ai
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Access the app at http://localhost:8080

## 🤖 Setting Up AI Features

The AI ad copy generation requires Ollama running locally:

### 1. Install Ollama
Download and install from [ollama.com/download](https://ollama.com/download)

### 2. Start Ollama Server
```bash
ollama serve
```

### 3. Install Tinydolphin Model
```bash
ollama pull tinydolphin
```

## 🎮 Usage Guide

1. **Login:**
   - Use any email/password (mock authentication)

2. **Create Campaign:**
   - Click "Create Campaign" in sidebar
   - Fill in campaign details
   - Use AI to generate ad copy
   - Upload banner image (URL)
   - Set targeting options

3. **View Analytics:**
   - See campaign performance
   - Interactive charts and metrics
   - Location distribution analysis

4. **Manage Campaigns:**
   - View all campaigns on dashboard
   - Click to see detailed metrics
   - Track impressions and CTR

## 💡 Implementation Details

- **Authentication:** Mock system using React Context
- **Routing:** Protected routes with React Router
- **State Management:** Context API for campaigns and auth
- **UI Components:** Shadcn/ui for consistent design
- **Analytics:** Real-time charts with Recharts
- **AI Integration:** Local Ollama server with Tinydolphin model

## ⚠️ Important Notes

- This is a demo application - data persists in LocalStorage
- AI features require Ollama running locally
- For best experience, run locally (not deployed)

## 🙌 Contact

**Mohammed Suhaib**  
📧 mosuh64@gmail.com  
📱 +971 55 7833 261

## 🚀 Future Enhancements

- Backend Integration with Node.js/Express
- Real Authentication with JWT
- Database Integration (PostgreSQL/MongoDB)
- Real-time Analytics with WebSocket
- Campaign A/B Testing
- Advanced AI Features with GPT-4
- Email Notifications
- Multi-user Support with Roles
