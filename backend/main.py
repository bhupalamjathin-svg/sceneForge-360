# backend/main.py
from pathlib import Path
from typing import Any, Dict, List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from .fibo_client import generate_with_fibo, extract_image_urls

app = FastAPI(title="SceneForge 360 Backend")

BASE_DIR = Path(__file__).resolve().parent.parent
SCHEMA_PATH = BASE_DIR / "schema" / "schema.json"
DEFAULTS_PATH = BASE_DIR / "schema" / "defaults.json"


class GenerationRequest(BaseModel):
    scene: Dict[str, Any]
    environment: Optional[Dict[str, Any]] = None
    camera: Optional[Dict[str, Any]] = None
    lighting: Optional[Dict[str, Any]] = None
    colors: Optional[Dict[str, Any]] = None
    render: Optional[Dict[str, Any]] = None
    variants: Optional[Dict[str, Any]] = None


def merge_with_defaults(user_json: Dict[str, Any]) -> Dict[str, Any]:
    """Merge user JSON with defaults.json (very simple deep merge)."""
    import json

    with DEFAULTS_PATH.open("r", encoding="utf-8") as f:
        defaults = json.load(f)

    def deep_merge(base: Dict[str, Any], override: Dict[str, Any]) -> Dict[str, Any]:
        out = dict(base)
        for k, v in override.items():
            if isinstance(v, dict) and isinstance(out.get(k), dict):
                out[k] = deep_merge(out[k], v)
            else:
                out[k] = v
        return out

    return deep_merge(defaults, user_json)


@app.post("/generate")
def generate(req: GenerationRequest):
    """
    Main endpoint for SceneForge 360.

    1. Merge user payload with defaults
    2. Send structured JSON to FIBO
    3. Return image URLs + raw response
    """
    try:
        merged = merge_with_defaults(req.dict())
        fibo_response = generate_with_fibo(merged, log_name="generate_single.json")
        urls: List[str] = extract_image_urls(fibo_response)
        return {
            "status": "ok",
            "image_urls": urls,
            "raw": fibo_response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
