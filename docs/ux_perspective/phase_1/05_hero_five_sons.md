# UX Perspective: The Grandeur of the Creator & The Five Crafts (Hero Section)

## 📍 Placement & Core Concept
*   **Location**: Home Page Hero (`h-screen`, `w-full`).
*   **The Concept (Show, Don't Tell)**: Users should look at this array and *instantly* know what the five crafts are (Iron, Wood, Brass/Copper, Stone, Gold) without having to read a single paragraph. The imagery themselves must physically embody the material. Lord Vishwakarma must anchor the entire composition as the divine source.

## 🎨 Visual Depiction: The "Divine Forge" Layout
Instead of just portraits of people, we center the **craft and the material** as the primary visual hook. 

1.  **The Centerpiece (Lord Vishwakarma)**:
    *   A towering, luminous, semi-transparent silhouette or exquisite multi-armed gold-line illustration of Lord Vishwakarma anchored in the background/center. He is not just "a person" in the layout; he is the canvas itself.

2.  **The Five Emanations (The Sons & Crafts)**:
    *   Radiating from the center (Desktop) or stacked as an infinite vertical scroll (Mobile), each son is represented by hyper-realistic, macro-photography of their domain in action.
    *   **Manu (The Blacksmith)**: Glowing embers, flying orange sparks, and a heavy, dark iron anvil. The background itself has a subtle, raw iron texture (`#1c1c1c`).
    *   **Maya (The Carpenter)**: Intricate, interlocking teak wood joints and elegant wood shavings catching soft light. The background has a warm, polished wood-grain overlay.
    *   **Thwashta (The Coppersmith/Alloys)**: Shining, polished brass/copper vessels or glowing molten alloy. A sleek metallic sheen overlays the UI card.
    *   **Shilpi (The Sculptor)**: A masterfully carved temple pillar (like Hampi) with a chisel striking it, surrounded by a cloud of fine white stone dust. Background mimics jagged granite.
    *   **Vishwajna (The Goldsmith)**: Exquisite, delicate gold filigree jewelry resting on dark velvet, glowing with a soft, warm yellow luster.

## ✨ Micro-Interactions (Making the "Materials" Alive)
### Desktop Experiences: "The Interactive Orbit"
*   Lord Vishwakarma remains central. The 5 crafts orbit or sit in a semi-circle.
*   **Material Hover Physics**: Hovering over "Manu" (Iron) doesn't just expand a text box; it triggers a 3D heat-distortion filter (using WebGL/Framer Motion) and sparks fly *over* the UI. Hovering over "Maya" (Wood) smoothly transitions the entire website's background to a warm, timber-like hue.

### 📱 Mobile-Specific Experiences: "The Material Waterfall"
*   **Texture Scrolling**: As the user scrolls vertically past Lord Vishwakarma, they pass through "zones". 
    *   *Zone 1 (Manu)*: The screen turns dark, sparks fly up the screen (using lightweight CSS particles), and the text fades in.
    *   *Zone 2 (Maya)*: The dark iron smoothly transitions into a rich, golden-brown wood texture. The text appears as if carved into the screen itself (using CSS `text-shadow: inset`).
*   **Haptic Echoes**: 
    *   Snapping to "Manu" gives a heavy, 50ms blunt vibration (like a hammer). 
    *   Snapping to "Vishwajna" (Gold) gives a tiny, rapid 10ms tick (like fine precision work).

## ♿ Accessibility (WCAG AA)
*   **High Contrast Text**: Because the backgrounds are complex (fire, stone, wood), any descriptive text laid over them *must* have a heavily blurred backdrop pill (`bg-black/80 backdrop-blur-xl`) so names like "MAYA - Carpentry" are perfectly legible.
*   **Alt Tags as Poetry**: Image Alt text should be descriptive and poetic (e.g., `alt="Glowing iron sparks flying from a blacksmith's anvil, representing Manu"`) so screen reader users experience the same grandeur.
