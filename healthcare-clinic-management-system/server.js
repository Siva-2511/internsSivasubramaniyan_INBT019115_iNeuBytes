/**
 * CarePoint Hospital & Clinic Management System
 * Node.js + Express.js REST API Backend Server
 * Course ID: WBINB20726 (Major Project)
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, 'data', 'db.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files from 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Database Helpers
function readDatabase() {
    try {
        if (!fs.existsSync(DB_FILE)) {
            return { users: [], doctors: [], patients: [], appointments: [], departments: [], prescriptions: [] };
        }
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(raw);
    } catch (err) {
        console.error('Error reading database file:', err);
        return { users: [], doctors: [], patients: [], appointments: [], departments: [], prescriptions: [] };
    }
}

function writeDatabase(data) {
    try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error('Error writing to database file:', err);
        return false;
    }
}

// ==========================================
// 1. AUTHENTICATION & RBAC ENDPOINTS
// ==========================================

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const db = readDatabase();
    const user = db.users.find(u => 
        u.email.toLowerCase() === email.toLowerCase().trim() && 
        u.password === password
    );

    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your email and password.' });
    }

    if (role && user.role !== role) {
        return res.status(403).json({ success: false, message: `Access denied. This account is registered as ${user.role}, not ${role}.` });
    }

    // Attach doctor or patient profile details
    let profileData = null;
    if (user.role === 'doctor') {
        profileData = db.doctors.find(d => d.id === user.doctorId || d.name.toLowerCase() === user.name.toLowerCase());
    } else if (user.role === 'patient') {
        profileData = db.patients.find(p => p.phone === user.phone || p.email.toLowerCase() === user.email.toLowerCase());
    }

    res.json({
        success: true,
        message: `Welcome back, ${user.name}!`,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            profile: profileData
        }
    });
});

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
    const { name, email, password, role, phone, age, gender, bloodGroup, department, qualification, fee } = req.body;
    
    if (!name || !email || !password || !role) {
        return res.status(400).json({ success: false, message: 'Name, email, password, and role are required.' });
    }

    const db = readDatabase();
    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (existing) {
        return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const userId = `USR-${role.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    const newUser = {
        id: userId,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        role,
        phone: phone || ''
    };

    if (role === 'patient') {
        const patientId = `PAT-${Math.floor(100 + Math.random() * 900)}`;
        newUser.patientId = patientId;
        const newPatient = {
            id: patientId,
            name: name.trim(),
            age: parseInt(age) || 25,
            gender: gender || 'Male',
            phone: phone || '',
            email: email.toLowerCase().trim(),
            bloodGroup: bloodGroup || 'O+',
            address: 'Chennai, India',
            regDate: new Date().toISOString().split('T')[0]
        };
        db.patients.push(newPatient);
    } else if (role === 'doctor') {
        const doctorId = `DOC-${Math.floor(100 + Math.random() * 900)}`;
        newUser.doctorId = doctorId;
        const newDoctor = {
            id: doctorId,
            name: name.startsWith('Dr.') ? name : `Dr. ${name}`,
            department: department || 'General Medicine',
            qualification: qualification || 'MBBS',
            experience: 5,
            fee: parseInt(fee) || 0,
            room: 'OPD Room 102, Ground Floor',
            gender: gender || 'male',
            slots: '09:00 AM, 11:30 AM, 02:00 PM, 04:30 PM',
            bio: 'Registered Medical Consultant'
        };
        db.doctors.push(newDoctor);
    }

    db.users.push(newUser);
    writeDatabase(db);

    res.status(201).json({
        success: true,
        message: 'Account created successfully! You can now log in.',
        user: newUser
    });
});

// ==========================================
// 2. DOCTOR CRUD API
// ==========================================

// GET /api/doctors
app.get('/api/doctors', (req, res) => {
    const { dept, feeType, search } = req.query;
    const db = readDatabase();
    let result = db.doctors;

    if (dept && dept !== 'All') {
        result = result.filter(d => d.department.toLowerCase() === dept.toLowerCase());
    }
    if (feeType === 'Free') {
        result = result.filter(d => d.fee === 0);
    } else if (feeType === 'Paid') {
        result = result.filter(d => d.fee > 0);
    }
    if (search) {
        const s = search.toLowerCase();
        result = result.filter(d => 
            d.name.toLowerCase().includes(s) || 
            d.qualification.toLowerCase().includes(s) ||
            d.department.toLowerCase().includes(s) ||
            d.room.toLowerCase().includes(s)
        );
    }

    res.json({ success: true, count: result.length, data: result });
});

// POST /api/doctors
app.post('/api/doctors', (req, res) => {
    const { name, department, qualification, experience, fee, room, gender, slots, bio } = req.body;
    if (!name || !department) {
        return res.status(400).json({ success: false, message: 'Doctor name and department are required.' });
    }

    const db = readDatabase();
    const newDoc = {
        id: `DOC-${Math.floor(100 + Math.random() * 900)}`,
        name: name.startsWith('Dr.') ? name.trim() : `Dr. ${name.trim()}`,
        department,
        qualification: qualification || 'MBBS',
        experience: parseInt(experience) || 5,
        fee: parseInt(fee) || 0,
        room: room || 'OPD Room 101, Ground Floor',
        gender: gender || 'male',
        slots: slots || '09:00 AM, 11:30 AM, 02:00 PM, 04:30 PM',
        bio: bio || 'Specialist Consultant'
    };

    db.doctors.push(newDoc);
    writeDatabase(db);
    res.status(201).json({ success: true, message: 'Doctor added successfully.', data: newDoc });
});

// PUT /api/doctors/:id
app.put('/api/doctors/:id', (req, res) => {
    const { id } = req.params;
    const db = readDatabase();
    const index = db.doctors.findIndex(d => d.id === id);
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    db.doctors[index] = { ...db.doctors[index], ...req.body, id };
    writeDatabase(db);
    res.json({ success: true, message: 'Doctor details updated.', data: db.doctors[index] });
});

// DELETE /api/doctors/:id
app.delete('/api/doctors/:id', (req, res) => {
    const { id } = req.params;
    const db = readDatabase();
    const initialLen = db.doctors.length;
    db.doctors = db.doctors.filter(d => d.id !== id);
    
    if (db.doctors.length === initialLen) {
        return res.status(404).json({ success: false, message: 'Doctor not found.' });
    }

    writeDatabase(db);
    res.json({ success: true, message: `Doctor ${id} removed successfully.` });
});

// ==========================================
// 3. PATIENT CRUD API
// ==========================================

// GET /api/patients
app.get('/api/patients', (req, res) => {
    const { search, gender } = req.query;
    const db = readDatabase();
    let result = db.patients;

    if (gender && gender !== 'All') {
        result = result.filter(p => p.gender.toLowerCase() === gender.toLowerCase());
    }
    if (search) {
        const s = search.toLowerCase();
        result = result.filter(p => 
            p.name.toLowerCase().includes(s) ||
            p.phone.includes(s) ||
            p.email.toLowerCase().includes(s) ||
            p.id.toLowerCase().includes(s)
        );
    }

    res.json({ success: true, count: result.length, data: result });
});

// POST /api/patients
app.post('/api/patients', (req, res) => {
    const { name, phone, email, age, gender, bloodGroup, address } = req.body;
    if (!name || !phone) {
        return res.status(400).json({ success: false, message: 'Patient name and phone are required.' });
    }

    const db = readDatabase();
    const newPat = {
        id: `PAT-${Math.floor(100 + Math.random() * 900)}`,
        name: name.trim(),
        age: parseInt(age) || 25,
        gender: gender || 'Male',
        phone: phone.trim(),
        email: email || '',
        bloodGroup: bloodGroup || 'O+',
        address: address || 'Chennai, India',
        regDate: new Date().toISOString().split('T')[0]
    };

    db.patients.push(newPat);
    writeDatabase(db);
    res.status(201).json({ success: true, message: 'Patient registered successfully.', data: newPat });
});

// PUT /api/patients/:id
app.put('/api/patients/:id', (req, res) => {
    const { id } = req.params;
    const db = readDatabase();
    const index = db.patients.findIndex(p => p.id === id);
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Patient not found.' });
    }

    db.patients[index] = { ...db.patients[index], ...req.body, id };
    writeDatabase(db);
    res.json({ success: true, message: 'Patient record updated.', data: db.patients[index] });
});

// DELETE /api/patients/:id
app.delete('/api/patients/:id', (req, res) => {
    const { id } = req.params;
    const db = readDatabase();
    db.patients = db.patients.filter(p => p.id !== id);
    writeDatabase(db);
    res.json({ success: true, message: `Patient ${id} deleted.` });
});

// ==========================================
// 4. APPOINTMENTS API
// ==========================================

// GET /api/appointments
app.get('/api/appointments', (req, res) => {
    const { doctorName, patientPhone, status, search } = req.query;
    const db = readDatabase();
    let result = db.appointments;

    if (doctorName) {
        result = result.filter(a => a.doctorName.toLowerCase().includes(doctorName.toLowerCase()));
    }
    if (patientPhone) {
        result = result.filter(a => a.patientPhone.includes(patientPhone));
    }
    if (status && status !== 'All') {
        result = result.filter(a => a.status.toLowerCase() === status.toLowerCase());
    }
    if (search) {
        const s = search.toLowerCase();
        result = result.filter(a => 
            a.id.toLowerCase().includes(s) ||
            a.patientName.toLowerCase().includes(s) ||
            a.doctorName.toLowerCase().includes(s) ||
            a.department.toLowerCase().includes(s)
        );
    }

    res.json({ success: true, count: result.length, data: result });
});

// POST /api/appointments
app.post('/api/appointments', (req, res) => {
    const { patientName, patientPhone, doctorName, department, date, timeSlot, fee, symptoms } = req.body;
    if (!patientName || !patientPhone || !doctorName || !date || !timeSlot) {
        return res.status(400).json({ success: false, message: 'Missing required appointment booking details.' });
    }

    const db = readDatabase();
    const newApt = {
        id: `APT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        patientName: patientName.trim(),
        patientPhone: patientPhone.trim(),
        doctorName: doctorName.trim(),
        department: department || 'General Medicine',
        date,
        timeSlot,
        fee: parseInt(fee) || 0,
        symptoms: symptoms || 'Routine OPD Consultation',
        status: 'Confirmed'
    };

    db.appointments.unshift(newApt);
    writeDatabase(db);
    res.status(201).json({ success: true, message: 'Appointment booked successfully!', data: newApt });
});

// PATCH /api/appointments/:id/status
app.patch('/api/appointments/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const db = readDatabase();
    const apt = db.appointments.find(a => a.id === id);
    if (!apt) {
        return res.status(404).json({ success: false, message: 'Appointment not found.' });
    }

    apt.status = status;
    writeDatabase(db);
    res.json({ success: true, message: `Appointment status updated to ${status}.`, data: apt });
});

// DELETE /api/appointments/:id
app.delete('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const db = readDatabase();
    db.appointments = db.appointments.filter(a => a.id !== id);
    writeDatabase(db);
    res.json({ success: true, message: `Appointment ${id} removed.` });
});

// ==========================================
// 5. DEPARTMENTS API
// ==========================================

// GET /api/departments
app.get('/api/departments', (req, res) => {
    const db = readDatabase();
    res.json({ success: true, count: db.departments.length, data: db.departments });
});

// POST /api/departments
app.post('/api/departments', (req, res) => {
    const { name, hod, location, feeType, description } = req.body;
    if (!name || !hod) {
        return res.status(400).json({ success: false, message: 'Department name and HOD are required.' });
    }

    const db = readDatabase();
    const newDept = {
        id: `DEP-0${db.departments.length + 1}`,
        name: name.trim(),
        hod: hod.trim(),
        doctorsCount: 1,
        location: location || 'Block A, 1st Floor',
        feeType: feeType || 'Specialist OPD',
        description: description || 'Specialized clinical services'
    };

    db.departments.push(newDept);
    writeDatabase(db);
    res.status(201).json({ success: true, message: 'Department created successfully.', data: newDept });
});

// ==========================================
// 6. PRESCRIPTIONS & MEDICAL RECORDS API
// ==========================================

// GET /api/prescriptions
app.get('/api/prescriptions', (req, res) => {
    const { patientName, patientPhone, doctorName } = req.query;
    const db = readDatabase();
    let result = db.prescriptions;

    if (patientName) {
        result = result.filter(p => p.patientName.toLowerCase().includes(patientName.toLowerCase()));
    }
    if (patientPhone) {
        result = result.filter(p => p.patientPhone && p.patientPhone.includes(patientPhone));
    }
    if (doctorName) {
        result = result.filter(p => p.doctorName.toLowerCase().includes(doctorName.toLowerCase()));
    }

    res.json({ success: true, count: result.length, data: result });
});

// POST /api/prescriptions
app.post('/api/prescriptions', (req, res) => {
    const { aptId, patientName, patientPhone, doctorName, department, diagnosis, medicines, followUp } = req.body;
    if (!aptId || !diagnosis || !medicines) {
        return res.status(400).json({ success: false, message: 'Appointment ID, diagnosis, and medicines are required.' });
    }

    const db = readDatabase();
    
    // Also mark appointment Completed
    const apt = db.appointments.find(a => a.id === aptId);
    if (apt) {
        apt.status = 'Completed';
    }

    const newPresc = {
        id: `PRE-2026-${Math.floor(100 + Math.random() * 900)}`,
        aptId,
        patientName: patientName || (apt ? apt.patientName : 'Patient'),
        patientPhone: patientPhone || (apt ? apt.patientPhone : ''),
        doctorName: doctorName || (apt ? apt.doctorName : 'Consultant'),
        department: department || (apt ? apt.department : 'General'),
        diagnosis: diagnosis.trim(),
        medicines: medicines.trim(),
        followUp: followUp || 'Review as advised.',
        date: new Date().toISOString().split('T')[0]
    };

    db.prescriptions.unshift(newPresc);
    writeDatabase(db);
    res.status(201).json({ success: true, message: 'Prescription recorded and consultation completed.', data: newPresc });
});

// ==========================================
// 7. HOSPITAL SYSTEM ANALYTICS
// ==========================================

// GET /api/analytics
app.get('/api/analytics', (req, res) => {
    const db = readDatabase();
    const totalDocs = db.doctors.length;
    const freeDocs = db.doctors.filter(d => d.fee === 0).length;
    const paidDocs = db.doctors.filter(d => d.fee > 0).length;
    const totalPatients = db.patients.length;
    const totalApts = db.appointments.length;
    const confirmedApts = db.appointments.filter(a => a.status === 'Confirmed').length;
    const completedApts = db.appointments.filter(a => a.status === 'Completed').length;
    const cancelledApts = db.appointments.filter(a => a.status === 'Cancelled').length;
    const totalPrescriptions = db.prescriptions.length;

    res.json({
        success: true,
        data: {
            doctors: { total: totalDocs, free: freeDocs, paid: paidDocs },
            patients: { total: totalPatients },
            appointments: { total: totalApts, confirmed: confirmedApts, completed: completedApts, cancelled: cancelledApts },
            departments: { total: db.departments.length },
            prescriptions: { total: totalPrescriptions }
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(` CarePoint Hospital Management System Backend Started`);
    console.log(` Running at: http://localhost:${PORT}`);
    console.log(` REST API Base: http://localhost:${PORT}/api`);
    console.log(` Course ID: WBINB20726 (Major Project)`);
    console.log(`=======================================================`);
});
