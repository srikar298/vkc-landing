# UX Perspective: Mobile-First Registration

## 📍 Placement
*   **Trigger**: A prominent sticky "Join Mission" / "Get Digital ID" button on the global header (visible across the entire app) and a massive Hero CTA on the Home page.
*   **Behavior**: Opens as a full-screen, focused modal overlay on mobile (`w-full`, `h-screen`, `z-50`) to remove all distractions. On desktop, opens as a centered, slightly rounded floating modal with a dark blurred backdrop (`backdrop-blur-md`).

## 🎨 Visual Depiction
*   **Aesthetics**: A clean, distraction-free glassmorphic design. Soft saffron glowing borders `#F97316` on active input states.
*   **Progress Indication**: A subtle 3-step progress bar (OTP ➔ Basic Info ➔ Trade) at the top of the modal.
*   **Layout**: Large, chunky inputs optimized for "fat fingers" on mobile.

## ✨ Micro-Interactions
*   **Framer Motion**: The modal slides up slightly from the bottom (`y: 20` to `y: 0`, `duration: 0.3s`) with an elastic bounce.
*   **Haptic Feedback**: When the user enters the correct 6-digit OTP, the input fields momentarily glow green, and the next step auto-slides into view.
*   **Loading State**: Implement a saffron-colored circular loader matching the VKC brand while awaiting Supabase verification.

## ♿ Accessibility (WCAG AA)
*   **Keyboard Nav**: Must fully support `Tab` navigation. Esc key must close the modal.
*   **Input Types**: Phone number field must explicitly use `type="tel"` to trigger the numeric keypad on Android/iOS natively.
*   **Contrast**: Placeholder text must meet 4.5:1 contrast ratios over the modal background.
