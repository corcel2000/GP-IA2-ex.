// Register script Section
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const cancelBtn = document.getElementById("cancel-btn");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const firstname = document.getElementById("firstname").value.trim();
        const lastname = document.getElementById("lastname").value.trim();
        const dob = document.getElementById("dob").value;
        const gender = document.getElementById("gender").value;
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const trn = document.getElementById("trn").value.trim();
        const password = document.getElementById("password").value;

        // Age check
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        if (age < 18) {
            alert("You must be at least 18 years old to register.");
            return; // Stop further execution
        }

        // Password length
        if (password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return; // Stop further execution
        }
        
        // TRN format
        const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
        if (!trnPattern.test(trn)) {
            alert("TRN must be in the format 000-000-000.");
            return; // Stop further execution
        }

        // Get existing users
        const users = JSON.parse(localStorage.getItem("registrationData")) || [];

        // TRN uniqueness check
        if (users.some(user => user.trn === trn)) {
            alert("TRN already registered.");
            return; // Stop further execution
        }

        // New user object
        const newUser  = {
            firstName: firstname,
            lastName: lastname,
            dob: dob,
            gender: gender,
            phone: phone,
            email: email,
            trn: trn,
            password: password,
            registrationDate: new Date().toISOString(),
            cart: {},
            invoices: []
        };

        // Save and redirect
        users.push(newUser );
        localStorage.setItem("registrationData", JSON.stringify(users));
        alert("Registration successful!");
        console.log("Redirecting...");
        window.location.href = "login.html"; // Redirect to login page
        form.reset();
    });

    cancelBtn.addEventListener("click", function () {
        form.reset();
    });
});

/* Login script Section */
document.addEventListener("DOMContentLoaded", function () {
    let attempts = 0;
    const maxAttempts = 3;

    const loginForm = document.getElementById("form");
    const cancelBtn = document.getElementById("cancel-btn");

    // Utility function to normalize TRN by removing dashes
    const normalizeTRN = trn => trn.replace(/-/g, "");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const trnInput = document.getElementById("trn").value.trim();
            const passwordInput = document.getElementById("password").value.trim();

            const users = JSON.parse(localStorage.getItem("registrationData")) || [];

            const matchedUser = users.find(user =>
                normalizeTRN(user.trn) === normalizeTRN(trnInput) &&
                user.password === passwordInput
            );

            if (matchedUser) {
                // Use confirm instead of alert to ensure the user acknowledges the message
                if (confirm("Login successful!")) {
                    window.location.href = "creation_studio.html";
                }
            } else {
                attempts++;
                if (attempts >= maxAttempts) {
                    alert("Too many failed attempts! Redirecting to an error page.");
                    window.location.href = "error.html";
                } else {
                    alert(`Invalid login. You have ${maxAttempts - attempts} attempts left.`);
                }
            }
        });

        // Cancel button resets the form
        if (cancelBtn) {
            cancelBtn.addEventListener("click", function () {
                loginForm.reset();
            });
        }
    }
});
