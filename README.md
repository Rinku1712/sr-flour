# Sanjay Atta (frontend)
npm install
npm run dev

## Contact, updates, and account setup

The contact, newsletter, and account forms send JSON `POST` requests only when their
service endpoint is configured. A successful message is shown only after the
configured endpoint returns an HTTP success status. No contact, newsletter, or
authentication backend is included in this repository.

Configure these Vite environment variables before launch:

| Variable | Purpose |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` | Contact form receiver |
| `VITE_NEWSLETTER_ENDPOINT` | Newsletter subscription service |
| `VITE_AUTH_LOGIN_ENDPOINT` | Sign-in service |
| `VITE_AUTH_REGISTER_ENDPOINT` | Account registration service |
| `VITE_AUTH_RESET_ENDPOINT` | Password reset service |
| `VITE_SUPPORT_EMAIL` | Verified support email shown on the contact and footer sections |
| `VITE_SUPPORT_PHONE` | Verified support phone |
| `VITE_BUSINESS_ADDRESS` | Verified business address |
| `VITE_BUSINESS_HOURS` | Verified support hours |
| `VITE_INSTAGRAM_URL` | Configured Instagram profile |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number with country code and no `+` |

The contact endpoint receives `{ name, email, phone?, subject, message }`.
The newsletter endpoint receives `{ email, consent: true }`. Authentication
endpoints receive the relevant name/email/password fields for each operation.
Endpoints must validate input and protect sensitive account operations on the
server. The current frontend has no signed-in session or account persistence;
authentication endpoints must be integrated with a secure session flow before
sign-in can provide authenticated account functionality.

Do not put private credentials in `VITE_*` variables; Vite exposes these values
to the browser. Contact details and social links are intentionally blank until
verified values are supplied.
