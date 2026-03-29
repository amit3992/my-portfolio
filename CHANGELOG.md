# Changelog

## v2.0.0 - 2026-03-29

### Chatbot Redesign
- Clean, modern UI with fixed 380x500px window (removed clunky resize/expand)
- Gradient header with subtitle text
- Rounded message bubbles with subtle shadows and borders
- Animated bouncing dots loading indicator (replaced "Typing..." text)
- Slide-up animation when chat opens
- Auto-focus on input field when opened
- Safe markdown rendering: **bold text** and bullet points

### Analytics Integration
- Persistent session ID (via `crypto.randomUUID()`) sent on all API requests
- Enables conversation grouping and visitor tracking on the backend dashboard

### SSE Streaming
- Switched from blocking fetch to streaming responses via `ReadableStream`
- Text appears progressively as the LLM generates it
- Empty bot message bubble fills in token-by-token

## v1.0.0 - 2026-03-28

### Portfolio Site
- Single-page academic-style portfolio design
- Responsive layout with work experience, projects, and skills sections

### Chatbot
- Embedded AI chatbot powered by RAG (Gemini + Claude fallback)
- Auto-opens on first visit with notification sound
- Client-side rate limiting (10 messages per 5 minutes)
- Remembers if user closed the chatbot (won't auto-open again)
