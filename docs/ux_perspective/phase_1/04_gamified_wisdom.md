# UX Perspective: Gamified Quizzes & Daily Wisdom

## 📍 Placement
*   **Daily Wisdom (Sloka)**: Front and center on the user's logged-in dashboard, or dynamically injected near the top of the Home page, refreshing every 24 hours.
*   **Mini-Quizzes (Q/A)**: Embedded directly at the bottom of long-form Heritage Articles. This prevents disrupting the reading flow while rewarding users who finish the piece.
*   **Badges**: Displayed as a horizontal scrolling ribbon beneath the user's Digital ID Card on their profile.

## 🎨 Visual Depiction
*   **Sloka Card**: A serene, uncluttered card component. Text hierarchy is vital:
    *   Sanskrit/Telugu script in massive, elegant typography.
    *   English transliteration smaller and lighter.
    *   A prominent, round "Play Audio" button (`lucide-react` Play icon).
*   **Quiz UI**: Not a boring web form. Think Duolingo—colorful, rounded buttons containing the multiple-choice answers. A progress bar tracks 1/3, 2/3, 3/3 questions.

## ✨ Micro-Interactions
*   **Audio Playback**: The "Play" button should smoothly transition to a "Pause/Waveform" icon while the audio snippet plays, showing active state.
*   **Quiz Feedback**:
    *   **Correct**: Button turns bright green, accompanied by a satisfying 'ding' sound and subtle haptic feedback (if on mobile).
    *   **Incorrect**: Button shakes slightly (horizontal shake animation `x: [-5, 5, -5, 5, 0]`) and turns red, instantly revealing the correct answer to educate rather than punish.
*   **Badge Unlocked**: A full-screen or prominent modal pops up with falling gold emojis (e.g., ✨ 🎖️) when a badge (e.g., "Scholar of Hampi") is earned.

## ♿ Accessibility (WCAG AA)
*   **Color as Feedback**: Never rely on color alone to indicate success/failure. When a quiz answer is correct, also display a checkmark icon to ensure colorblind users can immediately understand the state.
