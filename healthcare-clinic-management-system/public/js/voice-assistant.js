/**
 * YourCare Accessibility Voice Assistant
 * 10-Second Blind Assistance Prompt + Voice Command Recognition
 * Wake Word / Keyword: "YourCare" or "Help" or "Assist"
 */

class VoiceAssistant {
    constructor() {
        this.synth = window.speechSynthesis;
        this.recognition = null;
        this.timer = 10;
        this.timerInterval = null;
        this.isVoiceActive = sessionStorage.getItem('voice_active') === 'true';
        this.initSpeechRecognition();
    }

    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
                console.log('Voice Command:', transcript);
                this.handleVoiceCommand(transcript);
            };

            this.recognition.onend = () => {
                if (this.isVoiceActive) {
                    try { this.recognition.start(); } catch(e) {}
                }
            };
        }
    }

    speak(text, callback) {
        if (!this.synth) return;
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        if (callback) utterance.onend = callback;
        this.synth.speak(utterance);
    }

    startHomeAccessibilityTimer() {
        // If voice control is ALREADY active from prior navigation, resume listening immediately
        if (this.isVoiceActive || sessionStorage.getItem('voice_active') === 'true') {
            this.startListening();
            return;
        }

        if (sessionStorage.getItem('voice_timer_dismissed')) return;

        const banner = document.createElement('div');
        banner.id = 'voiceAssistanceBanner';
        banner.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; background: #064e3b; color: white; padding: 1.25rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); border: 2px solid #10b981; max-width: 380px; font-family: Inter, sans-serif;';
        
        banner.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 0.85rem;">
                <div style="font-size: 1.8rem; color: #10b981;"><i class="fa-solid fa-ear-listen fa-pulse"></i></div>
                <div style="flex: 1;">
                    <strong style="display: block; font-size: 1rem; color: #a7f3d0; margin-bottom: 0.25rem;">Accessibility Voice Assistance</strong>
                    <p style="font-size: 0.825rem; margin: 0; color: #e2e8f0; line-height: 1.4;">
                        Audio prompt in <strong id="voiceTimerCount" style="color: #10b981; font-size: 1.1rem;">10</strong>s for visually impaired patients.
                    </p>
                </div>
                <button onclick="window.voiceAssistant.cancelBanner()" style="background: transparent; border: none; color: #94a3b8; font-size: 1.2rem; cursor: pointer; padding: 0;">&times;</button>
            </div>
            <div style="display: flex; gap: 0.5rem; margin-top: 0.85rem;">
                <button onclick="window.voiceAssistant.activateVoiceImmediately()" style="background: #10b981; color: white; border: none; padding: 0.4rem 0.85rem; border-radius: 6px; font-weight: 600; font-size: 0.8rem; cursor: pointer; flex: 1;"><i class="fa-solid fa-microphone"></i> Activate Voice Now</button>
                <button onclick="window.voiceAssistant.cancelBanner()" style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.3); padding: 0.4rem 0.85rem; border-radius: 6px; font-weight: 500; font-size: 0.8rem; cursor: pointer;">Cancel / I can see</button>
            </div>
        `;

        document.body.appendChild(banner);

        this.timer = 10;
        this.timerInterval = setInterval(() => {
            this.timer--;
            const countEl = document.getElementById('voiceTimerCount');
            if (countEl) countEl.textContent = this.timer;

            if (this.timer <= 0) {
                clearInterval(this.timerInterval);
                this.triggerPoliteVoicePrompt();
            }
        }, 1000);
    }

    cancelBanner() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        sessionStorage.setItem('voice_timer_dismissed', 'true');
        const banner = document.getElementById('voiceAssistanceBanner');
        if (banner) banner.remove();
        if (this.synth) this.synth.cancel();
    }

    activateVoiceImmediately() {
        this.cancelBanner();
        this.triggerPoliteVoicePrompt();
    }

    triggerPoliteVoicePrompt() {
        const text = "Welcome to YourCare Hospital. Are you visually impaired or do you require voice assistance? Say Yes or help to enable full voice control for booking appointments and managing medical records.";
        
        sessionStorage.setItem('voice_active', 'true');
        // Start listening immediately
        this.startListening();
        
        this.speak(text, () => {
            this.isVoiceActive = true;
        });
    }

    startListening() {
        this.isVoiceActive = true;
        sessionStorage.setItem('voice_active', 'true');
        if (this.recognition) {
            try { this.recognition.start(); } catch(e) {}
            this.showVoiceFloatingWidget();
        }
    }

    stopListening() {
        this.isVoiceActive = false;
        sessionStorage.removeItem('voice_active');
        if (this.recognition) {
            try { this.recognition.stop(); } catch(e) {}
        }
        const widget = document.getElementById('voiceFloatingWidget');
        if (widget) widget.remove();
    }

    toggleVoice() {
        if (this.isVoiceActive) {
            this.stopListening();
            this.speak("Voice assistance deactivated.");
        } else {
            this.startListening();
            this.speak("Voice assistance activated. Say YourCare, Login, Register, or Book Appointment.");
        }
    }

    showVoiceFloatingWidget() {
        let widget = document.getElementById('voiceFloatingWidget');
        if (!widget) {
            widget = document.createElement('div');
            widget.id = 'voiceFloatingWidget';
            widget.style.cssText = 'position: fixed; bottom: 20px; left: 20px; z-index: 9999; background: #059669; color: white; padding: 0.65rem 1rem; border-radius: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 0.65rem; font-family: Inter, sans-serif; font-size: 0.85rem; font-weight: 600; cursor: pointer;';
            widget.innerHTML = `<i class="fa-solid fa-microphone fa-beat" style="color: #a7f3d0;"></i> <span>Voice Active (Keyword: "YourCare")</span> <span style="background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 10px; font-size: 0.7rem;" onclick="window.voiceAssistant.toggleVoice()">Stop</span>`;
            document.body.appendChild(widget);
        }
    }

    handleVoiceCommand(transcript) {
        // "YourCare" / "Your Care" keyword command: Go directly to home page if spoken during voice interaction
        if (transcript.includes('yourcare') || transcript.includes('your care')) {
            const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
            if (!isHome) {
                this.speak("Navigating to YourCare Hospital home page.", () => {
                    window.location.href = 'index.html';
                });
                return;
            }
        }

        // Keyword activation check even if idle
        if (transcript.includes('help') || transcript.includes('assist') || transcript.includes('yes')) {
            sessionStorage.setItem('voice_active', 'true');
            this.startListening();
            if (window.location.pathname.includes('patient-dashboard.html')) {
                this.speak("Voice assistance active in Patient Portal. Say Read Prescription, Read Current Prescription, Read Previous Prescription, Read Appointments, Book Appointment, or Download Slip.");
            } else if (window.location.pathname.includes('login.html')) {
                this.speak("You are on the login page. Say Login Patient, Login Doctor, or Login Admin.");
            } else if (window.location.pathname.includes('register.html')) {
                this.speak("You are on the registration page. Say Register Patient.");
            } else {
                this.speak("Voice control enabled. Say Login, Register, Book Appointment, or Departments.");
            }
            return;
        }

        // Read Prescription commands
        if (transcript.includes('read') && (transcript.includes('prescription') || transcript.includes('medicine') || transcript.includes('record'))) {
            if (transcript.includes('previous') || transcript.includes('old') || transcript.includes('archived')) {
                this.readPrescriptions('previous');
            } else {
                this.readPrescriptions('current');
            }
            return;
        }

        // Read Appointments commands
        if (transcript.includes('read') && (transcript.includes('appointment') || transcript.includes('visit') || transcript.includes('opd'))) {
            this.readAppointments();
            return;
        }

        // Download Slip / Print Receipt command
        if (transcript.includes('download') || transcript.includes('print') || transcript.includes('slip') || transcript.includes('receipt')) {
            this.downloadSlip();
            return;
        }

        // Symptom / Reason Speech Dictation into Book Form
        const bookModal = document.getElementById('bookModal');
        const reasonInput = document.getElementById('bookReason');
        const isBookModalActive = bookModal && bookModal.classList.contains('active');

        if (isBookModalActive && reasonInput && (document.activeElement === reasonInput || transcript.includes('reason') || transcript.includes('symptom') || transcript.includes('fever') || transcript.includes('headache') || transcript.includes('pain') || transcript.includes('checkup'))) {
            // Clean up command words if spoken
            let cleanText = transcript
                .replace(/my symptoms are/g, '')
                .replace(/reason is/g, '')
                .replace(/symptoms/g, '')
                .replace(/reason/g, '')
                .trim();
            if (!cleanText) cleanText = transcript;

            reasonInput.value = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
            this.speak(`Recorded reason: ${cleanText}. Now say Confirm Appointment to finish.`);
            return;
        }

        // Select / List Doctors step-by-step
        if (transcript.includes('list doctor') || transcript.includes('list doctors') || transcript.includes('show doctors') || transcript.includes('read doctors')) {
            this.listDoctorsInteractive();
            return;
        }

        if (transcript.includes('next doctor') || transcript.includes('next choice') || transcript.includes('change doctor')) {
            this.cycleDoctorOption(1);
            return;
        }

        if (transcript.includes('previous doctor') || transcript.includes('go back') || transcript.includes('back')) {
            this.cycleDoctorOption(-1);
            return;
        }

        if (transcript.includes('select doctor') || transcript.includes('choose doctor') || transcript.includes('select this') || transcript.includes('choose this') || transcript.includes('pick this') || transcript === 'select' || transcript === 'choose') {
            this.confirmSelectedDoctor();
            return;
        }

        // Navigation & Actions
        if (transcript.includes('login') || transcript.includes('sign in')) {
            this.speak("Navigating to login page.", () => {
                window.location.href = 'login.html';
            });
        } else if (transcript.includes('register') || transcript.includes('sign up')) {
            this.speak("Navigating to registration page.", () => {
                window.location.href = 'register.html';
            });
        } else if (transcript.includes('book') || transcript.includes('schedule')) {
            if (window.location.pathname.includes('patient-dashboard.html')) {
                if (typeof openBookModal === 'function') openBookModal();
                this.speak("Appointment booking modal opened. Say List Doctors to hear doctor options, say Next Doctor to cycle choices, or say Select Doctor to choose.");
            } else {
                this.speak("Opening patient portal for booking.", () => {
                    window.location.href = 'login.html?role=patient';
                });
            }
        } else if (transcript.includes('confirm appointment') || transcript.includes('submit appointment') || transcript.includes('confirm booking') || transcript.includes('confirm') || transcript.includes('submit')) {
            const form = document.getElementById('bookForm');
            if (form) {
                const submitBtn = document.getElementById('bookSubmitBtn');
                if (submitBtn) {
                    this.speak("Submitting appointment booking.");
                    submitBtn.click();
                } else {
                    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
            } else {
                this.speak("Please open the appointment booking modal first by saying Book Appointment.");
            }
        } else if (transcript.includes('cancel') && (transcript.includes('modal') || transcript.includes('booking'))) {
            if (typeof closeModal === 'function') closeModal('bookModal');
            this.speak("Closed appointment booking modal.");
        } else if (transcript.includes('department') || transcript.includes('specialties')) {
            this.speak("Opening medical departments directory.", () => {
                window.location.href = 'departments.html';
            });
        } else if (transcript.includes('home')) {
            this.speak("Going to home page.", () => {
                window.location.href = 'index.html';
            });
        } else if (transcript.includes('stop') || transcript.includes('off') || transcript.includes('deactivate')) {
            sessionStorage.removeItem('voice_active');
            this.stopListening();
            this.speak("Voice control deactivated. Say YourCare anytime to reactivate.");
        }
    }

    listDoctorsInteractive() {
        const select = document.getElementById('bookDoctorSelect');
        if (!select || select.options.length <= 1) {
            this.speak("Doctor dropdown is loading. Please try again in a moment.");
            return;
        }

        this.currentDocIndex = 1;
        select.selectedIndex = 1;
        select.dispatchEvent(new Event('change'));

        const optText = select.options[1].text;
        this.speak(`Option 1: ${optText}. Say Select This to confirm, Next Doctor to hear the next option, or Go Back to repeat.`);
    }

    cycleDoctorOption(step = 1) {
        const select = document.getElementById('bookDoctorSelect');
        if (!select || select.options.length <= 1) return;

        if (!this.currentDocIndex) this.currentDocIndex = 1;
        this.currentDocIndex += step;

        if (this.currentDocIndex >= select.options.length) this.currentDocIndex = 1;
        if (this.currentDocIndex < 1) this.currentDocIndex = select.options.length - 1;

        select.selectedIndex = this.currentDocIndex;
        select.dispatchEvent(new Event('change'));

        const optText = select.options[this.currentDocIndex].text;
        this.speak(`Doctor option ${this.currentDocIndex}: ${optText}. Say Select This to choose, Next Doctor for next, or Go Back for previous.`);
    }

    confirmSelectedDoctor() {
        const select = document.getElementById('bookDoctorSelect');
        if (select && select.selectedIndex > 0) {
            const selectedText = select.options[select.selectedIndex].text;
            const reasonInput = document.getElementById('bookReason');
            if (reasonInput) {
                reasonInput.focus();
                reasonInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            this.speak(`Selected ${selectedText}. Cursor moved to Reason or Symptoms section. You can type symptoms or say Confirm Appointment to finish booking.`);
        } else {
            this.speak("Please select a doctor first by saying List Doctors or Next Doctor.");
        }
    }

    readPrescriptions(type = 'current') {
        const prescCards = document.querySelectorAll('#patientPrescriptionsList .service-card');
        if (!prescCards || prescCards.length === 0) {
            this.speak("You have no medical prescriptions recorded in your portal.");
            return;
        }

        let found = false;
        prescCards.forEach(card => {
            const isArchived = card.textContent.includes('Previous') || card.textContent.includes('Superseded');
            if (type === 'current' && !isArchived && !found) {
                found = true;
                const text = `Active Prescription details: ${card.innerText.replace(/[\n\r]+/g, '. ')}`;
                this.speak(text);
            } else if (type === 'previous' && isArchived && !found) {
                found = true;
                const text = `Previous Archived Prescription details: ${card.innerText.replace(/[\n\r]+/g, '. ')}`;
                this.speak(text);
            }
        });

        if (!found) {
            if (type === 'previous') this.speak("No previous archived prescriptions found.");
            else this.speak(`Reading prescription details: ${prescCards[0].innerText.replace(/[\n\r]+/g, '. ')}`);
        }
    }

    readAppointments() {
        const rows = document.querySelectorAll('#patientAptsTableBody tr');
        if (!rows || rows.length === 0 || rows[0].textContent.includes('No appointments')) {
            this.speak("You have no scheduled OPD appointments.");
            return;
        }

        let summaryText = `You have ${rows.length} scheduled OPD appointments. `;
        rows.forEach((row, index) => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 6) {
                summaryText += `Appointment ${index + 1}: ID ${cells[0].innerText}, Doctor ${cells[1].innerText}, Department ${cells[2].innerText}, Date and time ${cells[3].innerText}, Fee ${cells[4].innerText}, Status ${cells[5].innerText}. `;
            }
        });

        this.speak(summaryText);
    }

    downloadSlip() {
        const firstSlipBtn = document.querySelector('#patientAptsTableBody button');
        if (firstSlipBtn) {
            firstSlipBtn.click();
            this.speak("Opening appointment slip modal and sending print request.", () => {
                setTimeout(() => window.print(), 800);
            });
        } else {
            this.speak("No active appointment slip available to download.");
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.voiceAssistant = new VoiceAssistant();
    const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/') || window.location.pathname === '';
    const isPatientPage = window.location.pathname.includes('patient-dashboard.html');
    const isLoginPage = window.location.pathname.includes('login.html');

    if (isHome || isPatientPage || isLoginPage) {
        window.voiceAssistant.startHomeAccessibilityTimer();
    }
});
