/**
 * YourCare Hospital - Healthcare Management Dashboard (Task 3)
 * Full CRUD Operations, LocalStorage Persistence & Dynamic Statistics
 */

// ==========================================
// 1. DEFAULT DATASETS (Matched with Tasks 1 & 2)
// ==========================================
const DEFAULT_DOCTORS = [
    {
        id: "DOC-101",
        name: "Dr. Meenakshi Sundaram",
        department: "General Medicine",
        qualification: "MBBS, MD (Internal Medicine)",
        experience: 12,
        fee: 0, // Free OPD
        room: "General OPD Room 101, Ground Floor",
        gender: "female",
        slots: "08:00 AM, 09:30 AM, 11:30 AM, 04:00 PM",
        bio: "Senior Medical Officer conducting daily Free General OPD consultations."
    },
    {
        id: "DOC-102",
        name: "Dr. Ramesh Balaji",
        department: "General Medicine",
        qualification: "MBBS, DNB (Family Medicine)",
        experience: 7,
        fee: 0, // Free OPD
        room: "Primary Care OPD, Room 103",
        gender: "male",
        slots: "08:30 AM, 10:00 AM, 02:00 PM, 04:30 PM",
        bio: "Family Physician handling general health complaints & pathology reports."
    },
    {
        id: "DOC-103",
        name: "Dr. K. Radhakrishnan",
        department: "Pediatrics",
        qualification: "MBBS, DCH (Child Health)",
        experience: 9,
        fee: 0, // Free OPD
        room: "Charitable Child OPD, Room 105",
        gender: "male",
        slots: "09:00 AM, 11:00 AM, 03:00 PM, 05:00 PM",
        bio: "Dedicated Pediatrician providing Free Child OPD care and infant vaccination."
    },
    {
        id: "DOC-104",
        name: "Dr. Rajesh Sharma",
        department: "Cardiology",
        qualification: "MBBS, MD, DM (Cardiology)",
        experience: 14,
        fee: 600,
        room: "Cardiology OPD Room 201, 2nd Floor",
        gender: "male",
        slots: "09:00 AM, 10:30 AM, 02:00 PM, 04:30 PM",
        bio: "Senior Consultant Cardiologist specializing in ECG and hypertension control."
    },
    {
        id: "DOC-105",
        name: "Dr. Priya Nair",
        department: "Dermatology",
        qualification: "MBBS, MD (Dermatology)",
        experience: 9,
        fee: 500,
        room: "Skin Care Clinic, Room 204",
        gender: "female",
        slots: "10:00 AM, 11:30 AM, 03:00 PM, 05:00 PM",
        bio: "Specialist Dermatologist treating skin allergies, eczema, and hair loss."
    },
    {
        id: "DOC-106",
        name: "Dr. Arun Venkataraman",
        department: "Orthopedics",
        qualification: "MBBS, MS (Ortho), M.Ch",
        experience: 16,
        fee: 700,
        room: "Bone & Joint Clinic, Room 108",
        gender: "male",
        slots: "08:30 AM, 11:00 AM, 02:30 PM, 04:00 PM",
        bio: "Senior Orthopedic Surgeon handling joint pain, fracture stabilization, and arthritis."
    },
    {
        id: "DOC-107",
        name: "Dr. Suresh Menon",
        department: "Neurology",
        qualification: "MBBS, MD, DM (Neurology)",
        experience: 18,
        fee: 800,
        room: "Neuro Sciences Dept, Room 301",
        gender: "male",
        slots: "10:30 AM, 12:00 PM, 03:30 PM, 06:00 PM",
        bio: "Consultant Neurologist managing chronic migraines, stroke recovery, and vertigo."
    },
    {
        id: "DOC-108",
        name: "Dr. Shalini Rao",
        department: "ENT",
        qualification: "MBBS, MS (ENT)",
        experience: 10,
        fee: 450,
        room: "ENT Clinic, Room 205",
        gender: "female",
        slots: "10:00 AM, 12:00 PM, 03:00 PM, 05:00 PM",
        bio: "Specialist ENT Surgeon treating sinus problems and hearing difficulties."
    },
    {
        id: "DOC-69",
        name: "Dr. Sivasubramaniyan G",
        department: "Cardiology",
        qualification: "MBBS, MS (Cardiology)",
        experience: 20,
        fee: 500,
        room: "Cardiology Clinic, Room 420",
        gender: "male",
        slots: "08:00 AM, 10:00 AM, 12:00 PM, 02:00 PM, 04:00 PM, 06:00 PM",
        bio: "Senior Consultant Cardiologist specializing in echocardiography, preventative cardiac care, hypertension control, and post-stent management."
    }
];

