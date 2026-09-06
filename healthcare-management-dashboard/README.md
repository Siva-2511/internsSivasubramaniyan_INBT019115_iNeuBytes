# YourCare Hospital - Healthcare Management Dashboard (Task 3)
**Course ID:** WBINB20726  
**Internship Task 3:** Healthcare Management Dashboard

---

## ðŸ“Œ Project Overview
The **YourCare Healthcare Management Dashboard** is a responsive, web-based hospital administration portal developed using HTML5, modern CSS3, and JavaScript (ES6+). It enables hospital administrators to manage doctors, patient medical records, OPD appointments, and clinical departments through a centralized interface with persistent `localStorage` CRUD operations, real-time statistics, search & filtering, and operational reporting.

---

## ðŸš€ Key Features

### 1. Admin Dashboard Overview
- **Dynamic Stats Cards**: Total Doctors on duty (including Free OPD doctors), Registered Patients, Total Appointments, and Active Departments with automatic calculations.
- **Recent OPD Appointments Table**: Live overview of latest booked consultations with status badges (*Confirmed*, *Completed*, *Cancelled*).
- **Department Load Distribution**: Visual progress indicators tracking doctor allocation across departments.
- **On-Duty Specialists Grid**: Quick preview cards for hospital physicians on shift.

### 2. Doctor Management (Full CRUD)
- **View Doctors**: Data table with Doctor ID, Name, Qualifications, Department, Experience, Consultation Fee, OPD Room, and Available Timings.
- **Add Doctor**: Modal form to add a new doctor to the roster.
- **Edit Doctor**: Update doctor details, room number, or fee.
- **Delete Doctor**: Remove doctor with safety confirmation prompt.
- **Multi-Filter**: Live search by name/room, filter by department, and filter by Fee Type (Free OPD â‚¹0 vs Paid Specialists).

### 3. Patient Management (Full CRUD)
- **View Patients**: Patient records table with Patient ID, Full Name, Age/Gender, Phone, Email, Blood Group, and Registration Date.
- **Register Patient**: Modal form to add a new patient.
- **Edit Patient**: Modify patient personal and contact information.
- **Delete Patient**: Remove patient record with confirmation.
- **Search & Filter**: Search by name/phone/email/ID and filter by gender.

### 4. Appointment Management (Full CRUD)
- **View Appointments**: Table with Appointment ID, Patient Name, Doctor, Department, Date & Time Slot, Fee, and Status.
- **Schedule Appointment**: Admin-side appointment booking with dynamic doctor selector and auto-filled fee.
- **Inline Status Update**: Quick dropdown to transition appointments between *Confirmed*, *Completed*, and *Cancelled*.
- **Delete Appointment**: Remove appointment record.
- **Search & Filter**: Real-time search and filter by status.

### 5. Department Management (Full CRUD)
- **View Departments**: Directory with Dept ID, Name, Head of Department (HOD), Doctor Count, Room Location, and Fee Type.
- **Add / Edit Department**: Modal dialog to create or update clinical departments.
- **Delete Department**: Remove department with confirmation.

### 6. Reports & Analytics Summary
- **Consultation Metrics**: Breakdown of total, Free General OPD, Paid Specialist, and completed appointments.
- **Printable Operations Report**: Styled `@media print` layout to print internal hospital summaries.

---

## ðŸŽ¨ Consistent Design System (Matching Tasks 1 & 2)
- **Color Theme**: Medical Emerald Green (`#059669`, `#10b981`), Deep Forest Slate (`#064e3b`, `#022c22`), Soft Mint Backgrounds (`#ecfdf5`), and Off-White surfaces (`#f8fafc`).
- **Zero Blue & No AI Cliches**.
- **Responsive Layout**: Desktop, Tablet, and Mobile drawer sidebar.

---

## ðŸ“‚ Project Structure
```
healthcare-management-dashboard/
â”œâ”€â”€ index.html        # Clean semantic dashboard layout, sidebar & modals
â”œâ”€â”€ style.css         # Professional emerald green dashboard styling & responsive tables
â”œâ”€â”€ script.js         # Full CRUD logic, statistics recalculations & localStorage
â””â”€â”€ README.md         # Detailed internship submission report
```

---

## ðŸ› ï¸ How to Run
1. Open the folder `healthcare-management-dashboard`.
2. Double-click `index.html` to open directly in any modern web browser.
3. No external build tools, Node.js, or complex setups required.

