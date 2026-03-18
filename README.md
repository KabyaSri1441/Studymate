# 📚 StudyMate - AI-Powered Text Summarization System

An intelligent web application that helps students summarize academic content instantly using deep learning.

## 🚀 Tech Stack
- **Frontend:** React.js
- **Backend:** Java Spring Boot
- **AI Service:** Python FastAPI
- **NLP Model:** facebook/bart-large-cnn (Hugging Face Transformers)
- **Database:** MySQL
- **Build Tool:** Maven

## ⚙️ How to Run

### AI Service
cd BACKEND/ai-service
pip install fastapi uvicorn transformers torch sentencepiece
uvicorn main:app --reload

### Backend
cd BACKEND/backend
./mvnw spring-boot:run

### Frontend
cd BACKEND/frontend
npm install
npm start

## 📌 Features
- Abstractive text summarization using BART model
- Three-tier microservice architecture
- Clean side-by-side input and output UI
- Processes 100+ word paragraphs into concise 3-4 sentence summaries