const DEFAULT_PATIENTS = [
    {
        id: "PAT-801",
        name: "Siva",
        age: 24,
        gender: "Male",
        phone: "9876543210",
        email: "sivas@example.com",
        bloodGroup: "O+",
        regDate: "2026-08-18"
    },
    {
        id: "PAT-802",
        name: "Ramesh Kumar",
        age: 36,
        gender: "Male",
        phone: "9845123456",
        email: "ramesh.k@example.com",
        bloodGroup: "B+",
        regDate: "2026-08-19"
    },
    {
        id: "PAT-803",
        name: "Priya Swaminathan",
        age: 29,
        gender: "Female",
        phone: "9765432109",
        email: "priya.s@example.com",
        bloodGroup: "A+",
        regDate: "2026-08-20"
    },
    {
        id: "PAT-804",
        name: "V. Narayanan",
        age: 58,
        gender: "Male",
        phone: "9444123456",
        email: "narayanan.v@example.com",
        bloodGroup: "AB+",
        regDate: "2026-08-20"
    }
];

const DEFAULT_APPOINTMENTS = [
    {
        id: "APT-2026-1042",
        patientName: "Siva",
        patientPhone: "9876543210",
        doctorName: "Dr. Meenakshi Sundaram",
        department: "General Medicine",
        date: "2026-08-22",
        timeSlot: "09:30 AM",
        fee: 0,
        status: "Confirmed"
    },
    {
        id: "APT-2026-2184",
        patientName: "Ramesh Kumar",
        patientPhone: "9845123456",
        doctorName: "Dr. Rajesh Sharma",
        department: "Cardiology",
        date: "2026-08-21",
        timeSlot: "10:30 AM",
        fee: 600,
        status: "Confirmed"
    },
    {
        id: "APT-2026-3491",
        patientName: "Priya Swaminathan",
        patientPhone: "9765432109",
        doctorName: "Dr. K. Radhakrishnan",
        department: "Pediatrics",
        date: "2026-08-20",
        timeSlot: "11:00 AM",
        fee: 0,
        status: "Completed"
    },
    {
        id: "APT-2026-4820",
        patientName: "V. Narayanan",
        patientPhone: "9444123456",
        doctorName: "Dr. Arun Venkataraman",
        department: "Orthopedics",
        date: "2026-08-20",
        timeSlot: "02:30 PM",
        fee: 700,
        status: "Completed"
    }
];

const DEFAULT_DEPARTMENTS = [
    { id: "DEP-01", name: "General Medicine", hod: "Dr. Meenakshi Sundaram", doctorsCount: 2, location: "Block A, Ground Floor", feeType: "Free General OPD" },
    { id: "DEP-02", name: "Pediatrics", hod: "Dr. K. Radhakrishnan", doctorsCount: 1, location: "Block A, 1st Floor", feeType: "Free General OPD" },
    { id: "DEP-03", name: "Cardiology", hod: "Dr. Rajesh Sharma", doctorsCount: 1, location: "Block B, 2nd Floor", feeType: "Specialist OPD" },
    { id: "DEP-04", name: "Dermatology", hod: "Dr. Priya Nair", doctorsCount: 1, location: "Block B, 2nd Floor", feeType: "Specialist OPD" },
    { id: "DEP-05", name: "Orthopedics", hod: "Dr. Arun Venkataraman", doctorsCount: 1, location: "Block C, 1st Floor", feeType: "Specialist OPD" },
    { id: "DEP-06", name: "Neurology", hod: "Dr. Suresh Menon", doctorsCount: 1, location: "Block C, 3rd Floor", feeType: "Specialist OPD" },
    { id: "DEP-07", name: "Ophthalmology", hod: "Dr. Karthik Iyer", doctorsCount: 1, location: "Block B, 1st Floor", feeType: "Specialist OPD" },
    { id: "DEP-08", name: "ENT", hod: "Dr. Shalini Rao", doctorsCount: 1, location: "Block B, 2nd Floor", feeType: "Specialist OPD" },
    { id: "DEP-09", name: "Cardiology", hod: "Dr. Sivasubramaniyan G", doctorsCount: 1, location: "Block D, 2nd Floor", feeType: "Specialist OPD" }
];

// LocalStorage Keys
const KEY_DOCS = "YourCare_admin_doctors";
const KEY_PATS = "YourCare_admin_patients";
const KEY_APTS = "YourCare_admin_appointments";
const KEY_DEPTS = "YourCare_admin_departments";

// State
let doctors = [];
let patients = [];
let appointments = [];
let departments = [];

// ==========================================
// 2. INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Load Data
    loadStateFromStorage();

    // 2. Setup Date in Header
    setupCurrentDateDisplay();

    // 3. Render Dashboard Views
    renderDashboardOverview();
    renderDoctorsTable();
    renderPatientsTable();
    renderAppointmentsTable();
    renderDepartmentsTable();
    renderReportsView();

    // 4. Setup Event Handlers
    setupNavigationHandlers();
    setupSearchAndFilterHandlers();
    setupCRUDModals();
});

