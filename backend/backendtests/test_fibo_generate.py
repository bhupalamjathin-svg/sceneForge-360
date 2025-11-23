# backend/tests/test_fibo_generate.py
import json
from pathlib import Path

from backend.fibo_client import generate_with_fibo, extract_image_urls

BASE_DIR = Path(__file__).resolve().parents[2]
EXAMPLES_DIR = BASE_DIR / "examples"


def test_forest_example():
    """Simple manual test: run once from CLI, not a strict unit test."""
    example_path = EXAMPLES_DIR / "scene_forest_hdr.json"
    with example_path.open("r", encoding="utf-8") as f:
        structured_prompt = json.load(f)

    response = generate_with_fibo(structured_prompt, log_name="forest_example.json")
    urls = extract_image_urls(response)

    print("Got URLs:", urls)
    assert isinstance(response, dict)
    # urls may be empty if key names differ – adjust once you see real API output.


if __name__ == "__main__":
    test_forest_example()
