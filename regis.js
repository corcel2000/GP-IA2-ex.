// Register script Section
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const cancelBtn = document.getElementById("cancel-btn");

    // Exit if form doesn't exist
    if (!form || !cancelBtn) return;

    // Registration Logic
    const isRegisterForm = document.getElementById("firstname") && document.getElementById("dob");

    if (isRegisterForm) {
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
                return;
            }

            if (password.length < 8) {
                alert("Password must be at least 8 characters long.");
                return;
            }

            const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
            if (!trnPattern.test(trn)) {
                alert("TRN must be in the format 000-000-000.");
                return;
            }

            const users = JSON.parse(localStorage.getItem("registrationData")) || [];
            if (users.some(user => user.trn === trn)) {
                alert("TRN already registered.");
                return;
            }

            const newUser = {
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

            users.push(newUser);
            localStorage.setItem("registrationData", JSON.stringify(users));
            alert("Registration successful!");
            window.location.href = "login.html";
            form.reset();
        });

        cancelBtn.addEventListener("click", () => form.reset());
    }
 
 // Login script Section
    const isLoginForm = document.getElementById("trn") && document.getElementById("password") && !isRegisterForm;

    if (isLoginForm) {
        let attempts = 0;
        const maxAttempts = 3;
        const normalizeTRN = trn => trn.replace(/-/g, "");

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const trnInput = document.getElementById("trn").value.trim();
            const passwordInput = document.getElementById("password").value.trim();
            const users = JSON.parse(localStorage.getItem("registrationData")) || [];

            const matchedUser = users.find(user =>
                normalizeTRN(user.trn) === normalizeTRN(trnInput) &&
                user.password === passwordInput
            );

            if (matchedUser) {
                if (confirm("Login successful! Click OK to proceed.")) {
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

        cancelBtn.addEventListener("click", () => form.reset());
    }
});



            const newPassword = prompt("Enter your new password:");
            if (!newPassword) return;

            registrationData[userIndex].password = newPassword;
            localStorage.setItem("registrationData", JSON.stringify(registrationData));
            alert("Password has been successfully updated.");
        });
    }
});
