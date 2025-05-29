document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const showSignupLink = document.getElementById('showSignup');
    const showLoginLink = document.getElementById('showLogin');
    const authTitle = document.querySelector('.auth-title');
    const authSubtitle = document.querySelector('.auth-subtitle');

    // Switch to signup form
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.remove('active');
        signupForm.classList.add('active');
        authTitle.textContent = 'Create Account';
        authSubtitle.textContent = 'Please fill in your details';
    });

    // Switch to login form
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupForm.classList.remove('active');
        loginForm.classList.add('active');
        authTitle.textContent = 'Welcome Back';
        authSubtitle.textContent = 'Please login to your account';
    });

    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        try {
            // Here you would typically make an API call to your backend
            console.log('Login attempt:', { email, password, rememberMe });
            
            // Simulate successful login
            alert('Login successful!');
            window.location.href = 'order.html';
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;

        // Basic validation
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            // Here you would typically make an API call to your backend
            console.log('Signup attempt:', { name, email, password });
            
            // Simulate successful signup
            alert('Account created successfully! Please log in.');
            
            // Switch to login form
            showLoginLink.click();
        } catch (error) {
            alert('Signup failed. Please try again.');
        }
    });
}); 