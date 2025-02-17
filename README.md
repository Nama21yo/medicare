# Medicare (Medical Scheduler)

## Overview
 **Medicare** is a web-based application that enables patients to book appointments with doctors efficiently. The system is managed by receptionists and streamlines the scheduling, updating, and coordination between patients and doctors. This project ensures a smooth and scalable booking process, reducing the burden on healthcare facilities and improving patient experience.

## Features
- **User Roles:** Patients, Doctors, and Receptionists.
- **Appointment Booking:** Patients can book appointments based on doctor availability.
- **Appointment Management:** Receptionists can approve, reschedule, or cancel appointments.
- **Doctor Dashboard:** Doctors can view upcoming appointments and patient details.
- **Notification System:** Patients and doctors receive real-time updates.
- **Authentication & Authorization:** Secure login system for different user roles.
- **Scalability & Performance:** Backend is designed for handling multiple requests efficiently.

## Tech Stack
### Backend - **NestJS**
The backend is built using **NestJS**, a progressive Node.js framework for building scalable server-side applications.

- **TypeScript-based:** Ensures better maintainability and robustness.
- **Modular Architecture:** Organized structure to support scalability.
- **REST API:** Provides well-structured endpoints for frontend integration.
- **Database:** Uses PostgreSQL with TypeORM for data management.
- **Authentication:** Implements JWT-based authentication for security.
- **Validation:** Uses class-validator for data validation.

### Frontend - **Vanilla TypeScript**
The frontend is developed using **Vanilla TypeScript** for lightweight and optimized performance.

- **DOM Manipulation:** Uses TypeScript to manage UI updates dynamically.
- **Fetch API:** Communicates with the backend REST API for data retrieval.
- **Form Validation:** Ensures users provide valid input before submission.
- **Minimal Dependencies:** No heavy frontend frameworks for better performance.

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (v18+ recommended)
- PostgreSQL (for database management)
- npm or yarn (for package management)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/appointment-booking.git
   cd appointment-booking/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   DATABASE_URL=postgres://user:password@localhost:5432/appointment_db
   JWT_SECRET=your_secret_key
   PORT=3000
   ```
4. Run migrations:
   ```sh
   npm run migration:run
   ```
5. Start the backend server:
   ```sh
   npm run start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend application:
   ```sh
   npm run start
   ```
