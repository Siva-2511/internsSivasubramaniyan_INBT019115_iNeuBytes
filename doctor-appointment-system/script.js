/**
 * YourCare Hospital - Doctor Appointment Booking System
 * Clean, Standard, Human-Written JavaScript (No Complex AI Bloat)
 */

// ==========================================
// 1. DOCTORS DATASET (Includes Free OPD & Paid Specialists)
// ==========================================
const DOCTORS_DATA = [
    {
        id: 1,
        name: "Dr. Meenakshi Sundaram",
        department: "General Medicine",
        qualification: "MBBS, MD (Internal Medicine)",
        experience: 12,
        fee: 0, // FREE OPD Doctor
        rating: 4.8,
        reviewsCount: 210,
        gender: "female",
        slots: ["08:00 AM", "09:30 AM", "11:30 AM", "04:00 PM", "05:30 PM"],
        room: "General OPD Room 101, Ground Floor",
        bio: "Senior Medical Officer conducting daily Free General OPD consultations, treating viral fevers, seasonal infections, chronic hypertension, and diabetes management."
    },
    {
        id: 2,
        name: "Dr. Ramesh Balaji",
        department: "General Medicine",
        qualification: "MBBS, DNB (Family Medicine)",
        experience: 7,
        fee: 0, // FREE OPD Doctor
        rating: 4.7,
        reviewsCount: 145,
        gender: "male",
        slots: ["08:30 AM", "10:00 AM", "02:00 PM", "04:30 PM"],
        room: "Primary Care OPD, Room 103",
        bio: "Family Physician handling general health complaints, preventative checkups, vaccination reviews, and routine pathology report reviews."
    },
    {
        id: 3,
        name: "Dr. K. Radhakrishnan",
        department: "Pediatrics",
        qualification: "MBBS, DCH (Child Health)",
        experience: 9,
        fee: 0, // FREE OPD Doctor
        rating: 4.9,
        reviewsCount: 178,
        gender: "male",
        slots: ["09:00 AM", "11:00 AM", "03:00 PM", "05:00 PM"],
        room: "Charitable Child OPD, Room 105",
        bio: "Dedicated Pediatrician providing Free Child OPD care, routine growth monitoring, pediatric vaccinations, and childhood cold/fever treatment."
    },
    {
        id: 4,
        name: "Dr. Rajesh Sharma",
        department: "Cardiology",
        qualification: "MBBS, MD, DM (Cardiology)",
        experience: 14,
        fee: 600,
        rating: 4.9,
        reviewsCount: 128,
        gender: "male",
        slots: ["09:00 AM", "10:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"],
        room: "Cardiology OPD Room 201, 2nd Floor",
        bio: "Senior Consultant Cardiologist specializing in echocardiography, preventative cardiac care, hypertension control, and post-stent management."
    },
    {
        id: 5,
        name: "Dr. Priya Nair",
        department: "Dermatology",
        qualification: "MBBS, MD (Dermatology)",
        experience: 9,
        fee: 500,
        rating: 4.8,
        reviewsCount: 94,
        gender: "female",
        slots: ["10:00 AM", "11:30 AM", "03:00 PM", "05:00 PM"],
        room: "Skin Care Clinic, Room 204",
        bio: "Specialist Dermatologist treating skin allergies, eczema, psoriasis, acne management, and hair loss diagnosis."
    },
    {
        id: 6,
        name: "Dr. Arun Venkataraman",
        department: "Orthopedics",
        qualification: "MBBS, MS (Orthopedics), M.Ch",
        experience: 16,
        fee: 700,
        rating: 4.9,
        reviewsCount: 156,
        gender: "male",
        slots: ["08:30 AM", "11:00 AM", "02:30 PM", "04:00 PM"],
        room: "Bone & Joint Clinic, Room 108",
        bio: "Senior Orthopedic Surgeon handling joint pain, fracture stabilization, sports ligament injuries, and arthritis rehabilitation."
    },
    {
        id: 7,
        name: "Dr. Suresh Menon",
        department: "Neurology",
        qualification: "MBBS, MD, DM (Neurology)",
        experience: 18,
        fee: 800,
        rating: 4.8,
        reviewsCount: 88,
        gender: "male",
        slots: ["10:30 AM", "12:00 PM", "03:30 PM", "06:00 PM"],
        room: "Neuro Sciences Dept, Room 301",
        bio: "Consultant Neurologist managing chronic migraines, epilepsy, nerve disorders, stroke recovery, and numbness issues."
    },
    {
        id: 8,
        name: "Dr. Shalini Rao",
        department: "ENT",
        qualification: "MBBS, MS (ENT)",
        experience: 10,
        fee: 450,
        rating: 4.7,
        reviewsCount: 65,
        gender: "female",
        slots: ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"],
        room: "ENT Clinic, Room 205",
        bio: "Specialist ENT Surgeon addressing chronic sinusitis, tonsillitis, ear infections, hearing evaluation, and allergic rhinitis."
    },
    {
        id: 9,
        name: "Dr. Karthik Iyer",
        department: "Ophthalmology",
        qualification: "MBBS, MS (Ophthalmology)",
        experience: 11,
        fee: 500,
        rating: 4.8,
        reviewsCount: 76,
        gender: "male",
        slots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:30 PM"],
        room: "Eye Care Unit, Room 202",
        bio: "Consultant Eye Specialist performing vision assessments, cataract screening, glaucoma testing, and eye infection treatments."
    },
    {
        id: 10,
        name: "Dr.Sivasubramaniyan G",
        department: "Cardiology",
        qualification: "MBBS, MS (Cardiology)",
        experience: 20,
        fee: 500,
        rating: 5.0,
        reviewsCount: 1000,
        gender: "male",
        slots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:30 PM"],
        room: "Eye Care Unit, Room 420",
        bio: "Senior Consultant Cardiologist specializing in echocardiography, preventative cardiac care, hypertension control, and post-stent management."
    }
];

