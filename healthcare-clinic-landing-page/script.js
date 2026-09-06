/**
 * YourCare Clinic - Healthcare Landing Page (Task 1)
 * Clean, Standard, Well-Structured JavaScript
 */

document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. DOM ELEMENTS
    // ==========================================
    const navbar = document.querySelector(".navbar-container");
    const navMenu = document.getElementById("navMenu");
    const mobileToggle = document.getElementById("mobileToggle");
    const navLinks = document.querySelectorAll(".nav-link");

    // Form elements
    const enquiryForm = document.getElementById("enquiryForm");
    const enquiryName = document.getElementById("enquiryName");
    const enquiryEmail = document.getElementById("enquiryEmail");
    const enquiryPhone = document.getElementById("enquiryPhone");
    const enquiryDept = document.getElementById("enquiryDept");
    const enquiryMessage = document.getElementById("enquiryMessage");
    const resetEnquiryBtn = document.getElementById("resetEnquiryBtn");

    // Confirmation Modal elements
    const enquiryModal = document.getElementById("enquiryModal");
    const closeEnquiryModal = document.getElementById("closeEnquiryModal");
    const enquiryOkBtn = document.getElementById("enquiryOkBtn");
    const modalRefId = document.getElementById("modalRefId");
    const modalName = document.getElementById("modalName");
    const modalDept = document.getElementById("modalDept");
    const modalPhone = document.getElementById("modalPhone");
    const modalEmail = document.getElementById("modalEmail");

    // ==========================================
    // 2. MOBILE NAVIGATION & SCROLL HIGHLIGHT
    // ==========================================
    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("open")) {
                navMenu.classList.remove("open");
            }
        });
    });

    // Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let currentSection = "";
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    // ==========================================
    // 3. DOCTOR CARD "REQUEST APPOINTMENT" ACTION
    // ==========================================
    const consultBtns = document.querySelectorAll(".consult-btn");
    consultBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const dept = btn.getAttribute("data-dept");
            if (dept && enquiryDept) {
                enquiryDept.value = dept;
                clearFieldError("deptError", "enquiryDept");
            }
            const doctorName = btn.getAttribute("data-doctor");
            if (doctorName && enquiryMessage) {
                enquiryMessage.value = `Requesting consultation with ${doctorName}.`;
            }
        });
    });

    // ==========================================
    // 4. FORM VALIDATION HELPERS
    // ==========================================
    function showFieldError(errorId, inputId) {
        const errorElem = document.getElementById(errorId);
        if (errorElem) errorElem.style.display = "block";
        const inputElem = document.getElementById(inputId);
        if (inputElem && inputElem.parentElement) {
            inputElem.parentElement.classList.add("has-error");
        }
    }

    function clearFieldError(errorId, inputId) {
        const errorElem = document.getElementById(errorId);
        if (errorElem) errorElem.style.display = "none";
        const inputElem = document.getElementById(inputId);
        if (inputElem && inputElem.parentElement) {
            inputElem.parentElement.classList.remove("has-error");
        }
    }

    // Real-time error removal
    enquiryName.addEventListener("input", () => clearFieldError("nameError", "enquiryName"));
    enquiryEmail.addEventListener("input", () => clearFieldError("emailError", "enquiryEmail"));
    enquiryPhone.addEventListener("input", () => clearFieldError("phoneError", "enquiryPhone"));
    enquiryDept.addEventListener("change", () => clearFieldError("deptError", "enquiryDept"));

    function validateEnquiryForm() {
        let isValid = true;

        // 1. Name (Minimum 3 characters)
        const nameVal = enquiryName.value.trim();
        if (!nameVal || nameVal.length < 3) {
            showFieldError("nameError", "enquiryName");
            isValid = false;
        } else {
            clearFieldError("nameError", "enquiryName");
        }

        // 2. Email Address
        const emailVal = enquiryEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailVal)) {
            showFieldError("emailError", "enquiryEmail");
            isValid = false;
        } else {
            clearFieldError("emailError", "enquiryEmail");
        }

        // 3. Phone Number (10 digits)
        const phoneVal = enquiryPhone.value.trim().replace(/\D/g, "");
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneVal)) {
            showFieldError("phoneError", "enquiryPhone");
            isValid = false;
        } else {
            clearFieldError("phoneError", "enquiryPhone");
        }

        // 4. Preferred Department
        if (!enquiryDept.value) {
            showFieldError("deptError", "enquiryDept");
            isValid = false;
        } else {
            clearFieldError("deptError", "enquiryDept");
        }

        return isValid;
    }

    // ==========================================
    // 5. ENQUIRY SUBMISSION HANDLER
    // ==========================================
    if (enquiryForm) {
        enquiryForm.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!validateEnquiryForm()) {
                return;
            }

            // Generate unique Enquiry Reference Token
            const randomCode = Math.floor(1000 + Math.random() * 9000);
            const refToken = `ENQ-2026-${randomCode}`;

            const enquiryData = {
                refId: refToken,
                patientName: enquiryName.value.trim(),
                email: enquiryEmail.value.trim(),
                phone: enquiryPhone.value.trim(),
                department: enquiryDept.value,
                message: enquiryMessage.value.trim() || "General Consultation Enquiry",
                submittedAt: new Date().toISOString()
            };

            // Store in LocalStorage for client-side persistence
            try {
                const storedEnquiries = JSON.parse(localStorage.getItem("YourCare_enquiries_list") || "[]");
                storedEnquiries.unshift(enquiryData);
                localStorage.setItem("YourCare_enquiries_list", JSON.stringify(storedEnquiries));
            } catch (err) {
                console.warn("Could not save to LocalStorage:", err);
            }

            // Populate and show Confirmation Modal
            modalRefId.textContent = enquiryData.refId;
            modalName.textContent = enquiryData.patientName;
            modalDept.textContent = enquiryData.department;
            modalPhone.textContent = enquiryData.phone;
            modalEmail.textContent = enquiryData.email;

            enquiryModal.classList.add("active");

            // Reset form
            enquiryForm.reset();
        });
    }

    // Reset button handler
    if (resetEnquiryBtn) {
        resetEnquiryBtn.addEventListener("click", () => {
            clearFieldError("nameError", "enquiryName");
            clearFieldError("emailError", "enquiryEmail");
            clearFieldError("phoneError", "enquiryPhone");
            clearFieldError("deptError", "enquiryDept");
        });
    }

    // Close Modal listeners
    if (closeEnquiryModal) {
        closeEnquiryModal.addEventListener("click", () => {
            enquiryModal.classList.remove("active");
        });
    }

    if (enquiryOkBtn) {
        enquiryOkBtn.addEventListener("click", () => {
            enquiryModal.classList.remove("active");
        });
    }

    if (enquiryModal) {
        enquiryModal.addEventListener("click", (e) => {
            if (e.target === enquiryModal) {
                enquiryModal.classList.remove("active");
            }
        });
    }
});

