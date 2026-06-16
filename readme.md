# Gati Billing Demo

## Overview

Gati Billing Demo is a static frontend demonstration of an invoicing and billing platform. It showcases the user interface, invoice creation workflow, invoice preview experience, and overall design of the application without requiring a backend server, database, or user account.

This repository is intended solely for demonstration, presentation, portfolio, and UI showcase purposes.

The full production version of Gati Billing contains additional functionality including authentication, persistent storage, invoice management, PDF generation, customer management, business profiles, and other backend services that are not included in this repository.

---

## Demo Features

### Landing Page

* Product introduction section
* Account creation interface
* Quick invoice creation access
* Responsive layout

### Authentication Screens

* Sign in page
* Create account page
* Simulated authentication workflow

### Invoice Dashboard

* Sample invoice listing
* Invoice status indicators
* Navigation between application views

### Invoice Creation

* Business information form
* Customer information form
* Invoice details section
* Payment information section
* Dynamic line item management

### Invoice Calculations

* Automatic line item totals
* Subtotal calculation
* Delivery cost calculation
* Grand total calculation

### Invoice Preview

* Professional invoice layout
* Customer and business information
* Itemized billing table
* Payment details section
* Notes section
* Invoice summary

---

## Technology Stack

| Technology           | Purpose                       |
| -------------------- | ----------------------------- |
| HTML5                | Application structure         |
| Tailwind CSS         | Styling and responsive layout |
| JavaScript (Vanilla) | Client-side functionality     |
| Google Fonts         | Typography                    |

---

## Project Structure

```text
.
└── index.html
```

All application logic, styling, routing, and invoice generation functionality are contained within a single HTML file for demonstration purposes.

---

## How It Works

The application operates entirely inside the browser.

* No backend server is required
* No database connection exists
* No user information is stored
* No invoices are saved permanently
* No files are uploaded or processed
* All calculations occur locally using JavaScript

Refreshing the page resets all entered information.

---

## Running the Demo

### Option 1

Open the `index.html` file directly in any modern web browser.

### Option 2

Run the project using a local development server.

Example using VS Code Live Server:

```bash
Right Click → Open with Live Server
```

---

## Limitations

This repository intentionally contains only the frontend demonstration version.

The following features are not included:

* Real authentication
* User accounts
* Database storage
* Invoice persistence
* PDF generation
* Business profile management
* Customer management
* File uploads
* Cloud storage
* Backend APIs

Any data entered into the application exists only for the current browser session.

---

## Relationship to the Production Application

This repository represents the public demo version of Gati Billing.

The complete production application is maintained separately and contains:

* Full backend implementation
* User authentication
* Business profile management
* Customer management
* Invoice history
* PDF export
* Payment information management
* Persistent data storage
* Administrative functionality

These features are intentionally excluded from this repository.

---

## Intended Use

This project is suitable for:

* UI demonstrations
* Product presentations
* Portfolio showcases
* Frontend development reference
* Design reviews
* Client previews

It is not intended for production billing operations.

---

## License

This repository is provided for demonstration and showcase purposes only.

All rights reserved.
