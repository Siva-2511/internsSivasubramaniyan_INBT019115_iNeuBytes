# YourCare Hospital - Healthcare & Clinic Management System (Major Project)
**Course ID:** WBINB20726  
**Internship Project:** Major Project — Full Stack Healthcare / Clinic Management System

---

## 📌 Project Overview
The **YourCare Healthcare & Clinic Management System** is a complete, full-stack web application developed using **Node.js, Express.js REST APIs, JSON Database persistence, semantic HTML5, modern CSS3, and JavaScript (ES6+)**.

The project implements **Role-Based Access Control (RBAC)** with separate modules and dashboards for:
1. **Registered Patients**: Profile management, OPD appointment booking (Free General OPD ₹0 & Specialist OPD), appointment history tracking with printable slips, and electronic medical prescription records.
2. **Consultant Doctors**: Outpatient consultation queue, patient status updates (*Confirmed*, *Completed*, *Cancelled*), clinical diagnosis recording, and electronic prescription writing.
3. **Hospital Administrators**: Full hospital operations dashboard with real-time analytics, Doctor Management (Full CRUD), Patient Records Management (Full CRUD), Appointment Management (Full CRUD & CSV Export), Department Directory (Full CRUD), dynamic notification center, and printable administrative reports.

---

## 🚀 Key Modules & Features

### 1. Backend REST API (`server.js` & `data/db.json`)
- Built with **Node.js** and **Express.js** providing a complete suite of REST endpoints:
  - `POST /api/auth/login` - Role-based authentication (Admin, Doctor, Patient).
  - `POST /api/auth/register` - User registration with role assignment.
  - `GET /api/doctors`, `POST /api/doctors`, `PUT /api/doctors/:id`, `DELETE /api/doctors/:id` - Doctor CRUD with filters & photo avatar management.
  - `GET /api/patients`, `POST /api/patients`, `PUT /api/patients/:id`, `DELETE /api/patients/:id` - Patient records CRUD & photo avatar management.
  - `GET /api/appointments`, `POST /api/appointments`, `PATCH /api/appointments/:id/status`, `DELETE /api/appointments/:id` - Appointment desk, status transitions, and patient avatar integration.
  - `GET /api/departments`, `POST /api/departments` - Clinical specialties directory.
  - `GET /api/prescriptions`, `POST /api/prescriptions` - Electronic prescription recording.
  - `GET /api/analytics` - Global hospital KPIs & load distribution.
- **Relational Storage**: `data/db.json` stores all users, doctors, patients, appointments, departments, and prescriptions with persistent file I/O.

### 2. Multi-Role Authentication & Access Control
- **Login Portal (`login.html`)**: Separate tabs for Patient, Doctor, and Admin logins with **1-Click Quick Demo Login buttons** for evaluation.
- **Registration Portal (`register.html`)**: Separate patient and doctor registration forms with real-time validation.
- **Session Security (`js/auth.js`)**: Route guard protecting dashboards based on user role.

### 3. Patient Self-Service Portal (`patient-dashboard.html`)
- Patient profile banner with medical care metadata and **Profile Picture Upload & Deletion** functionality.
- Interactive OPD appointment booking modal with dynamic doctor selector, time slot chips, and automated fee calculation (Free ₹0 vs Paid).
- **Auto-Closing Receipt Slip**: Displays confirmation modal with auto-"Done" navigation after confirming appointment.
- My Appointments list with inline status tracking, cancellation, and printable digital receipts (`APT-2026-XXXX`).
- Electronic Medical Records & Prescriptions diagnosed by hospital physicians.

### 4. Doctor Outpatient Portal (`doctor-dashboard.html`)
- Doctor profile header with real-time queue counters and profile picture photo update/delete support.
- Live Patient Consultation Queue with status filters (*All*, *Confirmed*, *Completed*) featuring **Patient Profile Photo Thumbnails**.
- **Consult & Prescribe Modal**: Allows doctors to record clinical diagnoses, write medication dosages, and add follow-up instructions directly saved to patient files.