function loadStateFromStorage() {
    doctors = JSON.parse(localStorage.getItem(KEY_DOCS)) || DEFAULT_DOCTORS;
    patients = JSON.parse(localStorage.getItem(KEY_PATS)) || DEFAULT_PATIENTS;
    appointments = JSON.parse(localStorage.getItem(KEY_APTS)) || DEFAULT_APPOINTMENTS;
    departments = JSON.parse(localStorage.getItem(KEY_DEPTS)) || DEFAULT_DEPARTMENTS;

    saveAllToStorage();
    updateSidebarBadges();
}

function saveAllToStorage() {
    localStorage.setItem(KEY_DOCS, JSON.stringify(doctors));
    localStorage.setItem(KEY_PATS, JSON.stringify(patients));
    localStorage.setItem(KEY_APTS, JSON.stringify(appointments));
    localStorage.setItem(KEY_DEPTS, JSON.stringify(departments));
    updateSidebarBadges();
}

function updateSidebarBadges() {
    document.getElementById("sidebarDocBadge").textContent = doctors.length;
    document.getElementById("sidebarPatientBadge").textContent = patients.length;
    document.getElementById("sidebarAptBadge").textContent = appointments.filter(a => a.status === "Confirmed").length;
}

function setupCurrentDateDisplay() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = today.toLocaleDateString('en-US', options);
    const dateElem = document.getElementById("currentDateStr");
    if (dateElem) dateElem.textContent = dateStr;
}

// ==========================================
// 3. NAVIGATION & VIEW SWITCHER
// ==========================================
function switchView(viewName) {
    // Hide all view panels
    document.querySelectorAll(".view-panel").forEach(p => p.classList.remove("active"));

    // Show targeted panel
    const targetPanel = document.getElementById(`${viewName}-view`);
    if (targetPanel) targetPanel.classList.add("active");

    // Update active nav-item
    document.querySelectorAll(".sidebar-menu .nav-item").forEach(item => {
        if (item.getAttribute("data-view") === viewName) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Update header title
    const titles = {
        dashboard: "Dashboard Overview",
        doctors: "Doctor Management",
        patients: "Patient Records & Management",
        appointments: "OPD Appointment Desk",
        departments: "Medical Department Directory",
        reports: "Hospital Reports & Operational Analytics"
    };
    const titleElem = document.getElementById("currentPageTitle");
    if (titleElem) titleElem.textContent = titles[viewName] || "Dashboard";

    // Close mobile sidebar if open
    document.getElementById("sidebar").classList.remove("open");

    // Refresh views data
    if (viewName === "dashboard") renderDashboardOverview();
    if (viewName === "doctors") renderDoctorsTable();
    if (viewName === "patients") renderPatientsTable();
    if (viewName === "appointments") renderAppointmentsTable();
    if (viewName === "departments") renderDepartmentsTable();
    if (viewName === "reports") renderReportsView();
}

function setupNavigationHandlers() {
    document.querySelectorAll(".sidebar-menu .nav-item").forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const view = item.getAttribute("data-view");
            switchView(view);
        });
    });

    // Mobile Sidebar Toggle
    const menuToggleBtn = document.getElementById("menuToggleBtn");
    const sidebarCloseBtn = document.getElementById("sidebarCloseBtn");
    const sidebar = document.getElementById("sidebar");

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener("click", () => sidebar.classList.add("open"));
    }
    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener("click", () => sidebar.classList.remove("open"));
    }

    // Quick Add Dropdown Toggle
    const quickAddBtn = document.getElementById("quickAddBtn");
    const quickAddMenu = document.getElementById("quickAddMenu");
    if (quickAddBtn && quickAddMenu) {
        quickAddBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            quickAddMenu.classList.toggle("show");
        });
        document.addEventListener("click", () => quickAddMenu.classList.remove("show"));
    }

    // Quick Add Items
    document.getElementById("quickAddDoctor").addEventListener("click", () => { openDoctorModal(); });
    document.getElementById("quickAddPatient").addEventListener("click", () => { openPatientModal(); });
    document.getElementById("quickAddAppointment").addEventListener("click", () => { openAppointmentModal(); });
    document.getElementById("quickAddDept").addEventListener("click", () => { openDeptModal(); });
}

