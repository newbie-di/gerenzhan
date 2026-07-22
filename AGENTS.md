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
