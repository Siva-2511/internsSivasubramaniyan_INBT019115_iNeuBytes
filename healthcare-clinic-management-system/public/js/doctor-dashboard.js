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

        document.getElementById('docNameDisplay').textContent = activeDoctorProfile.name;
        document.getElementById('docMetaDisplay').textContent = `${activeDoctorProfile.department} &bull; ${activeDoctorProfile.qualification} &bull; ${activeDoctorProfile.room}`;
    } catch(e) {
        console.error(e);
    }

    // 3. Load Queue
    await loadDoctorQueue();

    // 4. Setup Prescription Form
    setupPrescriptionForm();
});

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

            tr.innerHTML = `
                <td><strong>${apt.id}</strong></td>
                <td><strong>${apt.patientName}</strong></td>
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
        const existing = (prescRes.data || []).find(p => p.aptId === apt.id);
        if (existing) {
            document.getElementById('modalDiagnosis').value = existing.diagnosis;
            document.getElementById('modalMedicines').value = existing.medicines;
            document.getElementById('modalFollowUp').value = existing.followUp || '';
        } else {
            document.getElementById('modalDiagnosis').value = '';
            document.getElementById('modalMedicines').value = '';
            document.getElementById('modalFollowUp').value = 'Review after 5-7 days.';
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
                followUp
            });

            if (res.success) {
                showToast(`Prescription recorded for ${patientName}!`);
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

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}
