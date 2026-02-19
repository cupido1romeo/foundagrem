// Authentication Logic
(function () {
    'use strict';

    const authModal = document.getElementById('authModal');
    const authForm = document.getElementById('authForm');
    const authEmail = document.getElementById('authEmail');
    const authPassword = document.getElementById('authPassword');
    const authError = document.getElementById('authError');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const toggleAuthMode = document.getElementById('toggleAuthMode');
    const authModalTitle = document.getElementById('authModalTitle');
    const logoutBtn = document.getElementById('nav-logout');

    let isLoginMode = true;

    async function handleAuth(e) {
        e.preventDefault();
        const email = authEmail.value;
        const password = authPassword.value;
        authError.style.display = 'none';

        try {
            if (isLoginMode) {
                const { error } = await window.supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            } else {
                const { error } = await window.supabase.auth.signUp({ email, password });
                if (error) throw error;
                alert('Check your email for the confirmation link!');
            }
            authModal.style.display = 'none';
            // app.js will handle the data fetching via auth change listener
        } catch (error) {
            authError.textContent = error.message;
            authError.style.display = 'block';
        }
    }

    function toggleMode() {
        isLoginMode = !isLoginMode;
        authModalTitle.textContent = isLoginMode ? 'Login' : 'Sign Up';
        authSubmitBtn.textContent = isLoginMode ? 'Login' : 'Sign Up';
        toggleAuthMode.textContent = isLoginMode ? 'Need an account? Sign Up' : 'Already have an account? Login';
    }

    async function handleLogout() {
        await window.supabase.auth.signOut();
        window.location.reload();
    }

    // Initialize Auth UI
    if (authForm) authForm.addEventListener('submit', handleAuth);
    if (toggleAuthMode) toggleAuthMode.addEventListener('click', toggleMode);
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    // Initial check
    window.supabase.auth.onAuthStateChange((event, session) => {
        if (!session) {
            authModal.classList.add('active');
            authModal.style.display = 'flex';
        } else {
            authModal.classList.remove('active');
            authModal.style.display = 'none';
            // Dispatch event for app.js to catch
            window.dispatchEvent(new CustomEvent('supabase-auth-success', { detail: { session } }));
        }
    });

})();
