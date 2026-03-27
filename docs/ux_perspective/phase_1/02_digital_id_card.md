# UX Perspective: The Digital ID Card

## 📍 Placement
*   **Trigger**: Automatically displayed as the celebratory "Success State" immediately after completing the registration flow.
*   **Persistence**: A "My ID" button appears in the global navigation bar (replacing "Join Mission") for authenticated users, which toggles a bottom-sheet on mobile containing this card.

## 🎨 Visual Depiction
*   **Skeuomorphism**: This cannot look like a generic web table. It must mimic a high-end physical ID card (credit-card aspect ratio: 85.6mm x 54mm equivalent).
*   **Background**: A deep, rich gradient (e.g., from deep maroon to dark grey) with subtle Indian geometric mandala patterns overlaid at 10% opacity in the background.
*   **Typography**: The user's name should be prominent using `Outfit` (bold, gold gradient text). The ID number (`VKC-AP-0024`) should use a monospace font for readability.
*   **QR Code**: A pristine, high-contrast QR code placed aesthetically in the bottom corner.

## ✨ Micro-Interactions
*   **3D Tilt Effect**: On desktop, moving the mouse over the card applies a subtle 3D rotational tilt (`framer-motion` `useTransform`), mimicking light reflecting off a physical laminate.
*   **Flip Animation**: A "View Details" button flips the card 180 degrees horizontally to reveal emergency contact info or detailed trade specializations.
*   **Native Sharing**: A highly visible "Share on WhatsApp" icon utilizing the `navigator.share` Web API to immediately share a snapshot of the card.

## ♿ Accessibility (WCAG AA)
*   **Screen Readers**: The card container must have `aria-label="Your Digital ID Card"`. The QR code must have `alt="Scan to verify your VKC identity"`.
