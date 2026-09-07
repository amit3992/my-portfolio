# Redesign Spec — uh-mit.com simplification

**Goal:** turn the portfolio from "AI-template slop + mini résumé" into a restrained
editorial one-pager: plain typography, selected proof, generous whitespace.
Reference quality bar: an engineer's notebook / selected-work page, not a SaaS
landing page.

**Source analysis:** OpenAI Codex CLI critique (2025 session). Files to change:
`src/App.tsx`, `src/index.css`, `src/components/ChatBot.tsx`, `index.html` (font).
Do not add dependencies except the Geist font (self-host or CDN link).

---

## 1. Design tokens (replace `:root` in `src/index.css`)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F8F7F4` | warm paper background |
| `--ink` | `#171717` | all primary text |
| `--muted` | `#66645F` | secondary text, dates, metadata |
| `--hairline` | `#D8D5CE` | the only borders on the page |
| `--link` | `#2457A6` | links ONLY; never used as decoration |

**Delete:** `--accent` indigo, `--accent-soft`, all dark-mode `@media` overrides
(do not re-add dark mode in this pass), `--serif`/`--mono` font variables,
`--card` surface.

**Typography:** single family — **Geist** (add `<link>` to
`https://cdn.jsdelivr.net/npm/geist@1/dist/...` per current docs, or
self-host woff2 in `public/fonts/`). Fallback `ui-sans-serif, system-ui, sans-serif`.
No Georgia, no monospace anywhere.

| Role | Size | Weight | Line-height |
|---|---|---|---|
| Display (name/one-liner) | 48–56px desktop / 36px mobile | 500–550 | 1.05 |
| Body | 17px | 400 | 1.55 |
| Metadata | 14px | 400, **normal case** (no uppercase, no letter-spacing) | 1.5 |

**Layout:** single column, `max-width: 680px`, 32px side padding desktop /
20px mobile. 8px rhythm: 16px between paragraphs, 32px within a section,
80–112px between sections. At most two `<hr>`-style hairlines on the whole page.

**Links:** conventional `text-decoration: underline` (persistent or on hover).
No background-image sweep animation.

**Global deletions from CSS:** `.reveal` + `.revealed`, all `transition`/`transform`
motion, cards (`.project-card` surface/border/shadow/hover), `.project-tag` pills,
`.eyebrow`, `.btn-primary`/`.btn-ghost`, chevron `::before` bullets, dashed rules,
headshot grayscale/rotate hover.

---

## 2. `src/App.tsx` — new structure (in order)

1. **Intro**
   - Headshot 72–88px, square with 4px radius or circle, **static** (no hover fx).
   - Name (display size) + ONE precise sentence, e.g.
     "Forward Deployed Engineer at Intercom — I help enterprise teams make AI
     useful in production."
   - One inline line of text links: `Email · GitHub · LinkedIn · Résumé (PDF ↓)`
     (keep `/Amit_Kulkarni_Resume.pdf` + `download` attr).
2. **Selected work** — TWO projects only: FPL CLI and Portfolio bot.
   Each = linked title, one outcome-oriented sentence, optional plain-text
   "Role / stack" line. No cards, no pills, no third project (drop A4A).
3. **Work** — ONE compact paragraph covering Intercom then Intuit, ending with
   "Full history on LinkedIn." No per-role entries, no metric inventory.
   Ericsson omitted or reduced to a clause.
4. **Now** — keep, but exactly 3 short human items (pick from current list).
5. **Footer** — email + © line only.

**Delete from App.tsx:** the `useEffect` + IntersectionObserver block,
all `reveal` class names, the "Previously" section markup, `prev-foot`.

---

## 3. `src/components/ChatBot.tsx` — restyle to match

1. **Remove auto-open + sound entirely**: delete the `hasBeenClosed` 3s
   `setTimeout` effect, the `audioRef`/mixkit Audio effect, and
   `chatbot_closed` localStorage logic. Widget opens only on user click.
2. **Replace the floating gradient orb** with a small text-led fixed control,
   bottom-right: `Ask about Amit's work ↗` — page ink color, hairline border,
   6px radius, no shadow, no gradient.
3. **Panel:** ~340px wide, same `--bg` background, `--hairline` border, 6px
   radius, no shadow, no slide-up animation. Plain header text
   "Ask about Amit's work" (keep the name "Veda" inside as a subtle subtitle
   if desired — owner decision).
4. **Messages:** user bubble = flat `#ECEAE5` fill, 6px radius, ink text;
   assistant messages = unfilled plain text. No blue bubbles, no exaggerated
   rounded-md asymmetry. Replace bouncing-dot loader with a simple "…".
5. Remove all hard-coded Tailwind white/gray/blue classes (they break theme
   consistency); use the CSS variables above.

---

## 4. Acceptance criteria

- [ ] Page contains zero uses of indigo `#3b4ed8`, gradients, shadows, border-radius > 6px, or animation/transition (except optional 150ms link underline fade).
- [ ] No IntersectionObserver; content visible immediately.
- [ ] Exactly 2 projects, 1 work paragraph, 3 "Now" items.
- [ ] Résumé PDF link present in intro AND works with `download`.
- [ ] Chatbot never auto-opens, plays no sound, and matches page palette.
- [ ] `npm run build` passes; page verified at 375px and 1280px widths.
- [ ] No dark-mode media query remains (intentional deferral).

## 5. Out of scope (future)

- Case-study pages per project.
- Deliberately-designed dark mode.
- Terminal demo artifact for FPL CLI.