// LocalStorage Key
const STORAGE_KEY_APPOINTMENTS = "YourCare_hospital_appointments";

// ==========================================
// 2. DOM ELEMENTS
// ==========================================
const navMenu = document.getElementById("navMenu");
const mobileToggle = document.getElementById("mobileToggle");
const navAppointmentsCount = document.getElementById("navAppointmentsCount");

// Search & Filter elements
const heroSearchInput = document.getElementById("heroSearchInput");
const heroDeptSelect = document.getElementById("heroDeptSelect");
const heroSearchBtn = document.getElementById("heroSearchBtn");

const doctorSearchInput = document.getElementById("doctorSearchInput");
const departmentFilter = document.getElementById("departmentFilter");
const feeFilter = document.getElementById("feeFilter");
const sortBy = document.getElementById("sortBy");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const resultsCountText = document.getElementById("resultsCountText");
const doctorsGrid = document.getElementById("doctorsGrid");
const noResultsMessage = document.getElementById("noResultsMessage");
const departmentsGrid = document.getElementById("departmentsGrid");

// Booking Form elements
const appointmentForm = document.getElementById("appointmentForm");
const bookDoctorSelect = document.getElementById("bookDoctorSelect");
const bookDepartment = document.getElementById("bookDepartment");
const selectedDoctorPreview = document.getElementById("selectedDoctorPreview");
const prevAvatar = document.getElementById("prevAvatar");
const prevName = document.getElementById("prevName");
const prevQual = document.getElementById("prevQual");
const prevFee = document.getElementById("prevFee");
const prevExp = document.getElementById("prevExp");
const prevRoom = document.getElementById("prevRoom");

const bookDate = document.getElementById("bookDate");
const timeSlotsContainer = document.getElementById("timeSlotsContainer");
const selectedSlotInput = document.getElementById("selectedSlotInput");

const patientName = document.getElementById("patientName");
const patientPhone = document.getElementById("patientPhone");
const patientEmail = document.getElementById("patientEmail");
const patientAge = document.getElementById("patientAge");
const patientGender = document.getElementById("patientGender");
const patientSymptoms = document.getElementById("patientSymptoms");

const sumDoctor = document.getElementById("sumDoctor");
const sumDateTime = document.getElementById("sumDateTime");
const sumFee = document.getElementById("sumFee");

// Appointments History elements
const appointmentsList = document.getElementById("appointmentsList");
const emptyAppointmentsState = document.getElementById("emptyAppointmentsState");
const countAll = document.getElementById("countAll");
const countConfirmed = document.getElementById("countConfirmed");
const countCancelled = document.getElementById("countCancelled");
const historyTabs = document.querySelectorAll(".history-tab");

// Modals
const doctorModal = document.getElementById("doctorModal");
const closeDoctorModal = document.getElementById("closeDoctorModal");
const doctorModalContent = document.getElementById("doctorModalContent");

const confirmationModal = document.getElementById("confirmationModal");
const closeConfirmationModal = document.getElementById("closeConfirmationModal");
const printReceiptBtn = document.getElementById("printReceiptBtn");
const viewAppointmentsFromModal = document.getElementById("viewAppointmentsFromModal");

