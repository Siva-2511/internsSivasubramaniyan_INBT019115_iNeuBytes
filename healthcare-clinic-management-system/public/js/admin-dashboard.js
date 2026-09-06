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

    // Set admin name
    document.getElementById('admBannerName').textContent = user.name || 'Administrator';

    // 2. Setup Subtab Switcher
    setupSubtabs();

    // 3. Load All Data from Backend API
    await refreshAllData();

    // 4. Setup Forms and Filters
    setupEventListeners();

    // 5. Load live notifications
    await loadNotifications();

    // 6. Auto-refresh data + notifications every 30 seconds
    setInterval(async () => {
        await refreshAllData();
        await loadNotifications();
    }, 30000);
});

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function toggleNotificationMenu() {
    const menu = document.getElementById('adminNotifMenu');
    if (!menu) return;
    const isVisible = menu.style.display !== 'none';
    menu.style.display = isVisible ? 'none' : 'block';
    if (!isVisible) loadNotifications();
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.notification-dropdown-wrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        const menu = document.getElementById('adminNotifMenu');
        if (menu) menu.style.display = 'none';
    }
});

async function loadNotifications() {
    try {
        const [aptsRes, prescRes] = await Promise.all([
            API.getAppointments(),
            fetch('/api/prescriptions').then(r => r.json()).catch(() => ({ data: [] }))
        ]);

        const apts = aptsRes.data || [];
        const prescriptions = prescRes.data || [];

        const notifications = [];

        // New confirmed appointments (today or recent)
        const today = new Date().toISOString().split('T')[0];
        const todayApts = apts.filter(a => a.date === today || a.status === 'Confirmed');
        todayApts.slice(0, 3).forEach(apt => {
            notifications.push({
                type: 'booking',
                color: '#059669',
                icon: 'fa-calendar-check',
                title: 'New OPD Booking',
                message: `${apt.patientName} booked with ${apt.doctorName} (${apt.department}) — ${apt.date}`,
                time: apt.date
            });
        });

        // Cancelled appointments
        const cancelled = apts.filter(a => a.status === 'Cancelled').slice(0, 2);
        cancelled.forEach(apt => {
            notifications.push({
                type: 'cancel',
                color: '#ef4444',
                icon: 'fa-calendar-xmark',
                title: 'Appointment Cancelled',
                message: `${apt.patientName} cancelled appointment with ${apt.doctorName}`,
                time: apt.date
            });
        });

        // Completed consultations
        const completed = apts.filter(a => a.status === 'Completed').slice(0, 2);
        completed.forEach(apt => {
            notifications.push({
                type: 'completed',
                color: '#2563eb',
                icon: 'fa-stethoscope',
                title: 'Consultation Completed',
                message: `${apt.patientName} consultation completed by ${apt.doctorName}`,
                time: apt.date
            });
        });

        // Prescriptions issued
        prescriptions.slice(0, 2).forEach(presc => {
            notifications.push({
                type: 'prescription',
                color: '#d97706',
                icon: 'fa-prescription',
                title: 'Prescription Issued',
                message: `Dr. ${presc.doctorName || 'Unknown'} prescribed for ${presc.patientName || 'Patient'} — ${presc.diagnosis || ''}`,
                time: presc.date || ''
            });
        });

        // Fallback if empty
        if (notifications.length === 0) {
            notifications.push({
                type: 'info',
                color: '#64748b',
                icon: 'fa-circle-info',
                title: 'No new alerts',
                message: 'All systems are operating normally.',
                time: today
            });
        }

        // Update badge count
        const badge = document.getElementById('adminNotifBadge');
        if (badge) {
            const count = Math.min(notifications.length, 9);
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }

        // Render notification list
        const list = document.getElementById('notifList');
        if (list) {
            list.innerHTML = notifications.map(n => `
                <div style="font-size: 0.8rem; padding: 0.5rem 0.6rem; border-radius: 6px; background: #f8fafc; border-left: 3px solid ${n.color};">
                    <div style="display:flex; align-items:center; gap:0.4rem; margin-bottom:0.2rem;">
                        <i class="fa-solid ${n.icon}" style="color:${n.color}; font-size:0.75rem;"></i>
                        <strong style="color:${n.color};">${n.title}</strong>
                        ${n.time ? `<span style="margin-left:auto; color:#94a3b8; font-size:0.7rem;">${n.time}</span>` : ''}
                    </div>
                    <span style="color:#475569; line-height:1.4;">${n.message}</span>
                </div>
            `).join('');
        }
    } catch(e) {
        console.error('Notification load error:', e);
    }
}

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
    allDepartments.forEach(dept => {
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
                <div style="height: 100%; width: ${Math.max(perc, 10)}%; background: var(--brand-green);"></div>
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

        const photoHtml = doc.avatar ? 
            `<img src="${doc.avatar}" alt="${doc.name}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">` : 
            `<div style="width: 36px; height: 36px; border-radius: 50%; background: #e2e8f0; color: #475569; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;"><i class="fa-solid fa-user-doctor"></i></div>`;

        const resumeHtml = doc.resume ? 
            `<a href="${doc.resume}" target="_blank" class="btn btn-outline btn-sm" style="font-size: 0.75rem; color: var(--brand-green);"><i class="fa-solid fa-file-pdf"></i> View Doc</a>` : 
            `<span style="font-size: 0.75rem; color: #94a3b8;">${doc.license ? 'Lic: ' + doc.license : 'Pending'}</span>`;

        tr.innerHTML = `
            <td>${photoHtml}</td>
            <td><strong>${doc.id}</strong></td>
            <td><strong>${doc.name}</strong></td>
            <td><span class="status-pill status-confirmed">${doc.department}</span></td>
            <td>${doc.qualification}</td>
            <td>${doc.experience} Yrs</td>
            <td>${feeText}</td>
            <td>${doc.room}</td>
            <td>${resumeHtml}</td>
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
        if (document.getElementById('docInputAvatar')) document.getElementById('docInputAvatar').value = doc.avatar || '';
        if (document.getElementById('docInputResume')) document.getElementById('docInputResume').value = doc.resume || '';
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
        // Find matching user for avatar if p.avatar is missing
        const matchedUser = (window.allUsers || []).find(u => u.phone === p.phone || u.email === p.email);
        const avatarUrl = p.avatar || (matchedUser ? matchedUser.avatar : '');
        
        const photoHtml = avatarUrl ? 
            `<img src="${avatarUrl}" alt="${p.name}" style="width: 34px; height: 34px; border-radius: 50%; object-fit: cover; margin-right: 0.5rem; vertical-align: middle; border: 1px solid #cbd5e1;">` : 
            `<div style="width: 34px; height: 34px; border-radius: 50%; background: #e2e8f0; color: #475569; display: inline-flex; align-items: center; justify-content: center; font-size: 0.85rem; margin-right: 0.5rem; vertical-align: middle;"><i class="fa-solid fa-user"></i></div>`;

        tr.innerHTML = `
            <td><strong>${p.id}</strong></td>
            <td>${photoHtml}<strong>${p.name}</strong></td>
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
        if (document.getElementById('patInputAvatar')) document.getElementById('patInputAvatar').value = p.avatar || '';
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
            <td>
                <button class="btn btn-outline btn-sm" style="color: var(--color-danger);" onclick="deleteDepartment('${dep.id}')" title="Delete Department">
                    <i class="fa-solid fa-trash"></i> Delete
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

async function deleteDepartment(id) {
    if (confirm(`Are you sure you want to remove department ${id}?`)) {
        try {
            await API.deleteDepartment(id);
            showToast(`Department ${id} deleted successfully.`);
            await refreshAllData();
        } catch(e) {
            console.error(e);
            showToast('Failed to delete department.', 'error');
        }
    }
}

function toggleNotificationMenu() {
    const menu = document.getElementById('adminNotifMenu');
    const badge = document.getElementById('adminNotifBadge');
    if (!menu) return;
    if (menu.style.display === 'none' || !menu.style.display) {
        menu.style.display = 'block';
        if (badge) badge.style.display = 'none';
    } else {
        menu.style.display = 'none';
    }
}

// Close notification menu on outside click
document.addEventListener('click', (e) => {
    const wrapper = document.querySelector('.notification-dropdown-wrapper');
    const menu = document.getElementById('adminNotifMenu');
    if (wrapper && menu && !wrapper.contains(e.target)) {
        menu.style.display = 'none';
    }
});

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

function exportReportsCSV() {
    let csv = "Metric,Value\n";
    csv += `"Total Appointments","${allAppointments.length}"\n`;
    csv += `"Free General OPD","${allAppointments.filter(a => a.fee === 0).length}"\n`;
    csv += `"Specialist Paid OPD","${allAppointments.filter(a => a.fee > 0).length}"\n`;
    csv += `"Completed Consultations","${allAppointments.filter(a => a.status === 'Completed').length}"\n`;
    csv += `"Active Departments","${allDepartments.length}"\n`;
    csv += `"Doctors On Roster","${allDoctors.length}"\n`;
    csv += `"Registered Patients","${allPatients.length}"\n`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `YourCare_Hospital_Executive_Analytics_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showToast('Exported executive analytics to CSV!');
}

function exportReportsPDF() {
    const printArea = document.getElementById('reportPrintArea');
    if (!printArea) return;
    
    showToast('Generating PDF Report...');

    const opt = {
        margin:       0.5,
        filename:     `YourCare_Hospital_Analytics_Report_${new Date().toISOString().split('T')[0]}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opt).from(printArea).save().then(() => {
            showToast('PDF Report downloaded successfully!');
        });
    } else {
        window.print();
    }
}

