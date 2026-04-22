import json
import os
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Google Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

class Message(BaseModel):
    role: str  # 'user' or 'assistant'
    text: str

class ChatRequest(BaseModel):
    query: str
    history: List[Message] = []

def get_business_context():
    # Load the JSON file dynamically so we always have the freshest data
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, "business.json")
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            return json.dumps(data, indent=2)
    except FileNotFoundError:
        return "{}"

@app.get("/")
def root():
    return {"message": "Backend running"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    # Check key here instead of on startup so server can still load
    if not api_key:
        raise HTTPException(
            status_code=500, 
            detail="GEMINI_API_KEY not configured. Please add it to your .env file in the backend directory."
        )
        
    context = get_business_context()
    
    # We use a semantic context injection instead of vector search because our dataset is very small (< 3KB).
    system_instruction = f"""You are a helpful and friendly chatbot for BR's Diner.
Use the following business information as your truth source to answer the user's questions:

<business_info>
{context}
</business_info>

Rules:
1. Always base your answers on the business_info provided above. Do not invent information.
2. If a question cannot be answered using this information, politely inform the user that you don't have those details and provide the contact information.
3. Be friendly and consider the chatbot_behavior tone described in the JSON.
4. Keep the answers concise and easy to read.
"""
    
    try:
        # Convert frontend history format to Gemini format
        # Gemini roles: 'user', 'model'
        gemini_history = []
        for msg in request.history:
            gemini_history.append({
                "role": "user" if msg.role == "user" else "model",
                "parts": [msg.text]
            })

        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash",
            system_instruction=system_instruction
        )
        
        chat = model.start_chat(history=gemini_history)
        response = chat.send_message(request.query)
        
        return {"answer": response.text}
    except Exception as e:
        print(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))