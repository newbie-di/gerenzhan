# Design QA

## Comparison Target

- Background content source: `/Users/di_user/Desktop/录屏2026-07-11 00.39.54.mov`
- Depth-transition reference: `/Users/di_user/Desktop/录屏2026-07-11 12.59.15.mov`
- Source content frames:
  - `design-reference/new-video/clean-shot-50.jpg`
  - `design-reference/new-video/clean-shot-60.jpg`
  - `design-reference/new-video/clean-shot-70.jpg`
- Source transition frames:
  - `design-reference/new-video/portal-screen-00.png`
  - `design-reference/new-video/portal-screen-60.png`
- Implementation route: `http://localhost:4173/`
- Desktop viewport: browser default `1280 × 720`
- Mobile viewport: `390 × 844`
- Compared states: portal, open video, male replacement sequence, mobile portal and mobile open video

## Browser-rendered Evidence

- Desktop portal: `design-reference/implementation-video-portal-static.png`
- Desktop open video: `design-reference/implementation-video-open-static.png`
- Mobile portal: `design-reference/implementation-video-portal-mobile.png`
- Mobile open video: `design-reference/implementation-video-open-mobile.png`

Deterministic screenshots use the implementation's poster capture mode so the browser compositor can freeze an exact frame. The normal route still renders the real `<video>` element. Browser inspection confirmed `readyState: 4`, `paused: false`, `640 × 356`, duration `11.766667s`, and advancing playback time with no media error.

## Combined Comparison Evidence

- Full-view portal comparison: `design-reference/qa-compare-video-portal.png`
- Full-view open-state comparison: `design-reference/qa-compare-video-open.png`
- Focused character replacement comparison: `design-reference/qa-compare-male-replacement.png`

The full-view comparisons place the second recording's close-to-open depth states beside the coded portal and open-video states. The focused comparison places the original female frame beside the generated adult male replacement at the same hand, flame, camera-angle and red/black composition.

## Required Fidelity Surfaces

- Fonts and typography: the existing Cormorant Garamond and Manrope system remains unchanged. White display copy stays readable over both the rock aperture and the full-bleed animation; desktop and 390px mobile wrapping show no clipping.
- Spacing and layout rhythm: fixed navigation and Hero copy remain above the scene layers. The portal frames the background without covering primary actions; the open state keeps sufficient negative space around the centered project heading and cards.
- Colors and visual tokens: the indigo cosmic rock, black veil, red anime palette and blue flame form one restrained palette. A single semi-transparent veil protects contrast without flattening the character art.
- Image quality and asset fidelity: the source recording is transcoded to a web-ready 640 × 356 M4V at about 3.3MB. Three generated WebP male keyframes total about 142KB. The portal remains the original raster foreground; no CSS/SVG substitute is used.
- Copy and content: all profile and project content remains real DOM text and data-backed. The new video is decorative, muted and hidden from the accessibility tree.
- Accessibility and behavior: autoplay is muted and inline; the visible pause control stops both the portal timeline and the video. Reduced motion and video failure use a static male poster. The Hero still pauses when hidden or outside the viewport.

## Primary Interactions Tested

- Portal state exposes the background video through the central aperture.
- The 0.8–1.0 second portal push-through reveals the full-bleed video state.
- Real video playback advances and loops without media or console errors.
- Male replacement activates during the identifiable character segment. At `6.94s`, the replacement bed opacity was `1`, the `male-60` frame opacity was `1`, and the other replacement frames were hidden.
- Replacement keyframes use continuous scale/position drift instead of a fully static hold.
- Pause control changed the video to `paused: true`; resume changed it back to `paused: false` and playback time advanced.
- Desktop and `390 × 844` mobile portal/open states show no horizontal overflow.
- Production build completed successfully.

## Comparison History

### Pass 1 — findings and fixes

- [P1] The requested background still contained identifiable female character shots.
  - Fix: generated three composition-matched adult male anime keyframes and timed them to cover the face/body segment while preserving lighter, hands, blue flame, red transitions and camera language.
  - Post-fix evidence: `qa-compare-male-replacement.png` and browser timing evidence at `6.94s`.
- [P2] A 720p working transcode was about 9.7MB, unnecessarily heavy for an 11.77-second Hero loop.
  - Fix: selected the balanced 640 × 356 web transcode at about 3.3MB; the complete above-the-fold video, portal and male replacement set stays near 3.9MB.
- [P2] A still replacement could make the character segment feel frozen.
  - Fix: divide the segment into three shots with fast cross-cuts plus continuous per-shot scale and position drift.

### Pass 2 — responsive and interaction verification

- Confirmed the mobile portal keeps both rock walls and the male background subject visible.
- Confirmed the mobile open state shows one project card, readable copy and no horizontal overflow.
- Confirmed autoplay, pause, resume, replacement timing, fallback poster, navigation hierarchy and console output.
- No actionable P0/P1/P2 issues remain.

## Follow-up Polish

- [P3] A dedicated generative video-to-video model could produce fully continuous male motion between the three replacement shots; the current keyed montage deliberately prioritizes clean identity replacement and lightweight delivery.

final result: passed
