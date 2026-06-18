# Gati Billing — Static Demo Build

This is a **static, front-end-only clone** of the Gati Billing Django application,
built for demo / portfolio purposes. There is no server, no database, and no
real authentication — everything is simulated in the browser using
`localStorage` (for logged-in accounts) and `sessionStorage` (for guest
invoices, which are cleared when the tab closes — same as the original app's
guest mode).

A 3-second loading screen appears the first time you open the site each
browser session, with a note that this is a demo build.

## How to run it

Because the pages use `fetch`-free, file-relative links (`href="invoices.html"`,
`<script src="js/db.js">`, etc.), you can either:

1. **Open `index.html` directly** by double-clicking it. Everything will work
   in modern browsers, though some browsers restrict `localStorage` for
   `file://` pages — if data doesn't seem to persist, use option 2.
2. **Serve it locally** (recommended) — from this folder run:
   ```
   python3 -m http.server 8000
   ```
   then open `http://localhost:8000` in your browser.
3. **Deploy it** to any static host (Netlify, Vercel, GitHub Pages, S3, etc.) —
   it's plain HTML/CSS/JS with no build step.

## What works

- Sign up / sign in / sign out (demo accounts, stored in this browser only)
- Business profiles: create, edit, delete (with blocking-invoice checks)
- Customer profiles: create, edit, delete (with cascade-delete option)
- Create invoice: business + customer selection, dynamic line items with
  live subtotal/total calculation, payment-detail auto-fill from the
  selected business
- Invoice list, invoice preview, and status updates (Draft → Sent → Paid, etc.)
- Guest "quick invoice" flow with its own preview page, no account required

## What's intentionally different from the live app

- No real server-side validation, security, or persistence — refreshing your
  OS/clearing browser data wipes everything
- PDF export is removed in this demo build (no backend to run WeasyPrint);
  the live application generates real PDF invoices
- Passwords are stored in plain text in `localStorage` — fine for a demo,
  never do this in production

## File structure

```
index.html                     Landing page (loading screen lives here too)
login.html / signup.html       Auth
guest_invoice.html             Guest "quick invoice" form
guest_invoice_preview.html     Guest invoice preview
invoices.html                  Logged-in invoice list
create_invoice.html            Logged-in invoice creation
invoice_preview.html           Logged-in invoice preview
update_status.html             Change invoice status
business_profile_list.html
business_profile_form.html
business_profile_delete.html
customer_profile_list.html
customer_profile_form.html
customer_profile_delete.html
css/main.css                   Shared utility styles + loader
js/db.js                       localStorage-backed mock "backend"
js/loader.js                   3-second splash screen
js/layout.js                   Shared header/footer + nav
js/main.js                     Line-item table, helpers, autofill
```

For the original, fully-functional Django application, contact the owner.
