# Royal Medical Group Platform 🏥

A modern, fully integrated medical services platform for **Royal Medical laboratories**.

## 🌟 Features
-   **Arabic-First UI:** Fully RTL supported interface with modern medical aesthetics (Green/White/Cyan).
-   **Services Catalog:** Searchable list of medical tests with prices and categories.
-   **Specialized Clinics:** Directory of doctors with schedules and direct booking.
-   **Smart Booking:** Form that saves to MongoDB and redirects to WhatsApp for confirmation.
-   **Results Portal:** Secure patient access to lab results via Phone or ID.
-   **Admin Dashboard:** Management interface to add/edit doctors and tests.
-   **Fully Responsive:** Optimized for Mobile, Tablet, and Desktop.

## 🛠 Tech Stack
-   **Frontend:** React 18, Vite, Framer Motion, Lucide Icons.
-   **Backend:** Node.js, Express, Mongoose (MongoDB).
-   **Auth & Security:** Helmet, CORS, JWT-ready structure.

## 🚀 Quick Start (Local)

1.  **Start MongoDB:** Ensure you have MongoDB running on `mongodb://localhost:27017/royal-medical`.
2.  **Run the Launch Tool:**
    Double-click on `تشغيل_المنصة.bat` in the root folder.
    *This will:*
    -   Start the backend server on `http://localhost:5000`.
    -   Seed the database with initial data.
    -   Start the React development server on `http://localhost:5173`.

## 📁 Project Structure
-   `/src`: Frontend React components and pages.
-   `/server`: Backend API and database models.
-   `/server/seeder.js`: Initial data population script.
-   `/public/assets`: Project images and logos.

## 👩‍💻 Development
To add more doctors or tests, you can:
-   Modify `server/seeder.js` and run it again.
-   Use the `/dashboard` route in the browser.

---
© 2026 Royal Medical Group - Created with ♥ for Excellence in Medicine.
