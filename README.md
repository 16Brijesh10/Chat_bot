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

# 🖥️ Backend Setup (FastAPI)
## 1.Clone the Repository
git clone https://github.com/16Brijesh10/Chat_bot.git
cd Chat_bot/backend

## 2.Create Virtual Environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

## 3.Install Dependencies
pip install -r requirements.txt

## 4.Add PDF Documents
Place your HR PDFs in the backend/data/ folder.

## 5.Run the Backend
uvicorn main:app --reload
if vritual environment use -
pipenv run uvicorn main:app --reload


