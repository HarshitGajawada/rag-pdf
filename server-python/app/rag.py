import chromadb
import requests
import os
from app.utils import extract_text_from_pdf
from dotenv import load_dotenv

load_dotenv()

chroma_client = chromadb.PersistentClient(path="chroma_db")
collection = chroma_client.get_or_create_collection("docs")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY environment variable is not set.")

def handle_gemini_error(data):
    if "error" in data:
        raise RuntimeError(f"Gemini API error: {data['error']}")
    return data

async def get_gemini_embedding(text):
    url = "https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent"
    response = requests.post(
        url,
        params={"key": GEMINI_API_KEY},
        json={"content": {"parts": [{"text": text}]}}
    )
    data = response.json()
    print("Gemini response:", data)
    handle_gemini_error(data)
    return data["embedding"]["values"]

async def process_pdf(file):
    text = await extract_text_from_pdf(file)
    # For demo, split by pages or implement your own chunking
    chunks = [text]
    for i, chunk in enumerate(chunks):
        embedding = await get_gemini_embedding(chunk)
        collection.add(
            documents=[chunk],
            embeddings=[embedding],
            ids=[f"chunk_{i}"]
        )
    return {"status": "uploaded", "chunks": len(chunks)}

async def answer_question(question):
    embedding = await get_gemini_embedding(question)
    results = collection.query(query_embeddings=[embedding], n_results=3)
    context = " ".join([doc for doc in results["documents"][0]])
    # Call Gemini for answer
    url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
    response = requests.post(
        url,
        params={"key": GEMINI_API_KEY},
        json={"contents": [{"parts": [{"text": f"Context: {context}\nQuestion: {question}"}]}]}
    )
    data = response.json()
    handle_gemini_error(data)
    return {"answer": data["candidates"][0]["content"]["parts"][0]["text"]}