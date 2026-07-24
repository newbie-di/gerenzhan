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

## July 24 Border Glow Update

### Comparison Target

- Source visual truth: `/Users/di_user/Desktop/录屏2026-07-24 12.29.04.mov`
- Source recording dimensions and duration: `1748 × 1008`, `19.348333s`
- Source keyframe: `design-reference/border-effect/early-3.png`
- Implementation route: `http://localhost:4173/`
- Implementation screenshot: `design-reference/border-effect/implementation-final-preview.png`
- Combined focused comparison: `design-reference/border-effect/border-glow-comparison-final.png`
- Desktop CSS viewport: `1280 × 720`, implementation `devicePixelRatio: 2`
- Source screenshot pixels: `1280 × 720`
- Implementation screenshot pixels: `1272 × 716` after the browser excluded its scrollbar area
- Comparison-board pixels: `1280 × 720`; both states are displayed on one canvas and the implementation capture is normalized to the same `1280 × 720` image box
- Compared state: fine pointer positioned near the top-right edge of a bordered card

### Full-view and Focused Evidence

- Full page state: `design-reference/border-effect/implementation-final-preview.png`
- Mobile state: `design-reference/border-effect/implementation-mobile-projects.png`
- Source and implementation in one focused comparison input: `design-reference/border-effect/border-glow-comparison-final.png`

The focused comparison is necessary because the supplied recording demonstrates an interaction material rather than the portfolio's layout. It compares the same top-right proximity state: a warm-white hotspot, blue transition, violet/magenta tail, and a low-contrast resting border.

### Required Fidelity Surfaces

- Fonts and typography: unchanged. Cormorant Garamond, Manrope, hierarchy, wrapping, antialiasing and content remain identical to the prior passed build.
- Spacing and layout rhythm: unchanged apart from restoring the fixed navigation above later sections. The glow is painted outside layout flow and causes no box-size or spacing shift.
- Colors and visual tokens: the active edge follows the reference's warm white → cool blue → violet → magenta order. The base line remains low contrast so the page does not become continuously neon.
- Image quality and asset fidelity: all existing portrait, project and Hero imagery is unchanged. The border effect is an interaction treatment, not a replacement asset; no image, icon, CSS illustration or placeholder was introduced.
- Copy and content: unchanged across Hero, About, Projects, Strengths and Contact.
- Responsiveness and accessibility: the reactive layer is disabled for coarse pointers and `prefers-reduced-motion`. It uses `pointer-events: none`, so links and controls retain their hit areas. The `390 × 844` check reported `scrollWidth: 382` inside a `390px` viewport with no horizontal overflow.

### Interaction Evidence

- Moving the pointer to the center of the portrait card produced `--border-glow-alpha: 0`.
- Moving the pointer near its top-right border produced `--border-glow-alpha: 0.9394955317563168`.
- The pointer update is requestAnimationFrame-throttled and only updates the nearest registered bordered element.
- The pause control remained operable and restored to `aria-pressed="false"`.
- The fixed navigation's 项目 link changed the hash to `#projects`.
- Browser console check returned no warnings or errors.
- `npm run build` and `git diff --check` passed.

### Comparison History

#### Border pass 1 — P2 glow too faint

- Finding: the initial `118px`, `1px` active edge read as a normal bright border at portfolio scale and did not reproduce the reference hotspot or chromatic tail strongly enough.
- Fix: expanded the radial falloff to `156px`, strengthened the white/blue/violet/magenta stops, added restrained multi-stage bloom, and increased only the active edge to `2px`.
- Post-fix evidence: `implementation-about-glow-final.png` and `border-glow-comparison-final.png`.

#### Border pass 2 — P1 fixed navigation behind content

- Finding: later sections could paint above the Hero-owned fixed navigation, preventing pointer and click access while scrolled.
- Fix: established the Hero stacking context above `main` without changing section layout.
- Post-fix evidence: `implementation-final-preview.png`; `elementFromPoint` resolves the 项目 link and the link changes the route hash to `#projects`.

No actionable P0/P1/P2 differences remain for the requested border interaction.

final result: passed

## July 24 Navigation Control Placement Update

### Comparison Target

- Source visual truth: `/var/folders/n1/g13thyt91vl5hdhg35cj9f6c0000gn/T/codex-clipboard-21463fa1-1b21-498a-a7ec-e9d4d9df8069.png`
- Normalized source copy: `design-reference/navigation/reference-toggle-position.png`
- Browser-rendered implementation: `design-reference/navigation/implementation-toggle-after-contact.png`
- Focused comparison input: `design-reference/navigation/navigation-order-comparison.png`
- Desktop CSS viewport: `1280 × 720`
- Source pixels: `840 × 136`
- Implementation screenshot pixels: `1272 × 716`; focused comparison uses the top-right `840 × 136` region
- State: Hero running, desktop navigation visible, pause control unpressed

### Findings

- No actionable P0/P1/P2 differences remain for the requested placement change.
- The source shows the circular pause control visually splitting “优势” and “联系”. The implementation now keeps all five navigation links in one uninterrupted group and places the same pause control immediately after “联系”.

### Required Fidelity Surfaces

