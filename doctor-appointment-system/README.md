# YourCare Hospital - Doctor Appointment Booking System
**Course ID:** WBINB20726  
**Internship Task 2:** Doctor Appointment Booking System

---

## ðŸ“Œ Project Overview
The **YourCare Hospital Doctor Appointment Booking System** is a responsive web application designed for patients to discover on-duty doctors across clinical departments, check OPD timings and consultation fees (including Free General OPD), register appointments seamlessly, and manage their booking records with offline `localStorage` persistence.

---

## ðŸš€ Key Features

### 1. User Module & Navigation
- **Top Notice Bar**: Hospital emergency helplines, OPD timings, and hospital location.
- **Responsive Header & Navigation**: Smooth section scrolling and real-time active appointments counter badge.
- **Hospital Hero Section**: Quick doctor search, clinical departments dropdown, and OPD key statistics.
- **Clinical Departments**: Interactive department cards (General Medicine, Pediatrics, Cardiology, Dermatology, Orthopedics, Neurology, Ophthalmology, ENT) with 1-click filter activation.

### 2. Doctor Discovery & Filtering
- **Live Search**: Instant multi-attribute search by doctor name, qualification, or condition.
- **Multi-Level Filters**:
  - Filter by Department
  - Filter by Fee Type (Free OPD Doctors ₹0 vs Specialist Paid OPD)
  - Sort by Fee (Free to Low), Clinical Experience, or Patient Rating
- **Doctor Profile Cards**: Doctor details, clinical qualification, experience, OPD fee, rating, and available time slots.
- **Doctor Profile Modal**: Complete popup view showing clinical bio, OPD room location, and consultation hours.

### 3. Interactive OPD Appointment Booking
- **Doctor Auto-Select**: Choose doctor from card or dropdown with automatic department, room, and fee calculation.
- **Free vs Paid Support**: Handles ₹0 Free General OPD bookings as well as counter-payable specialist bookings.
- **Date & Slot Picker**: Past date prevention (`min` date = today) and interactive time slot selector chips (Morning, Afternoon, Evening).
- **Client-Side Form Validation**:
  - Mandatory doctor and time slot selection
  - Valid date verification
  - Patient Full Name (minimum 3 characters)
  - 10-digit mobile number validation
  - Standard email format checking
  - Age (1-120) and Gender validation

### 4. Appointment Confirmation & Printable Receipt
- **Unique Booking ID Generation**: Format `APT-2026-XXXX`.
- **Hospital Receipt Slip Modal**: Formatted OPD slip with patient and doctor details.
- **Print / Save as PDF**: Print-ready CSS (`@media print`) for patient physical slips.

### 5. Booking History Management (`localStorage` CRUD)
- **Local Persistence**: Appointments persist securely across page refreshes.
- **Status Tabs**: Filter by *All*, *Confirmed / Upcoming*, and *Cancelled*.
- **Instant Cancellation**: Cancel booked appointments with confirmation prompt.
- **Re-print Receipt**: Re-open receipt modal and print slip at any time from history.

---

## ðŸ“‚ Project Structure
```
doctor-appointment-system/
â”œâ”€â”€ index.html        # Semantic HTML5 layout and modal dialogs
â”œâ”€â”€ style.css         # Medical green theme, CSS Grid/Flexbox, responsive design
â”œâ”€â”€ script.js         # Core application logic, dataset, validation & localStorage
â””â”€â”€ README.md         # Project documentation for internship submission
```

---

## ðŸ’» Tech Stack
- **HTML5**: Semantic elements, accessible forms, modal dialogs
- **CSS3**: CSS Custom Properties, Flexbox, CSS Grid, Media queries, Print styling
- **JavaScript (ES6+)**: DOM manipulation, Array methods, LocalStorage API, Event handling
- **Typography & Icons**: Inter (Google Fonts) and Font Awesome 6

---

## ðŸ› ï¸ How to Run
1. Open the project folder `doctor-appointment-system`.
2. Double-click or open `index.html` in Google Chrome, Microsoft Edge, Firefox, or any modern web browser.
3. No build tools, Node.js, or complex installations are required.

