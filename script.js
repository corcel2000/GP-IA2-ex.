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
