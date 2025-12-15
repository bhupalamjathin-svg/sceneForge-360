🌐 SceneForge 360 — Full 360° Generation Logic

This document explains how the 360 mode works, which angles to generate, and how frontend + backend should coordinate to produce seamless 360° scenes.

🧭 360 Angle List

These angles come from presets/360_angles.json:

front
front_right
right
back_right
back
back_left
left
front_left
top
low_angle


These cover all major camera rotations needed for a smooth 360° experience.

🛠 Backend Responsibilities

When user enables 360 Mode:

Load the base JSON request

Loop through all angles in 360_angles.json

Apply each angle to the camera.angle field

Optionally apply variations if user selected them

Generate one image per angle

Return results in correct order:

{
  "360_results": [
    {"angle": "front", "image": "..."},
    {"angle": "front_right", "image": "..."},
    {"angle": "right", "image": "..."},
    ...
  ]
}

🎛 Frontend Responsibilities
✔ Display angles in a carousel OR 360 viewer
✔ Allow user to rotate freely
✔ If clicked on an angle → show its image
✔ Preload neighboring angles for smooth experience

(front → front_right, left → front_left)

🔍 Camera Angle Mapping Details
Angle	Meaning
front	camera faces subject normally
front_right	rotate camera 30° right
right	rotate camera 90° right
back_right	rotate camera 135° right
back	rotate camera 180°
back_left	rotate camera 225°
left	rotate camera 270°
front_left	rotate camera 315°
top	aerial shot
low_angle	camera tilts upward from ground

Backend uses this mapping to set camera.angle text or numeric rotation.

🧠 Recommended Implementation for Backend
A simple rotation mapping backend can use:
{
  "front": 0,
  "front_right": 45,
  "right": 90,
  "back_right": 135,
  "back": 180,
  "back_left": 225,
  "left": 270,
  "front_left": 315,
  "top": "top_down",
  "low_angle": "low_up"
}


Backend will interpret top and low_angle specially.

🔥 How to Execute a Full 360 Pass

Get base user JSON

For each angle, copy the base JSON

Set camera.angle = angle_name

Send to FIBO

Save result

Continue until all angles complete

This generates a complete 360° visual set.

🚀 What This Enables
✔ 360 mode button in UI
✔ Drag-to-rotate camera views
✔ VR/AR compatibility
✔ Smooth preview just like Apple Vision Pro gallery
✔ Automatic 360° asset packs
🎉 END OF FILE