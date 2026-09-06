/**
 * Doctor Dashboard Controller
 */

let currentDoctorUser = null;
let activeDoctorProfile = null;

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Authenticate Doctor
    currentDoctorUser = Auth.protectPage('doctor');
    if (!currentDoctorUser) return;

    // 2. Fetch Doctor Profile
    try {
        const docRes = await API.getDoctors();
        const docs = docRes.data || [];
        activeDoctorProfile = docs.find(d => d.name.toLowerCase().includes(currentDoctorUser.name.toLowerCase())) || docs[3] || docs[0];

        updateDoctorHeaderDisplay();
    } catch(e) {
        console.error(e);
    }

    // 3. Load Queue
    await loadDoctorQueue();

    // 4. Setup Forms
    setupPrescriptionForm();
    setupDoctorProfileForms();
});

function updateDoctorHeaderDisplay() {
    if (!activeDoctorProfile) return;

    document.getElementById('docNameDisplay').textContent = activeDoctorProfile.name;
    document.getElementById('docMetaDisplay').innerHTML = `${activeDoctorProfile.department} &bull; ${activeDoctorProfile.qualification} &bull; ${activeDoctorProfile.room}`;

    const avatarBox = document.querySelector('.user-banner .doc-avatar');
    if (avatarBox && activeDoctorProfile.avatar) {
        avatarBox.innerHTML = `<img src="${activeDoctorProfile.avatar}" alt="${activeDoctorProfile.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
    }
}

async function loadDoctorQueue() {
    if (!activeDoctorProfile) return;

    try {
        const res = await API.getAppointments({ doctorName: activeDoctorProfile.name });
        let apts = res.data || [];
        
        // Update counters
        document.getElementById('docTodayAptCount').textContent = apts.length;
        document.getElementById('docCompletedAptCount').textContent = apts.filter(a => a.status === 'Completed').length;

        const filterVal = document.getElementById('queueStatusFilter').value;
        if (filterVal !== 'All') {
            apts = apts.filter(a => a.status === filterVal);
        }

        const tableBody = document.getElementById('doctorQueueTableBody');
        tableBody.innerHTML = '';

        if (apts.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="8" class="text-center" style="padding: 2rem; color: #64748b;">No patient appointments found matching the selected filter.</td></tr>`;
            return;
        }

        apts.forEach(apt => {
            const tr = document.createElement('tr');
            const statusClass = apt.status === 'Confirmed' ? 'status-confirmed' : (apt.status === 'Completed' ? 'status-completed' : 'status-cancelled');
            const feeDisplay = apt.fee === 0 ? `<strong style="color: var(--brand-green);">FREE</strong>` : `₹${apt.fee}`;

            const patPhotoHtml = apt.patientAvatar ? 
                `<img src="${apt.patientAvatar}" alt="${apt.patientName}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover; margin-right: 0.5rem; vertical-align: middle;">` : '';

            tr.innerHTML = `
                <td><strong>${apt.id}</strong></td>
                <td>${patPhotoHtml}<strong>${apt.patientName}</strong></td>
                <td>${apt.patientPhone}</td>
                <td>${apt.date} &bull; ${apt.timeSlot}</td>
                <td><span style="font-size: 0.8rem; color: #475569;">${apt.symptoms || 'General Consultation'}</span></td>
                <td>${feeDisplay}</td>
                <td><span class="status-pill ${statusClass}">${apt.status}</span></td>
                <td>
                    <div style="display: flex; gap: 0.35rem;">
                        <button class="btn btn-primary btn-sm" onclick="openPrescribeModal('${apt.id}')" title="Prescribe & Diagnose">
                            <i class="fa-solid fa-stethoscope"></i> ${apt.status === 'Completed' ? 'View/Edit Rx' : 'Consult & Prescribe'}
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    } catch(e) {
        console.error(e);
    }
}

async function openPrescribeModal(aptId) {
    try {
        const aptRes = await API.getAppointments();
        const apt = (aptRes.data || []).find(a => a.id === aptId);
        if (!apt) return;

        document.getElementById('modalAptId').value = apt.id;
        document.getElementById('modalPatientName').value = apt.patientName;
        document.getElementById('modalAptRef').value = `${apt.id} (${apt.date} ${apt.timeSlot})`;

        // Check if existing prescription
        const prescRes = await API.getPrescriptions({ patientName: apt.patientName });
        const existingList = (prescRes.data || []).filter(p => p.aptId === apt.id);
        const existing = existingList.find(p => p.status === 'Active') || existingList[0];

        if (existing) {
            document.getElementById('modalDiagnosis').value = existing.diagnosis;
            document.getElementById('modalMedicines').value = existing.medicines;
            document.getElementById('modalFollowUp').value = existing.followUp || '';
            document.getElementById('modalDoctorNote').value = existing.doctorNote || '';
        } else {
            document.getElementById('modalDiagnosis').value = '';
            document.getElementById('modalMedicines').value = '';
            document.getElementById('modalFollowUp').value = 'Review after 5-7 days.';
            document.getElementById('modalDoctorNote').value = '';
        }

        document.getElementById('prescribeModal').classList.add('active');
    } catch(e) {
        console.error(e);
    }
}

function setupPrescriptionForm() {
    document.getElementById('prescribeForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const aptId = document.getElementById('modalAptId').value;
        const patientName = document.getElementById('modalPatientName').value;
        const diagnosis = document.getElementById('modalDiagnosis').value.trim();
        const medicines = document.getElementById('modalMedicines').value.trim();
        const followUp = document.getElementById('modalFollowUp').value.trim();
        const doctorNote = document.getElementById('modalDoctorNote').value.trim();

        const btn = document.getElementById('prescribeSubmitBtn');
        btn.disabled = true;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Saving...`;

        try {
            const res = await API.addPrescription({
                aptId,
                patientName,
                doctorName: activeDoctorProfile.name,
                department: activeDoctorProfile.department,
                diagnosis,
                medicines,
                followUp,
                doctorNote
            });

            if (res.success) {
                showToast(`Prescription & Patient Alert recorded for ${patientName}!`);
                closeModal('prescribeModal');
                await loadDoctorQueue();
            }
        } catch(err) {
            console.error(err);
            alert('Failed to save prescription.');
        } finally {
            btn.disabled = false;
            btn.innerHTML = `<i class="fa-solid fa-check-double"></i> Complete Consultation`;
        }
    });
}

