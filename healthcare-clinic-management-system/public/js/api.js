/**
 * YourCare Hospital & Clinic Management System
 * Centralized REST API Client (communicating with Express backend)
 */

const API_BASE = '/api';

const API = {
    // Auth
    async login(email, password, role) {
        const res = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });
        return await res.json();
    },

    async register(userData) {
        const res = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return await res.json();
    },

    // Doctors
    async getDoctors(params = {}) {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_BASE}/doctors?${query}`);
        return await res.json();
    },

    async addDoctor(docData) {
        const res = await fetch(`${API_BASE}/doctors`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(docData)
        });
        return await res.json();
    },

    async updateDoctor(id, docData) {
        const res = await fetch(`${API_BASE}/doctors/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(docData)
        });
        return await res.json();
    },

    async deleteDoctor(id) {
        const res = await fetch(`${API_BASE}/doctors/${id}`, { method: 'DELETE' });
        return await res.json();
    },

    // Patients
    async getPatients(params = {}) {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_BASE}/patients?${query}`);
        return await res.json();
    },

    async addPatient(patientData) {
        const res = await fetch(`${API_BASE}/patients`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        });
        return await res.json();
    },

    async updatePatient(id, patientData) {
        const res = await fetch(`${API_BASE}/patients/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patientData)
        });
        return await res.json();
    },

    async deletePatient(id) {
        const res = await fetch(`${API_BASE}/patients/${id}`, { method: 'DELETE' });
        return await res.json();
    },

    // Appointments
    async getAppointments(params = {}) {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_BASE}/appointments?${query}`);
        return await res.json();
    },

    async bookAppointment(aptData) {
        const res = await fetch(`${API_BASE}/appointments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aptData)
        });
        return await res.json();
    },

    async updateAppointmentStatus(id, status) {
        const res = await fetch(`${API_BASE}/appointments/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return await res.json();
    },

    async deleteAppointment(id) {
        const res = await fetch(`${API_BASE}/appointments/${id}`, { method: 'DELETE' });
        return await res.json();
    },

    // Departments
    async getDepartments() {
        const res = await fetch(`${API_BASE}/departments`);
        return await res.json();
    },

    async addDepartment(deptData) {
        const res = await fetch(`${API_BASE}/departments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deptData)
        });
        return await res.json();
    },

    async deleteDepartment(id) {
        const res = await fetch(`${API_BASE}/departments/${id}`, { method: 'DELETE' });
        return await res.json();
    },

    // Prescriptions
    async getPrescriptions(params = {}) {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`${API_BASE}/prescriptions?${query}`);
        return await res.json();
    },

    async addPrescription(prescData) {
        const res = await fetch(`${API_BASE}/prescriptions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prescData)
        });
        return await res.json();
    },

    async forgotPassword(email, newPassword, role) {
        const res = await fetch(`${API_BASE}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword, role })
        });
        return await res.json();
    },

    async updatePrescription(id, prescData) {
        const res = await fetch(`${API_BASE}/prescriptions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prescData)
        });
        return await res.json();
    },

    // Analytics
    async getAnalytics() {
        const res = await fetch(`${API_BASE}/analytics`);
        return await res.json();
    }
};

// UI Notification Toast
function showToast(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--brand-green-light);"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

