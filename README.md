
# 🤖 PDF RAG Chatbot

> An intelligent chatbot that lets you upload any PDF and have a real conversation with it — powered by RAG (Retrieval-Augmented Generation), Pinecone Vector DB, and multiple switchable LLM models via OpenRouter.

![Tech Stack](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-red?style=for-the-badge&logo=nestjs)
![Pinecone](https://img.shields.io/badge/Pinecone-Vector_DB-green?style=for-the-badge)
![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-blue?style=for-the-badge)

<img width="946" height="410" alt="image" src="https://github.com/user-attachments/assets/9b0c21e5-9508-4cb8-a001-95792037d7a1" />
---

## ✨ Features

## ✨ Features

- 📄 **PDF Upload** — Drag & drop any PDF (up to 20MB)
- 🧠 **RAG Pipeline** — PDF is chunked, embedded, and stored in Pinecone vector database
- 💬 **Real-time Streaming** — Answers stream token by token like ChatGPT
- 🔄 **Dynamic Model Switching** — Choose between multiple free LLM models (Nemotron, Gemma, GPT-OSS) directly from the chat UI in real-time
- 🎯 **Context-Aware** — Answers strictly based on uploaded document
- 🚫 **Out-of-Scope Detection** — Politely rejects questions unrelated to the PDF
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop
- 🌙 **Premium Dark UI** — Clean, modern interface built with Tailwind CSS

---

## 🏗️ Architecture

```
User uploads PDF
       ↓
NestJS Backend receives file
       ↓
pdf-parse extracts text
       ↓
Text split into chunks (1000 tokens, 200 overlap)
       ↓
multilingual-e5-large embeds each chunk (1024-dim)
       ↓
Pinecone stores all vectors (unique namespace per PDF)
       ↓
User asks a question
       ↓
Question embedded → Pinecone similarity search (Top 4 chunks)
       ↓
Context + Question sent to selected LLM via OpenRouter
       ↓
Answer streams back to frontend in real-time (SSE)
```

<img width="624" height="433" alt="image" src="https://github.com/user-attachments/assets/a79df51d-dfab-434b-a414-990743f3222e" />



---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **Backend** | NestJS, TypeScript |
| **AI / LLM** | Google Gemma (via OpenRouter) |
| **Embeddings** | multilingual-e5-large (Xenova/Transformers.js) |
| **Vector DB** | Pinecone |
| **PDF Parsing** | pdf-parse |
| **Streaming** | Server-Sent Events (SSE) |

---

## 📁 Project Structure

```
pdf-rag-chatbot/
├── frontend/                   # Next.js App
│   ├── app/
│   │   ├── page.tsx            # Home "/"
│   │   ├── upload/page.tsx     # Upload PDF "/upload"
│   │   └── chat/[namespace]/   # Chat "/chat/:id"
│   ├── components/
│   │   ├── chat/               # ChatWindow, MessageBubble, Input
│   │   ├── pdf/                # PDFUploader
│   │   └── ui/                 # Sidebar
│   └── hooks/                  # useChat, usePDFUpload
│
└── backend/                    # NestJS API
    └── src/
        ├── modules/
        │   ├── pdf/            # PDF upload & processing
        │   └── chat/           # RAG query & SSE streaming
        └── services/
            ├── langchain/      # RAG pipeline & embeddings
            ├── pinecone/       # Vector DB operations
            └── gemini/         # LLM integration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Pinecone account (free tier)
- OpenRouter account (free tier)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/razazaheer12/pdf-rag-chatbot.git
cd pdf-rag-chatbot
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/` folder:

```env
PORT=5000
GEMINI_API_KEY=your_openrouter_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=pdf-rag-index-v2
PINECONE_DIMENSION=1024
NODE_ENV=development
```

```bash
npm run start:dev
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env.local` file in `frontend/` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
npm run dev
```

### 4️⃣ Open in Browser

```
http://localhost:3000
```

---

## 🔄 How It Works

1. **Upload** — User uploads a PDF on `/upload` page
2. **Processing** — Backend parses, chunks, and embeds the PDF into Pinecone
3. **Chat** — User is redirected to `/chat/[namespace]` page
4. **Model Selection** — User picks an LLM model from the dropdown (switchable anytime)
5. **Query** — User asks a question; backend retrieves top 4 relevant chunks
6. **Answer** — Selected LLM generates a context-aware answer, streamed in real-time

---

## 📸 Screenshots

> 🏠 Home Page

<img width="946" height="410" alt="image" src="https://github.com/user-attachments/assets/9b0c21e5-9508-4cb8-a001-95792037d7a1" />


> 📤 Upload Page

<img width="942" height="412" alt="image" src="https://github.com/user-attachments/assets/2fc11879-6ed9-463e-8388-7530d7a800d7" />


> 💬 Chat Page

<img width="952" height="413" alt="image" src="https://github.com/user-attachments/assets/2d73e7f9-0e5d-4b55-bedb-e6c6aab73c35" />

---

## ⚙️ Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port (default: 5000) |
| `GEMINI_API_KEY` | OpenRouter API key |
| `PINECONE_API_KEY` | Pinecone database API key |
| `PINECONE_INDEX_NAME` | Pinecone index name |
| `PINECONE_DIMENSION` | Embedding dimensions (1024) |
| `NEXT_PUBLIC_API_URL` | Backend URL for frontend |

---

## 🧠 RAG Pipeline Details

- **Chunk Size:** 1000 characters with 200 overlap
- **Embedding Model:** `multilingual-e5-large` (1024 dimensions)
- **Similarity Search:** Top-4 chunks retrieved per query
- **Similarity Threshold:** Score > 0.4 filtered
- **LLM Models (switchable via UI):**
  - `nvidia/nemotron-3-nano-30b-a3b:free` (Fast)
  - `google/gemma-4-31b-it:free`
  - `openai/gpt-oss-20b:free`
  - `nvidia/nemotron-3-super-120b-a12b:free` (Large)
  - `nvidia/nemotron-3-ultra-550b-a55b:free` (Most Powerful)
- **Streaming:** Server-Sent Events (SSE) for real-time token streaming

---

## 👨‍💻 Author

**Raza Zaheer**
- 🌐 Portfolio: [raza-zaheer-portfolio-web-developer.vercel.app](https://raza-zaheer-portfolio-web-developer.vercel.app)
- 💼 GitHub: [@razazaheer12](https://github.com/razazaheer12)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> ⭐ If you found this project helpful, please give it a star on GitHub!

