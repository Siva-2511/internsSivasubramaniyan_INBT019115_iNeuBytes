# internsSivasubramaniyan_INBT019115_iNeuBytes

> **iNeuBytes Web Development Internship — Final Submission**
> Intern: Sivasubramaniyan G | Reg. No.: INBT019115 | Course ID: WBINB20726

---

## About This Repository

This repository contains all internship project submissions for the **iNeuBytes Web Development Internship** program. The projects are organized into separate folders as required by the submission guidelines.

**Hospital Brand Used:** YourCare Hospital & Medical Center, Chennai

---

## Repository Structure

```
internsSivasubramaniyan_INBT019115_iNeuBytes/
│
├── healthcare-clinic-landing-page/          Task 1 — Clinic Landing Page
├── doctor-appointment-system/               Task 2 — Doctor Appointment Booking
├── healthcare-management-dashboard/         Task 3 — Healthcare Management Dashboard
└── healthcare-clinic-management-system/     Major Project — Full Stack (Node.js + Express)
```

---

## Task 1 — Healthcare / Clinic Landing Page

**Folder:** `healthcare-clinic-landing-page/`

A fully responsive clinic landing page for **YourCare Hospital & Medical Center**.

**Features:**
- Sticky navigation with scroll-spy active link highlighting
- Hero section with hospital statistics (15+ Years, 50+ Doctors, 20+ Departments)
- 24x7 Emergency helpline banner (1800-200-4567 / 044-24567890)
- 8 Medical Services cards with FREE OPD and Specialist badges
- 6 Doctor profiles including 3 Free OPD doctors
- Online enquiry form that generates unique token (ENQ-2026-XXXX)
- Fully responsive — mobile, tablet, desktop

**Tech Stack:** HTML5 · CSS3 · Vanilla JavaScript

**Run:** Open `healthcare-clinic-landing-page/index.html` in any browser

---

## Task 2 — Doctor Appointment Booking System

**Folder:** `doctor-appointment-system/`

A complete doctor appointment booking system with live search, filters, booking modals, printable OPD receipt slips, and appointment history.

**Features:**
- Live search by doctor name or department
- Dual filter — by Department and by Fee (Free / Paid / All)
- 10-doctor dataset including 3 Free OPD doctors (Rs.0 consultation)
- Time slot booking modal with date picker
- Printable OPD Appointment Receipt slip (APT-2026-XXXX)
- Appointment history with Cancel — persisted via LocalStorage

**Doctor Dataset:**

| Doctor | Department | Fee |
|---|---|---|
| Dr. Priya Nair | General OPD | FREE (Rs.0) |
| Dr. Mohan Das | General Medicine | FREE (Rs.0) |
| Dr. Anitha Kumar | Family Medicine | FREE (Rs.0) |
| Dr. Rajesh Sharma | Cardiology | Rs.500 |
| Dr. Sunita Patel | Neurology | Rs.600 |
| Dr. Karthik Rajan | Orthopedics | Rs.550 |
| Dr. Divya Menon | Pediatrics | Rs.400 |
| Dr. Arjun Nair | Dermatology | Rs.450 |
| Dr. Lakshmi Iyer | Gynecology | Rs.500 |
| Dr. Venkat Subramaniam | Emergency Medicine | FREE (Rs.0) |

**Tech Stack:** HTML5 · CSS3 · Vanilla JavaScript · LocalStorage API

**Run:** Open `doctor-appointment-system/index.html` in any browser

---

## Task 3 — Healthcare Management Dashboard

**Folder:** `healthcare-management-dashboard/`

A full hospital admin dashboard with KPI statistics and complete CRUD operations.

**Features:**
- KPI Stats: Total Doctors, Patients, Active Appointments, Departments
- Doctor Management — Add, Edit, Delete
- Patient Management — Add, Edit, Delete
- Appointment Management — Add, update status, delete
- Department Management — Add, Edit, Delete
- Printable reports

