/**
 * YourCare Hospital - Healthcare & Clinic Management System (Major Project)
 * Multi-Role Support (Admin, Doctor, Patient), Full CRUD, Prescriptions & Relational LocalStorage
 */

// ==========================================
// 1. DEFAULT DATASETS
// ==========================================
const DEFAULT_SYSTEM_DOCTORS = [
    {
        id: "DOC-101",
        name: "Dr. Meenakshi Sundaram",
        department: "General Medicine",
        qualification: "MBBS, MD (Internal Medicine)",
        experience: 12,
        fee: 0,
        room: "Room 101, Ground Floor",
        gender: "female",
        slots: "08:00 AM, 09:30 AM, 11:30 AM, 04:00 PM"
    },
    {
        id: "DOC-102",
        name: "Dr. Ramesh Balaji",
        department: "General Medicine",
        qualification: "MBBS, DNB (Family Medicine)",
        experience: 7,
        fee: 0,
        room: "Room 103, Ground Floor",
        gender: "male",
        slots: "08:30 AM, 10:00 AM, 02:00 PM, 04:30 PM"
    },
    {
        id: "DOC-103",
        name: "Dr. K. Radhakrishnan",
        department: "Pediatrics",
        qualification: "MBBS, DCH (Child Health)",
        experience: 9,
        fee: 0,
        room: "Room 105, 1st Floor",
        gender: "male",
        slots: "09:00 AM, 11:00 AM, 03:00 PM, 05:00 PM"
    },
    {
        id: "DOC-104",
        name: "Dr. Rajesh Sharma",
        department: "Cardiology",
        qualification: "MBBS, MD, DM (Cardiology)",
        experience: 14,
        fee: 600,
        room: "Room 201, 2nd Floor",
        gender: "male",
        slots: "09:00 AM, 10:30 AM, 02:00 PM, 04:30 PM"
    },
    {
        id: "DOC-105",
        name: "Dr. Priya Nair",
        department: "Dermatology",
        qualification: "MBBS, MD (Dermatology)",
        experience: 9,
        fee: 500,
        room: "Room 204, 2nd Floor",
        gender: "female",
        slots: "10:00 AM, 11:30 AM, 03:00 PM, 05:00 PM"
    },
    {
        id: "DOC-106",
        name: "Dr. Arun Venkataraman",
        department: "Orthopedics",
        qualification: "MBBS, MS (Ortho), M.Ch",
        experience: 16,
        fee: 700,
        room: "Room 108, 1st Floor",
        gender: "male",
        slots: "08:30 AM, 11:00 AM, 02:30 PM, 04:00 PM"
    },
    {
        id: "DOC-107",
        name: "Dr. Suresh Menon",
        department: "Neurology",
        qualification: "MBBS, MD, DM (Neurology)",
        experience: 18,
        fee: 800,
        room: "Room 301, 3rd Floor",
        gender: "male",
        slots: "10:30 AM, 12:00 PM, 03:30 PM, 06:00 PM"
    },
    {
        id: "DOC-108",
        name: "Dr. Shalini Rao",
        department: "ENT",
        qualification: "MBBS, MS (ENT)",
        experience: 10,
        fee: 450,
        room: "Room 205, 2nd Floor",
        gender: "female",
        slots: "10:00 AM, 12:00 PM, 03:00 PM, 05:00 PM"
    }
];

const DEFAULT_SYSTEM_PATIENTS = [
    {
        id: "PAT-801",
        name: "Sivasubramaniyan G",
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
    }
];

const DEFAULT_SYSTEM_APPOINTMENTS = [
    {
        id: "APT-2026-1042",
        patientName: "Sivasubramaniyan G",
        patientPhone: "9876543210",
        doctorName: "Dr. Rajesh Sharma",
        department: "Cardiology",
        date: "2026-08-22",
        timeSlot: "10:30 AM",
        fee: 600,
        symptoms: "Mild chest discomfort and routine ECG checkup",
        status: "Confirmed"
    },
    {
        id: "APT-2026-2184",
        patientName: "Ramesh Kumar",
        patientPhone: "9845123456",
        doctorName: "Dr. Meenakshi Sundaram",
        department: "General Medicine",
        date: "2026-08-21",
        timeSlot: "09:30 AM",
        fee: 0,
        symptoms: "Viral fever and throat irritation",
        status: "Confirmed"
    },
    {
        id: "APT-2026-3491",
        patientName: "Priya Swaminathan",
        patientPhone: "9765432109",
        doctorName: "Dr. Rajesh Sharma",
        department: "Cardiology",
        date: "2026-08-20",
        timeSlot: "09:00 AM",
        fee: 600,
        symptoms: "Blood pressure evaluation",
        status: "Completed"
    }
];

