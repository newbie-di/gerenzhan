# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

## Durable design decisions

- The Hero follows the supplied reference video's two-state depth cycle: a framed portal state, a 0.8-1.0 second push-through, an open-space state, then a fast reset over an approximately 5.1 second loop.
- Replace the reference forest and pastel sky with a restrained deep-indigo star field and a dark cosmic-rock portal. Do not retain obvious tree silhouettes.
- Keep the experience clean: the Hero owns the expressive motion; later sections use only subtle reveal and hover feedback.
- Use an automatic loop with subtle desktop pointer parallax, a visible pause control, and a static `prefers-reduced-motion` fallback.
- The primary Hero background is the supplied July 11 anime recording. The cosmic-rock portal remains the entry layer: the video is visible through the opening, then expands to full-bleed after the portal push-through.
- Replace the identifiable female character shots with a consistent adult male anime character while preserving the original lighter, hand, blue-flame, red transition, timing, and camera language.
- The canonical production site is `https://gerenzhan-khaki.vercel.app`. Future website changes should be made in this existing project and released to that Vercel deployment rather than creating a separate site.
- Every existing bordered control, card, tag, and divider should use the July 24 reference interaction: a restrained warm-white, blue, violet, and magenta edge glow that follows a fine pointer only when it approaches that element's border. Keep the base border visible, disable the reactive glow for coarse pointers and reduced motion, and do not add extra decorative borders.
- Global fine-pointer movement should use the July 24 12:39 reference interaction: a broad, soft purple-indigo fluid ribbon with a bright inner filament, organic eddies, and a natural fade. It must remain click-through, preserve the independent border-proximity glow, and be disabled for coarse pointers and reduced motion.
- Keep the global pointer trail visually clean: soft fluid volume is allowed, but do not draw distinct outer elliptical or ring-shaped light contours around turns.
- Keep the purple fluid pointer trail subdued at roughly `0.74` global opacity so it supports the page without competing with text or Hero imagery.
- In the desktop navigation, the Hero pause/play control must appear immediately after the “联系” link; it must never overlap or visually split the navigation labels. Keep the pause/play and menu controls together on responsive layouts.
- The first featured project is an AI automation workflow tool, not a resume optimizer. The Projects intro should not include placeholder-project disclaimer copy.
- Contact copy should say JD is exploring the AI field, and the canonical public email is `jd763540586@163.com`.
