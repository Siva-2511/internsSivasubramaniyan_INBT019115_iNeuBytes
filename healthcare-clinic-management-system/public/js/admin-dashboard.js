/**
 * Admin Dashboard Controller
 * Full CRUD for Doctors, Patients, Appointments, Departments, Analytics & Reports
 */

let allDoctors = [];
let allPatients = [];
let allAppointments = [];
let allDepartments = [];

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Protect Admin Page
    const user = Auth.protectPage('admin');
    if (!user) return;

    // 2. Setup Subtab Switcher
    setupSubtabs();

    // 3. Load All Data from Backend API
    await refreshAllData();

    // 4. Setup Forms and Filters
    setupEventListeners();
});

function setupSubtabs() {
    document.querySelectorAll('.admin-subtabs .subtab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            switchAdminTab(target);
        });
    });
}

function switchAdminTab(targetId) {
    document.querySelectorAll('.admin-subtabs .subtab-btn').forEach(btn => {
        if (btn.getAttribute('data-target') === targetId) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    document.querySelectorAll('.subtab-content').forEach(content => {
        if (content.id === targetId) content.classList.add('active');
        else content.classList.remove('active');
    });
}

async function refreshAllData() {
    try {
        const [docsRes, patsRes, aptsRes, deptsRes, analRes] = await Promise.all([
            API.getDoctors(),
            API.getPatients(),
            API.getAppointments(),
            API.getDepartments(),
            API.getAnalytics()
        ]);

        allDoctors = docsRes.data || [];
        allPatients = patsRes.data || [];
        allAppointments = aptsRes.data || [];
        allDepartments = deptsRes.data || [];

        // Update Subtab Badges
        document.getElementById('tabCountDocs').textContent = allDoctors.length;
        document.getElementById('tabCountPats').textContent = allPatients.length;
        document.getElementById('tabCountApts').textContent = allAppointments.length;

        // Render KPI Stats & Overview
        renderOverview(analRes.data);

        // Render Tables
        renderDoctorsTable();
        renderPatientsTable();
        renderAppointmentsTable();
        renderDepartmentsTable();
        renderReports();
    } catch(e) {
        console.error('Error loading admin data:', e);
    }
}

function renderOverview(analytics) {
    if (analytics) {
        document.getElementById('statTotalDocs').textContent = analytics.doctors.total;
        document.getElementById('statFreeDocs').textContent = analytics.doctors.free;
        document.getElementById('statTotalPatients').textContent = analytics.patients.total;
        document.getElementById('statTotalApts').textContent = analytics.appointments.total;
        document.getElementById('statConfirmedApts').textContent = analytics.appointments.confirmed;
        document.getElementById('statTotalDepts').textContent = analytics.departments.total;
    }

    // Recent Appointments Table
    const recentBody = document.getElementById('recentAptsTableBody');
    recentBody.innerHTML = '';
    allAppointments.slice(0, 5).forEach(apt => {
        const tr = document.createElement('tr');
        const statusClass = apt.status === 'Confirmed' ? 'status-confirmed' : (apt.status === 'Completed' ? 'status-completed' : 'status-cancelled');
        const feeText = apt.fee === 0 ? `<strong style="color: var(--brand-green);">FREE</strong>` : `₹${apt.fee}`;

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

    // Dept Progress Bars
    const deptList = document.getElementById('deptDistributionList');
    deptList.innerHTML = '';
    allDepartments.slice(0, 5).forEach(dept => {
        const count = allDoctors.filter(d => d.department.toLowerCase() === dept.name.toLowerCase()).length;
        const perc = allDoctors.length > 0 ? Math.round((count / allDoctors.length) * 100) : 0;

        const item = document.createElement('div');
        item.className = 'service-card';
        item.style.padding = '0.75rem';
        item.innerHTML = `
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                <strong>${dept.name}</strong>
                <span>${count} Doctors (${perc}%)</span>
            </div>
            <div style="height: 6px; background: var(--bg-muted); border-radius: var(--radius-full); overflow: hidden;">
                <div style="height: 100%; width: ${Math.max(perc, 15)}%; background: var(--brand-green);"></div>
            </div>
        `;
        deptList.appendChild(item);
    });
}

// ==========================================
// 1. DOCTORS CRUD
// ==========================================
function renderDoctorsTable() {
    const search = (document.getElementById('docSearchInput').value || '').toLowerCase().trim();
    const dept = document.getElementById('docDeptFilter').value;
    const fee = document.getElementById('docFeeFilter').value;

    let filtered = allDoctors.filter(d => {
        const matchesSearch = !search || d.name.toLowerCase().includes(search) || d.qualification.toLowerCase().includes(search) || d.department.toLowerCase().includes(search);
        const matchesDept = dept === 'All' || d.department.toLowerCase() === dept.toLowerCase();
        let matchesFee = true;
        if (fee === 'Free') matchesFee = d.fee === 0;
        if (fee === 'Paid') matchesFee = d.fee > 0;
        return matchesSearch && matchesDept && matchesFee;
    });

    const tableBody = document.getElementById('adminDoctorsTableBody');
    tableBody.innerHTML = '';

    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding: 1.5rem; color: #64748b;">No doctors found matching filters.</td></tr>`;
        return;
    }

    filtered.forEach(doc => {
        const tr = document.createElement('tr');
        const feeText = doc.fee === 0 ? `<strong style="color: var(--brand-green);">FREE OPD</strong>` : `₹${doc.fee}`;

        tr.innerHTML = `
            <td><strong>${doc.id}</strong></td>
            <td><strong>${doc.name}</strong></td>
            <td><span class="status-pill status-confirmed">${doc.department}</span></td>
            <td>${doc.qualification}</td>
            <td>${doc.experience} Yrs</td>
            <td>${feeText}</td>
            <td>${doc.room}</td>
            <td>
                <div style="display: flex; gap: 0.35rem;">
                    <button class="btn btn-outline btn-sm" onclick="openDoctorModal('${doc.id}')" title="Edit Doctor"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-outline btn-sm" style="color: var(--color-danger);" onclick="deleteDoctor('${doc.id}')" title="Delete Doctor"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function openDoctorModal(docId = null) {
    const modal = document.getElementById('doctorModal');
    const idInput = document.getElementById('docFormId');
    const heading = document.getElementById('docModalHeading');

    if (docId) {
        const doc = allDoctors.find(d => d.id === docId);
        if (!doc) return;
        heading.innerHTML = `<i class="fa-solid fa-pen"></i> Edit Doctor Details`;
        idInput.value = doc.id;
        document.getElementById('docInputName').value = doc.name;
        document.getElementById('docInputDept').value = doc.department;
        document.getElementById('docInputQual').value = doc.qualification;
        document.getElementById('docInputExp').value = doc.experience;
        document.getElementById('docInputFee').value = doc.fee;
        document.getElementById('docInputRoom').value = doc.room;
    } else {
        heading.innerHTML = `<i class="fa-solid fa-user-doctor"></i> Add Doctor`;
        idInput.value = '';
        document.getElementById('docForm').reset();
    }

    modal.classList.add('active');
}

async function deleteDoctor(id) {
    if (confirm(`Are you sure you want to remove doctor ${id}?`)) {
        try {
            await API.deleteDoctor(id);
            showToast(`Doctor ${id} removed successfully.`);
            await refreshAllData();
        } catch(e) { console.error(e); }
    }
}

// ==========================================
// 2. PATIENTS CRUD
// ==========================================
function renderPatientsTable() {
    const search = (document.getElementById('patSearchInput').value || '').toLowerCase().trim();
    const gender = document.getElementById('patGenderFilter').value;

    let filtered = allPatients.filter(p => {
        const matchesSearch = !search || p.name.toLowerCase().includes(search) || p.phone.includes(search) || p.email.toLowerCase().includes(search) || p.id.toLowerCase().includes(search);
        const matchesGender = gender === 'All' || p.gender === gender;
        return matchesSearch && matchesGender;
    });

    const tableBody = document.getElementById('adminPatientsTableBody');
    tableBody.innerHTML = '';

    filtered.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${p.id}</strong></td>
            <td><strong>${p.name}</strong></td>
            <td>${p.age} Yrs / ${p.gender}</td>
            <td>${p.phone}</td>
            <td>${p.email}</td>
            <td><span class="status-pill status-confirmed">${p.bloodGroup}</span></td>
            <td>${p.regDate}</td>
            <td>
                <div style="display: flex; gap: 0.35rem;">
                    <button class="btn btn-outline btn-sm" onclick="openPatientModal('${p.id}')" title="Edit Patient"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn btn-outline btn-sm" style="color: var(--color-danger);" onclick="deletePatient('${p.id}')" title="Delete Patient"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function openPatientModal(patId = null) {
    const modal = document.getElementById('patientModal');
    const idInput = document.getElementById('patFormId');
    const heading = document.getElementById('patModalHeading');

    if (patId) {
        const p = allPatients.find(pat => pat.id === patId);
        if (!p) return;
        heading.innerHTML = `<i class="fa-solid fa-pen"></i> Edit Patient`;
        idInput.value = p.id;
        document.getElementById('patInputName').value = p.name;
        document.getElementById('patInputPhone').value = p.phone;
        document.getElementById('patInputEmail').value = p.email;
        document.getElementById('patInputAge').value = p.age;
        document.getElementById('patInputGender').value = p.gender;
        document.getElementById('patInputBlood').value = p.bloodGroup;
    } else {
        heading.innerHTML = `<i class="fa-solid fa-hospital-user"></i> Register Patient`;
        idInput.value = '';
        document.getElementById('patForm').reset();
    }

    modal.classList.add('active');
}

async function deletePatient(id) {
    if (confirm(`Delete patient medical record ${id}?`)) {
        try {
            await API.deletePatient(id);
            showToast(`Patient ${id} deleted.`);
            await refreshAllData();
        } catch(e) { console.error(e); }
    }
}

// ==========================================
// 3. APPOINTMENTS CRUD
// ==========================================
function renderAppointmentsTable() {
    const search = (document.getElementById('aptSearchInput').value || '').toLowerCase().trim();
    const status = document.getElementById('aptStatusFilter').value;

    let filtered = allAppointments.filter(a => {
        const matchesSearch = !search || a.id.toLowerCase().includes(search) || a.patientName.toLowerCase().includes(search) || a.doctorName.toLowerCase().includes(search);
        const matchesStatus = status === 'All' || a.status === status;
        return matchesSearch && matchesStatus;
    });

    const tableBody = document.getElementById('adminAptsTableBody');
    tableBody.innerHTML = '';

    filtered.forEach(a => {
        const tr = document.createElement('tr');
        const statusClass = a.status === 'Confirmed' ? 'status-confirmed' : (a.status === 'Completed' ? 'status-completed' : 'status-cancelled');
        const feeText = a.fee === 0 ? `<strong style="color: var(--brand-green);">FREE</strong>` : `₹${a.fee}`;

        tr.innerHTML = `
            <td><strong>${a.id}</strong></td>
            <td><strong>${a.patientName}</strong></td>
            <td>${a.doctorName}</td>
            <td><span class="status-pill status-confirmed">${a.department}</span></td>
            <td>${a.date} &bull; ${a.timeSlot}</td>
            <td>${feeText}</td>
            <td><span class="status-pill ${statusClass}">${a.status}</span></td>
            <td>
                <div style="display: flex; gap: 0.35rem; align-items: center;">
                    <select onchange="updateAptStatus('${a.id}', this.value)" style="font-size: 0.75rem; padding: 0.2rem 0.4rem; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <option value="Confirmed" ${a.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Completed" ${a.status === 'Completed' ? 'selected' : ''}>Completed</option>
                        <option value="Cancelled" ${a.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                    <button class="btn btn-outline btn-sm" style="color: var(--color-danger);" onclick="deleteAppointment('${a.id}')" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

async function updateAptStatus(id, newStatus) {
    try {
        await API.updateAppointmentStatus(id, newStatus);
        showToast(`Appointment ${id} status updated to ${newStatus}.`);
        await refreshAllData();
    } catch(e) { console.error(e); }
}

async function deleteAppointment(id) {
    if (confirm(`Remove appointment ${id}?`)) {
        try {
            await API.deleteAppointment(id);
            showToast(`Appointment ${id} deleted.`);
            await refreshAllData();
        } catch(e) { console.error(e); }
    }
}

function openAppointmentModal() {
    const modal = document.getElementById('appointmentModal');
    const select = document.getElementById('admDocSelect');
    select.innerHTML = '<option value="">-- Choose Doctor --</option>';

    allDoctors.forEach(doc => {
        const opt = document.createElement('option');
        opt.value = doc.id;
        opt.textContent = `${doc.name} (${doc.department} - ${doc.fee === 0 ? 'FREE' : '₹' + doc.fee})`;
        select.appendChild(opt);
    });

    document.getElementById('admAppointmentForm').reset();
    document.getElementById('admDeptDisplay').value = '';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('admDateInput').min = today;
    document.getElementById('admDateInput').value = today;

    modal.classList.add('active');
}

// Doctor select in appointment modal
document.getElementById('admDocSelect').addEventListener('change', (e) => {
    const docId = e.target.value;
    const doc = allDoctors.find(d => d.id === docId);
    if (doc) {
        document.getElementById('admDeptDisplay').value = doc.department;
        if (doc.slots) {
            document.getElementById('admSlotInput').value = doc.slots.split(',')[0].trim();
        }
    }
});

// ==========================================
// 4. DEPARTMENTS CRUD
// ==========================================
function renderDepartmentsTable() {
    const search = (document.getElementById('deptSearchInput').value || '').toLowerCase().trim();
    let filtered = allDepartments.filter(d => !search || d.name.toLowerCase().includes(search) || d.hod.toLowerCase().includes(search));

    const tableBody = document.getElementById('adminDeptsTableBody');
    tableBody.innerHTML = '';

    filtered.forEach(dep => {
        const count = allDoctors.filter(d => d.department.toLowerCase() === dep.name.toLowerCase()).length;
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${dep.id}</strong></td>
            <td><strong>${dep.name}</strong></td>
            <td>${dep.hod}</td>
            <td><span class="status-pill status-confirmed">${count} Specialists</span></td>
            <td>${dep.location}</td>
            <td><span class="status-pill ${dep.feeType.includes('Free') ? 'status-confirmed' : 'status-completed'}">${dep.feeType}</span></td>
        `;
        tableBody.appendChild(tr);
    });
}

function openDeptModal() {
    document.getElementById('admDeptForm').reset();
    document.getElementById('deptModal').classList.add('active');
}

// ==========================================
// 5. REPORTS & CSV EXPORT
// ==========================================
function renderReports() {
    const total = allAppointments.length;
    const free = allAppointments.filter(a => a.fee === 0).length;
    const paid = allAppointments.filter(a => a.fee > 0).length;
    const completed = allAppointments.filter(a => a.status === 'Completed').length;

    document.getElementById('repTotalApts').textContent = total;
    document.getElementById('repFreeApts').textContent = free;
    document.getElementById('repPaidApts').textContent = paid;
    document.getElementById('repCompletedApts').textContent = completed;

    document.getElementById('repActiveDepts').textContent = allDepartments.length;
    document.getElementById('repOnDutyDocs').textContent = allDoctors.length;
    document.getElementById('repPatientFiles').textContent = allPatients.length;
}

function exportAppointmentsCSV() {
    let csv = "AppointmentID,PatientName,DoctorName,Department,Date,TimeSlot,Fee,Status\n";
    allAppointments.forEach(a => {
        csv += `"${a.id}","${a.patientName}","${a.doctorName}","${a.department}","${a.date}","${a.timeSlot}","${a.fee}","${a.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carepoint_hospital_appointments_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Exported appointments to CSV successfully!');
}

// ==========================================
// 6. FORM SUBMISSIONS
// ==========================================
function setupEventListeners() {
    // 1. Doctor Form Submit
    document.getElementById('docForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('docFormId').value;
        const data = {
            name: document.getElementById('docInputName').value.trim(),
            department: document.getElementById('docInputDept').value,
            qualification: document.getElementById('docInputQual').value.trim(),
            experience: document.getElementById('docInputExp').value,
            fee: document.getElementById('docInputFee').value,
            room: document.getElementById('docInputRoom').value.trim()
        };

        if (id) {
            await API.updateDoctor(id, data);
            showToast('Doctor updated successfully.');
        } else {
            await API.addDoctor(data);
            showToast('New doctor added to roster.');
        }

        closeModal('doctorModal');
        await refreshAllData();
    });

    // 2. Patient Form Submit
    document.getElementById('patForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('patFormId').value;
        const data = {
            name: document.getElementById('patInputName').value.trim(),
            phone: document.getElementById('patInputPhone').value.trim(),
            email: document.getElementById('patInputEmail').value.trim(),
            age: document.getElementById('patInputAge').value,
            gender: document.getElementById('patInputGender').value,
            bloodGroup: document.getElementById('patInputBlood').value
        };

        if (id) {
            await API.updatePatient(id, data);
            showToast('Patient record updated.');
        } else {
            await API.addPatient(data);
            showToast('New patient registered.');
        }

        closeModal('patientModal');
        await refreshAllData();
    });

    // 3. Admin Appointment Form Submit
    document.getElementById('admAppointmentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const docId = document.getElementById('admDocSelect').value;
        const doc = allDoctors.find(d => d.id === docId);
        if (!doc) return alert('Please select a doctor.');

        const data = {
            patientName: document.getElementById('admPatientNameInput').value.trim(),
            patientPhone: document.getElementById('admPatientPhoneInput').value.trim(),
            doctorName: doc.name,
            department: doc.department,
            date: document.getElementById('admDateInput').value,
            timeSlot: document.getElementById('admSlotInput').value.trim(),
            fee: doc.fee
        };

        await API.bookAppointment(data);
        showToast('Appointment scheduled successfully.');
        closeModal('appointmentModal');
        await refreshAllData();
    });

    // 4. Admin Dept Form Submit
    document.getElementById('admDeptForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('admDeptNameInput').value.trim(),
            hod: document.getElementById('admDeptHodInput').value.trim(),
            location: document.getElementById('admDeptLocationInput').value.trim(),
            feeType: document.getElementById('admDeptFeeTypeInput').value
        };

        await API.addDepartment(data);
        showToast('New department added.');
        closeModal('deptModal');
        await refreshAllData();
    });

    // Live search & filters
    document.getElementById('docSearchInput').addEventListener('input', renderDoctorsTable);
    document.getElementById('docDeptFilter').addEventListener('change', renderDoctorsTable);
    document.getElementById('docFeeFilter').addEventListener('change', renderDoctorsTable);

    document.getElementById('patSearchInput').addEventListener('input', renderPatientsTable);
    document.getElementById('patGenderFilter').addEventListener('change', renderPatientsTable);

    document.getElementById('aptSearchInput').addEventListener('input', renderAppointmentsTable);
    document.getElementById('aptStatusFilter').addEventListener('change', renderAppointmentsTable);

    document.getElementById('deptSearchInput').addEventListener('input', renderDepartmentsTable);
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}