**Tech Stack:** HTML5 · CSS3 · Vanilla JavaScript · LocalStorage API

**Run:** Open `healthcare-management-dashboard/index.html` in any browser

---

## Major Project — Full Stack Healthcare & Clinic Management System

**Folder:** `healthcare-clinic-management-system/`

A complete full-stack healthcare management system with a Node.js + Express REST API backend, persistent JSON database, and three separate role-based dashboards.

### Project Structure

```
healthcare-clinic-management-system/
├── package.json
├── server.js                     Express REST API (Port 5000)
├── data/
│   └── db.json                   Persistent JSON database
└── public/
    ├── index.html                 Public landing page
    ├── login.html                 Multi-role login portal
    ├── register.html              Registration page
    ├── patient-dashboard.html     Patient portal
    ├── doctor-dashboard.html      Doctor portal
    ├── admin-dashboard.html       Admin portal
    ├── departments.html           Departments directory
    ├── contact.html               Emergency contact page
    ├── css/style.css
    └── js/
        ├── api.js
        ├── auth.js
        ├── patient-dashboard.js
        ├── doctor-dashboard.js
        └── admin-dashboard.js
```

### REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/login | Authenticate user |
| POST | /api/auth/register | Register new user |
| GET | /api/doctors | List all doctors |
| POST | /api/doctors | Add doctor (Admin) |
| PUT | /api/doctors/:id | Update doctor (Admin) |
| DELETE | /api/doctors/:id | Delete doctor (Admin) |
| GET | /api/patients | List patients (Admin) |
| DELETE | /api/patients/:id | Remove patient (Admin) |
| GET | /api/appointments | Get appointments |
| POST | /api/appointments | Book appointment (Patient) |
| PUT | /api/appointments/:id | Update status |
| DELETE | /api/appointments/:id | Cancel appointment |
| GET | /api/departments | List departments |
| POST | /api/departments | Add department (Admin) |
| GET | /api/prescriptions | Get prescriptions |
| POST | /api/prescriptions | Write prescription (Doctor) |
| GET | /api/analytics | System KPI stats (Admin) |

### Demo Login Accounts

| Role | Name | Email | Password |
|---|---|---|---|
| Administrator | Sivasubramaniyan G | admin@YourCare.org | admin123 |
| Doctor | Dr. Rajesh Sharma | rajesh@YourCare.org | doc123 |
| Patient | Sivasubramaniyan G | sivas@example.com | pat123 |

### Dashboards

**Patient Dashboard** — Book OPD appointments, print receipt slips, view appointment history, view prescriptions

**Doctor Dashboard** — View consultation queue, write diagnosis and prescriptions via Consult modal

**Admin Dashboard** — System analytics, full CRUD for Doctors/Patients/Appointments/Departments, CSV export, print reports

**Tech Stack:** Node.js · Express.js · REST API · HTML5 · CSS3 · Vanilla JavaScript · JSON Database · CORS

### How to Run

```bash
cd healthcare-clinic-management-system
npm install
npm start
# Open http://localhost:5000 in browser
# Use 1-Click Demo Login buttons on the login page
```

---

## Hospital Contact Details

| Field | Details |
|---|---|
| Hospital | YourCare Hospital & Medical Center |
| Address | 45 Health Avenue, Medical Enclave, Chennai, Tamil Nadu 600001 |
| Phone | 044-24567890 |
| Emergency | 1800-200-4567 (24x7) |
| Email | reception@YourCare-hospital.org |
| OPD Hours | Mon - Sat: 8:00 AM - 8:00 PM |

---

## Intern Details

| Field | Value |
|---|---|
| Name | Sivasubramaniyan G |
| Registration No. | INBT019115 |
| Course ID | WBINB20726 |
| Organization | iNeuBytes |
| Domain | Web Development (Full Stack) |

---

*iNeuBytes Internship Final Submission — August 2026*