// Receipt Details elements
const receiptId = document.getElementById("receiptId");
const receiptDoctor = document.getElementById("receiptDoctor");
const receiptDept = document.getElementById("receiptDept");
const receiptDate = document.getElementById("receiptDate");
const receiptTime = document.getElementById("receiptTime");
const receiptPatient = document.getElementById("receiptPatient");
const receiptPatientMeta = document.getElementById("receiptPatientMeta");
const receiptPhone = document.getElementById("receiptPhone");
const receiptEmail = document.getElementById("receiptEmail");
const receiptFee = document.getElementById("receiptFee");
const receiptFeeNote = document.getElementById("receiptFeeNote");
const receiptStatus = document.getElementById("receiptStatus");

// ==========================================
// 3. APPLICATION STATE
// ==========================================
let currentDepartmentFilter = "All";
let currentFeeFilter = "All";
let currentSearchTerm = "";
let currentSort = "default";
let currentHistoryFilter = "All";
let appointments = [];

// Helper for formatting fee label
function formatFeeDisplay(fee) {
    if (fee === 0) {
        return "FREE (General OPD)";
    }
    return `â‚¹${fee}`;
}

// ==========================================
// 4. INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Minimum date constraint (Today)
    initDatePicker();

    // 2. Load stored appointments
    loadAppointmentsFromStorage();

    // 3. Populate Doctor Dropdown
    populateDoctorDropdown();

    // 4. Render Doctor Cards
    filterAndRenderDoctors();

    // 5. Render History
    renderAppointmentsHistory();

    // 6. Setup Listeners
    setupEventListeners();
});

function initDatePicker() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    bookDate.min = `${yyyy}-${mm}-${dd}`;
}

function loadAppointmentsFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY_APPOINTMENTS);
    if (stored) {
        try {
            appointments = JSON.parse(stored);
        } catch (e) {
            appointments = [];
        }
    } else {
        // Sample starter appointment for clean presentation
        const sampleDate = new Date();
        sampleDate.setDate(sampleDate.getDate() + 1);
        const yyyy = sampleDate.getFullYear();
        const mm = String(sampleDate.getMonth() + 1).padStart(2, '0');
        const dd = String(sampleDate.getDate()).padStart(2, '0');

        appointments = [
            {
                id: "APT-2026-1042",
                doctorId: 1,
                doctorName: "Dr. Meenakshi Sundaram",
                department: "General Medicine",
                date: `${yyyy}-${mm}-${dd}`,
                timeSlot: "09:30 AM",
                fee: 0,
                patientName: "Sivasubramaniyan G",
                patientPhone: "9876543210",
                patientEmail: "sivas@example.com",
                patientAge: "24",
                patientGender: "Male",
                symptoms: "Routine health checkup & blood pressure review",
                status: "Confirmed",
                createdAt: new Date().toISOString()
            }
        ];
        saveAppointmentsToStorage();
    }
    updateAppointmentsBadge();
}

function saveAppointmentsToStorage() {
    localStorage.setItem(STORAGE_KEY_APPOINTMENTS, JSON.stringify(appointments));
    updateAppointmentsBadge();
}

function updateAppointmentsBadge() {
    const confirmedCount = appointments.filter(a => a.status === "Confirmed").length;
    if (navAppointmentsCount) {
        navAppointmentsCount.textContent = confirmedCount;
    }
}

// ==========================================
// 5. DOCTORS RENDERING & FILTERING
// ==========================================
function populateDoctorDropdown() {
    bookDoctorSelect.innerHTML = '<option value="">-- Choose a Doctor --</option>';
    DOCTORS_DATA.forEach(doc => {
        const opt = document.createElement("option");
        opt.value = doc.id;
        const feeText = doc.fee === 0 ? "FREE OPD" : `â‚¹${doc.fee}`;
        opt.textContent = `${doc.name} - ${doc.department} (${feeText})`;
        bookDoctorSelect.appendChild(opt);
    });
}

function filterAndRenderDoctors() {
    let filtered = DOCTORS_DATA.filter(doc => {
        // Department Filter
        const matchesDept = currentDepartmentFilter === "All" || doc.department.toLowerCase() === currentDepartmentFilter.toLowerCase();

        // Fee Filter
        let matchesFee = true;
        if (currentFeeFilter === "Free") {
            matchesFee = doc.fee === 0;
        } else if (currentFeeFilter === "Paid") {
            matchesFee = doc.fee > 0;
        }

        // Search Term
        const term = currentSearchTerm.trim().toLowerCase();
        const matchesSearch = !term ||
            doc.name.toLowerCase().includes(term) ||
            doc.department.toLowerCase().includes(term) ||
            doc.qualification.toLowerCase().includes(term) ||
            doc.bio.toLowerCase().includes(term);

        return matchesDept && matchesFee && matchesSearch;
    });

    // Sorting
    if (currentSort === "experience-high") {
        filtered.sort((a, b) => b.experience - a.experience);
    } else if (currentSort === "fee-low") {
        filtered.sort((a, b) => a.fee - b.fee);
    } else if (currentSort === "rating-high") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    // Results Count text
    if (resultsCountText) {
        resultsCountText.textContent = `Showing ${filtered.length} of ${DOCTORS_DATA.length} doctors ${currentDepartmentFilter !== "All" ? `in ${currentDepartmentFilter}` : ""}`;
    }

    // Render Cards
    if (filtered.length === 0) {
        doctorsGrid.innerHTML = "";
        noResultsMessage.style.display = "block";
    } else {
        noResultsMessage.style.display = "none";
        renderDoctorCards(filtered);
    }
}