### 5. Administrator Portal (`admin-dashboard.html`)
- **System Overview**: Live KPI stat cards (Doctors, Free OPD Staff, Patients, Active Bookings, Clinical Depts), recent appointment feeds, and department load progress bars.
- **Dynamic Notification Center**: Real-time administrative feed auto-refreshing every 30 seconds using live `/api/appointments` and `/api/prescriptions` data with accurate timestamps.
- **Manage Doctors (Full CRUD)**: Add, edit, delete, search, and filter doctors by department and fee.
- **Manage Patients (Full CRUD)**: Register, update, delete, search, and filter patients by gender.
- **Appointment Desk (Full CRUD)**: Book consultations, inline status updates (*Confirmed* ➔ *Completed* ➔ *Cancelled*), search, and **Export to CSV**.
- **Department Management**: Directory of 8 clinical specialties with HODs and room allocations.
- **Reports & Analytics**: Free vs Paid consultation metrics and 1-click printable administrative reports.

### 6. Interactive Web Speech API Voice Assistant (`js/voice-assistant.js`)
- Hands-free voice control across all application pages with persistent session state (`sessionStorage`).
- Voice commands include:
  - **"YourCare" / "Home"**: Instant navigation to the homepage.
  - **"List Doctors"**: Shows available duty doctors.
  - **"Select Doctor" / "Book Appointment"**: Opens OPD appointment booking.
  - **Reason / Symptoms Dictation**: Direct speech-to-text input into the symptoms form field.

### 7. Unified Branding System (`logo.png`)
- Custom high-resolution brand logo integrated across all portals and sub-projects (`doctor-appointment-system`, `healthcare-clinic-landing-page`, `healthcare-management-dashboard`).

---

## 🎨 Consistent Design System (Matching Tasks 1, 2 & 3)
- **Palette**: Medical Emerald Green (`#059669`, `#10b981`), Deep Forest Slate (`#064e3b`, `#022c22`), Soft Mint Backgrounds (`#ecfdf5`), and Off-White surfaces (`#f8fafc`).
- **Zero Blue & No AI Cliches**.
- **Branding**: *YourCare Hospital & Medical Center*, Chennai (`044-24567890`).

---

## 📁 Project Structure
```
healthcare-clinic-management-system/
├── package.json                       # Node.js dependencies (express, cors)
├── server.js                          # Express.js backend REST API server
├── data/
│   └── db.json                        # Relational database file (Users, Doctors, Patients, Appointments, Depts, Prescriptions)
├── public/
│   ├── index.html                     # Hospital Home Landing Page
│   ├── login.html                     # Dedicated Login Page with role tabs & demo buttons
│   ├── register.html                  # Dedicated Registration Page
│   ├── patient-dashboard.html         # Dedicated Patient Medical Portal
│   ├── doctor-dashboard.html          # Dedicated Doctor Consultation Portal
│   ├── admin-dashboard.html           # Dedicated Hospital Administrator Portal
│   ├── departments.html               # Medical Specialties Directory
│   ├── contact.html                   # 24x7 Emergency Contact & Enquiry
│   ├── images/                        # Assets & hospital logo.png
│   ├── css/
│   │   └── style.css                  # Unified Medical Emerald Green stylesheet
│   └── js/
│       ├── api.js                     # Centralized REST API Fetch client
│       ├── auth.js                    # Role session manager & route guard
│       ├── voice-assistant.js         # Interactive Speech Recognition Controller
│       ├── patient-dashboard.js       # Patient dashboard logic & modal booking
│       ├── doctor-dashboard.js        # Doctor queue controller & prescription writer
│       └── admin-dashboard.js         # Admin full CRUD controller, live notifications & CSV export
└── README.md                          # Full Major Project technical submission report
```

---

## 🛠️ How to Run
1. Open a terminal inside the project directory:
   ```bash
   cd D:\Download\task2\healthcare-clinic-management-system
   ```
2. Start the Node.js backend server:
   ```bash
   npm start
   ```
3. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```
4. **Default Credentials for Evaluation**:
   - **Admin:** `admin@YourCare.org` / `admin123` (or click "Admin (Sivasubramaniyan G)" demo button on `login.html`)
   - **Doctor:** `rajesh@YourCare.org` / `doc123` (or click "Doctor (Dr. Rajesh Sharma)" demo button)
   - **Patient:** `sivas@example.com` / `pat123` (or click "Patient (Sivasubramaniyan G)" demo button)
