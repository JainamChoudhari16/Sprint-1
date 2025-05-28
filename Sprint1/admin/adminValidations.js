
// Admin Login form validation
document.addEventListener('DOMContentLoaded', function () {
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('adminUsername').value.trim();
            if (validateAdminLoginForm()) {
                // Store admin info in session
                const adminInfo = {
                    username: username,
                    role: 'admin',
                    loginTime: new Date().toISOString()
                };
                sessionStorage.setItem('adminUser', JSON.stringify(adminInfo));
                alert('Admin login successful!');
                window.location.href = 'home.html';
            }
        });
    }
});

function validateAdminLoginForm() {
    let isValid = true;

    // Admin Username validation
    const username = document.getElementById('adminUsername').value.trim();
    const usernameError = document.getElementById('adminError');
    if (username.length < 4) {
        usernameError.textContent = 'Admin username must be at least 4 characters long.';
        isValid = false;
    } else {
        usernameError.textContent = '';
    }

    // Admin Password validation
    const password = document.getElementById('adminPassword').value;
    if (password.length < 8) {
        usernameError.textContent = 'Admin password must be at least 8 characters long.';
        isValid = false;
    }

    return isValid;
}

// Admin Profile Update form validation
document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (validateAdminProfileForm()) {
                alert('Profile updated successfully!');
                // Perform profile update action
            }
        });
    }
});

function validateAdminProfileForm() {
    let isValid = true;

    // Admin Username validation
    const username = document.getElementById('adminUsername').value.trim();
    if (username.length < 4) {
        alert('Admin username must be at least 4 characters long.');
        isValid = false;
    }

    // Admin Mobile validation
    const mobile = document.getElementById('adminMobile').value.trim();
    if (!/^\d{10}$/.test(mobile)) {
        alert('Mobile number must be 10 digits.');
        isValid = false;
    }

    // Admin Email validation
    const email = document.getElementById('adminEmail').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Invalid email format.');
        isValid = false;
    }

    // Current Password validation
    const currentPassword = document.getElementById('currentPassword').value;
    if (currentPassword.length < 8) {
        alert('Current password must be at least 8 characters long.');
        isValid = false;
    }

    // New Password validation
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    if (newPassword.length < 8) {
        alert('New password must be at least 8 characters long.');
        isValid = false;
    } else if (newPassword !== confirmNewPassword) {
        alert('New passwords do not match.');
        isValid = false;
    }

    return isValid;
}
