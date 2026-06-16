# Gati Billing Demo

## Overview

Gati Billing Demo is a fully client-side invoice generation application built using HTML, Tailwind CSS, and vanilla JavaScript. The application provides a professional interface for creating, managing, and previewing invoices directly within the browser without requiring a backend server or database.

This project was created as a static demonstration of a billing and invoicing platform. All functionality is executed locally, and no user data is stored or transmitted.

---

## Features

### Authentication Demo

* Sign in interface
* Account creation interface
* Simulated authentication flow
* Protected navigation views

### Invoice Management

* Create professional invoices
* Add business information
* Add customer details
* Configure payment information
* Include delivery charges
* Add invoice notes

### Dynamic Line Items

* Add unlimited invoice items
* Remove existing items
* Automatic subtotal calculations
* Automatic grand total calculations
* Real-time updates while editing

### Invoice Preview

* Professional invoice layout
* Detailed billing information
* Payment details section
* Customer information section
* Itemized billing table
* Financial summary

### User Interface

* Responsive design
* Clean government-style design language
* Accessibility-focused form controls
* Mobile-friendly layout
* Smooth navigation between views

---

## Technology Stack

| Technology                       | Purpose               |
| -------------------------------- | --------------------- |
| HTML5                            | Application structure |
| Tailwind CSS                     | Styling and layout    |
| JavaScript (ES6)                 | Application logic     |
| Google Fonts (Plus Jakarta Sans) | Typography            |

---

## Project Structure

```text
index.html
│
├── Landing Page
├── Login View
├── Signup View
├── Dashboard View
├── Invoice Creation Form
├── Invoice Preview Page
│
├── Router Module
├── Authentication Module
└── Invoice Processing Engine
```

---

## Core Components

### Router

Handles navigation between application views without reloading the page.

Views available:

* Landing
* Login
* Signup
* Dashboard
* Create Invoice
* Invoice Preview

---

### Authentication Simulation

The authentication system is designed purely for demonstration purposes.

Capabilities:

* Login simulation
* Logout simulation
* Navigation state management
* Protected menu rendering

No credentials are validated or stored.

---

### Invoice Engine

Responsible for:

* Managing invoice items
* Calculating totals
* Rendering invoice previews
* Mapping form data into invoice templates

Calculations include:

```text
Subtotal = Sum of all line items

Line Item Total = Quantity × Unit Cost

Grand Total = Subtotal + Delivery Cost
```

---

## Invoice Fields

### Business Information

* Business Name
* Business Address
* Contact Number
* Email Address
* GST Number
* Logo Upload (disabled in demo)
* Signature Upload (disabled in demo)

### Customer Information

* Customer Name
* Customer Address
* Customer Phone
* Customer Email

### Invoice Information

* Invoice Number
* Invoice Date
* Due Date
* Delivery Cost
* Notes

### Payment Information

* Bank Name
* Account Name
* Account Number
* IFSC Code
* UPI ID

---

## Running the Project

### Option 1: Open Directly

Simply open the `index.html` file in any modern browser.

```text
Chrome
Edge
Firefox
Safari
```

No installation is required.

---

### Option 2: Local Development Server

Using VS Code Live Server:

```bash
# Install Live Server extension
# Right-click index.html
# Select "Open with Live Server"
```

---

## Demo Limitations

This project is intentionally designed as a static frontend demonstration.

Current limitations:

* No database integration
* No backend services
* No persistent storage
* No real authentication
* No PDF export
* No invoice saving
* Logo upload disabled
* Signature upload disabled

All data is cleared when the page is refreshed.

---

## Future Improvements

Potential enhancements include:

* User account management
* Database integration
* Invoice history
* PDF generation
* GST calculations
* Email invoice delivery
* Cloud storage
* Digital signatures
* Multi-user support
* Invoice templates
* Dashboard analytics

---

## Browser Compatibility

Tested and intended for modern browsers:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

---

## Purpose

This application serves as a frontend demonstration of an invoicing platform. It showcases invoice creation workflows, client-side calculations, and document rendering without requiring any backend infrastructure.

The project is suitable for UI demonstrations, prototyping, learning purposes, and frontend development showcases.

---

## License

This project is provided for demonstration and educational purposes. Modify and extend it according to your project requirements.