// ==========================================
// 4. VIEW 1: DASHBOARD HOME RENDERING
// ==========================================
function renderDashboardOverview() {
    // Stats Numbers
    const totalDocs = doctors.length;
    const freeDocs = doctors.filter(d => d.fee === 0).length;
    const totalPats = patients.length;
    const totalApts = appointments.length;
    const confirmedApts = appointments.filter(a => a.status === "Confirmed").length;

    document.getElementById("statTotalDoctors").textContent = totalDocs;
    document.getElementById("statFreeDoctors").textContent = freeDocs;
    document.getElementById("statTotalPatients").textContent = totalPats;
    document.getElementById("statNewPatientsToday").textContent = Math.min(totalPats, 2);
    document.getElementById("statTotalAppointments").textContent = totalApts;
    document.getElementById("statConfirmedApt").textContent = confirmedApts;
    document.getElementById("statTotalDepts").textContent = departments.length;

    // Recent Appointments Table
    const recentTableBody = document.getElementById("recentAppointmentsTableBody");
    recentTableBody.innerHTML = "";

    const recentList = appointments.slice(0, 5);
    if (recentList.length === 0) {
        recentTableBody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding: 1.5rem; color: #64748b;">No recent appointments</td></tr>`;
    } else {
        recentList.forEach(apt => {
            const tr = document.createElement("tr");
            const statusClass = apt.status === "Confirmed" ? "status-confirmed" : (apt.status === "Completed" ? "status-completed" : "status-cancelled");
            const feeDisplay = apt.fee === 0 ? `<strong style="color: var(--brand-green);">FREE</strong>` : `â‚¹${apt.fee}`;

            tr.innerHTML = `
                <td><strong>${apt.id}</strong></td>
                <td>${apt.patientName}</td>
                <td>${apt.doctorName}</td>
                <td><span class="status-pill status-confirmed">${apt.department}</span></td>
                <td>${apt.date} &bull; ${apt.timeSlot}</td>
                <td>${feeDisplay}</td>
                <td><span class="status-pill ${statusClass}">${apt.status}</span></td>
            `;
            recentTableBody.appendChild(tr);
        });
    }

    // Department Distribution Progress List
    const deptListElem = document.getElementById("deptDistributionList");
    deptListElem.innerHTML = "";

    departments.slice(0, 5).forEach(dept => {
        const docCount = doctors.filter(d => d.department.toLowerCase() === dept.name.toLowerCase()).length;
        const percentage = totalDocs > 0 ? Math.round((docCount / totalDocs) * 100) : 0;

        const item = document.createElement("div");
        item.className = "dept-load-item";
        item.innerHTML = `
            <div class="dept-load-header">
                <strong>${dept.name}</strong>
                <span>${docCount} Doctors (${percentage}%)</span>
            </div>
            <div class="dept-load-bar">
                <div class="dept-load-fill" style="width: ${Math.max(percentage, 15)}%;"></div>
            </div>
        `;
        deptListElem.appendChild(item);
    });

    // Available Doctors Quick Grid
    const onDutyGrid = document.getElementById("onDutyDoctorsGrid");
    onDutyGrid.innerHTML = "";
    doctors.slice(0, 4).forEach(doc => {
        const card = document.createElement("div");
        card.className = "on-duty-card";
        const feeText = doc.fee === 0 ? "FREE OPD" : `â‚¹${doc.fee}`;

        card.innerHTML = `
            <div class="on-duty-avatar">
                <i class="fa-solid ${doc.gender === 'female' ? 'fa-user-nurse' : 'fa-user-doctor'}"></i>
            </div>
            <div class="on-duty-info">
                <h4>${doc.name}</h4>
                <span>${doc.department} &bull; <strong>${feeText}</strong></span>
            </div>
        `;
        onDutyGrid.appendChild(card);
    });
}

