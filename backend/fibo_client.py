import json
from pathlib import Path
from typing import Dict, Any, List
import requests
import random

from .settings import BRIA_API_BASE_URL, BRIA_API_KEY

LOG_DIR = Path(__file__).resolve().parent / "logs"
LOG_DIR.mkdir(parents=True, exist_ok=True)


class FiboClientError(Exception):
    pass


def build_prompt(data: Dict[str, Any]) -> str:
    parts = []

    if data.get("surprise_me"):
        parts.append(
            random.choice([
                "cinematic cyberpunk city at night",
                "epic fantasy landscape",
                "futuristic sci-fi interior",
                "moody noir alleyway",
                "dreamlike surreal environment"
            ])
        )

    if data.get("text_prompt"):
        parts.append(data["text_prompt"])

    scene = data.get("scene") or {}
    camera = data.get("camera") or {}
    lighting = data.get("lighting") or {}
    colors = data.get("colors") or {}

    if scene:
        parts.append(f"{scene.get('type','')} scene")
        parts.append(f"mood {scene.get('mood','')}")

    if camera:
        parts.append(f"camera angle {camera.get('angle','cinematic')}")

    if lighting:
        parts.append(f"{lighting.get('type','dramatic')} lighting")

    if colors:
        parts.append(f"color palette {colors.get('palette','rich')}")

    if data.get("hdr"):
        parts.append(
            "HDR, high dynamic range, cinematic lighting, realistic exposure, ultra detailed"
        )

    if data.get("view_360"):
        parts.append(
            "wide panoramic view, immersive environment, spherical perspective"
        )

    return ", ".join(parts)


def generate_with_fibo(
    structured_prompt: Dict[str, Any],
    seed: int = 5555,
    aspect_ratio: str = "16:9",
    log_name: str = "fibo_response.json"
) -> Dict[str, Any]:

    url = f"{BRIA_API_BASE_URL}/image/generate"
    prompt_text = build_prompt(structured_prompt)

    payload = {
        "prompt": prompt_text,
        "seed": seed,
        "aspect_ratio": aspect_ratio,
        "sync": True
    }

    headers = {
        "Content-Type": "application/json",
        "api_token": BRIA_API_KEY
    }

    resp = requests.post(url, headers=headers, json=payload, timeout=120)

    if resp.status_code != 200:
        raise FiboClientError(resp.text)

    data = resp.json()

    with (LOG_DIR / log_name).open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return data


def extract_image_urls(response: Dict[str, Any]) -> List[str]:
    if "result" in response and "image_url" in response["result"]:
        return [response["result"]["image_url"]]
    return []