const DEFAULT_SYSTEM_DEPARTMENTS = [
    { id: "DEP-01", name: "General Medicine", hod: "Dr. Meenakshi Sundaram", doctorsCount: 2, location: "Block A, Ground Floor", feeType: "Free General OPD" },
    { id: "DEP-02", name: "Pediatrics", hod: "Dr. K. Radhakrishnan", doctorsCount: 1, location: "Block A, 1st Floor", feeType: "Free General OPD" },
    { id: "DEP-03", name: "Cardiology", hod: "Dr. Rajesh Sharma", doctorsCount: 1, location: "Block B, 2nd Floor", feeType: "Specialist OPD" },
    { id: "DEP-04", name: "Dermatology", hod: "Dr. Priya Nair", doctorsCount: 1, location: "Block B, 2nd Floor", feeType: "Specialist OPD" },
    { id: "DEP-05", name: "Orthopedics", hod: "Dr. Arun Venkataraman", doctorsCount: 1, location: "Block C, 1st Floor", feeType: "Specialist OPD" },
    { id: "DEP-06", name: "Neurology", hod: "Dr. Suresh Menon", doctorsCount: 1, location: "Block C, 3rd Floor", feeType: "Specialist OPD" },
    { id: "DEP-07", name: "Ophthalmology", hod: "Dr. Karthik Iyer", doctorsCount: 1, location: "Block B, 1st Floor", feeType: "Specialist OPD" },
    { id: "DEP-08", name: "ENT", hod: "Dr. Shalini Rao", doctorsCount: 1, location: "Block B, 2nd Floor", feeType: "Specialist OPD" }
];

const DEFAULT_PRESCRIPTIONS = [
    {
        aptId: "APT-2026-3491",
        doctorName: "Dr. Rajesh Sharma",
        patientName: "Priya Swaminathan",
        diagnosis: "Stage 1 Essential Hypertension. ECG within normal limits.",
        prescription: "1. Tab. Telmisartan 40mg (1-0-0 before breakfast)\n2. Low sodium diet and 30 mins brisk walking daily.\nFollow-up review after 2 weeks.",
        date: "2026-08-20"
    }
];

// LocalStorage Keys
const KEY_SYS_DOCS = "cp_sys_doctors";
const KEY_SYS_PATS = "cp_sys_patients";
const KEY_SYS_APTS = "cp_sys_appointments";
const KEY_SYS_DEPTS = "cp_sys_departments";
const KEY_SYS_PRESC = "cp_sys_prescriptions";
const KEY_SYS_ROLE = "cp_sys_active_role";

// Application State
let currentRole = "admin"; // 'admin', 'doctor', 'patient'
let doctors = [];
let patients = [];
let appointments = [];
let departments = [];
let prescriptions = [];

// ==========================================
// 2. INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    loadDatabaseFromStorage();

    // Check saved active role
    const savedRole = localStorage.getItem(KEY_SYS_ROLE);
    if (savedRole) {
        currentRole = savedRole;
    }

    // Initialize UI
    switchUserRole(currentRole);
    setupEventListeners();
});

function loadDatabaseFromStorage() {
    doctors = JSON.parse(localStorage.getItem(KEY_SYS_DOCS)) || DEFAULT_SYSTEM_DOCTORS;
    patients = JSON.parse(localStorage.getItem(KEY_SYS_PATS)) || DEFAULT_SYSTEM_PATIENTS;
    appointments = JSON.parse(localStorage.getItem(KEY_SYS_APTS)) || DEFAULT_SYSTEM_APPOINTMENTS;
    departments = JSON.parse(localStorage.getItem(KEY_SYS_DEPTS)) || DEFAULT_SYSTEM_DEPARTMENTS;
    prescriptions = JSON.parse(localStorage.getItem(KEY_SYS_PRESC)) || DEFAULT_PRESCRIPTIONS;

    saveDatabaseToStorage();
}

function saveDatabaseToStorage() {
    localStorage.setItem(KEY_SYS_DOCS, JSON.stringify(doctors));
    localStorage.setItem(KEY_SYS_PATS, JSON.stringify(patients));
    localStorage.setItem(KEY_SYS_APTS, JSON.stringify(appointments));
    localStorage.setItem(KEY_SYS_DEPTS, JSON.stringify(departments));
    localStorage.setItem(KEY_SYS_PRESC, JSON.stringify(prescriptions));
}

// ==========================================
// 3. ROLE SWITCHING & ROLE-BASED ACCESS
// ==========================================
function switchUserRole(role) {
    currentRole = role;
    localStorage.setItem(KEY_SYS_ROLE, role);

    // Update Quick Role Chips
    document.querySelectorAll(".role-chip").forEach(chip => {
        if (chip.textContent.toLowerCase().includes(role)) {
            chip.classList.add("active");
        } else {
            chip.classList.remove("active");
        }
    });

    // Hide all portals
    document.querySelectorAll(".portal-section").forEach(p => p.classList.remove("active"));

    // Header Profile & Portal Setup
    const headerName = document.getElementById("headerUserName");
    const headerRole = document.getElementById("headerUserRole");
    const headerAvatar = document.getElementById("headerUserAvatar");
    const portalSubtitle = document.getElementById("rolePortalSubtitle");

    if (role === "admin") {
        headerName.textContent = "Sivasubramaniyan G";
        headerRole.textContent = "Hospital Administrator";
        headerAvatar.textContent = "SG";
        portalSubtitle.textContent = "Hospital Admin Portal";
        document.getElementById("adminPortal").classList.add("active");
        renderAdminDashboard();
        showToast("Switched to Hospital Administrator Portal");
    } else if (role === "doctor") {
        const loggedDoc = doctors.find(d => d.name.includes("Rajesh Sharma")) || doctors[0];
        headerName.textContent = loggedDoc.name;
        headerRole.textContent = `Consultant (${loggedDoc.department})`;
        headerAvatar.textContent = "DR";
        portalSubtitle.textContent = "Doctor Consultation Portal";
        document.getElementById("doctorPortal").classList.add("active");
        renderDoctorDashboard(loggedDoc);
        showToast(`Logged in as ${loggedDoc.name}`);
    } else if (role === "patient") {
        const loggedPat = patients[0];
        headerName.textContent = loggedPat.name;
        headerRole.textContent = "Registered Patient";
        headerAvatar.textContent = "PT";
        portalSubtitle.textContent = "Patient Medical Portal";
        document.getElementById("patientPortal").classList.add("active");
        renderPatientDashboard(loggedPat);
        showToast(`Welcome back, ${loggedPat.name}`);
    }
}

