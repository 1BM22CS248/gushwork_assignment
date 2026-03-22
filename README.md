# Euroflex HDPE Pipes — Gushwork Frontend Assignment

## Files

- `index.html` — main page structure
- `styles.css` — all styles including responsive breakpoints
- `script.js` — sticky header, carousel, tabs, form logic

## Features Implemented

### Sticky Header

The page has a two-tier header:

- A top utility bar (phone/email) and main nav are always visible
- A secondary sticky header slides in **above** the main nav after the user scrolls past the hero section
- Uses `requestAnimationFrame` for smooth scroll performance
- Disappears when scrolling back to the top

### Image Carousel with Zoom

Located in the “Versatile Applications” section:

- Horizontally scrollable card carousel with snap scrolling
- **Hover zoom effect**: hovering any card scales the image up (transform: scale) and slides up a detailed overlay showing the application title, description, and CTA
- Overlay is implemented entirely in CSS using `transform: translateY` transitions
- Arrow buttons + dot indicators for navigation
- `IntersectionObserver` keeps dots in sync with scroll position
- Touch swipe and keyboard arrow key support
- Fully accessible with `tabindex` and `focus-visible` styles

### Responsive Design

- Desktop: full two-column layouts
- Tablet (≤1024px): single column hero, 2-column grids
- Mobile (≤768px): hamburger menu, stacked layouts
- Small mobile (≤540px): single column everything

## How to Run

Open `index.html` directly in a browser, or use VS Code Live Server.

No build step, no dependencies, no frameworks — pure HTML, CSS, and JavaScript.
