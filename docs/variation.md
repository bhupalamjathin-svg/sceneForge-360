🎚 SceneForge 360 — Variation Logic Guide

This document defines how diversity levels (low / medium / high) modify the JSON parameters sent to the FIBO engine.
These rules tell the backend exactly how much randomness to apply when generating multiple variants.

🔵 LOW Variation (Very Subtle Changes)

Used when the user wants images that look almost identical.

Behavior:

Very small camera changes

Very small lighting tweaks

Nearly identical color palette

Minimal randomness

Allowed Ranges:
{
  "camera_fov_jitter": 2,
  "lighting_jitter": 0.05,
  "color_shift": 0.02,
  "angle_shift": 1
}

🟡 MEDIUM Variation (Default Balanced Changes)

This is the recommended default — noticeable, but not extreme.

Behavior:

Medium camera changes

Lighting difference visible but not huge

Minor color adjustments

Slight randomness in angle

Allowed Ranges:
{
  "camera_fov_jitter": 5,
  "lighting_jitter": 0.1,
  "color_shift": 0.05,
  "angle_shift": 4
}

🔴 HIGH Variation (Very Different Images)

Used for creative, cinematic, experimental results.

Behavior:

Strong camera changes

Lighting becomes very different

Big color shifts

High randomness

Sometimes swaps presets (10–20% chance)

Allowed Ranges:
{
  "camera_fov_jitter": 12,
  "lighting_jitter": 0.2,
  "color_shift": 0.1,
  "angle_shift": 8
}

📊 Variation Summary Table
Diversity	Level of Change	Description
Low	Subtle	Barely noticeable differences
Medium	Normal	Balanced, interesting changes
High	Strong	Very noticeable & creative differences
⚙️ How Backend Should Apply Variation

When generating variants, backend should:

✔ 1. Read diversity level (low, medium, high)
✔ 2. Choose appropriate jitter rules
✔ 3. Apply randomness inside allowed ranges:
A) Camera Adjustments

FOV = base_fov ± jitter

Camera rotation = base_angle ± jitter

B) Lighting Adjustments

Intensity = base_intensity ± jitter

C) Color Adjustments

Saturation = base ± jitter

Contrast = base ± jitter

D) HIGH Variation Extra Rules

If diversity is high, backend may:

10–20% chance to pick another camera preset

10–20% chance to pick another lighting preset

10% chance to modify environment elements

🎯 Goal of Variation Logic

This ensures:

Images stay consistent and professional

Variants feel natural, not chaotic

HDR mode remains stable

360 mode maintains smooth transitions

Backend produces predictable but varied results

✅ END OF FILE