document.getElementById("registerForm").addEventListener("submit", function (e){
    e.preventDefault();
    let valid = true;

    //username
    const username = document.getElementById("username").value.trim();
    const usernameRegex = /^[A-Za-z]{6,}$/;
    if (!usernameRegex.test(username)) {
        
        document.getElementById("usernameError").textContent = "Username must be at least & letters, no numbers or special characters.";
        valid = false;

    }
    else {
        document.getElementById("usernameError").textContent = "";
    }

    //password
    const password = document.getElementById("password").value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
        valid = false;
        document.getElementById("passwordError").textContent = "Password must be 8+ characters, include uppercase, number, and special characters";
    }
    else {
        document.getElementById("passwordError"). textContent = "";
    }

    //Confirm Password
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (confirmPassword !== password) {
        valid = false;
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
    }
    else {
        document.getElementById("confirmPasswordError").textContent = "";
    }

    //Email
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if(!emailRegex.test(email)) {
        valid = false;
        document.getElementById("emailError").textContent = "Invalid Email Format.";
    }
    else {
        document.getElementById("emailError").textContent = "";
    }

    //Mobile
    const mobile = document.getElementById("mobile").value.trim();
    if (!/^\d{10}$/.test(mobile)) {
        valid= false;
        document.getElementById("mobileError").textContent = "Mobile number must be 10 digits.";

    }
    else {
        document.getElementById("mobileError").textContent = "";
    }

    //Aadhaar
    const aadhaar = document.getElementById("aadhaar").value.trim();
    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(aadhaar)) {
        document.getElementById("aadhaarError").textContent = "Aadhaar must be a 12 digit number";
        valid= false;
    } else {
        document.getElementById("aadhaarError").textContent = "";
    }

    if (valid) {
        alert("Registration successful!");
        window.location.href = "login.html";
    }

});

// Use the same dummyTrains as in TrainSearch&SeatAvailability
const dummyTrains = [
  { train: "Express A", origin: "Solapur", destination: "Mumbai", seats: 200 },
  { train: "Superfast B", origin: "Ahmedabad", destination: "Surat", seats: 150 },
  // ...rest of your dummyTrains...
];

// Update train dropdown based on origin/destination
document.getElementById('origin').addEventListener('input', updateTrainOptions);
document.getElementById('destination').addEventListener('input', updateTrainOptions);

function toTitleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function updateTrainOptions() {
  const origin = toTitleCase(document.getElementById('origin').value.trim());
  const destination = toTitleCase(document.getElementById('destination').value.trim());
  const trainSelect = document.getElementById('trainSelect');
  trainSelect.innerHTML = '<option value="">Select Train</option>';

  if (!origin || !destination) return;

  const matches = dummyTrains.filter(t => t.origin === origin && t.destination === destination);
  matches.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.train;
    opt.textContent = `${t.train} (${t.seats} seats)`;
    trainSelect.appendChild(opt);
  });

  if (matches.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'No Train for that route';
    trainSelect.appendChild(opt);
  }
}