function openDoctorProfileModal() {
    if (!activeDoctorProfile) return;
    document.getElementById('editDocName').value = activeDoctorProfile.name;
    document.getElementById('editDocQual').value = activeDoctorProfile.qualification || '';
    document.getElementById('editDocDept').value = activeDoctorProfile.department || '';
    document.getElementById('editDocFee').value = activeDoctorProfile.fee || 0;
    document.getElementById('editDocAvatar').value = activeDoctorProfile.avatar || '';
    document.getElementById('editDocRoom').value = activeDoctorProfile.room || '';
    document.getElementById('docProfileModal').classList.add('active');
}

function openDocResumeModal() {
    if (!activeDoctorProfile) return;
    document.getElementById('editDocLicense').value = activeDoctorProfile.license || '';
    document.getElementById('editDocResumeUrl').value = activeDoctorProfile.resume || '';
    document.getElementById('docResumeModal').classList.add('active');
}

function setupDoctorProfileForms() {
    document.getElementById('docProfileForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('editDocName').value.trim();
        const qualification = document.getElementById('editDocQual').value.trim();
        const fee = parseInt(document.getElementById('editDocFee').value) || 0;
        let avatar = document.getElementById('editDocAvatar').value.trim();
        const room = document.getElementById('editDocRoom').value.trim();

        const fileInput = document.getElementById('editDocPhotoFile');
        if (fileInput && fileInput.files[0]) {
            try {
                avatar = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (ev) => resolve(ev.target.result);
                    reader.readAsDataURL(fileInput.files[0]);
                });
            } catch(err) { console.error(err); }
        }

        try {
            const res = await API.updateDoctor(activeDoctorProfile.id, {
                name,
                qualification,
                fee,
                avatar,
                room
            });

            if (res.success) {
                activeDoctorProfile = res.data;
                updateDoctorHeaderDisplay();
                showToast('Professional profile & photo updated successfully!');
                closeModal('docProfileModal');
            }
        } catch(err) {
            console.error(err);
            alert('Failed to update doctor profile.');
        }
    });

    document.getElementById('docResumeForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const license = document.getElementById('editDocLicense').value.trim();
        let resume = document.getElementById('editDocResumeUrl').value.trim();

        const fileInput = document.getElementById('editDocResumeFile');
        if (fileInput && fileInput.files[0]) {
            try {
                resume = await new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (ev) => resolve(ev.target.result);
                    reader.readAsDataURL(fileInput.files[0]);
                });
            } catch(err) { console.error(err); }
        }

        try {
            const res = await API.updateDoctor(activeDoctorProfile.id, {
                license,
                resume
            });

            if (res.success) {
                activeDoctorProfile = res.data;
                showToast('Medical Resume / Certificate uploaded for Admin review!');
                closeModal('docResumeModal');
            }
        } catch(err) {
            console.error(err);
            alert('Failed to save document.');
        }
    });
}

async function deleteDoctorPhoto() {
    if (!activeDoctorProfile) return;
    if (confirm('Are you sure you want to remove your profile photo?')) {
        try {
            const res = await API.updateDoctor(activeDoctorProfile.id, { avatar: '' });
            if (res.success) {
                activeDoctorProfile = res.data;
                document.getElementById('editDocAvatar').value = '';
                const fileInput = document.getElementById('editDocPhotoFile');
                if (fileInput) fileInput.value = '';

                const avatarBox = document.querySelector('.user-banner .doc-avatar');
                if (avatarBox) {
                    avatarBox.innerHTML = `<i class="fa-solid fa-user-doctor"></i>`;
                }

                showToast('Doctor photo removed successfully.');
            }
        } catch(err) {
            console.error(err);
            alert('Failed to remove photo.');
        }
    }
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}