// ==========================================
// 4. MODULE 1: ADMIN DASHBOARD LOGIC
// ==========================================
function renderAdminDashboard() {
    // 1. KPI Counts
    document.getElementById("admStatDocs").textContent = doctors.length;
    document.getElementById("admDocCount").textContent = doctors.length;
    document.getElementById("admStatFreeDocs").textContent = doctors.filter(d => d.fee === 0).length;

    document.getElementById("admStatPatients").textContent = patients.length;
    document.getElementById("admPatCount").textContent = patients.length;

    document.getElementById("admStatApts").textContent = appointments.length;
    document.getElementById("admAptCount").textContent = appointments.length;
    document.getElementById("admStatConfirmedApts").textContent = appointments.filter(a => a.status === "Confirmed").length;

    document.getElementById("admStatDepts").textContent = departments.length;

    // 2. Recent Appointments
    const recentBody = document.getElementById("admRecentAptsBody");
    recentBody.innerHTML = "";
    appointments.slice(0, 5).forEach(apt => {
        const tr = document.createElement("tr");
        const statusClass = apt.status === "Confirmed" ? "status-confirmed" : (apt.status === "Completed" ? "status-completed" : "status-cancelled");
        const feeText = apt.fee === 0 ? `<strong style="color: var(--brand-green);">FREE</strong>` : `â‚¹${apt.fee}`;
        tr.innerHTML = `
            <td><strong>${apt.id}</strong></td>
            <td>${apt.patientName}</td>
            <td>${apt.doctorName}</td>
            <td><span class="status-pill status-confirmed">${apt.department}</span></td>
            <td>${apt.date} &bull; ${apt.timeSlot}</td>
            <td>${feeText}</td>
            <td><span class="status-pill ${statusClass}">${apt.status}</span></td>
        `;
        recentBody.appendChild(tr);
    });

    // 3. Dept Load
    const deptList = document.getElementById("admDeptProgressList");
    deptList.innerHTML = "";
    departments.slice(0, 5).forEach(dept => {
        const docCount = doctors.filter(d => d.department.toLowerCase() === dept.name.toLowerCase()).length;
        const perc = doctors.length > 0 ? Math.round((docCount / doctors.length) * 100) : 0;
        const item = document.createElement("div");
        item.className = "dept-load-item";
        item.innerHTML = `
            <div class="dept-load-header">
                <strong>${dept.name}</strong>
                <span>${docCount} Doctors (${perc}%)</span>
            </div>
            <div class="dept-load-bar">
                <div class="dept-load-fill" style="width: ${Math.max(perc, 15)}%;"></div>
            </div>
        `;
        deptList.appendChild(item);
    });

    // 4. Tables in Subtabs
    renderAdminDoctorsTable();
    renderAdminPatientsTable();
    renderAdminAppointmentsTable();
    renderAdminDepartmentsTable();
    renderAdminReports();
}