// ==========================================
// 5. VIEW 2: DOCTOR MANAGEMENT (CRUD)
// ==========================================
function renderDoctorsTable() {
    const tableBody = document.getElementById("doctorsTableBody");
    const searchVal = document.getElementById("doctorSearchInput").value.trim().toLowerCase();
    const deptVal = document.getElementById("doctorDeptFilter").value;
    const feeVal = document.getElementById("doctorFeeTypeFilter").value;

    let filtered = doctors.filter(doc => {
        const matchesSearch = !searchVal ||
            doc.name.toLowerCase().includes(searchVal) ||
            doc.qualification.toLowerCase().includes(searchVal) ||
            doc.department.toLowerCase().includes(searchVal) ||
            doc.room.toLowerCase().includes(searchVal);

        const matchesDept = deptVal === "All" || doc.department.toLowerCase() === deptVal.toLowerCase();

        let matchesFee = true;
        if (feeVal === "Free") matchesFee = doc.fee === 0;
        if (feeVal === "Paid") matchesFee = doc.fee > 0;

        return matchesSearch && matchesDept && matchesFee;
    });

    tableBody.innerHTML = "";
    document.getElementById("doctorsCountBar").textContent = `Showing ${filtered.length} of ${doctors.length} doctors`;

    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding: 2rem; color: #64748b;">No doctors found matching filters.</td></tr>`;
        return;
    }

    filtered.forEach(doc => {
        const tr = document.createElement("tr");
        const feeDisplay = doc.fee === 0 ? `<strong style="color: var(--brand-green);"><i class="fa-solid fa-gift"></i> FREE OPD</strong>` : `<strong>â‚¹${doc.fee}</strong>`;

        tr.innerHTML = `
            <td><strong>${doc.id}</strong></td>
            <td>
                <strong>${doc.name}</strong>
                <div style="font-size: 0.75rem; color: #64748b;">${doc.qualification}</div>
            </td>
            <td><span class="status-pill status-confirmed">${doc.department}</span></td>
            <td>${doc.experience} Years</td>
            <td>${feeDisplay}</td>
            <td>${doc.room}</td>
            <td><span style="font-size: 0.775rem; color: #475569;">${doc.slots}</span></td>
            <td>
                <div class="action-btn-group">
                    <button class="btn-icon-action" onclick="editDoctor('${doc.id}')" title="Edit Doctor Details">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-icon-action delete" onclick="deleteDoctor('${doc.id}')" title="Delete Doctor">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function openDoctorModal(doc = null) {
    const modal = document.getElementById("doctorModal");
    const title = document.getElementById("doctorModalTitle");
    const editId = document.getElementById("docEditId");

    if (doc) {
        title.innerHTML = `<i class="fa-solid fa-user-pen"></i> Edit Doctor Details`;
        editId.value = doc.id;
        document.getElementById("docName").value = doc.name;
        document.getElementById("docDept").value = doc.department;
        document.getElementById("docQual").value = doc.qualification;
        document.getElementById("docExp").value = doc.experience;
        document.getElementById("docFee").value = doc.fee;
        document.getElementById("docRoom").value = doc.room;
        document.getElementById("docGender").value = doc.gender;
        document.getElementById("docSlots").value = doc.slots;
        document.getElementById("docBio").value = doc.bio || "";
    } else {
        title.innerHTML = `<i class="fa-solid fa-user-doctor"></i> Add New Doctor`;
        editId.value = "";
        document.getElementById("doctorForm").reset();
    }

    modal.classList.add("active");
}

function editDoctor(docId) {
    const found = doctors.find(d => d.id === docId);
    if (found) openDoctorModal(found);
}

function deleteDoctor(docId) {
    if (confirm(`Are you sure you want to remove doctor with ID ${docId}?`)) {
        doctors = doctors.filter(d => d.id !== docId);
        saveAllToStorage();
        renderDoctorsTable();
        renderDashboardOverview();
    }
}

// ==========================================
// 6. VIEW 3: PATIENT MANAGEMENT (CRUD)
// ==========================================
function renderPatientsTable() {
    const tableBody = document.getElementById("patientsTableBody");
    const searchVal = document.getElementById("patientSearchInput").value.trim().toLowerCase();
    const genderVal = document.getElementById("patientGenderFilter").value;

    let filtered = patients.filter(pat => {
        const matchesSearch = !searchVal ||
            pat.name.toLowerCase().includes(searchVal) ||
            pat.phone.includes(searchVal) ||
            pat.email.toLowerCase().includes(searchVal) ||
            pat.id.toLowerCase().includes(searchVal);

        const matchesGender = genderVal === "All" || pat.gender === genderVal;
        return matchesSearch && matchesGender;
    });

    tableBody.innerHTML = "";
    document.getElementById("patientsCountBar").textContent = `Showing ${filtered.length} of ${patients.length} patients`;

    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding: 2rem; color: #64748b;">No patients found matching filters.</td></tr>`;
        return;
    }

    filtered.forEach(pat => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${pat.id}</strong></td>
            <td><strong>${pat.name}</strong></td>
            <td>${pat.age} Yrs / ${pat.gender}</td>
            <td>${pat.phone}</td>
            <td>${pat.email}</td>
            <td><span class="status-pill status-confirmed">${pat.bloodGroup}</span></td>
            <td>${pat.regDate}</td>
            <td>
                <div class="action-btn-group">
                    <button class="btn-icon-action" onclick="editPatient('${pat.id}')" title="Edit Patient Details">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-icon-action delete" onclick="deletePatient('${pat.id}')" title="Delete Patient">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function openPatientModal(pat = null) {
    const modal = document.getElementById("patientModal");
    const title = document.getElementById("patientModalTitle");
    const editId = document.getElementById("patientEditId");

    if (pat) {
        title.innerHTML = `<i class="fa-solid fa-user-pen"></i> Edit Patient Details`;
        editId.value = pat.id;
        document.getElementById("patName").value = pat.name;
        document.getElementById("patPhone").value = pat.phone;
        document.getElementById("patEmail").value = pat.email;
        document.getElementById("patAge").value = pat.age;
        document.getElementById("patGender").value = pat.gender;
        document.getElementById("patBlood").value = pat.bloodGroup;
    } else {
        title.innerHTML = `<i class="fa-solid fa-user-plus"></i> Register Patient`;
        editId.value = "";
        document.getElementById("patientForm").reset();
    }

    modal.classList.add("active");
}

function editPatient(patId) {
    const found = patients.find(p => p.id === patId);
    if (found) openPatientModal(found);
}

function deletePatient(patId) {
    if (confirm(`Are you sure you want to delete patient ${patId}?`)) {
        patients = patients.filter(p => p.id !== patId);
        saveAllToStorage();
        renderPatientsTable();
        renderDashboardOverview();
    }
}

// ==========================================
// 7. VIEW 4: APPOINTMENT MANAGEMENT (CRUD)
// ==========================================
function renderAppointmentsTable() {
    const tableBody = document.getElementById("appointmentsTableBody");
    const searchVal = document.getElementById("appointmentSearchInput").value.trim().toLowerCase();
    const statusVal = document.getElementById("appointmentStatusFilter").value;

    let filtered = appointments.filter(apt => {
        const matchesSearch = !searchVal ||
            apt.id.toLowerCase().includes(searchVal) ||
            apt.patientName.toLowerCase().includes(searchVal) ||
            apt.doctorName.toLowerCase().includes(searchVal) ||
            apt.department.toLowerCase().includes(searchVal);

        const matchesStatus = statusVal === "All" || apt.status === statusVal;
        return matchesSearch && matchesStatus;
    });

    tableBody.innerHTML = "";
    document.getElementById("appointmentsCountBar").textContent = `Showing ${filtered.length} of ${appointments.length} appointments`;

    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="9" class="text-center" style="padding: 2rem; color: #64748b;">No appointments found matching filters.</td></tr>`;
        return;
    }

    filtered.forEach(apt => {
        const tr = document.createElement("tr");
        const statusClass = apt.status === "Confirmed" ? "status-confirmed" : (apt.status === "Completed" ? "status-completed" : "status-cancelled");
        const feeDisplay = apt.fee === 0 ? `<strong style="color: var(--brand-green);">FREE</strong>` : `â‚¹${apt.fee}`;

        tr.innerHTML = `
            <td><strong>${apt.id}</strong></td>
            <td>
                <strong>${apt.patientName}</strong>
                <div style="font-size: 0.725rem; color: #64748b;">${apt.patientPhone}</div>
            </td>
            <td>${apt.doctorName}</td>
            <td><span class="status-pill status-confirmed">${apt.department}</span></td>
            <td>${apt.date}</td>
            <td>${apt.timeSlot}</td>
            <td>${feeDisplay}</td>
            <td><span class="status-pill ${statusClass}">${apt.status}</span></td>
            <td>
                <div class="action-btn-group">
                    <select onchange="updateAppointmentStatus('${apt.id}', this.value)" style="font-size: 0.75rem; padding: 0.2rem 0.4rem; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <option value="Confirmed" ${apt.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Completed" ${apt.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Cancelled" ${apt.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                    <button class="btn-icon-action delete" onclick="deleteAppointment('${apt.id}')" title="Delete Appointment">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function updateAppointmentStatus(aptId, newStatus) {
    const apt = appointments.find(a => a.id === aptId);
    if (apt) {
        apt.status = newStatus;
        saveAllToStorage();
        renderAppointmentsTable();
        renderDashboardOverview();
        renderReportsView();
    }
}

function deleteAppointment(aptId) {
    if (confirm(`Do you want to permanently delete appointment ${aptId}?`)) {
        appointments = appointments.filter(a => a.id !== aptId);
        saveAllToStorage();
        renderAppointmentsTable();
        renderDashboardOverview();
    }
}

function openAppointmentModal() {
    const modal = document.getElementById("appointmentModal");
    const doctorSelect = document.getElementById("aptDoctorSelect");
    doctorSelect.innerHTML = '<option value="">-- Choose Doctor --</option>';

    doctors.forEach(doc => {
        const opt = document.createElement("option");
        opt.value = doc.id;
        opt.textContent = `${doc.name} (${doc.department} - ${doc.fee === 0 ? 'FREE' : 'â‚¹' + doc.fee})`;
        doctorSelect.appendChild(opt);
    });

    document.getElementById("appointmentForm").reset();
    document.getElementById("aptDept").value = "";
    document.getElementById("aptFee").value = "";
    document.getElementById("aptEditId").value = "";

    // Set today as min date
    const todayStr = new Date().toISOString().split('T')[0];
    document.getElementById("aptDate").min = todayStr;
    document.getElementById("aptDate").value = todayStr;

    modal.classList.add("active");
}

// Doctor select change in appointment modal
document.getElementById("aptDoctorSelect").addEventListener("change", (e) => {
    const docId = e.target.value;
    const doc = doctors.find(d => d.id === docId);
    if (doc) {
        document.getElementById("aptDept").value = doc.department;
        document.getElementById("aptFee").value = doc.fee;
        if (doc.slots) {
            const firstSlot = doc.slots.split(",")[0].trim();
            document.getElementById("aptTimeSlot").value = firstSlot;
        }
    }
});

// ==========================================
// 8. VIEW 5: DEPARTMENT MANAGEMENT (CRUD)
// ==========================================
function renderDepartmentsTable() {
    const tableBody = document.getElementById("departmentsTableBody");
    const searchVal = document.getElementById("departmentSearchInput").value.trim().toLowerCase();

    let filtered = departments.filter(dep => {
        return !searchVal ||
            dep.name.toLowerCase().includes(searchVal) ||
            dep.hod.toLowerCase().includes(searchVal) ||
            dep.location.toLowerCase().includes(searchVal);
    });

    tableBody.innerHTML = "";
    document.getElementById("departmentsCountBar").textContent = `Showing ${filtered.length} of ${departments.length} departments`;

    filtered.forEach(dep => {
        const tr = document.createElement("tr");
        const docCount = doctors.filter(d => d.department.toLowerCase() === dep.name.toLowerCase()).length;

        tr.innerHTML = `
            <td><strong>${dep.id}</strong></td>
            <td><strong>${dep.name}</strong></td>
            <td>${dep.hod}</td>
            <td><span class="status-pill status-confirmed">${docCount} Specialists</span></td>
            <td>${dep.location}</td>
            <td><span class="status-pill ${dep.feeType.includes('Free') ? 'status-confirmed' : 'status-completed'}">${dep.feeType}</span></td>
            <td>
                <div class="action-btn-group">
                    <button class="btn-icon-action" onclick="editDept('${dep.id}')" title="Edit Department">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-icon-action delete" onclick="deleteDept('${dep.id}')" title="Delete Department">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function openDeptModal(dep = null) {
    const modal = document.getElementById("deptModal");
    const title = document.getElementById("deptModalTitle");
    const editId = document.getElementById("deptEditId");

    if (dep) {
        title.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Department`;
        editId.value = dep.id;
        document.getElementById("deptName").value = dep.name;
        document.getElementById("deptHod").value = dep.hod;
        document.getElementById("deptLocation").value = dep.location;
        document.getElementById("deptFeeType").value = dep.feeType;
    } else {
        title.innerHTML = `<i class="fa-solid fa-stethoscope"></i> Add Medical Department`;
        editId.value = "";
        document.getElementById("deptForm").reset();
    }

    modal.classList.add("active");
}

function editDept(depId) {
    const found = departments.find(d => d.id === depId);
    if (found) openDeptModal(found);
}

function deleteDept(depId) {
    if (confirm(`Do you want to delete department ${depId}?`)) {
        departments = departments.filter(d => d.id !== depId);
        saveAllToStorage();
        renderDepartmentsTable();
        renderDashboardOverview();
    }
}

// ==========================================
// 9. VIEW 6: REPORTS VIEW
// ==========================================
function renderReportsView() {
    const totalApt = appointments.length;
    const freeApt = appointments.filter(a => a.fee === 0).length;
    const paidApt = appointments.filter(a => a.fee > 0).length;
    const completedApt = appointments.filter(a => a.status === "Completed").length;

    document.getElementById("repTotalApt").textContent = totalApt;
    document.getElementById("repFreeApt").textContent = freeApt;
    document.getElementById("repPaidApt").textContent = paidApt;
    document.getElementById("repCompletedApt").textContent = completedApt;

    document.getElementById("repActiveDepts").textContent = departments.length;
    document.getElementById("repTotalDocs").textContent = doctors.length;
    document.getElementById("repTotalPatients").textContent = patients.length;
}

// ==========================================
// 10. CRUD MODALS & FORMS HANDLERS
// ==========================================
function setupCRUDModals() {
    // 1. Doctor Form Submit
    document.getElementById("doctorForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const editId = document.getElementById("docEditId").value;
        const name = document.getElementById("docName").value.trim();
        const dept = document.getElementById("docDept").value;
        const qual = document.getElementById("docQual").value.trim();
        const exp = parseInt(document.getElementById("docExp").value) || 5;
        const fee = parseInt(document.getElementById("docFee").value) || 0;
        const room = document.getElementById("docRoom").value.trim();
        const gender = document.getElementById("docGender").value;
        const slots = document.getElementById("docSlots").value.trim() || "09:00 AM, 02:00 PM";
        const bio = document.getElementById("docBio").value.trim();

        if (editId) {
            const index = doctors.findIndex(d => d.id === editId);
            if (index !== -1) {
                doctors[index] = { ...doctors[index], name, department: dept, qualification: qual, experience: exp, fee, room, gender, slots, bio };
            }
        } else {
            const newId = `DOC-${Math.floor(100 + Math.random() * 900)}`;
            doctors.push({ id: newId, name, department: dept, qualification: qual, experience: exp, fee, room, gender, slots, bio });
        }

        saveAllToStorage();
        document.getElementById("doctorModal").classList.remove("active");
        renderDoctorsTable();
        renderDashboardOverview();
    });

    // 2. Patient Form Submit
    document.getElementById("patientForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const editId = document.getElementById("patientEditId").value;
        const name = document.getElementById("patName").value.trim();
        const phone = document.getElementById("patPhone").value.trim();
        const email = document.getElementById("patEmail").value.trim();
        const age = parseInt(document.getElementById("patAge").value) || 25;
        const gender = document.getElementById("patGender").value;
        const blood = document.getElementById("patBlood").value;

        if (editId) {
            const index = patients.findIndex(p => p.id === editId);
            if (index !== -1) {
                patients[index] = { ...patients[index], name, phone, email, age, gender, bloodGroup: blood };
            }
        } else {
            const newId = `PAT-${Math.floor(100 + Math.random() * 900)}`;
            const todayStr = new Date().toISOString().split('T')[0];
            patients.push({ id: newId, name, phone, email, age, gender, bloodGroup: blood, regDate: todayStr });
        }

        saveAllToStorage();
        document.getElementById("patientModal").classList.remove("active");
        renderPatientsTable();
        renderDashboardOverview();
    });

    // 3. Appointment Form Submit
    document.getElementById("appointmentForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const docId = document.getElementById("aptDoctorSelect").value;
        const doc = doctors.find(d => d.id === docId);
        if (!doc) {
            alert("Please select a valid doctor.");
            return;
        }

        const patientName = document.getElementById("aptPatientName").value.trim();
        const patientPhone = document.getElementById("aptPatientPhone").value.trim();
        const date = document.getElementById("aptDate").value;
        const timeSlot = document.getElementById("aptTimeSlot").value.trim();
        const fee = parseInt(document.getElementById("aptFee").value) || 0;
        const status = document.getElementById("aptStatus").value;

        const newId = `APT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        appointments.unshift({
            id: newId,
            patientName,
            patientPhone,
            doctorName: doc.name,
            department: doc.department,
            date,
            timeSlot,
            fee,
            status
        });

        saveAllToStorage();
        document.getElementById("appointmentModal").classList.remove("active");
        renderAppointmentsTable();
        renderDashboardOverview();
    });

    // 4. Department Form Submit
    document.getElementById("deptForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const editId = document.getElementById("deptEditId").value;
        const name = document.getElementById("deptName").value.trim();
        const hod = document.getElementById("deptHod").value.trim();
        const location = document.getElementById("deptLocation").value.trim();
        const feeType = document.getElementById("deptFeeType").value;

        if (editId) {
            const index = departments.findIndex(d => d.id === editId);
            if (index !== -1) {
                departments[index] = { ...departments[index], name, hod, location, feeType };
            }
        } else {
            const newId = `DEP-0${departments.length + 1}`;
            departments.push({ id: newId, name, hod, doctorsCount: 1, location, feeType });
        }

        saveAllToStorage();
        document.getElementById("deptModal").classList.remove("active");
        renderDepartmentsTable();
        renderDashboardOverview();
    });

    // Close Modal Buttons
    document.getElementById("closeDoctorModal").addEventListener("click", () => document.getElementById("doctorModal").classList.remove("active"));
    document.getElementById("cancelDoctorBtn").addEventListener("click", () => document.getElementById("doctorModal").classList.remove("active"));

    document.getElementById("closePatientModal").addEventListener("click", () => document.getElementById("patientModal").classList.remove("active"));
    document.getElementById("cancelPatientBtn").addEventListener("click", () => document.getElementById("patientModal").classList.remove("active"));

    document.getElementById("closeAppointmentModal").addEventListener("click", () => document.getElementById("appointmentModal").classList.remove("active"));
    document.getElementById("cancelAptBtn").addEventListener("click", () => document.getElementById("appointmentModal").classList.remove("active"));

    document.getElementById("closeDeptModal").addEventListener("click", () => document.getElementById("deptModal").classList.remove("active"));
    document.getElementById("cancelDeptBtn").addEventListener("click", () => document.getElementById("deptModal").classList.remove("active"));

    // Add buttons
    document.getElementById("addNewDoctorBtn").addEventListener("click", () => openDoctorModal());
    document.getElementById("addNewPatientBtn").addEventListener("click", () => openPatientModal());
    document.getElementById("addNewAppointmentBtn").addEventListener("click", () => openAppointmentModal());
    document.getElementById("addNewDeptBtn").addEventListener("click", () => openDeptModal());
}

// ==========================================
// 11. SEARCH & FILTER EVENT LISTENERS
// ==========================================
function setupSearchAndFilterHandlers() {
    // Doctor filters
    document.getElementById("doctorSearchInput").addEventListener("input", renderDoctorsTable);
    document.getElementById("doctorDeptFilter").addEventListener("change", renderDoctorsTable);
    document.getElementById("doctorFeeTypeFilter").addEventListener("change", renderDoctorsTable);

    // Patient filters
    document.getElementById("patientSearchInput").addEventListener("input", renderPatientsTable);
    document.getElementById("patientGenderFilter").addEventListener("change", renderPatientsTable);

    // Appointment filters
    document.getElementById("appointmentSearchInput").addEventListener("input", renderAppointmentsTable);
    document.getElementById("appointmentStatusFilter").addEventListener("change", renderAppointmentsTable);

    // Department search
    document.getElementById("departmentSearchInput").addEventListener("input", renderDepartmentsTable);
}

