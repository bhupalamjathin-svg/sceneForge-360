<<<<<<< HEAD
📘 SceneForge 360 — AI-Controlled Scene Generator (Using FIBO)

SceneForge 360 is a next-generation JSON-native AI image generation tool that allows developers, artists, and game designers to generate fully controllable 2D and 360° environments using the FIBO visual foundation model.

It provides:

🎛️ Full camera, lighting, color & environment control

🌅 HDR + 16-bit EXR rendering support

🌐 360° multi-angle scene generation

🎨 Game-ready export packs

🧩 JSON-first pipeline for precise, predictable outputs

🚀 Features
🟦 1. Scene Builder Interface

Users can choose:

Scene Type (forest, dungeon, city, etc.)

Lighting presets (HDR, sunset, neon, etc.)

Camera controls (FOV, angle, distance)

Color styles (cyberpunk, natural green, warm fantasy)

Variations (low/medium/high)

360° mode toggle

🟩 2. JSON-Native Control

Every UI action updates a live JSON preview.
Backend sends FIBO a clean, predictable JSON structure.

🔵 3. 360° Mode

Generates images for angles:

front, front_right, right, back_right, back,
back_left, left, front_left, top, low_angle


Supports drag-to-rotate viewer.

🟧 4. HDR + 16-bit EXR

Perfect for game production pipelines.

🟪 5. Export Packs

PNG/EXR

ZIP with metadata

Auto file naming

🗂️ Project Structure
sceneForge/
│
├── schema/
│   ├── schema.json
│   ├── defaults.json
│
├── presets/
│   ├── camera_presets.json
│   ├── lighting_presets.json
│   ├── environment_presets.json
│   ├── color_presets.json
│   ├── render_presets.json
│   └── 360_angles.json
│
├── examples/
│   ├── scene_forest_hdr.json
│   ├── scene_city_sunset.json
│   ├── scene_dungeon_night.json
│
└── docs/
    ├── variation.md
    ├── 360_logic.md
    └── tuning.md

⚙️ Backend (FastAPI) — How to Run
uvicorn main:app --reload


Endpoints:

/generate

/generate360

Backend:

Loads schema + presets

Merges defaults

Applies variation logic

Sends JSON → FIBO

Returns images

🎨 Frontend (React + Tailwind)

Features:

Modern glass UI

Scene controls

JSON Live Preview

Image grid

360° viewer

Save Scene

Login / Register

🧪 Testing (Examples)

Use these JSONs to test backend:

examples/scene_forest_hdr.json
examples/scene_city_sunset.json
examples/scene_dungeon_night.json

🎥 Demo Video (Hackathon Submission)

Show:

Login page

Main editor

User entering a scene description

JSON updating automatically

Generate button

360 mode demo

Export pack download

🏆 Team

Teammate 1 (Backend) — API, FIBO integration

Teammate 2 (Frontend) — UI/UX

Teammate 3 (You) — Schema, presets, 360 logic, documentation

Teammate 4 — Exporting & file management

Teammate 5 — Demo video + presentation
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
>>>>>>> 4c3e0ee63703ab99b639deeaceb84997f8735192
