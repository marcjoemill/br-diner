import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)

print(f"API Key found: {api_key[:5]}...{api_key[-5:] if api_key else 'None'}")

try:
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash",
        system_instruction="You are a helpful assistant."
    )
    
    history = [
        {"role": "user", "parts": ["Hi"]},
        {"role": "model", "parts": ["Hello there!"]}
    ]
    
    chat = model.start_chat(history=history)
    response = chat.send_message("How are you?")
    print("Response successful:")
    print(response.text)
except Exception as e:
    print(f"Error occurred: {e}")