function switchAdminSubtab(targetId) {
    document.querySelectorAll(".admin-subtabs .subtab-btn").forEach(btn => {
        if (btn.getAttribute("data-target") === targetId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    document.querySelectorAll(".subtab-content").forEach(content => {
        if (content.id === targetId) {
            content.classList.add("active");
        } else {
            content.classList.remove("active");
        }
    });
}

// 4.1 Admin Doctors Table
function renderAdminDoctorsTable() {
    const tableBody = document.getElementById("admDoctorsTableBody");
    const search = (document.getElementById("admDoctorSearch").value || "").trim().toLowerCase();
    const dept = document.getElementById("admDoctorDeptFilter").value;
    const feeType = document.getElementById("admDoctorFeeFilter").value;

    let filtered = doctors.filter(d => {
        const matchesSearch = !search || d.name.toLowerCase().includes(search) || d.qualification.toLowerCase().includes(search) || d.room.toLowerCase().includes(search);
        const matchesDept = dept === "All" || d.department.toLowerCase() === dept.toLowerCase();
        let matchesFee = true;
        if (feeType === "Free") matchesFee = d.fee === 0;
        if (feeType === "Paid") matchesFee = d.fee > 0;
        return matchesSearch && matchesDept && matchesFee;
    });

    tableBody.innerHTML = "";
    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding: 1.5rem; color: #64748b;">No doctors found matching filters.</td></tr>`;
        return;
    }

    filtered.forEach(doc => {
        const tr = document.createElement("tr");
        const feeText = doc.fee === 0 ? `<strong style="color: var(--brand-green);">FREE OPD</strong>` : `â‚¹${doc.fee}`;
        tr.innerHTML = `
            <td><strong>${doc.id}</strong></td>
            <td><strong>${doc.name}</strong></td>
            <td><span class="status-pill status-confirmed">${doc.department}</span></td>
            <td>${doc.qualification}</td>
            <td>${doc.experience} Yrs</td>
            <td>${feeText}</td>
            <td>${doc.room}</td>
            <td>
                <div class="action-btn-group">
                    <button class="btn-icon-action" onclick="openDoctorModal('${doc.id}')" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon-action delete" onclick="deleteDoctor('${doc.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function openDoctorModal(docId = null) {
    const modal = document.getElementById("doctorModal");
    const editInput = document.getElementById("docEditId");

    if (docId) {
        const doc = doctors.find(d => d.id === docId);
        if (!doc) return;
        document.getElementById("docModalTitle").innerHTML = `<i class="fa-solid fa-pen"></i> Edit Doctor Details`;
        editInput.value = doc.id;
        document.getElementById("docFormName").value = doc.name;
        document.getElementById("docFormDept").value = doc.department;
        document.getElementById("docFormQual").value = doc.qualification;
        document.getElementById("docFormExp").value = doc.experience;
        document.getElementById("docFormFee").value = doc.fee;
        document.getElementById("docFormRoom").value = doc.room;
        document.getElementById("docFormGender").value = doc.gender;
        document.getElementById("docFormSlots").value = doc.slots;
    } else {
        document.getElementById("docModalTitle").innerHTML = `<i class="fa-solid fa-user-doctor"></i> Add Doctor`;
        editInput.value = "";
        document.getElementById("doctorForm").reset();
    }
    modal.classList.add("active");
}

function deleteDoctor(docId) {
    if (confirm(`Remove doctor ${docId} from hospital roster?`)) {
        doctors = doctors.filter(d => d.id !== docId);
        saveDatabaseToStorage();
        renderAdminDashboard();
        showToast(`Doctor ${docId} removed.`);
    }
}

// 4.2 Admin Patients Table
function renderAdminPatientsTable() {
    const tableBody = document.getElementById("admPatientsTableBody");
    const search = (document.getElementById("admPatientSearch").value || "").trim().toLowerCase();
    const gender = document.getElementById("admPatientGenderFilter").value;

    let filtered = patients.filter(p => {
        const matchesSearch = !search || p.name.toLowerCase().includes(search) || p.phone.includes(search) || p.id.toLowerCase().includes(search);
        const matchesGender = gender === "All" || p.gender === gender;
        return matchesSearch && matchesGender;
    });

    tableBody.innerHTML = "";
    filtered.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${p.id}</strong></td>
            <td><strong>${p.name}</strong></td>
            <td>${p.age} Yrs / ${p.gender}</td>
            <td>${p.phone}</td>
            <td>${p.email}</td>
            <td><span class="status-pill status-confirmed">${p.bloodGroup}</span></td>
            <td>${p.regDate}</td>
            <td>
                <div class="action-btn-group">
                    <button class="btn-icon-action" onclick="openPatientModal('${p.id}')" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon-action delete" onclick="deletePatient('${p.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function openPatientModal(patId = null) {
    const modal = document.getElementById("patientModal");
    const editInput = document.getElementById("patEditId");

    if (patId) {
        const p = patients.find(pat => pat.id === patId);
        if (!p) return;
        document.getElementById("patModalTitle").innerHTML = `<i class="fa-solid fa-pen"></i> Edit Patient`;
        editInput.value = p.id;
        document.getElementById("patFormName").value = p.name;
        document.getElementById("patFormPhone").value = p.phone;
        document.getElementById("patFormEmail").value = p.email;
        document.getElementById("patFormAge").value = p.age;
        document.getElementById("patFormGender").value = p.gender;
        document.getElementById("patFormBlood").value = p.bloodGroup;
    } else {
        document.getElementById("patModalTitle").innerHTML = `<i class="fa-solid fa-user-plus"></i> Register Patient`;
        editInput.value = "";
        document.getElementById("patientForm").reset();
    }
    modal.classList.add("active");
}

function deletePatient(patId) {
    if (confirm(`Delete patient medical record for ${patId}?`)) {
        patients = patients.filter(p => p.id !== patId);
        saveDatabaseToStorage();
        renderAdminDashboard();
        showToast(`Patient ${patId} deleted.`);
    }
}

// 4.3 Admin Appointments Table
function renderAdminAppointmentsTable() {
    const tableBody = document.getElementById("admAppointmentsTableBody");
    const search = (document.getElementById("admAptSearch").value || "").trim().toLowerCase();
    const status = document.getElementById("admAptStatusFilter").value;

    let filtered = appointments.filter(a => {
        const matchesSearch = !search || a.id.toLowerCase().includes(search) || a.patientName.toLowerCase().includes(search) || a.doctorName.toLowerCase().includes(search);
        const matchesStatus = status === "All" || a.status === status;
        return matchesSearch && matchesStatus;
    });

    tableBody.innerHTML = "";
    filtered.forEach(a => {
        const tr = document.createElement("tr");
        const statusClass = a.status === "Confirmed" ? "status-confirmed" : (a.status === "Completed" ? "status-completed" : "status-cancelled");
        const feeText = a.fee === 0 ? `<strong style="color: var(--brand-green);">FREE</strong>` : `â‚¹${a.fee}`;

        tr.innerHTML = `
            <td><strong>${a.id}</strong></td>
            <td>${a.patientName}</td>
            <td>${a.doctorName}</td>
            <td><span class="status-pill status-confirmed">${a.department}</span></td>
            <td>${a.date} &bull; ${a.timeSlot}</td>
            <td>${feeText}</td>
            <td><span class="status-pill ${statusClass}">${a.status}</span></td>
            <td>
                <div class="action-btn-group">
                    <select onchange="changeAppointmentStatus('${a.id}', this.value)" style="font-size: 0.75rem; padding: 0.2rem; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <option value="Confirmed" ${a.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Completed" ${a.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Cancelled" ${a.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                    <button class="btn-icon-action" onclick="displayReceiptModal('${a.id}')" title="Receipt"><i class="fa-solid fa-receipt"></i></button>
                    <button class="btn-icon-action delete" onclick="deleteAppointment('${a.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function changeAppointmentStatus(aptId, newStatus) {
    const apt = appointments.find(a => a.id === aptId);
    if (apt) {
        apt.status = newStatus;
        saveDatabaseToStorage();
        renderAdminDashboard();
        showToast(`Appointment ${aptId} status updated to ${newStatus}`);
    }
}

function deleteAppointment(aptId) {
    if (confirm(`Cancel and remove appointment ${aptId}?`)) {
        appointments = appointments.filter(a => a.id !== aptId);
        saveDatabaseToStorage();
        renderAdminDashboard();
        showToast(`Appointment ${aptId} deleted.`);
    }
}

// 4.4 Admin Departments Table
function renderAdminDepartmentsTable() {
    const tableBody = document.getElementById("admDepartmentsTableBody");
    const search = (document.getElementById("admDeptSearch").value || "").trim().toLowerCase();

    let filtered = departments.filter(dep => !search || dep.name.toLowerCase().includes(search) || dep.hod.toLowerCase().includes(search));
    tableBody.innerHTML = "";
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
                    <button class="btn-icon-action" onclick="openDeptModal('${dep.id}')" title="Edit"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon-action delete" onclick="deleteDept('${dep.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function openDeptModal(depId = null) {
    const modal = document.getElementById("deptModal");
    const editInput = document.getElementById("deptEditId");

    if (depId) {
        const d = departments.find(dep => dep.id === depId);
        if (!d) return;
        document.getElementById("deptModalTitle").innerHTML = `<i class="fa-solid fa-pen"></i> Edit Department`;
        editInput.value = d.id;
        document.getElementById("deptFormName").value = d.name;
        document.getElementById("deptFormHod").value = d.hod;
        document.getElementById("deptFormLocation").value = d.location;
        document.getElementById("deptFormFeeType").value = d.feeType;
    } else {
        document.getElementById("deptModalTitle").innerHTML = `<i class="fa-solid fa-stethoscope"></i> Add Department`;
        editInput.value = "";
        document.getElementById("deptForm").reset();
    }
    modal.classList.add("active");
}

function deleteDept(depId) {
    if (confirm(`Remove department ${depId}?`)) {
        departments = departments.filter(d => d.id !== depId);
        saveDatabaseToStorage();
        renderAdminDashboard();
        showToast(`Department ${depId} removed.`);
    }
}

// 4.5 Admin Reports
function renderAdminReports() {
    document.getElementById("repAptTotal").textContent = appointments.length;
    document.getElementById("repAptFree").textContent = appointments.filter(a => a.fee === 0).length;
    document.getElementById("repAptPaid").textContent = appointments.filter(a => a.fee > 0).length;
    document.getElementById("repAptCompleted").textContent = appointments.filter(a => a.status === "Completed").length;
    document.getElementById("repDeptCount").textContent = departments.length;
    document.getElementById("repDocCount").textContent = doctors.length;
    document.getElementById("repPatCount").textContent = patients.length;
}

function exportAppointmentsCSV() {
    let csv = "AppointmentID,PatientName,DoctorName,Department,Date,TimeSlot,Fee,Status\n";
    appointments.forEach(a => {
        csv += `"${a.id}","${a.patientName}","${a.doctorName}","${a.department}","${a.date}","${a.timeSlot}","${a.fee}","${a.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `YourCare_appointments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast("Exported appointments to CSV successfully!");
}

// ==========================================
// 5. MODULE 2: DOCTOR DASHBOARD LOGIC
// ==========================================
function renderDoctorDashboard(doctor) {
    document.getElementById("docPortalName").textContent = doctor.name;
    document.getElementById("docPortalDept").textContent = doctor.department;
    document.getElementById("docPortalQual").textContent = `${doctor.qualification} &bull; ${doctor.room}`;

    const docApts = appointments.filter(a => a.doctorName.toLowerCase().includes(doctor.name.toLowerCase()) || a.department.toLowerCase() === doctor.department.toLowerCase());
    const completedCount = docApts.filter(a => a.status === "Completed").length;

    document.getElementById("docStatTodayApts").textContent = docApts.length;
    document.getElementById("docStatCompletedApts").textContent = completedCount;

    renderDoctorAppointmentsQueue(doctor);
}

function renderDoctorAppointmentsQueue(doc = null) {
    const tableBody = document.getElementById("doctorQueueTableBody");
    const filter = document.getElementById("docQueueFilter") ? document.getElementById("docQueueFilter").value : "All";
    
    const activeDoc = doc || doctors.find(d => d.name.includes("Rajesh Sharma")) || doctors[0];
    let docApts = appointments.filter(a => a.doctorName.toLowerCase().includes(activeDoc.name.toLowerCase()) || a.department.toLowerCase() === activeDoc.department.toLowerCase());

    if (filter !== "All") {
        docApts = docApts.filter(a => a.status === filter);
    }

    tableBody.innerHTML = "";
    if (docApts.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding: 2rem; color: #64748b;">No patient appointments in queue.</td></tr>`;
        return;
    }

    docApts.forEach(apt => {
        const tr = document.createElement("tr");
        const statusClass = apt.status === "Confirmed" ? "status-confirmed" : (apt.status === "Completed" ? "status-completed" : "status-cancelled");

        tr.innerHTML = `
            <td><strong>${apt.id}</strong></td>
            <td><strong>${apt.patientName}</strong></td>
            <td>${apt.patientPhone}</td>
            <td>${apt.date} &bull; ${apt.timeSlot}</td>
            <td><span style="font-size: 0.775rem; color: #475569;">${apt.symptoms || "General Consultation"}</span></td>
            <td><span class="status-pill ${statusClass}">${apt.status}</span></td>
            <td>
                <div class="action-btn-group">
                    <button class="btn btn-primary btn-sm" onclick="openConsultationModal('${apt.id}')" title="Record Diagnosis & Prescription">
                        <i class="fa-solid fa-stethoscope"></i> Consult & Prescribe
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function openConsultationModal(aptId) {
    const apt = appointments.find(a => a.id === aptId);
    if (!apt) return;

    document.getElementById("consAptId").value = apt.id;
    document.getElementById("consPatientName").value = apt.patientName;
    document.getElementById("consAptRef").value = apt.id;

    // Check existing prescription if any
    const existing = prescriptions.find(p => p.aptId === aptId);
    if (existing) {
        document.getElementById("consDiagnosis").value = existing.diagnosis;
        document.getElementById("consPrescription").value = existing.prescription;
    } else {
        document.getElementById("consDiagnosis").value = "";
        document.getElementById("consPrescription").value = "";
    }

    document.getElementById("consultationModal").classList.add("active");
}

// ==========================================
// 6. MODULE 3: PATIENT DASHBOARD LOGIC
// ==========================================
function renderPatientDashboard(patient) {
    document.getElementById("patPortalName").textContent = patient.name;
    document.getElementById("patPortalMeta").textContent = `${patient.age} Yrs / ${patient.gender} &bull; Blood Group: ${patient.bloodGroup} &bull; Phone: ${patient.phone}`;

    // Patient's own appointments
    const patApts = appointments.filter(a => a.patientName.toLowerCase().includes(patient.name.toLowerCase()) || a.patientPhone === patient.phone);
    const tableBody = document.getElementById("patientAppointmentsBody");
    tableBody.innerHTML = "";

    if (patApts.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding: 2rem; color: #64748b;">No appointments scheduled yet. Click "Book OPD Appointment" to begin.</td></tr>`;
    } else {
        patApts.forEach(apt => {
            const tr = document.createElement("tr");
            const statusClass = apt.status === "Confirmed" ? "status-confirmed" : (apt.status === "Completed" ? "status-completed" : "status-cancelled");
            const feeText = apt.fee === 0 ? `<strong style="color: var(--brand-green);">FREE</strong>` : `â‚¹${apt.fee}`;

            tr.innerHTML = `
                <td><strong>${apt.id}</strong></td>
                <td><strong>${apt.doctorName}</strong></td>
                <td><span class="status-pill status-confirmed">${apt.department}</span></td>
                <td>${apt.date} &bull; ${apt.timeSlot}</td>
                <td>${feeText}</td>
                <td><span class="status-pill ${statusClass}">${apt.status}</span></td>
                <td>
                    <div class="action-btn-group">
                        <button class="btn btn-outline btn-sm" onclick="displayReceiptModal('${apt.id}')"><i class="fa-solid fa-receipt"></i> Slip</button>
                        ${apt.status === 'Confirmed' ? `<button class="btn btn-outline btn-sm" style="color: var(--color-danger);" onclick="cancelPatientAppointment('${apt.id}')">Cancel</button>` : ''}
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    // Patient Prescriptions List
    const prescList = document.getElementById("patientPrescriptionsList");
    prescList.innerHTML = "";
    const patPrescs = prescriptions.filter(p => p.patientName.toLowerCase().includes(patient.name.toLowerCase()));

    if (patPrescs.length === 0) {
        prescList.innerHTML = `<div style="text-align: center; padding: 2rem; color: #64748b;"><i class="fa-solid fa-file-prescription" style="font-size: 2rem; margin-bottom: 0.5rem;"></i><p>No prescriptions recorded yet.</p></div>`;
    } else {
        patPrescs.forEach(p => {
            const card = document.createElement("div");
            card.className = "prescription-card";
            card.innerHTML = `
                <div class="presc-header">
                    <strong><i class="fa-solid fa-user-doctor"></i> ${p.doctorName}</strong>
                    <span>${p.date} &bull; ${p.aptId}</span>
                </div>
                <div class="presc-body">
                    <strong>Diagnosis: ${p.diagnosis}</strong>
                    <p>${p.prescription}</p>
                </div>
            `;
            prescList.appendChild(card);
        });
    }
}

function openPatientBookModal() {
    openAppointmentModal();
    // Pre-fill patient name and phone if available
    const pat = patients[0];
    if (pat) {
        document.getElementById("aptFormPatientName").value = pat.name;
        document.getElementById("aptFormPatientPhone").value = pat.phone;
    }
}

function cancelPatientAppointment(aptId) {
    if (confirm(`Do you wish to cancel appointment ${aptId}?`)) {
        changeAppointmentStatus(aptId, "Cancelled");
        renderPatientDashboard(patients[0]);
    }
}

// ==========================================
// 7. APPOINTMENT MODAL & RECEIPT SLIP
// ==========================================
function openAppointmentModal() {
    const modal = document.getElementById("appointmentModal");
    const doctorSelect = document.getElementById("aptFormDoctor");
    doctorSelect.innerHTML = '<option value="">-- Choose Doctor --</option>';

    doctors.forEach(doc => {
        const opt = document.createElement("option");
        opt.value = doc.id;
        const feeStr = doc.fee === 0 ? "FREE OPD" : `â‚¹${doc.fee}`;
        opt.textContent = `${doc.name} (${doc.department} - ${feeStr})`;
        doctorSelect.appendChild(opt);
    });

    document.getElementById("appointmentForm").reset();
    document.getElementById("aptFormDept").value = "";
    document.getElementById("aptFormFee").value = "";
    document.getElementById("aptEditId").value = "";

    const todayStr = new Date().toISOString().split('T')[0];
    document.getElementById("aptFormDate").min = todayStr;
    document.getElementById("aptFormDate").value = todayStr;

    modal.classList.add("active");
}

document.getElementById("aptFormDoctor").addEventListener("change", (e) => {
    const docId = e.target.value;
    const doc = doctors.find(d => d.id === docId);
    if (doc) {
        document.getElementById("aptFormDept").value = doc.department;
        document.getElementById("aptFormFee").value = doc.fee === 0 ? "FREE (â‚¹0)" : `â‚¹${doc.fee}`;
        if (doc.slots) {
            document.getElementById("aptFormTimeSlot").value = doc.slots.split(",")[0].trim();
        }
    }
});

function displayReceiptModal(aptId) {
    const apt = appointments.find(a => a.id === aptId);
    if (!apt) return;

    document.getElementById("slipId").textContent = apt.id;
    document.getElementById("slipPatient").textContent = apt.patientName;
    document.getElementById("slipPatientPhone").textContent = apt.patientPhone;
    document.getElementById("slipDoctor").textContent = apt.doctorName;
    document.getElementById("slipDept").textContent = apt.department;
    document.getElementById("slipDate").textContent = apt.date;
    document.getElementById("slipTime").textContent = apt.timeSlot;
    
    if (apt.fee === 0) {
        document.getElementById("slipFee").textContent = "FREE (â‚¹0)";
        document.getElementById("slipFeeNote").textContent = "General OPD - No counter charges";
    } else {
        document.getElementById("slipFee").textContent = `â‚¹${apt.fee}`;
        document.getElementById("slipFeeNote").textContent = "Payable at Hospital Counter";
    }

    document.getElementById("receiptModal").classList.add("active");
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove("active");
}

// ==========================================
// 8. FORM SUBMISSIONS (CRUD)
// ==========================================
function setupEventListeners() {
    // Admin Subtabs click
    document.querySelectorAll(".admin-subtabs .subtab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");
            switchAdminSubtab(target);
        });
    });

    // 1. Doctor Form Submit
    document.getElementById("doctorForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const editId = document.getElementById("docEditId").value;
        const name = document.getElementById("docFormName").value.trim();
        const dept = document.getElementById("docFormDept").value;
        const qual = document.getElementById("docFormQual").value.trim();
        const exp = parseInt(document.getElementById("docFormExp").value) || 5;
        const fee = parseInt(document.getElementById("docFormFee").value) || 0;
        const room = document.getElementById("docFormRoom").value.trim();
        const gender = document.getElementById("docFormGender").value;
        const slots = document.getElementById("docFormSlots").value.trim() || "09:00 AM, 02:00 PM";

        if (editId) {
            const idx = doctors.findIndex(d => d.id === editId);
            if (idx !== -1) doctors[idx] = { ...doctors[idx], name, department: dept, qualification: qual, experience: exp, fee, room, gender, slots };
            showToast("Doctor details updated successfully.");
        } else {
            const newId = `DOC-${Math.floor(100 + Math.random() * 900)}`;
            doctors.push({ id: newId, name, department: dept, qualification: qual, experience: exp, fee, room, gender, slots });
            showToast("New doctor added to roster.");
        }

        saveDatabaseToStorage();
        closeModal("doctorModal");
        renderAdminDashboard();
    });

    // 2. Patient Form Submit
    document.getElementById("patientForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const editId = document.getElementById("patEditId").value;
        const name = document.getElementById("patFormName").value.trim();
        const phone = document.getElementById("patFormPhone").value.trim();
        const email = document.getElementById("patFormEmail").value.trim();
        const age = parseInt(document.getElementById("patFormAge").value) || 25;
        const gender = document.getElementById("patFormGender").value;
        const bloodGroup = document.getElementById("patFormBlood").value;

        if (editId) {
            const idx = patients.findIndex(p => p.id === editId);
            if (idx !== -1) patients[idx] = { ...patients[idx], name, phone, email, age, gender, bloodGroup };
            showToast("Patient record updated.");
        } else {
            const newId = `PAT-${Math.floor(100 + Math.random() * 900)}`;
            const todayStr = new Date().toISOString().split('T')[0];
            patients.push({ id: newId, name, phone, email, age, gender, bloodGroup, regDate: todayStr });
            showToast("New patient registered successfully.");
        }

        saveDatabaseToStorage();
        closeModal("patientModal");
        renderAdminDashboard();
    });

    // 3. Appointment Form Submit
    document.getElementById("appointmentForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const docId = document.getElementById("aptFormDoctor").value;
        const doc = doctors.find(d => d.id === docId);
        if (!doc) {
            alert("Please select a doctor.");
            return;
        }

        const patientName = document.getElementById("aptFormPatientName").value.trim();
        const patientPhone = document.getElementById("aptFormPatientPhone").value.trim();
        const date = document.getElementById("aptFormDate").value;
        const timeSlot = document.getElementById("aptFormTimeSlot").value.trim();
        const symptoms = document.getElementById("aptFormSymptoms").value.trim() || "OPD Consultation";

        const newId = `APT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const newApt = {
            id: newId,
            patientName,
            patientPhone,
            doctorName: doc.name,
            department: doc.department,
            date,
            timeSlot,
            fee: doc.fee,
            symptoms,
            status: "Confirmed"
        };

        appointments.unshift(newApt);
        saveDatabaseToStorage();
        closeModal("appointmentModal");

        if (currentRole === "admin") renderAdminDashboard();
        if (currentRole === "patient") renderPatientDashboard(patients[0]);

        showToast(`Appointment ${newId} confirmed!`);
        displayReceiptModal(newId);
    });

    // 4. Consultation & Diagnosis Submit (Doctor Portal)
    document.getElementById("consultationForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const aptId = document.getElementById("consAptId").value;
        const apt = appointments.find(a => a.id === aptId);
        if (!apt) return;

        const diagnosis = document.getElementById("consDiagnosis").value.trim();
        const prescription = document.getElementById("consPrescription").value.trim();
        const todayStr = new Date().toISOString().split('T')[0];

        // Mark appointment Completed
        apt.status = "Completed";

        // Save prescription note
        const existingIdx = prescriptions.findIndex(p => p.aptId === aptId);
        const prescObj = {
            aptId,
            doctorName: apt.doctorName,
            patientName: apt.patientName,
            diagnosis,
            prescription,
            date: todayStr
        };

        if (existingIdx !== -1) {
            prescriptions[existingIdx] = prescObj;
        } else {
            prescriptions.unshift(prescObj);
        }

        saveDatabaseToStorage();
        closeModal("consultationModal");

        const activeDoc = doctors.find(d => d.name.includes("Rajesh Sharma")) || doctors[0];
        renderDoctorDashboard(activeDoc);
        showToast(`Consultation completed & prescription saved for ${apt.patientName}!`);
    });

    // 5. Department Form Submit
    document.getElementById("deptForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const editId = document.getElementById("deptEditId").value;
        const name = document.getElementById("deptFormName").value.trim();
        const hod = document.getElementById("deptFormHod").value.trim();
        const location = document.getElementById("deptFormLocation").value.trim();
        const feeType = document.getElementById("deptFormFeeType").value;

        if (editId) {
            const idx = departments.findIndex(d => d.id === editId);
            if (idx !== -1) departments[idx] = { ...departments[idx], name, hod, location, feeType };
            showToast("Department updated.");
        } else {
            const newId = `DEP-0${departments.length + 1}`;
            departments.push({ id: newId, name, hod, doctorsCount: 1, location, feeType });
            showToast("New department created.");
        }

        saveDatabaseToStorage();
        closeModal("deptModal");
        renderAdminDashboard();
    });

    // Admin Filters Listeners
    document.getElementById("admDoctorSearch").addEventListener("input", renderAdminDoctorsTable);
    document.getElementById("admDoctorDeptFilter").addEventListener("change", renderAdminDoctorsTable);
    document.getElementById("admDoctorFeeFilter").addEventListener("change", renderAdminDoctorsTable);

    document.getElementById("admPatientSearch").addEventListener("input", renderAdminPatientsTable);
    document.getElementById("admPatientGenderFilter").addEventListener("change", renderAdminPatientsTable);

    document.getElementById("admAptSearch").addEventListener("input", renderAdminAppointmentsTable);
    document.getElementById("admAptStatusFilter").addEventListener("change", renderAdminAppointmentsTable);

    document.getElementById("admDeptSearch").addEventListener("input", renderAdminDepartmentsTable);

    // Logout button (switches to patient / guest)
    document.getElementById("logoutBtn").addEventListener("click", () => {
        const nextRole = currentRole === "admin" ? "doctor" : (currentRole === "doctor" ? "patient" : "admin");
        switchUserRole(nextRole);
    });
}

// ==========================================
// 9. TOAST NOTIFICATION UTILITY
// ==========================================
function showToast(message) {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--brand-green-light);"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

