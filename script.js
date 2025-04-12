// Smooth Scrolling (Fixed for External Links)
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith("#")) { // Only apply for internal links
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Active Link Highlighting on Scroll
window.addEventListener('scroll', () => {
    let scrollPosition = window.scrollY + 100;
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        let section = document.getElementById(anchor.getAttribute('href').substring(1));
        if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
            document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove('active'));
            anchor.classList.add('active');
        }
    });
});

// Hero Image Animation
window.addEventListener('load', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = 'scale(1)';
        heroImage.style.opacity = '1';
    }
});

// Register script Section
document.getElementById("registerForm").addEventListener("submit", function (event) {
            event.preventDefault();

            const firstname = document.getElementById("firstname").value.trim();
            const lastname = document.getElementById("lastname").value.trim();
            const dob = document.getElementById("dob").value;
            const gender = document.getElementById("gender").value;
            const phone = document.getElementById("phone").value.trim();
            const email = document.getElementById("email").value.trim();
            const trn = document.getElementById("trn").value.trim();
            const password = document.getElementById("password").value;

            // Check age
            const birthDate = new Date(dob);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            const dayDiff = today.getDate() - birthDate.getDate();
            
	    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                age--;
            }
            if (age < 18) {
                alert("You must be at least 18 years old to register.");
                return;
            }

            // Check password
            if (password.length < 8) {
                alert("Password must be at least 8 characters long.");
                return;
            }

            // Check TRN format
            const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
            if (!trnPattern.test(trn)) {
                alert("TRN must be in the format 000-000-000.");
                return;
            }

            // Get existing data
            let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

            // Check TRN uniqueness
            if (users.some(user => user.trn === trn)) {
                alert("TRN already registered.");
                return;
            }
	
	 // Create new user object
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
            // Save to localStorage
        users.push(newUser);
	localStorage.setItem("RegistrationData", JSON.stringify(users));
	
        alert("Registration successful!");
        document.getElementById("registerForm").reset();
        window.location.href = "login.html";

        });

        document.getElementById("cancel-btn").addEventListener("click", function () {
        document.getElementById("registerForm").reset();
        });

// Login script Section
document.addEventListener("DOMContentLoaded", function () {
    let attempts = 0;
    const maxAttempts = 3;

    document.getElementById("form").addEventListener("submit", function (event) {
        event.preventDefault();

	const trn = document.getElementById("trn").value.trim();
 	const password = document.getElementById("password").value;
 	const users = JSON.parse(localStorage.getItem("RegistrationData")) || [];

        if ((user.trn === trn) && user.password === password) {
            alert("Login successful!");
	    attempts = 0; // reset attempts
            window.location.href = "creation_studio.html";
        } else {
            attempts++;
            alert(`Invalid login. You have ${maxAttempts - attempts} attempts left.`);

            if (attempts >= maxAttempts) {
                alert("Too many failed attempts! Redirecting to an error page.");
                window.location.href = "error.html";
            }
        }
    });
});

// Shop products list for dynamic displaying
let products = [
    { id: 1, name: "PreSonus Audio Interface", price: 30814.34, description: "PreSonus AudioBox iTwo 2x2 USB/iPad Audio Interface", img: "Assets/PreSonus Audio interface.jpg" },
    { id: 2, name: "Drum Kit", price: 783405.29, description: "Roland V-Drums Acoustic Design VAD507 Drum Kit", img: "Assets/Drum-kit image.jpg" },
    { id: 3, name: "Keyboard", price: 830574.15, description: "Pa5X Professional Arranger Keyboard", img: "Assets/Keyboard image.jpg" },
    { id: 4, name: "EV-Wedge Speaker", price: 282202.75, description: "Electro-Voice Live X 112P Speaker 1000W 12 Inch", img: "Assets/EV-Wedge Speaker Image.jpg" },
    { id: 5, name: "Microphone", price: 7859.23, description: "ALABS XLR Podcast Microphone - Professional Condenser Studio Mic", img: "Assets/Microphone Image.jpg" },
    { id: 6, name: "Headphones", price: 42350.85, description: "beyerdynamic DT 700 PRO X Closed-back studio headphones", img: "Assets/Headphones.jpg" },
    { id: 7, name: "XLR Audio Cable", price: 5816.99, description: "Pro Series - Studio & Live XLR Cable 20'(6.1 meters)", img: "Assets/XLR Audio Cable.jpg" },
    { id: 8, name: "Record Player", price: 34430.31, description: "Silcron Encore Vinyl/Record Player Turntable with PC Encoding 33/45RPM - Black", img: "Assets/Record Player.jpg" },
    { id: 9, name: "Guitar", price: 47007.59, description: "40 inch Acoustic Guitar-Full Size Black Guitar Beginner Set", img: "Assets/Guitar image.jpg" },
];

// Store products in localStorage
localStorage.setItem("AllProducts", JSON.stringify(products));

// Shopping Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display the different products
function displayProducts() {
    const productContainer = document.getElementById("product-list");
    const storedProducts = JSON.parse(localStorage.getItem("AllProducts")) || [];

    // Check if products are retrieved correctly
    console.log(storedProducts); // Debugging line

    storedProducts.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Price: ${product.price.toLocaleString('en-US', { style: 'currency', currency: 'JMD' })}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productElement);
    });
}

