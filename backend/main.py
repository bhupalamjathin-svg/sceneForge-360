from pathlib import Path
import uuid
import shutil
import requests
import zipfile
from typing import Any, Dict, List, Optional
from fastapi import FastAPI, HTTPException, Body
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from urllib.parse import urlparse

from .auth_routes import router as auth_router
from fibo_client import generate_with_fibo, extract_image_urls

app = FastAPI(title="SceneForge 360 Backend")
app.include_router(auth_router)

BASE_DIR = Path(__file__).resolve().parent.parent
OUTPUT_DIR = BASE_DIR / "output"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

app.mount("/output", StaticFiles(directory=OUTPUT_DIR), name="output")


# ---------- REQUEST MODEL ----------
class GenerationRequest(BaseModel):
    text_prompt: Optional[str] = None
    surprise_me: Optional[bool] = False

    scene: Optional[Dict[str, Any]] = None
    camera: Optional[Dict[str, Any]] = None
    lighting: Optional[Dict[str, Any]] = None
    colors: Optional[Dict[str, Any]] = None

    aspect_ratio: Optional[str] = "16:9"
    hdr: Optional[bool] = False
    view_360: Optional[bool] = False
    variants: Optional[int] = 1


# ---------- HELPERS ----------
def make_job_folder() -> Path:
    job_id = uuid.uuid4().hex[:8]
    folder = OUTPUT_DIR / f"job_{job_id}"
    folder.mkdir(parents=True, exist_ok=True)
    return folder


def save_images(urls: List[str], folder: Path) -> List[str]:
    files = []
    for i, url in enumerate(urls):
        ext = Path(urlparse(url).path).suffix or ".png"
        file_path = folder / f"variant_{i+1}{ext}"
        r = requests.get(url, timeout=60)
        r.raise_for_status()
        file_path.write_bytes(r.content)
        files.append(str(file_path))
    return files


def zip_folder(folder: Path) -> Path:
    zip_path = folder.with_suffix(".zip")
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in folder.iterdir():
            if f.is_file():
                zf.write(f, f.name)
    return zip_path


# ---------- GENERATE ----------
@app.post("/generate")
def generate(req: GenerationRequest):
    try:
        job_folder = make_job_folder()
        all_files = []

        for i in range(req.variants):
            payload = req.dict()

            fibo_response = generate_with_fibo(
                payload,
                aspect_ratio="2:1" if req.view_360 else req.aspect_ratio,
                log_name=f"variant_{i}.json"
            )

            urls = extract_image_urls(fibo_response)
            all_files.extend(save_images(urls, job_folder))

        zip_file = zip_folder(job_folder)

        return {
            "status": "ok",
            "job_id": job_folder.name.replace("job_", ""),
            "preview": all_files[0] if all_files else "",
            "files": all_files,
            "zip": str(zip_file)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ---------- DELETE ----------
@app.delete("/delete-job")
def delete_job(job_id: str = Body(..., embed=True)):
    folder = OUTPUT_DIR / f"job_{job_id}"
    zip_file = OUTPUT_DIR / f"job_{job_id}.zip"

    if not folder.exists():
        raise HTTPException(status_code=404, detail="Job not found")

    shutil.rmtree(folder)
    if zip_file.exists():
        zip_file.unlink()

    return {"message": "Scene deleted"}


@app.get("/health")
def health():
    return {"status": "ok"}