- Fonts and typography: existing Manrope navigation labels, weight, size, letter spacing and muted-white treatment are unchanged.
- Spacing and layout rhythm: the navigation and action controls now share one right-aligned flex group. A `20px` group gap separates “联系” from the circular control, preventing overlap while preserving the existing label rhythm.
- Colors and visual tokens: the transparent navigation, low-contrast labels, circular line treatment and reactive border glow are unchanged.
- Image quality and asset fidelity: Hero video, cosmic portal and all generated imagery are unchanged. No new visual asset was required for this positional adjustment.
- Copy and content: navigation labels and accessible pause/play names are unchanged.
- Responsiveness and accessibility: at `390 × 844`, the desktop links hide while pause/play and menu controls remain together in a `96px`-wide action group. The page reports `scrollWidth: 382` inside a `390px` viewport. The semantic pause button remains keyboard-accessible and its label changes correctly between “暂停首屏动画” and “播放首屏动画”.

### Primary Interactions Tested

- The desktop order is 首页 → 关于 → 项目 → 优势 → 联系 → 暂停/播放.
- The pause control changed to the playback state after activation and restored successfully.
- Mobile keeps the pause/play button beside the menu button.
- Browser console checks returned no warnings or errors.
- `npm run build` and `git diff --check` passed.

### Comparison History

#### Navigation pass 1 — P1 action control overlapped the link group

- Finding: an absolutely positioned action container visually occupied the gap between “优势” and “联系”.
- Fix: grouped the desktop links and action controls inside `navbar__right`, using natural flex order instead of overlay positioning.
- Post-fix evidence: `implementation-toggle-after-contact.png` and `navigation-order-comparison.png`.

No additional focused region was needed beyond the navigation crop because the requested change is isolated to one header control order; full-page desktop and mobile captures confirmed that surrounding content and responsive behavior did not shift.

final result: passed

## July 24 Fluid Cursor Update

### Comparison Target

- Source visual truth: `/Users/di_user/Desktop/录屏2026-07-24 12.39.25.mov`
- Source recording: `2228 × 756`, `21.466667s`
- Source keyframes: `design-reference/cursor-effect/reference-fluid-1.png`, `reference-fluid-2.png`, and `reference-fluid-3.png`
- Implementation route: `http://localhost:4173/`
- Implementation screenshots: `design-reference/cursor-effect/implementation-fluid-final.png` and `implementation-fluid-about.png`
- Responsive evidence: `design-reference/cursor-effect/implementation-mobile.png`
- Combined comparison input: `design-reference/cursor-effect/fluid-comparison-final.png`
- Compared state: a fast, curved fine-pointer gesture that produces a broad purple-indigo ribbon, luminous inner filament, organic turn eddies, and a natural fade

### Full-view and Focused Evidence

- Hero interaction: `design-reference/cursor-effect/implementation-fluid-final.png`
- About interaction over real typography: `design-reference/cursor-effect/implementation-fluid-about.png`
- Source and implementation in one comparison input: `design-reference/cursor-effect/fluid-comparison-final.png`

The supplied recording demonstrates an interaction material rather than a portfolio layout. The combined board therefore compares the same visual behavior over each product's real background: a wide translucent purple body, brighter internal flow lines, a rounded eddy at a change of direction, and a fade back to a clean base surface.

### Required Fidelity Surfaces

- Layout, fonts, copy, imagery and hierarchy are unchanged. The effect is rendered in one fixed, click-through canvas outside document flow.
- The palette stays inside the existing deep-indigo system. Purple, violet and soft warm-white layers use `screen` compositing so the effect remains luminous without introducing a new neon color family.
- Pointer sampling is interpolated at `9px` spacing so fast or sparse desktop pointer events still form a continuous ribbon.
- The trail uses a single smoothed quadratic path per optical layer, preventing segmented or dotted artifacts. Turn-sensitive elliptical eddies recreate the reference's soft fluid bulbs and contour loops.
- The trail stops rendering after its particles expire, clears when the page is hidden, and caps device pixel ratio at `1.5` to protect main-thread performance.
- The canvas has `pointer-events: none`; the existing border-proximity glow remains independent and visible. Fine-pointer gating and `prefers-reduced-motion` prevent the effect from running for coarse pointers or reduced-motion users.

### Interaction Evidence

- A real curved pointer path across the Hero produced the continuous ribbon shown in `implementation-fluid-final.png`.
- After `2.9s` without movement, the canvas returned to a fully clean page state.
- The canvas covered the full `1280 × 720` viewport and reported `pointer-events: none`.
- The Hero pause control remained clickable through the canvas, changed to the pressed playback state, and was successfully restored.
- The existing page retained `61` registered border-glow targets.
- The `390 × 844` check reported `scrollWidth: 382` in a `390px` viewport with no horizontal overflow.
- Browser console checks returned no warnings or errors.
- `npm run build` and `git diff --check` passed.

### Comparison History

#### Cursor pass 1 — P2 segmented inner filament

- Finding: drawing each short interpolated segment independently created a beaded, dashed highlight that did not match the reference's continuous fluid caustic.
- Fix: changed every optical layer to one smoothed quadratic path while retaining interpolated pointer samples.
- Post-fix evidence: `implementation-fluid-final.png`.

#### Cursor pass 2 — P2 insufficient soft bloom

- Finding: the first ribbon version set an invalid placeholder value as its shadow color, weakening the broad diffuse halo.
- Fix: resolved the active purple color before assigning the shadow, restoring a softer edge and better separation between the translucent body and bright inner filament.
- Post-fix evidence: `fluid-comparison-final.png`.

No actionable P0/P1/P2 differences remain for the requested mouse-movement interaction.

final result: passed
