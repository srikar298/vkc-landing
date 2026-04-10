# Phase 2: The Economic Engine (UI/UX Perspective)

## Information Architecture & Role Visibility
The "Economic Engine" requires precise access control to maintain community trust and privacy. Below is the visibility matrix for key hub sections:

| UI Element | Public Guest | Member (Basic) | Member (Verified) |
| :--- | :--- | :--- | :--- |
| **Professional List** | Visible (Teaser) | Visible (Teaser) | Full Detail |
| **Contact Buttons** | Hidden (CTA: Join) | Hidden (CTA: Verify) | Active |
| **Matrimony Portal** | Landing Only | Locked Overlay | Search Active |
| **Official Directory** | Visible | Visible | Full Detail |
| **Direct Messaging** | NA | Locked | Enabled |

## Access-Based Styling (Visual Cues)
- **Verified Badge**: A teal shield check icon next to names in search results.
- **Donor Badges**:
  - `PATRON`: Gold glowing border on the Digital ID and priority placement.
  - `GOLD`: Saffron border and "Premium" badge.
  - `SILVER`: Standard border with "Supporter" badge.
- **Blurred UI Pattern**: Use high-fidelity blurs on matrimony photos for unverified members to encourage the verification flow.

## UX Design & Aesthetics
* **Location-Based Search**: HTML5 Geolocation API with a clean permission prompt.
* **Directory Cards**: Prominent "Click to Call" buttons with high contrast.
* **Ratings UI**: Intuitive star/hammer icons, large touch targets on mobile.