function renderDoctorCards(doctorsList) {
    doctorsGrid.innerHTML = "";

    doctorsList.forEach(doc => {
        const card = document.createElement("div");
        card.className = "doctor-card";

        const iconGenderClass = doc.gender === "female" ? "fa-user-nurse" : "fa-user-doctor";
        const avatarGenderClass = doc.gender === "female" ? "doc-avatar female" : "doc-avatar";

        const previewSlotsHTML = doc.slots.slice(0, 3).map(slot => `<span class="slot-pill">${slot}</span>`).join("");

        const feeHTML = doc.fee === 0
            ? `<strong class="free-opd-badge"><i class="fa-solid fa-gift"></i> FREE (OPD)</strong>`
            : `<strong>â‚¹${doc.fee}</strong>`;

        card.innerHTML = `
            <div class="doc-card-header">
                <div class="${avatarGenderClass}">
                    <i class="fa-solid ${iconGenderClass}"></i>
                </div>
                <div class="doc-header-info">
                    <h3>${doc.name}</h3>
                    <span class="doc-specialty-badge">${doc.department}</span>
                    <p class="doc-qualification">${doc.qualification}</p>
                </div>
            </div>

            <div class="doc-stats-row">
                <div class="doc-stat">
                    <span>Experience</span>
                    <strong>${doc.experience}+ Years</strong>
                </div>
                <div class="doc-stat">
                    <span>Consultation</span>
                    ${feeHTML}
                </div>
                <div class="doc-stat">
                    <span>Rating</span>
                    <strong><i class="fa-solid fa-star rating-star"></i> ${doc.rating} (${doc.reviewsCount})</strong>
                </div>
            </div>

            <div class="doc-slots-preview">
                <span class="label"><i class="fa-regular fa-clock"></i> Available Slots Today:</span>
                <div class="slots-pill-group">
                    ${previewSlotsHTML}
                    ${doc.slots.length > 3 ? `<span class="slot-pill">+${doc.slots.length - 3} more</span>` : ""}
                </div>
            </div>

            <div class="doc-card-footer">
                <button class="btn btn-outline btn-sm view-profile-btn" data-id="${doc.id}">
                    <i class="fa-regular fa-user"></i> View Profile
                </button>
                <button class="btn btn-primary btn-sm book-doc-btn" data-id="${doc.id}">
                    <i class="fa-regular fa-calendar-check"></i> Book Slot
                </button>
            </div>
        `;

        doctorsGrid.appendChild(card);
    });

    // Attach listeners
    document.querySelectorAll(".view-profile-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const docId = parseInt(btn.getAttribute("data-id"));
            openDoctorDetailsModal(docId);
        });
    });

    document.querySelectorAll(".book-doc-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const docId = parseInt(btn.getAttribute("data-id"));
            selectDoctorAndScrollToBooking(docId);
        });
    });
}

function selectDoctorAndScrollToBooking(doctorId) {
    bookDoctorSelect.value = doctorId;
    handleDoctorSelectChange();

    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
    }
}

