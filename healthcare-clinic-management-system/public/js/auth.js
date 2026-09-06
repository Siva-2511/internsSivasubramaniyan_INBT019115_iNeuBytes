/**
 * YourCare Hospital & Clinic Management System
 * Authentication & Session Management
 */

const AUTH_KEY = 'YourCare_user_session';

const Auth = {
    // Save session
    setSession(user) {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    },

    // Retrieve session
    getUser() {
        try {
            const raw = localStorage.getItem(AUTH_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    },

    // Clear session
    logout() {
        localStorage.removeItem(AUTH_KEY);
        window.location.href = 'login.html';
    },

    // Route Guard for Protected Dashboard Pages
    protectPage(requiredRole = null) {
        const user = this.getUser();
        if (!user) {
            window.location.href = 'login.html';
            return null;
        }

        if (requiredRole && user.role !== requiredRole) {
            // Redirect to appropriate role dashboard
            if (user.role === 'admin') window.location.href = 'admin-dashboard.html';
            else if (user.role === 'doctor') window.location.href = 'doctor-dashboard.html';
            else window.location.href = 'patient-dashboard.html';
            return null;
        }

        return user;
    },

    // Redirect logged-in users away from login/register pages
    redirectIfLoggedIn() {
        const user = this.getUser();
        if (user) {
            if (user.role === 'admin') window.location.href = 'admin-dashboard.html';
            else if (user.role === 'doctor') window.location.href = 'doctor-dashboard.html';
            else window.location.href = 'patient-dashboard.html';
        }
    },

    // Update Header Navigation based on auth state
    renderHeaderNav() {
        const user = this.getUser();
        const navContainer = document.getElementById('authNavContainer');
        if (!navContainer) return;

        if (user) {
            let dashboardLink = 'patient-dashboard.html';
            if (user.role === 'admin') dashboardLink = 'admin-dashboard.html';
            if (user.role === 'doctor') dashboardLink = 'doctor-dashboard.html';

            navContainer.innerHTML = `
                <button class="btn btn-outline btn-sm" onclick="window.voiceAssistant && window.voiceAssistant.toggleVoice()" title="Toggle Voice Assistant" style="color: var(--brand-green); border-color: var(--brand-green-border);">
                    <i class="fa-solid fa-microphone"></i> Voice Assistant
                </button>
                <a href="${dashboardLink}" class="btn btn-outline btn-sm"><i class="fa-solid fa-gauge"></i> My Dashboard</a>
                <button onclick="Auth.logout()" class="btn btn-primary btn-sm"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
            `;
        } else {
            navContainer.innerHTML = `
                <button class="btn btn-outline btn-sm" onclick="window.voiceAssistant && window.voiceAssistant.toggleVoice()" title="Toggle Voice Assistant" style="color: var(--brand-green); border-color: var(--brand-green-border);">
                    <i class="fa-solid fa-microphone"></i> Voice Assistant
                </button>
                <a href="login.html" class="btn btn-outline btn-sm"><i class="fa-solid fa-right-to-bracket"></i> Login</a>
                <a href="register.html" class="btn btn-primary btn-sm"><i class="fa-solid fa-user-plus"></i> Register</a>
            `;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    Auth.renderHeaderNav();
});

