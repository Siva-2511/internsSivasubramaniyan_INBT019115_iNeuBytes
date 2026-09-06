/**
 * Patient Dashboard Controller
 */

let currentUser = null;
let allDoctors = [];

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Authenticate Patient
    currentUser = Auth.protectPage('patient');
    if (!currentUser) return;

    // 2. Setup Profile Display
    document.getElementById('patNameDisplay').textContent = currentUser.name;
    const phone = currentUser.phone || '9876543210';
    document.getElementById('patMetaDisplay').textContent = `Phone: ${phone} &bull; Email: ${currentUser.email}`;

    const avatarContainer = document.getElementById('patAvatarContainer');
    if (avatarContainer) {
        if (currentUser.avatar) {
            avatarContainer.innerHTML = `<img src="${currentUser.avatar}" alt="${currentUser.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
        } else {
            avatarContainer.innerHTML = `<i class="fa-solid fa-user"></i>`;
        }
    }

    // 3. Load Data from Backend API
    await loadPatientAppointments();
    await loadPatientPrescriptions();
    await loadDoctorOptions();

    // 4. Setup Forms
    setupBookingForm();
    setupProfileForm();
});

async function loadPatientAppointments() {
    try {
        const res = await API.getAppointments({ patientPhone: currentUser.phone || '' });
        let apts = res.data || [];
        // Also fallback to filter by name
        if (apts.length === 0) {
            const allRes = await API.getAppointments();
            apts = (allRes.data || []).filter(a => a.patientName.toLowerCase().includes(currentUser.name.toLowerCase()));
        }

        const tableBody = document.getElementById('patientAptsTableBody');
        tableBody.innerHTML = '';

        if (apts.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="text-center" style="padding: 2rem; color: #64748b;">No appointments scheduled yet. Click "Book OPD Appointment" to schedule one.</td></tr>`;
            return;
        }

        apts.forEach(apt => {
            const tr = document.createElement('tr');
            const statusClass = apt.status === 'Confirmed' ? 'status-confirmed' : (apt.status === 'Completed' ? 'status-completed' : 'status-cancelled');
            const feeDisplay = apt.fee === 0 ? `<strong style="color: var(--brand-green);">FREE</strong>` : `₹${apt.fee}`;

            tr.innerHTML = `
                <td><strong>${apt.id}</strong></td>
                <td><strong>${apt.doctorName}</strong></td>
                <td><span class="status-pill status-confirmed">${apt.department}</span></td>
                <td>${apt.date} &bull; ${apt.timeSlot}</td>
                <td>${feeDisplay}</td>
                <td><span class="status-pill ${statusClass}">${apt.status}</span></td>
                <td>
                    <div style="display: flex; gap: 0.35rem;">
                        <button class="btn btn-outline btn-sm" onclick="showReceiptModal('${apt.id}')"><i class="fa-solid fa-receipt"></i> Slip</button>
                        ${apt.status === 'Confirmed' ? `<button class="btn btn-outline btn-sm" style="color: var(--color-danger);" onclick="cancelAppointment('${apt.id}')">Cancel</button>` : ''}
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    } catch(e) {
        console.error(e);
    }
}

async function loadPatientPrescriptions() {
    try {
        const res = await API.getPrescriptions({ patientName: currentUser.name });
        const listContainer = document.getElementById('patientPrescriptionsList');
        listContainer.innerHTML = '';

        const prescs = res.data || [];
        if (prescs.length === 0) {
            listContainer.innerHTML = `<div style="text-align: center; padding: 2rem; color: #64748b;"><i class="fa-solid fa-file-prescription" style="font-size: 2rem; margin-bottom: 0.5rem;"></i><p>No prescriptions recorded yet.</p></div>`;
            return;
        }

        prescs.forEach(p => {
            const isArchived = p.status === 'Archived';
            const card = document.createElement('div');
            card.className = 'service-card';
            card.style.padding = '1rem';
            card.style.opacity = isArchived ? '0.75' : '1';
            card.style.borderLeft = isArchived ? '4px solid #94a3b8' : '4px solid var(--brand-green)';
            card.style.marginBottom = '1rem';

            const noteBanner = p.doctorNote ? `
                <div style="background: #fffbebfb; border: 1px solid #fde68a; color: #92400e; padding: 0.65rem; border-radius: 6px; font-size: 0.8rem; margin: 0.5rem 0; font-weight: 500;">
                    <i class="fa-solid fa-triangle-exclamation" style="color: #d97706;"></i> <strong>Doctor Message:</strong> ${p.doctorNote}
                </div>
            ` : '';

            const statusBadge = isArchived ? `<span class="badge" style="background: #f1f5f9; color: #64748b;">Previous / Superseded</span>` : `<span class="badge" style="background: #ecfdf5; color: #059669;">Active Prescription</span>`;

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.4rem; margin-bottom: 0.5rem; font-size: 0.8rem;">
                    <div>
                        <strong><i class="fa-solid fa-user-doctor"></i> ${p.doctorName} (${p.department || 'Consultant'})</strong>
                        ${statusBadge}
                    </div>
                    <span>${p.date} &bull; ${p.aptId}</span>
                </div>
                ${noteBanner}
                <div style="font-size: 0.85rem;">
                    <strong style="color: var(--primary-dark); display: block; margin-bottom: 0.25rem;">Diagnosis: ${p.diagnosis}</strong>
                    <div style="white-space: pre-line; background: var(--bg-muted); padding: 0.65rem; border-radius: var(--radius-sm); font-size: 0.8rem; color: var(--text-body);">
                        ${p.medicines}
                    </div>
                    <small style="display: block; margin-top: 0.4rem; color: var(--text-muted);"><i class="fa-solid fa-clock-rotate-left"></i> ${p.followUp || 'Follow-up as advised.'}</small>
                </div>
            `;
            listContainer.appendChild(card);
        });
    } catch(e) {
        console.error(e);
    }
}