// ==========================================
// 6. DOCTOR PROFILE DETAILS MODAL
// ==========================================
function openDoctorDetailsModal(doctorId) {
    const doc = DOCTORS_DATA.find(d => d.id === doctorId);
    if (!doc) return;

    const iconGenderClass = doc.gender === "female" ? "fa-user-nurse" : "fa-user-doctor";
    const feeDisplay = doc.fee === 0 ? "FREE (Charitable / General OPD)" : `â‚¹${doc.fee} (Payable at counter)`;

    doctorModalContent.innerHTML = `
        <div class="doc-modal-header">
            <div class="doc-modal-avatar">
                <i class="fa-solid ${iconGenderClass}"></i>
            </div>
            <div>
                <h2>${doc.name}</h2>
                <span class="doc-specialty-badge">${doc.department}</span>
                <p class="doc-qualification" style="margin-top: 4px;">${doc.qualification}</p>
            </div>
        </div>

        <div class="doc-modal-body">
            <div class="doc-detail-grid">
                <div class="detail-item">
                    <span>Clinical Experience</span>
                    <strong>${doc.experience}+ Years in Hospital Practice</strong>
                </div>
                <div class="detail-item">
                    <span>OPD Consultation Fee</span>
                    <strong style="color: var(--brand-green); font-size: 0.95rem;">${feeDisplay}</strong>
                </div>
                <div class="detail-item">
                    <span>OPD Room / Clinic</span>
                    <strong>${doc.room}</strong>
                </div>
                <div class="detail-item">
                    <span>Patient Rating</span>
                    <strong><i class="fa-solid fa-star rating-star"></i> ${doc.rating} / 5.0 (${doc.reviewsCount} reviews)</strong>
                </div>
            </div>

            <h4>About the Doctor</h4>
            <p>${doc.bio}</p>

            <h4>Consultation Timings & Slots</h4>
            <div class="slots-pill-group" style="margin-top: 0.5rem;">
                ${doc.slots.map(s => `<span class="slot-pill" style="padding: 0.4rem 0.75rem; font-weight: 500;">${s}</span>`).join("")}
            </div>

            <div class="modal-actions" style="margin-top: 1.5rem;">
                <button class="btn btn-outline" id="modalCloseBtn">Close</button>
                <button class="btn btn-primary" id="modalBookBtn" data-id="${doc.id}">
                    <i class="fa-regular fa-calendar-check"></i> Book Appointment
                </button>
            </div>
        </div>
    `;

    doctorModal.classList.add("active");

    document.getElementById("modalCloseBtn").addEventListener("click", () => {
        doctorModal.classList.remove("active");
    });

    document.getElementById("modalBookBtn").addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        doctorModal.classList.remove("active");
        selectDoctorAndScrollToBooking(id);
    });
}

// ==========================================
// 7. BOOKING FORM LOGIC & VALIDATION
// ==========================================
function handleDoctorSelectChange() {
    const docId = parseInt(bookDoctorSelect.value);
    const doc = DOCTORS_DATA.find(d => d.id === docId);

    if (doc) {
        bookDepartment.value = doc.department;
        selectedDoctorPreview.style.display = "flex";
        prevAvatar.innerHTML = `<i class="fa-solid ${doc.gender === 'female' ? 'fa-user-nurse' : 'fa-user-doctor'}"></i>`;
        prevName.textContent = doc.name;
        prevQual.textContent = `${doc.qualification} (${doc.department})`;

        const feeText = formatFeeDisplay(doc.fee);
        prevFee.textContent = feeText;
        prevExp.textContent = `${doc.experience} Years`;
        prevRoom.textContent = doc.room;

        sumDoctor.textContent = `${doc.name} (${doc.department})`;
        sumFee.textContent = feeText;

        renderTimeSlotChips(doc.slots);
    } else {
        bookDepartment.value = "";
        selectedDoctorPreview.style.display = "none";
        sumDoctor.textContent = "Not selected";
        sumFee.textContent = "â‚¹0";
        timeSlotsContainer.innerHTML = '<span class="slot-hint">Please choose a doctor first to load available time slots</span>';
        selectedSlotInput.value = "";
    }
    updateLiveSummary();
}

function renderTimeSlotChips(slots) {
    timeSlotsContainer.innerHTML = "";
    selectedSlotInput.value = "";

    slots.forEach(slot => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "slot-chip";
        chip.textContent = slot;

        chip.addEventListener("click", () => {
            document.querySelectorAll(".slot-chip").forEach(c => c.classList.remove("selected"));
            chip.classList.add("selected");
            selectedSlotInput.value = slot;
            clearFieldError("slotError", "selectedSlotInput");
            updateLiveSummary();
        });

        timeSlotsContainer.appendChild(chip);
    });
}

function updateLiveSummary() {
    const dateVal = bookDate.value;
    const slotVal = selectedSlotInput.value;

    if (dateVal && slotVal) {
        const parts = dateVal.split("-");
        const formattedDate = new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        sumDateTime.textContent = `${formattedDate} at ${slotVal}`;
    } else if (dateVal) {
        sumDateTime.textContent = `${dateVal} (Pick time slot)`;
    } else {
        sumDateTime.textContent = "Not selected";
    }
}

// Field Error Helpers
function showFieldError(errorId, inputId) {
    const err = document.getElementById(errorId);
    if (err) err.style.display = "block";
    const input = document.getElementById(inputId);
    if (input && input.parentElement) {
        input.parentElement.classList.add("has-error");
    }
}