// Call displayProducts on window load
window.onload = () => {
    displayProducts();
    updateCart(); // Ensure the cart is updated on the shop page
};

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        let existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            alert(`${product.name} is already in your cart.`);
        } else {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${product.name} has been added to your cart.`);
            updateCart();
        }
    }
}

// Event listener for Checkout button
document.getElementById("checkout").addEventListener("click", () => {
    if (cart.length > 0) {
        alert("Proceeding to checkout...");
        // Redirect or load invoice page
        window.location.href = "Invoice.html"; // Change to your invoice page
    } else {
        alert("Your cart is empty. Please add items to the cart.");
    }
});

// Event listener for Cancel button
document.getElementById("cancel").addEventListener("click", () => {
    cart = []; // Clear the cart
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    alert("Your cart has been cleared.");
    updateCart();
});

// Event listener for Exit button
document.getElementById("exit").addEventListener("click", () => {
    window.location.href = "creation_studio.html"; // Redirect to the home page
});

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Product removed from cart.`);
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartIcon = document.querySelector(".cart-icon");
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    const taxElement = document.getElementById("tax");
    const totalElement = document.getElementById("total");
    
    if (cartIcon) {
        cartIcon.innerHTML = `🛒 (${cart.length})`;
    }
    
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ""; // Clear existing items
        let subtotal = 0;

        cart.forEach(item => {
            const itemElement = document.createElement("div");
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}" />
                <p>${item.name} - ${item.price.toLocaleString('en-US', { style: 'currency', currency: 'JMD' })}</p>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            subtotal += item.price;
        });

        // Calculate tax and total
        const tax = subtotal * 0.10; // Assuming 10% tax
        const total = subtotal + tax;

        // Update totals in the cart
        subtotalElement.innerText = subtotal.toLocaleString('en-US', { style: 'currency', currency: 'JMD' });
	taxElement.innerText = tax.toLocaleString('en-US', { style: 'currency', currency: 'JMD' });
	totalElement.innerText = total.toLocaleString('en-US', { style: 'currency', currency: 'JMD' });

    }
}

// Cart Page script
// Get Cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display cart items in table
function displayCartItems(){
	const cartTable = document.getElementById("cartItems");
	cartTable.innerHTML ("");
	let subtotal = 0;
	
	cart.forEach((item, index) => {
		let row = document.createElement("tr");
		row.innerHTML = `
		<td>${item.name}</td>
		<td>$${item.price.toFixed(2)}</td>
		<td><input type="number" min="1" value="${item.quantity}" onchange="updateCartQuantity(${index}, this.value)"></td>
		<td>$${(item.price * item.quantity).toFixed(2)}</td>
		<td><button onclick="removeFromCart(${index})">Remove</button></td>
		`;
		cartTable.appendChild(row);
		subtotal += item.price * item.quantity;
	});
	
	const discount = subtotal > 100 ? subtotal * 0.1 : 0; // 10% discount if over $100
	const tax = (subtotal - discount) * 0.15; // 15% tax
	const total = subtotal - discount + tax;
	
	document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
	document.getElementById("discount").innerText = `$${discount.toFixed(2)}`;
	document.getElementById("tax").innerText = `$${tax.toFixed(2)}`;
	document.getElementById("total").innerText = `$${total.toFixed(2)}`;
	
	localStorage.setItem("cartTotal", JSON.stringify({ subtotal, discount, tax, total }));
}

// Update the quantity of a cart item
function updateCartQuantity(index, quantity) {
	if (quantity > 0) {
		cart[index].quantity = parseInt(quantity);
		localStorage.setItem("cart", JSON.stringify(cart));
		displayCartItems();
	}
}

// Remove item from cart
function removeFromCart(index) {
	cart.splice(index, 1);
	localStorage.setItem("cart", JSON.stringify(cart));
	displayCartItems();
}

// Clear the Cart
function clearCart() {
	localStorage.removeItem("cart");
	displayCartItems();
}

// Redirect to check out page
function goToCheckout() {
	window.location.href = "checkout.html";
}

// Checkout page script
// Display the cart totals
window.onload = function() {
	const totals JSON.parse(localStorage.getItem('cartTotals')) || {};
	document.getElementById('subtotal').textContent = `$${totals.subtotal?.toFixed(2) || 0}`;
	document.getElementById('discount').textContent = `$${totals.discount?.toFixed(2) || 0}`;
	document.getElementById('tax').textContent = `$${totals.tax?.toFixed(2) || 0}`;
	document.getElementById('total').textContent = `$${totals.total?.toFixed(2) || 0}`;
};

// Checkout confirmation
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
	e.preventDefault();
	
	const fullName = document.getElementById('fullName').value;
	const address = document.getElementById('address').value;
	const amountPaid = parseFloat(document.getElementById('amountPaid').value);
	
	const totals = JSON.parse(localStorage.getItem('cartTotals')) || {};
	const totalCost = parseFloat(totals.total) || 0;
	
	if (amountPaid < totalCost) {
		alert('The amount paid is less than the total.');
		return;
	}
	
	localStorage.removeItem('cart');
	localStorage.removeItem('cartTotals');
	
	alert("Checkout confirmed! Thanks for shopping with us.");
	window.location.href = "shop.html"; // Return to product page
});

// Cancel and return to cart
function cancelCheckout() {
	window.location.href = "cart.html";
} 