async function loadDoctorOptions() {
    try {
        const res = await API.getDoctors();
        allDoctors = res.data || [];
        const select = document.getElementById('bookDoctorSelect');
        select.innerHTML = '<option value="">-- Choose Doctor --</option>';

        allDoctors.forEach(doc => {
            const opt = document.createElement('option');
            opt.value = doc.id;
            const feeStr = doc.fee === 0 ? 'FREE OPD' : `₹${doc.fee}`;
            opt.textContent = `${doc.name} (${doc.department} - ${feeStr})`;
            select.appendChild(opt);
        });
    } catch(e) {
        console.error(e);
    }
}

function setupBookingForm() {
    document.getElementById('bookDoctorSelect').addEventListener('change', (e) => {
        const docId = e.target.value;
        const doc = allDoctors.find(d => d.id === docId);
        if (doc) {
            document.getElementById('bookDeptDisplay').value = doc.department;
            document.getElementById('bookFeeDisplay').value = doc.fee === 0 ? 'FREE (₹0)' : `₹${doc.fee}`;
            if (doc.slots) {
                document.getElementById('bookSlotInput').value = doc.slots.split(',')[0].trim();
            }
        }
    });

    // Min date today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookDateInput').min = today;
    document.getElementById('bookDateInput').value = today;

    document.getElementById('bookForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const docId = document.getElementById('bookDoctorSelect').value;
        const doc = allDoctors.find(d => d.id === docId);
        if (!doc) return alert('Please select a doctor.');

        const btn = document.getElementById('bookSubmitBtn');
        btn.disabled = true;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Booking...`;

        const data = {
            patientName: currentUser.name,
            patientPhone: currentUser.phone || '9876543210',
            patientAvatar: currentUser.avatar || '',
            doctorName: doc.name,
            department: doc.department,
            date: document.getElementById('bookDateInput').value,
            timeSlot: document.getElementById('bookSlotInput').value,
            fee: doc.fee,
            symptoms: document.getElementById('bookSymptomsInput').value || 'Routine Consultation'
        };

        try {
            const res = await API.bookAppointment(data);
            if (res.success) {
                showToast(res.message);
                closeModal('bookModal');
                await loadPatientAppointments();
                showReceiptModal(res.data.id);
            }
        } catch(err) {
            console.error(err);
            alert('Failed to book appointment.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = `<i class="fa-solid fa-check"></i> Confirm Appointment`;
        }
    });
}

function setupProfileForm() {
    document.getElementById('profileForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newName = document.getElementById('editPatName').value.trim();
        const newPhone = document.getElementById('editPatPhone').value.trim();
        
        let avatar = document.getElementById('editPatAvatarUrl') ? document.getElementById('editPatAvatarUrl').value.trim() : (currentUser.avatar || '');
        const fileInput = document.getElementById('editPatPhotoFile');
        if (fileInput && fileInput.files[0]) {
            try {
                avatar = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (ev) => resolve(ev.target.result);
                    reader.readAsDataURL(fileInput.files[0]);
                });
            } catch(err) { console.error(err); }
        }

        currentUser.name = newName;
        currentUser.phone = newPhone;
        currentUser.avatar = avatar;
        Auth.setSession(currentUser);

        // Update backend patient record
        if (currentUser.patientId) {
            try { await API.updatePatient(currentUser.patientId, { name: newName, phone: newPhone, avatar }); } catch(err) { console.error(err); }
        }

        document.getElementById('patNameDisplay').textContent = currentUser.name;
        document.getElementById('patMetaDisplay').textContent = `Phone: ${currentUser.phone} &bull; Email: ${currentUser.email}`;
        
        const avatarContainer = document.getElementById('patAvatarContainer');
        if (avatarContainer) {
            if (currentUser.avatar) {
                avatarContainer.innerHTML = `<img src="${currentUser.avatar}" alt="${currentUser.name}" style="width: 100%; height: 100%; object-fit: cover;">`;
            } else {
                avatarContainer.innerHTML = `<i class="fa-solid fa-user"></i>`;
            }
        }

        closeModal('profileModal');
        showToast('Profile updated successfully.');
    });
}

async function deletePatientPhoto() {
    if (confirm('Are you sure you want to remove your profile picture?')) {
        currentUser.avatar = '';
        Auth.setSession(currentUser);

        if (currentUser.patientId) {
            try { await API.updatePatient(currentUser.patientId, { avatar: '' }); } catch(err) { console.error(err); }
        }

        document.getElementById('editPatAvatarUrl').value = '';
        const fileInput = document.getElementById('editPatPhotoFile');
        if (fileInput) fileInput.value = '';

        const avatarContainer = document.getElementById('patAvatarContainer');
        if (avatarContainer) {
            avatarContainer.innerHTML = `<i class="fa-solid fa-user"></i>`;
        }

        showToast('Profile picture removed.');
    }
}

async function cancelAppointment(id) {
    if (confirm(`Do you want to cancel appointment ${id}?`)) {
        try {
            await API.updateAppointmentStatus(id, 'Cancelled');
            showToast(`Appointment ${id} has been cancelled.`);
            await loadPatientAppointments();
        } catch(e) {
            console.error(e);
        }
    }
}

async function showReceiptModal(id) {
    try {
        const res = await API.getAppointments();
        const apt = (res.data || []).find(a => a.id === id);
        if (!apt) return;

        document.getElementById('slipId').textContent = apt.id;
        document.getElementById('slipPatient').textContent = apt.patientName;
        document.getElementById('slipPhone').textContent = apt.patientPhone;
        document.getElementById('slipDoctor').textContent = apt.doctorName;
        document.getElementById('slipDept').textContent = apt.department;
        document.getElementById('slipDate').textContent = apt.date;
        document.getElementById('slipSlot').textContent = apt.timeSlot;

        if (apt.fee === 0) {
            document.getElementById('slipFee').textContent = 'FREE (₹0)';
            document.getElementById('slipFeeNote').textContent = 'Free General OPD';
        } else {
            document.getElementById('slipFee').textContent = `₹${apt.fee}`;
            document.getElementById('slipFeeNote').textContent = 'Payable at Counter';
        }

        document.getElementById('slipModal').classList.add('active');

        // Auto click done / close slip modal after 4 seconds
        if (window.slipAutoCloseTimer) clearTimeout(window.slipAutoCloseTimer);
        window.slipAutoCloseTimer = setTimeout(() => {
            closeModal('slipModal');
        }, 4000);
    } catch(e) {
        console.error(e);
    }
}

function openBookModal() {
    document.getElementById('bookModal').classList.add('active');
}

function openEditProfileModal() {
    document.getElementById('editPatName').value = currentUser.name;
    document.getElementById('editPatPhone').value = currentUser.phone || '';
    document.getElementById('profileModal').classList.add('active');
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}