function clearFieldError(errorId, inputId) {
    const err = document.getElementById(errorId);
    if (err) err.style.display = "none";
    const input = document.getElementById(inputId);
    if (input && input.parentElement) {
        input.parentElement.classList.remove("has-error");
    }
}

function validateAppointmentForm() {
    let isValid = true;

    // 1. Doctor
    if (!bookDoctorSelect.value) {
        showFieldError("doctorError", "bookDoctorSelect");
        isValid = false;
    } else {
        clearFieldError("doctorError", "bookDoctorSelect");
    }

    // 2. Date
    if (!bookDate.value) {
        showFieldError("dateError", "bookDate");
        isValid = false;
    } else {
        const chosen = new Date(bookDate.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (chosen < today) {
            showFieldError("dateError", "bookDate");
            isValid = false;
        } else {
            clearFieldError("dateError", "bookDate");
        }
    }

    // 3. Time Slot
    if (!selectedSlotInput.value) {
        showFieldError("slotError", "selectedSlotInput");
        isValid = false;
    } else {
        clearFieldError("slotError", "selectedSlotInput");
    }

    // 4. Patient Name
    if (!patientName.value.trim() || patientName.value.trim().length < 3) {
        showFieldError("nameError", "patientName");
        isValid = false;
    } else {
        clearFieldError("nameError", "patientName");
    }

    // 5. Phone Number (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    const cleanPhone = patientPhone.value.trim().replace(/\D/g, "");
    if (!phoneRegex.test(cleanPhone)) {
        showFieldError("phoneError", "patientPhone");
        isValid = false;
    } else {
        clearFieldError("phoneError", "patientPhone");
    }

    // 6. Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(patientEmail.value.trim())) {
        showFieldError("emailError", "patientEmail");
        isValid = false;
    } else {
        clearFieldError("emailError", "patientEmail");
    }

    // 7. Age
    const ageVal = parseInt(patientAge.value);
    if (isNaN(ageVal) || ageVal < 1 || ageVal > 120) {
        showFieldError("ageError", "patientAge");
        isValid = false;
    } else {
        clearFieldError("ageError", "patientAge");
    }

    // 8. Gender
    if (!patientGender.value) {
        showFieldError("genderError", "patientGender");
        isValid = false;
    } else {
        clearFieldError("genderError", "patientGender");
    }

    return isValid;
}

function handleAppointmentSubmit(e) {
    e.preventDefault();

    if (!validateAppointmentForm()) {
        return;
    }

    const docId = parseInt(bookDoctorSelect.value);
    const doctor = DOCTORS_DATA.find(d => d.id === docId);

    // Generate unique Appointment ID
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const appointmentId = `APT-2026-${randomDigits}`;

    const newAppointment = {
        id: appointmentId,
        doctorId: doctor.id,
        doctorName: doctor.name,
        department: doctor.department,
        date: bookDate.value,
        timeSlot: selectedSlotInput.value,
        fee: doctor.fee,
        patientName: patientName.value.trim(),
        patientPhone: patientPhone.value.trim(),
        patientEmail: patientEmail.value.trim(),
        patientAge: patientAge.value.trim(),
        patientGender: patientGender.value,
        symptoms: patientSymptoms.value.trim() || "General Medical Consultation",
        status: "Confirmed",
        createdAt: new Date().toISOString()
    };

    appointments.unshift(newAppointment);
    saveAppointmentsToStorage();

    // Reset Form
    appointmentForm.reset();
    bookDepartment.value = "";
    selectedDoctorPreview.style.display = "none";
    timeSlotsContainer.innerHTML = '<span class="slot-hint">Please choose a doctor first to load available time slots</span>';
    selectedSlotInput.value = "";
    sumDoctor.textContent = "Not selected";
    sumDateTime.textContent = "Not selected";
    sumFee.textContent = "â‚¹0";

    renderAppointmentsHistory();
    displayConfirmationModal(newAppointment);
}

// ==========================================
// 8. CONFIRMATION RECEIPT MODAL
// ==========================================
function displayConfirmationModal(apt) {
    receiptId.textContent = apt.id;
    receiptDoctor.textContent = apt.doctorName;
    receiptDept.textContent = apt.department;

    const parts = apt.date.split("-");
    const formattedDate = new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
    receiptDate.textContent = formattedDate;
    receiptTime.textContent = apt.timeSlot;

    receiptPatient.textContent = apt.patientName;
    receiptPatientMeta.textContent = `${apt.patientAge} Yrs / ${apt.patientGender}`;
    receiptPhone.textContent = apt.patientPhone;
    receiptEmail.textContent = apt.patientEmail;

    if (apt.fee === 0) {
        receiptFee.textContent = "FREE (â‚¹0)";
        receiptFeeNote.textContent = "General OPD - No counter fee";
    } else {
        receiptFee.textContent = `â‚¹${apt.fee}`;
        receiptFeeNote.textContent = "Payable at Hospital Reception";
    }

    receiptStatus.textContent = apt.status;
    confirmationModal.classList.add("active");
}

