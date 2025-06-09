# 🧠 CyberBot - RAG Based Chat Bot
## CyberBot is a RAG (Retrieval-Augmented Generation) based chatbot that intelligently answers questions only based on the PDF documents preloaded in the backend. This ensures it does not hallucinate or respond with unrelated information outside the provided content.

### 🔐 Limited memory scope to company documents

### ⚙️ Built with FastAPI for backend

### 💬 Interactive ReactJS frontend

### 📚 Backend uses LangChain + Gemini for document-aware chat

# 📂 Project Structure
Chat_bot/
├── backend/
│   ├── main.py
│   ├── load_data.py
│   └── ...
├── frontend/
│   ├── src/
│   └── ...
├── data/
│   └── hr_document.pdf
└── README.md

# 🛠️ Tech Stack
| Layer    | Technology            |
| -------- | --------------------- |
| Backend  | FastAPI (Python 3.13) |
| Frontend | ReactJS (npm 20.17.0) |
| LLM      | Gemini via LangChain  |
| Data     | Local HR PDFs         |


# 🚀 Installation
## 🔧 Prerequisites
  ### Python 3.13+
  ### Node.js + npm (20.17.0+)
  ### Git
