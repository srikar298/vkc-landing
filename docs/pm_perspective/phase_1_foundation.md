# Phase 1: Foundation & Identity (PM Perspective)

**Target Timeline**: Months 1-2

## Objective
Build the initial user base, establish a premium digital identity, and consolidate the heritage modules. The primary goal is rapid user acquisition leveraging the "Digital ID" network effect.

---

## 🏗️ Epic 1: Artisan Onboarding & Digital Identity
**Description**: Provide a frictionless registration flow for artisans to claim their verified VKC Membership and receive a shareable Digital ID card.

### User Story 1.1: Mobile-First Registration
**As an** unregistered artisan,
**I want to** register on the VKC platform using my mobile number and OTP,
**So that** I can easily create an account without struggling with emails or complex passwords.
* **Acceptance Criteria**:
  * Modal accepts a 10-digit Indian mobile number.
  * System sends a 6-digit OTP via SMS (or WhatsApp).
  * UI provides clear OTP entry fields with a 60-second resend cooldown.
  * Successful verification creates a secure user session.

### User Story 1.2: Profile Data Capture
**As an** authenticated new user,
**I want to** provide my Name, Traditional Trade, and Location,
**So that** VKC can categorize my skills and prepare my directory listing.
* **Acceptance Criteria**:
  * Form collects First and Last Name.
  * Dropdown for "Traditional Trade" is strictly populated with the 18 Vishwakarma trades.
  * Dropdown for State (AP/Telangana) cascades into a District selection.
  * All fields must be validated before submission.

### User Story 1.3: Digital ID Generation
**As a** registered community member,
**I want to** instantly view and download a premium Digital ID card containing my details,
**So that** I can share my verified status on WhatsApp and feel a sense of community pride.
* **Acceptance Criteria**:
  * System generates a unique alphanumeric VKC ID (e.g., `VKC-AP-1024`).
  * UI renders a highly polished, skeuomorphic ID card (glassmorphism/gold accents).
  * Card includes Name, Trade, District, and a dynamic QR code.
  * Prominent "Download Image" button generates a mobile-optimized PNG.

---

## 🏛️ Epic 2: The Heritage Experience (Wisdom & Grandeur)
**Description**: Immerse visitors in the divine mission and historical significance of the Vishwakarma community. This epic transforms passive reading into active, gamified engagement to build immediate trust and immense pride.

### User Story 2.1: The Living Timeline (Yugas to Modern Era)
**As a** young community member or visitor,
**I want to** scroll through a visually stunning historical timeline,
**So that** I can see the unbroken chain of our ancestors building everything from Vedic cities to modern wonders.
* **Acceptance Criteria**:
  * A vertical, scroll-linked parallax animation timeline.
  * Milestones feature mythical creations (Dwarka, Pushpaka Vimana) and historical facts (Konark, Hampi, Ramappa).
  * High-resolution supporting photography.

### User Story 2.2: Daily Vedic Wisdom & Articles
**As a** daily visitor,
**I want to** read curated "Wisdom Articles" and a "Sloka of the Day" related to Vishwakarma philosophy,
**So that** I stay connected to my spiritual roots and learn something new regularly.
* **Acceptance Criteria**:
  * CMS-driven "Articles" section focusing on history, architecture, and spiritual texts.
  * A beautifully designed "Sloka of the Day" card featuring Sanskrit text, English/Telugu translation, and optional audio pronunciation.

### User Story 2.3: Gamified Heritage Quizzes (Q/A)
**As a** reader of the Heritage Articles,
**I want to** take a short 2-3 question mini-quiz at the end of the article,
**So that** I can test my knowledge and earn "Wisdom Badges" for my profile.
* **Acceptance Criteria**:
  * Mini-quiz component renders dynamically at the bottom of designated articles.
  * Correct answers trigger a celebratory UI animation (e.g., gold confetti).
  * Passing a quiz awards a permanent digital badge (e.g., "Scholar of Hampi") that attaches directly to the user's Digital ID Card.

### User Story 2.4: Interactive "Find Your Lineage (Gotra / Rishi)"
**As a** community member trying to understand my roots,
**I want to** interact with a visual map detailing the five Rishis (Sanaga, Sanatana, Ahabhuna, Pratna, Suparna) and their respective crafts/gotras,
**So that** I can trace my lineage and understand its divine roots effortlessly.
* **Acceptance Criteria**:
  * High-quality, majestic imagery for each of the five originators.
  * Engaging, bite-sized copy explaining their domain (e.g., Manu = Iron, Maya = Wood).
  * Interactive UI (like hovering over an anvil to reveal the Iron lineage).

---

## 📈 Key Performance Indicators (KPIs)
* **Registration Conversion Rate**: Target > 40% of visitors who initiate the "Join Now" flow complete it.
* **ID Card Virality Rate**: Target > 70% of registered users clicking "Download ID Card".
* **Time to Complete**: Average registration flow should take < 90 seconds.

## ⚠️ Edge Cases & Risk Mitigation
* **OTP Cost Overruns**: SMS OTPs are expensive at scale. 
  * *Mitigation*: Rate-limit requests (max 3 per 10 mins). Consider WhatsApp OTP as a cheaper alternative later.
* **Data Privacy & PII**: Collecting exact addresses creates security liabilities.
  * *Mitigation*: Ensure the database strictly enforces Row Level Security (RLS). Only collect State and District in Phase 1; refrain from asking for street addresses until e-commerce is introduced.