// ==========================================
// 9. APPOINTMENTS HISTORY (CRUD & LOCALSTORAGE)
// ==========================================
function renderAppointmentsHistory() {
    const totalAll = appointments.length;
    const totalConfirmed = appointments.filter(a => a.status === "Confirmed").length;
    const totalCancelled = appointments.filter(a => a.status === "Cancelled").length;

    if (countAll) countAll.textContent = totalAll;
    if (countConfirmed) countConfirmed.textContent = totalConfirmed;
    if (countCancelled) countCancelled.textContent = totalCancelled;

    const filtered = appointments.filter(a => {
        if (currentHistoryFilter === "All") return true;
        return a.status === currentHistoryFilter;
    });

    appointmentsList.innerHTML = "";

    if (filtered.length === 0) {
        emptyAppointmentsState.style.display = "block";
    } else {
        emptyAppointmentsState.style.display = "none";

        filtered.forEach(apt => {
            const card = document.createElement("div");
            card.className = "appointment-card";

            const parts = apt.date.split("-");
            const formattedDate = new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });

            const statusClass = apt.status === "Confirmed" ? "status-confirmed" : "status-cancelled";
            const feeString = apt.fee === 0 ? "FREE OPD" : `â‚¹${apt.fee}`;

            card.innerHTML = `
                <div class="apt-col-doc">
                    <h4>${apt.doctorName}</h4>
                    <p><i class="fa-solid fa-stethoscope"></i> ${apt.department} &bull; <strong>${apt.id}</strong></p>
                </div>

                <div class="apt-col-date">
                    <strong><i class="fa-regular fa-calendar"></i> ${formattedDate}</strong>
                    <span><i class="fa-regular fa-clock"></i> ${apt.timeSlot}</span>
                </div>

                <div class="apt-col-patient">
                    <strong><i class="fa-regular fa-user"></i> ${apt.patientName}</strong>
                    <span>${apt.patientPhone} &bull; ${feeString}</span>
                </div>

                <div class="apt-col-status">
                    <span class="status-pill ${statusClass}">${apt.status}</span>
                </div>

                <div class="apt-actions">
                    <button class="btn btn-outline btn-sm view-slip-btn" data-id="${apt.id}" title="View Receipt">
                        <i class="fa-solid fa-receipt"></i> Slip
                    </button>
                    ${apt.status === "Confirmed" ? `
                        <button class="btn btn-outline btn-sm cancel-apt-btn" data-id="${apt.id}" title="Cancel Appointment" style="color: var(--color-danger); border-color: #fecaca;">
                            <i class="fa-solid fa-xmark"></i> Cancel
                        </button>
                    ` : ""}
                </div>
            `;

            appointmentsList.appendChild(card);
        });

        // Listeners for view and cancel
        document.querySelectorAll(".view-slip-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const found = appointments.find(a => a.id === id);
                if (found) displayConfirmationModal(found);
            });
        });

        document.querySelectorAll(".cancel-apt-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                cancelAppointment(id);
            });
        });
    }
}

function cancelAppointment(appointmentId) {
    const confirmCancel = confirm(`Do you want to cancel appointment ${appointmentId}?`);
    if (!confirmCancel) return;

    const aptIndex = appointments.findIndex(a => a.id === appointmentId);
    if (aptIndex !== -1) {
        appointments[aptIndex].status = "Cancelled";
        saveAppointmentsToStorage();
        renderAppointmentsHistory();
    }
}

