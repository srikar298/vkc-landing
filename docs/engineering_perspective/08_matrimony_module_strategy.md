# Matrimony Module Strategy

The **Matrimony Module** is a high-growth matchmaking engine designed to facilitate secure and verified connections within the Vishwakarma community.

## 1. Core Responsibilities
- **Profile Management**: Detailed multi-step profile creation (Horoscope, Lifestyle, Family, Interests).
- **Matchmaking Engine**: Preference-based filtering and compatibility algorithms.
- **Privacy & Security**: Photo blurring, restricted contact viewing, and "Report Member" features.
- **Trust Verification**: Cross-referencing with the `MemberModule` to ensure only verified members can participate.

## 2. Dynamic Growth & Scaling
Given the expected high volume of media and interaction:
- **Media Storage**: Dedicated integration with S3/R2 for high-resolution photos and horoscopes.
- **Interactions**: Like, Shortlist, and Connection request tracking.
- **Event-Driven**: Notifying users of new matches or viewed profiles via the `MessagingModule` (Firebase).

## 3. Data Isolation (PostgreSQL Schema)
Stored in the `matrimony_mod` schema:
- `profiles`: Core matchmaking data.
- `preferences`: User-defined search filters.
- `interactions`: Log of likes, blocks, and requests.
- `horoscopes`: Metadata for astronomical charts.

## 4. Synergy with Other Modules
- **Finance**: Payment for premium plans (e.g., unlimited contact viewing).
- **Members**: Identity validation.
- **IAM**: Access control based on verification status.
