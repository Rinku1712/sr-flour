# SR Flour (frontend)
npm install
npm run dev

## Contact, updates, and account setup

The contact, newsletter, account, and order forms send JSON `POST` requests only
when their service endpoint is configured. A success message is shown only after
the configured endpoint returns an HTTP success status and, for orders, a valid
order response. No backend, database, payment processor, or authenticated session
is included in this repository.

Configure these Vite environment variables before launch:

| Variable | Purpose |
| --- | --- |
| `VITE_CONTACT_ENDPOINT` | Contact form receiver |
| `VITE_NEWSLETTER_ENDPOINT` | Newsletter subscription service |
| `VITE_AUTH_LOGIN_ENDPOINT` | Sign-in service |
| `VITE_AUTH_REGISTER_ENDPOINT` | Account registration service |
| `VITE_AUTH_RESET_ENDPOINT` | Password reset service |
| `VITE_ORDER_ENDPOINT` | Trusted order-creation service (required to place orders) |
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

The order endpoint receives `{ paymentMethod, customer, note, items }`, where
each item contains only `{ productId, variantId, qty }`. It must independently
validate the customer and item data, verify current product prices and stock,
calculate discounts, delivery, and totals, and create the order safely in its
database. The frontend sends an `Idempotency-Key` header so the service can
deduplicate retries. On success it must return HTTP 2xx with a JSON body shaped
as `{ "order": { "id", "placedAt", "status", "customer", "items", "subtotal",
"savings", "delivery", "total" } }`; each item must include `productId`, `name`,
`variantId`, `weight`, `qty`, and `price`; customer must include `name`, `email`,
`address`, `city`, `state`, and `postalCode`. Amounts are non-negative numbers in rupees and
`placedAt` must be a parseable timestamp. Configure CORS to allow the deployed
site origin and the `Content-Type` and `Idempotency-Key` request headers. The
frontend does not treat a local cart, a successful HTTP status without a valid
order response, or a COD order as proof of payment.

Do not put private credentials in `VITE_*` variables; Vite exposes these values
to the browser. Contact details and social links are intentionally blank until
verified values are supplied.