// ==========================================
// 10. EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Mobile navigation toggle
    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // Hero Quick Search
    if (heroSearchBtn) {
        heroSearchBtn.addEventListener("click", () => {
            const keyword = heroSearchInput.value.trim();
            const dept = heroDeptSelect.value;

            doctorSearchInput.value = keyword;
            currentSearchTerm = keyword;

            departmentFilter.value = dept;
            currentDepartmentFilter = dept;

            updateActiveDeptCard(dept);
            filterAndRenderDoctors();

            document.getElementById("doctors").scrollIntoView({ behavior: "smooth" });
        });
    }

    // Department Cards in Section
    document.querySelectorAll(".dept-card").forEach(card => {
        card.addEventListener("click", () => {
            const dept = card.getAttribute("data-dept");
            currentDepartmentFilter = dept;
            departmentFilter.value = dept;
            updateActiveDeptCard(dept);
            filterAndRenderDoctors();
            document.getElementById("doctors").scrollIntoView({ behavior: "smooth" });
        });
    });

    // Doctor Search Input (Real-time)
    if (doctorSearchInput) {
        doctorSearchInput.addEventListener("input", (e) => {
            currentSearchTerm = e.target.value;
            filterAndRenderDoctors();
        });
    }

    // Department Filter Dropdown
    if (departmentFilter) {
        departmentFilter.addEventListener("change", (e) => {
            currentDepartmentFilter = e.target.value;
            updateActiveDeptCard(e.target.value);
            filterAndRenderDoctors();
        });
    }

    // Fee Filter Dropdown
    if (feeFilter) {
        feeFilter.addEventListener("change", (e) => {
            currentFeeFilter = e.target.value;
            filterAndRenderDoctors();
        });
    }

    // Sort By Dropdown
    if (sortBy) {
        sortBy.addEventListener("change", (e) => {
            currentSort = e.target.value;
            filterAndRenderDoctors();
        });
    }

    // Reset Filters
    if (resetFiltersBtn) resetFiltersBtn.addEventListener("click", resetAllFilters);
    if (clearSearchBtn) clearSearchBtn.addEventListener("click", resetAllFilters);

    // Booking Doctor Selector
    if (bookDoctorSelect) {
        bookDoctorSelect.addEventListener("change", handleDoctorSelectChange);
    }

    // Booking Date
    if (bookDate) {
        bookDate.addEventListener("change", () => {
            clearFieldError("dateError", "bookDate");
            updateLiveSummary();
        });
    }

    // Real-time error clearing
    patientName.addEventListener("input", () => clearFieldError("nameError", "patientName"));
    patientPhone.addEventListener("input", () => clearFieldError("phoneError", "patientPhone"));
    patientEmail.addEventListener("input", () => clearFieldError("emailError", "patientEmail"));
    patientAge.addEventListener("input", () => clearFieldError("ageError", "patientAge"));
    patientGender.addEventListener("change", () => clearFieldError("genderError", "patientGender"));

    // Form Submit & Reset
    if (appointmentForm) {
        appointmentForm.addEventListener("submit", handleAppointmentSubmit);
    }

    const resetBookingFormBtn = document.getElementById("resetBookingForm");
    if (resetBookingFormBtn) {
        resetBookingFormBtn.addEventListener("click", () => {
            setTimeout(() => {
                handleDoctorSelectChange();
            }, 50);
        });
    }

    // History Filter Tabs
    historyTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            historyTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            currentHistoryFilter = tab.getAttribute("data-status");
            renderAppointmentsHistory();
        });
    });

    // Modals
    if (closeDoctorModal) closeDoctorModal.addEventListener("click", () => doctorModal.classList.remove("active"));
    if (doctorModal) {
        doctorModal.addEventListener("click", (e) => {
            if (e.target === doctorModal) doctorModal.classList.remove("active");
        });
    }

    if (closeConfirmationModal) closeConfirmationModal.addEventListener("click", () => confirmationModal.classList.remove("active"));
    if (confirmationModal) {
        confirmationModal.addEventListener("click", (e) => {
            if (e.target === confirmationModal) confirmationModal.classList.remove("active");
        });
    }

    // Print Receipt
    if (printReceiptBtn) {
        printReceiptBtn.addEventListener("click", () => {
            window.print();
        });
    }

    // View My Appointments from modal
    if (viewAppointmentsFromModal) {
        viewAppointmentsFromModal.addEventListener("click", () => {
            confirmationModal.classList.remove("active");
            document.getElementById("my-appointments").scrollIntoView({ behavior: "smooth" });
        });
    }
}

function updateActiveDeptCard(deptValue) {
    document.querySelectorAll(".dept-card").forEach(c => {
        if (c.getAttribute("data-dept") === deptValue) {
            c.classList.add("active");
        } else {
            c.classList.remove("active");
        }
    });
}

function resetAllFilters() {
    currentSearchTerm = "";
    currentDepartmentFilter = "All";
    currentFeeFilter = "All";
    currentSort = "default";

    if (doctorSearchInput) doctorSearchInput.value = "";
    if (heroSearchInput) heroSearchInput.value = "";
    if (departmentFilter) departmentFilter.value = "All";
    if (feeFilter) feeFilter.value = "All";
    if (heroDeptSelect) heroDeptSelect.value = "All";
    if (sortBy) sortBy.value = "default";

    updateActiveDeptCard("All");
    filterAndRenderDoctors();
}

