// adminScript.js

// Authentication check function
function checkAdminAuth() {
    const admin = sessionStorage.getItem('adminUser');
    if (!admin) {
        window.location.href = 'admin-login.html';
        return false;
    }
    return true;
}

// Check authentication on every page load
document.addEventListener('DOMContentLoaded', function() {
    if (!checkAdminAuth()) {
        return;
    }
    // You can add code here to display admin info in the navbar
});

function logoutAdmin() {
    sessionStorage.removeItem('adminUser');
    window.location.href = 'admin-login.html';
}

document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("clientTable");

    table.addEventListener("click", function(e) {
        if (e.target.classList.contains("delete-btn")) {
            const row = e.target.closest("tr");
            const name = row.children[1].textContent;
            const confirmDelete = confirm(`Are you sure you want to delete ${name}?`);
            if (confirmDelete) {
                row.remove();
                MessageChannel.textContent = `${name} has been deleted successfully.`;

                setTimeout(() => {
                    MessageChannel.textContent = "";
                }, 5000);
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("trainForm");
    const message = document.getElementById("message");

    form.addEventListener("submit", function (e){
        e.preventDefault();
        const name = document.getElementById("trainName").value.trim();
        const seats = document.getElementById("seats").value.trim();
        const from = document.getElementById("fromStation").value.trim();
        const to = document.getElementById("toStation").value.trim();
        const ownership = document.getElementById("ownership").value.trim();

        if (!name || !seats || !from || !to || !ownership) {
            message.textContent = "All fields are required";
            message.classList.remove("text-success");
            message.classList.add("text-danger");
            return;
        }

        message.classList.remove("text-danger");
        message.classList.add("text-success");
        message.textContent = `Train "${name}" registered successfully!`;

        form.reset();
        setTimeout (() => {
            message.textContent = "";
        }, 3000);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("profileForm");
    const message = document.getElementById("message");
    const deleteBtn = document.getElementById("deleteBtn")
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("adminUsername").value.trim();
        const mobile = document.getElementById("adminMobile").value.trim();
        const email = document.getElementById("adminEmail").value.trim();
        const currentPassword = document.getElementById("currentPassword").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();
        const confirmPassword = document.getElementById("confirmNewPassword").value.trim();

        if(!username,e || !mobile || !email || !currentPassword || !newPassword || !confirmPassword) {
            message.textContent = "All fields are required";
            message.classList.remove("text-success");
            message.classList.add("text-danger");
            return;

        }
        if (newPassword !== confirmPassword) {
            message.textContent = "New password and confirm password do not match.";
            message.classList.remove("text-success");
            message.classList.add("text-danger");
            return;
        }
        message.classList.remove("text-danger");
        message.classList.add("text-success");
        message.textContent = `Profile updated successfully!`;

        setTimeout (() => {
            message.textContent = "";
        }, 3000);

        deleteBtn.addEventListener("click", function () {
            const confirmDelete = confirm("Are you sure you want to delete your profile?");
            if (confirmDelete) {
                message.classList.remove("text-success");
                message.classList.add("text-danger");
                message.textContent = "Profile deleted successfully";
            }
        });



    });
});

document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("adminUsername").value.trim();
    const password = document.getElementById("adminPassword").value.trim();
    const errorBox = document.getElementById("adminError");

    if(username === "admin" && password =="Admin@123") {
        window.location.href = "home.html";
    } else {
        errorBox.textContent = "Invalid admin credentials";
    }
});

