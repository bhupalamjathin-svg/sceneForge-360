# backend/settings.py
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file if present
BASE_DIR = Path(__file__).resolve().parent
env_path = BASE_DIR / ".env"
if env_path.exists():
    load_dotenv(env_path)

# Bria / FIBO API (v2 image generation)
BRIA_API_BASE_URL = "https://engine.prod.bria-api.com/v2"
BRIA_API_KEY = os.getenv("BRIA_API_KEY")  # put this in .env

if not BRIA_API_KEY:
    raise RuntimeError(
        "Missing BRIA_API_KEY. Set it in a .env file or environment variable."
    )
