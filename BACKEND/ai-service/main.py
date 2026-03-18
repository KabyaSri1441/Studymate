from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

summarizer = pipeline(
    "summarization",
    model="facebook/bart-large-cnn"
)

class TextIn(BaseModel):
    text: str


def clean_text(text: str):
    text = text.strip()
    text = " ".join(text.split())
    return text


def split_into_chunks(text: str, chunk_size: int = 200):
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
    return chunks


@app.post("/summarize")
def summarize_text(data: TextIn):

    text = clean_text(data.text)
    word_count = len(text.split())

    if word_count < 40:
        return {"summary": "Please provide a longer paragraph."}

    # For short-medium texts, summarize directly with tight constraints
    if word_count < 300:
        result = summarizer(
            text,
            max_length=80,
            min_length=40,
            do_sample=False,
            num_beams=4,
            length_penalty=1.0,
            no_repeat_ngram_size=4,
            early_stopping=True
        )
        summary = result[0]["summary_text"].strip()

    # For long texts, chunk it then summarize each chunk
    else:
        chunks = split_into_chunks(text, chunk_size=200)
        chunk_summaries = []

        for chunk in chunks:
            result = summarizer(
                chunk,
                max_length=80,
                min_length=20,
                do_sample=False,
                num_beams=4,
                no_repeat_ngram_size=4,
                early_stopping=True
            )
            chunk_summaries.append(result[0]["summary_text"].strip())

        # Summarize the chunk summaries into one final summary
        combined = " ".join(chunk_summaries)
        final = summarizer(
            combined,
            max_length=100,
            min_length=40,
            do_sample=False,
            num_beams=4,
            no_repeat_ngram_size=4,
            early_stopping=True
        )
        summary = final[0]["summary_text"].strip()

    return {"summary": summary}