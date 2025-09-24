# Repository Guidelines

## Project Structure & Module Organization
- Root files: `index.html` (markup) and `style.css` (styles).
- Static site: no build system or runtime dependencies.
- Add assets under `assets/` (e.g., `assets/images/`, `assets/fonts/`) if needed. Reference with relative paths in HTML/CSS.

## Build, Test, and Development Commands
- Run locally (simple HTTP server):
  - Python: `python3 -m http.server 8000` (serve from repo root, open http://localhost:8000).
  - Node (optional): `npx serve .` (if you prefer Node tooling).
- Quick view without server: open `index.html` directly in a browser (note: some features like font loading still work; absolute URLs only).

## Coding Style & Naming Conventions
- HTML: semantic elements (`header`, `nav`, `section`, `footer`); 2–4 spaces indentation (match surrounding code; current files use 4).
- CSS: kebab-case class names (e.g., `.service-card`), group related rules, and keep selectors shallow.
- Variables: define theme colors in `:root` and reuse via `var(--token)`; prefer extending existing tokens over adding new ones.
- Responsiveness: update media queries near the end of `style.css`; test at 320px, 768px, and 1200px widths.
- Avoid inline styles and embedded `<style>` blocks; keep all styling in `style.css`.

## Testing Guidelines
- No unit tests in this repo. Validate by:
  - Visual checks across breakpoints and dark-on-light contrast.
  - Accessibility pass (keyboard nav, focus states, `alt` text).
  - Performance: compress images (WebP/AVIF) under `assets/images/` and use appropriate sizes.
  - Optional: run Lighthouse in Chrome DevTools for a quick audit.

## Commit & Pull Request Guidelines
- Commits: concise and scoped; prefer Conventional Commits where useful:
  - `feat: add gallery grid hover effects`
  - `fix: correct navbar shadow on scroll`
  - `style: normalize indentation in style.css`
- Pull Requests should include:
  - Purpose and summary of changes, with before/after screenshots for UI changes.
  - Any trade-offs or follow-ups.
  - Testing notes (browsers/devices checked).

## Security & Configuration Tips
- Do not commit secrets. If integrating analytics or forms, keep keys out of the repo and load via environment-specific injection.
- Use HTTPS links for external assets (e.g., Google Fonts) and verify CORS when adding third-party resources.
