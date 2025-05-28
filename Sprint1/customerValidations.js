// Registration form validation
function registerUser(userData) {
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    users.push(userData);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateRegistrationForm()) {
                const userData = {
                    username: document.getElementById('username').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    mobile: document.getElementById('mobile').value.trim(),
                    aadhaar: document.getElementById('aadhaar').value.trim(),
                    registrationDate: new Date().toISOString(),
                    isLoggedIn: false,
                };
                registerUser(userData);
                // alert('Registration successful!');
                window.location.href = 'login.html';
            }
        });
    }
});

function validateRegistrationForm() {
    let isValid = true;

    // Username validation
    const username = document.getElementById('username').value.trim();
    const usernameError = document.getElementById('usernameError');
    if (!/^[A-Za-z]{6,}$/.test(username)) {
        usernameError.textContent = 'Username must be at least 6 letters, no numbers or special characters.';
        isValid = false;
    } else {
        usernameError.textContent = '';
    }

    // Password validation
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');
    if (!/^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/.test(password)) {
        passwordError.textContent = 'Password must be 8+ characters, include uppercase, number, and special character.';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    // Confirm Password validation
    const confirmPassword = document.getElementById('confirmPassword').value;
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    if (confirmPassword !== password) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        isValid = false;
    } else {
        confirmPasswordError.textContent = '';
    }

    // Email validation
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = 'Invalid email format.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Mobile validation
    const mobile = document.getElementById('mobile').value.trim();
    const mobileError = document.getElementById('mobileError');
    if (!/^\d{10}$/.test(mobile)) {
        mobileError.textContent = 'Mobile number must be 10 digits.';
        isValid = false;
    } else {
        mobileError.textContent = '';
    }

    // Aadhaar validation
    const aadhaar = document.getElementById('aadhaar').value.trim();
    const aadhaarError = document.getElementById('aadhaarError');
    if (!/^\d{12}$/.test(aadhaar)) {
        aadhaarError.textContent = 'Aadhaar must be a 12 digit number.';
        isValid = false;
    } else {
        aadhaarError.textContent = '';
    }

    return isValid;
}

// Login form validation
function displayLoginError(message) {
    const errorDiv = document.getElementById('loginError') || document.createElement('div');
    errorDiv.id = 'loginError';
    errorDiv.className = 'alert alert-danger mt-3';
    errorDiv.textContent = message;

    const loginForm = document.getElementById('loginForm');
    if (!document.getElementById('loginError')) {
        loginForm.appendChild(errorDiv);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('loginUsername').value.trim();
            if (validateLoginForm()) {
                const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                const user = users.find(u => u.username === username);

                if (user) {
                    const userInfo = {
                        username: username,
                        loginTime: new Date().toISOString()
                    };
                    sessionStorage.setItem('currentUser', JSON.stringify(userInfo));
                    window.location.href = 'Customer/home.html';
                } else {
                    displayLoginError('Invalid username or password. Please try again.');
                }
            }
        });
    }
});

function validateLoginForm() {
    let isValid = true;

    // Username validation
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const usernameError = document.getElementById('loginUsernameError');
    const passwordError = document.getElementById('loginPasswordError');

    if (username.length < 6) {
        usernameError.textContent = 'Username must be at least 6 characters long.';
        isValid = false;
    } else {
        usernameError.textContent = '';
    }

    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters long.';
        isValid = false;
    } else {
        passwordError.textContent = '';
    }

    // Check if user exists
    if (isValid) {


        const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        const user = users.find(u => u.username === username);

        if (!user) {
            usernameError.textContent = 'User not found. Please register first.';
            isValid = false;
        }
    }

    return isValid;
}

// Navigation and Logout functionality
function handleNavigation() {
    // Check authentication on each page load
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const protectedCustomerPages = [
        '/Customer/home.html',
        '/Customer/book-ticket.html',
        '/Customer/booking-history.html',
        '/Customer/booking-ticket.html',
        '/Customer/confirmation.html',
        '/Customer/update-details.html',
        '/Customer/view-tickets.html'
    ];

    const currentPath = window.location.pathname;

    if (protectedCustomerPages.some(page => currentPath.toLowerCase().includes(page.toLowerCase()))) {
        if (!currentUser) {
            // Redirect to login if accessing protected page without auth
            window.location.replace('../login.html');
            return;
        }
    } else if ((currentPath.includes('login.html') || currentPath.includes('register.html')) && currentUser) {
        // Redirect to home if accessing login/register while authenticated
        window.location.replace('Customer/home.html');
        return;
    }
}

function logout() {
    // Clear user session
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserBookings');

    // Update user's isLoggedIn status in localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    if (currentUser) {
        const updatedUsers = users.map(user => {
            if (user.username === currentUser.username) {
                return { ...user, isLoggedIn: false };
            }
            return user;
        });
        localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    }

    // Redirect to login page
    window.location.replace('../login.html');
}

// Add navigation check on page load
document.addEventListener('DOMContentLoaded', function () {
    // Add existing listeners
    // ...existing code...

    handleNavigation();

    // Add logout handler to logout buttons if they exist
    const logoutBtns = document.querySelectorAll('.logout-btn, #logoutBtn, [onclick*="logout"]');
    logoutBtns.forEach(btn => {
        btn.removeEventListener('click', logout); // Remove any existing listeners
        btn.addEventListener('click', logout);
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function () {
        handleNavigation();
    });
});