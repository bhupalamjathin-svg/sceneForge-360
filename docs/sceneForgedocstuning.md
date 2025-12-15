🎛 SceneForge 360 — Tuning Guide (For Backend + Testing Team)

This file explains how to adjust parameters after initial tests with the real FIBO engine.
These tuning steps help achieve consistent, high-quality outputs for all scene types.

🌅 1. Lighting Tuning

If images are too dark:

Increase lighting.intensity by +0.1 to +0.2

Change lighting.direction → front or top

Use hdr_bright lighting preset

If images are too bright/washed out:

Lower lighting.intensity by -0.1

Set temperature → neutral or cool

If night scenes have too much noise:

Increase intensity slightly (+0.05)

Use torchlight preset

🌈 2. Color Tuning

If colors look too dull:

Increase saturation to high

Increase contrast to high

If colors look too oversaturated:

Set contrast = normal

Set saturation = normal or low

For cinematic scenes:

Use emerald_teal

Use warm_fantasy

Set contrast = high

🎥 3. Camera Tuning

If image looks too zoomed in:

Increase camera.fov (e.g., 45 → 60)

If image looks distorted (too wide):

Decrease FOV (e.g., 60 → 40)

If subject is too far:

Change camera.distance → "close"

If subject is too close:

Use "mid" or "wide" distances

🌫️ 4. Atmosphere / Weather Tuning

If the scene looks too “empty”:

Add elements like "mist", "light rays", "particles"

Add environment props:

ruins

rocks

neon signs

If the scene looks too cluttered:

Remove 1–2 environment elements

🌐 5. 360 Mode Tuning

To keep all angles consistent:

Use the same:

lighting values

color palette

mood

environment

resolution

ONLY change the angle.

If rotation transitions feel “jumpy”, ensure angle list is in correct order:

front → front_right → right → back_right → back → back_left → left → front_left

🔧 6. Recommended Testing Scenes

Run these scenes every time you tune:

forest dawn + HDR bright

city cyberpunk sunset

dungeon torchlight night

desert noon overcast

These ensure:

dynamic range

colors

shadows

preset behavior

camera control

stability

🏁 Conclusion

Tuning ensures SceneForge 360:

produces repeatable, controllable, studio-quality images

maintains consistent look across variants

keeps 360 mode seamless

gives game artists predictable outputs

🎉 END OF FILE