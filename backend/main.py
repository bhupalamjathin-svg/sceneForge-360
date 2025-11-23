# backend/main.py
from pathlib import Path
import uuid
import requests
import zipfile
from typing import Any, Dict, List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .fibo_client import generate_with_fibo, extract_image_urls

# ------------------ Config ------------------
app = FastAPI(title="SceneForge 360 Backend")

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "output"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

SCHEMA_PATH = BASE_DIR / "schema" / "schema.json"
DEFAULTS_PATH = BASE_DIR / "schema" / "defaults.json"

# ------------------ Pydantic Model ------------------
class GenerationRequest(BaseModel):
    scene: Dict[str, Any]
    environment: Optional[Dict[str, Any]] = None
    camera: Optional[Dict[str, Any]] = None
    lighting: Optional[Dict[str, Any]] = None
    colors: Optional[Dict[str, Any]] = None
    render: Optional[Dict[str, Any]] = None
    variants: Optional[int] = 1  # fixed from Dict to int

# ------------------ Helper Functions ------------------
def make_job_folder() -> Path:
    job_id = uuid.uuid4().hex[:8]
    job_folder = OUTPUT_DIR / f"job_{job_id}"
    job_folder.mkdir(parents=True, exist_ok=True)
    return job_folder

def save_images_from_urls(urls: List[str], job_folder: Path) -> List[str]:
    saved_files = []
    for i, url in enumerate(urls):
        ext = Path(url).suffix or ".png"
        file_path = job_folder / f"variant_{i+1}{ext}"
        r = requests.get(url)
        r.raise_for_status()
        file_path.write_bytes(r.content)
        saved_files.append(str(file_path))
    return saved_files

def make_zip(folder: Path) -> Path:
    zip_path = folder.with_suffix(".zip")
    with zipfile.ZipFile(zip_path, 'w', compression=zipfile.ZIP_DEFLATED) as zf:
        for file in folder.iterdir():
            if file.is_file():
                zf.write(file, file.name)
    return zip_path

def get_preview(saved_files: List[str]) -> str:
    return saved_files[0] if saved_files else ""

# ------------------ Endpoints ------------------
@app.post("/generate")
def generate(req: GenerationRequest):
    try:
        all_saved_files = []
        job_folder = make_job_folder()

        # Generate variants
        for variant_index in range(req.variants):
            payload = dict(req.dict())
            payload['meta'] = {"variant_index": variant_index}

            fibo_response = generate_with_fibo(payload, log_name=f"variant_{variant_index}.json")
            urls = extract_image_urls(fibo_response)
            saved_files = save_images_from_urls(urls, job_folder)
            all_saved_files.extend(saved_files)

        preview = get_preview(all_saved_files)
        zip_file = make_zip(job_folder)

        return {
            "status": "ok",
            "preview": preview,
            "saved_files": all_saved_files,
            "zip": str(zip_file)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ------------------ Health Check ------------------
@app.get("/health")
def health():
    return {"status": "ok", "jobs_dir": str(OUTPUT_DIR)}
