# UX Perspective: The Living Heritage Timeline

## 📍 Placement
*   **Primary Navigation**: This should be a standalone, deeply immersive page linked from the header as "Our Heritage" or "The Living Legacy".
*   **Home Page Teaser**: A condensed preview should exist on the Home page, prompting users to "Explore the 5 Yugas of Architecture".

## 🎨 Visual Depiction
*   **Structure**: A vertical, winding line running down the center of the screen on desktop, or flush left on mobile.
*   **Aesthetics**: 
    *   Dark mode theme (`bg-zinc-950`) to emphasis the photography and gold typography.
    *   Alternating content blocks (Left text, Right Image -> Right text, Left image).
    *   Photography should be majestic—using dramatic lighting for temples like Konark and Hampi.

## ✨ Micro-Interactions
*   **Scroll-Linked Reveal**: As the user scrolls down, the central line "draws" itself automatically using Framer Motion's `useScroll` and `useSpring`.
*   **Image Parallax**: The images should move at a slightly slower speed than the rest of the document (`useTransform(scrollYProgress, [0, 1], [0, 100])`), creating immense depth.
*   **Hover Expansion**: Hovering over an image subtly zooms it in (`scale: 1.05`) without altering the layout, encouraging deeper focus.

## ♿ Accessibility (WCAG AA)
*   **Reduced Motion**: Since this relies heavily on scroll animations, we must respect prefers-reduced-motion media queries (`@media (prefers-reduced-motion: reduce)`). If a user has disabled motion, all content should be fully visible immediately without fading or drawing.
*   **Alt Text**: Every historical image must contain highly descriptive alt text for visually impaired users.
