# backend/fibo_client.py
import json
from pathlib import Path
from typing import Dict, Any, List

import requests

from .settings import BRIA_API_BASE_URL, BRIA_API_KEY

LOG_DIR = Path(__file__).resolve().parent / "logs"
LOG_DIR.mkdir(parents=True, exist_ok=True)


class FiboClientError(Exception):
    """Custom exception for FIBO-related errors."""
    pass


def generate_with_fibo(structured_prompt: Dict[str, Any],
                       seed: int = 5555,
                       aspect_ratio: str = "16:9",
                       log_name: str = "fibo_response.json") -> Dict[str, Any]:
    """
    Send a JSON structured prompt to Bria's FIBO-based v2 `/image/generate` endpoint
    and return the raw JSON response.

    This is a *template* based on the public docs – your backend teammate
    should tweak fields to match the exact API schema.
    """
    url = f"{BRIA_API_BASE_URL}/image/generate"

    # Payload shape is based on the v2 docs (prompt OR structured_prompt). :contentReference[oaicite:1]{index=1}
    payload: Dict[str, Any] = {
        "prompt": None,                 # we control everything via structured_prompt
        "structured_prompt": structured_prompt,
        "seed": seed,
        "aspect_ratio": aspect_ratio,
        "sync_mode": True               # ask API to return image directly if supported
    }

    headers = {
        "Authorization": f"Bearer {BRIA_API_KEY}",
        "Content-Type": "application/json"
    }

    resp = requests.post(url, headers=headers, json=payload, timeout=120)

    if resp.status_code != 200:
        raise FiboClientError(
            f"FIBO API error {resp.status_code}: {resp.text[:500]}"
        )

    data = resp.json()

    # 🔐 optional: save logs / full response for debugging
    log_path = LOG_DIR / log_name
    with log_path.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return data


def extract_image_urls(response: Dict[str, Any]) -> List[str]:
    """
    Given the FIBO response JSON, return a list of image URLs.

    Your teammate must adjust the keys once they see the real API output.
    For example, it might look like:
        response["data"]["images"][0]["url"]
    or
        response["images"][0]["url"]
    """
    urls: List[str] = []

    # These are just common patterns – backend dev should print(response) and adjust.
    if "images" in response:
        for img in response["images"]:
            if isinstance(img, dict) and "url" in img:
                urls.append(img["url"])
    elif "data" in response and isinstance(response["data"], dict):
        imgs = response["data"].get("images", [])
        for img in imgs:
            if isinstance(img, dict) and "url" in img:
                urls.append(img["url"])

    return urls