// File Reader Helper
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        if (!file) return resolve('');
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(file);
    });
}

// ==========================================
// 6. FORM SUBMISSIONS
// ==========================================
function setupEventListeners() {
    // 1. Doctor Form Submit
    document.getElementById('docForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('docFormId').value;

        let avatar = document.getElementById('docInputAvatar') ? document.getElementById('docInputAvatar').value.trim() : '';
        let resume = document.getElementById('docInputResume') ? document.getElementById('docInputResume').value.trim() : '';

        const photoFile = document.getElementById('docInputPhotoFile')?.files[0];
        const resumeFile = document.getElementById('docInputResumeFile')?.files[0];

        if (photoFile) {
            try { avatar = await readFileAsDataURL(photoFile); } catch(err) { console.error(err); }
        }
        if (resumeFile) {
            try { resume = await readFileAsDataURL(resumeFile); } catch(err) { console.error(err); }
        }

        const data = {
            name: document.getElementById('docInputName').value.trim(),
            department: document.getElementById('docInputDept').value,
            qualification: document.getElementById('docInputQual').value.trim(),
            experience: document.getElementById('docInputExp').value,
            fee: document.getElementById('docInputFee').value,
            room: document.getElementById('docInputRoom').value.trim(),
            avatar,
            resume
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

        let avatar = document.getElementById('patInputAvatar') ? document.getElementById('patInputAvatar').value.trim() : '';
        const photoFile = document.getElementById('patInputPhotoFile')?.files[0];

        if (photoFile) {
            try { avatar = await readFileAsDataURL(photoFile); } catch(err) { console.error(err); }
        }

        const data = {
            name: document.getElementById('patInputName').value.trim(),
            phone: document.getElementById('patInputPhone').value.trim(),
            email: document.getElementById('patInputEmail').value.trim(),
            age: document.getElementById('patInputAge').value,
            gender: document.getElementById('patInputGender').value,
            bloodGroup: document.getElementById('patInputBlood').value,
            avatar
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

