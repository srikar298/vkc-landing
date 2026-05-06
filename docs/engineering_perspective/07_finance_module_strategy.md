# Finance & Payment Module Strategy

The **Finance Module** is a critical horizontal service that manages all monetary transactions, ledgers, and payment gateway integrations across the VKC ecosystem.

## 1. Core Responsibilities
- **Payment Gateway Integration**: Handling Razorpay/Stripe webhooks and session management.
- **Transaction Ledger**: A double-entry system to track every credit and debit (e.g., membership fees, donations).
- **Invoicing**: Generating and storing GST-compliant receipts for paid services.
- **Subscription Management**: Managing recurring payments for premium professional listings or matrimony features.

## 2. Integration with Onboarding
To ensure high-quality membership, the **Onboarding flow** will trigger a payment intent in the Finance module:
1. `MemberModule` collects registration data.
2. `MemberModule` calls `FinanceService.createPaymentIntent(amount, type: 'MEMBERSHIP')`.
3. Upon successful webhook verification, `FinanceModule` emits a `payment.succeeded` event.
4. `MemberModule` listens for this event and activates the Digital ID.

## 3. Data Isolation (PostgreSQL Schema)
All financial data is stored in the `finance_mod` schema to ensure strict access control and auditability.
- `transactions`: Log of all payment attempts and results.
- `ledgers`: Balance tracking for users and the organization.
- `invoices`: Metadata and links to generated PDF receipts.

## 4. Security
- **PCI Compliance**: No raw card data is stored locally; only tokens and gateway transaction IDs.
- **Audit Logs**: Every write operation in the `finance_mod` must be logged with an actor ID.
