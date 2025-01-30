// Category Toggle Button
document.getElementById('category-toggle').addEventListener('click', function(event) {
    const categoryList = document.getElementById('category-list');
    if (categoryList.style.display === 'block') {
        categoryList.style.display = 'none';
    } else {
        categoryList.style.display = 'block';
    }
    event.stopPropagation(); // Prevent the click event from propagating to the document
});

// Close the category list when clicking outside
document.addEventListener('click', function() {
    const categoryList = document.getElementById('category-list');
    if (categoryList.style.display === 'block') {
        categoryList.style.display = 'none';
    }
});

// Prevent the list from closing when clicking inside it
document.getElementById('category-list').addEventListener('click', function(event) {
    event.stopPropagation();
});

// Function to get URL parameter
function getProductId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Sample product data


// Display product details if found
 // Get product ID from URL
 const urlParams = new URLSearchParams(window.location.search);
 const productId = urlParams.get('id');

 const addToCartButton = document.querySelector('.add-to-cart');
if (addToCartButton && productId) {
    addToCartButton.setAttribute('data-id', productId);
}
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (products[productId]) {
        document.getElementById('product-name').innerHTML = `<strong>Product name:</strong> ${products[productId].name}`;
        document.getElementById('product-description').innerHTML = `<strong>Description:</strong> ${products[productId].description}`;
        document.getElementById('product-price').innerHTML = `<strong>Price: $</strong> ${products[productId].price}`;
        document.getElementById('product-image').src = products[productId].image;
    } else {
        document.querySelector('.product-container').innerHTML = '<p>Product not found.</p>';
    }
});

 // Sample product data
 let totalAmount = 0;
let shoppingList = {}; // Object to track products in the cart

const products = {
    1: { name: 'Pou Pou Plush', price: 10, image: 'img/product1.png', description: 'A very cute trending plush.',category: 'toys' },
    2: { name: 'Pou Pou Slipper', price: 15, image: 'img/product2.png', description: 'A very comfy slipper.',category: 'fashion' },
    3: { name: 'Cooking Pan (PUBG)', price: 20, image: 'img/product3.png',description:'This Pan has saved a lot of lifes.', category: 'home-kitchen' },
    4: { name: 'Will Smith Slaps Chris Rock Figure', price: 25, image: 'img/product4.png', description:'As a memorial of the greatest night of television',category: 'toys' },
    5: { name: 'Sponge Bob Dish Washing Sponge Holder', price: 25, image: 'img/product5.png', description:'This will be the best sponge holder for your kids.',category: 'home-kitchen' },
    6: { name: 'The Chill Guy T-shirt', price: 50, image: 'img/product6.png', description: 'Just be chill mate.',category: 'fashion' },
    7: { name: 'Jinx Shark Gun', price: 300, image: 'img/product7.png', description:'Jinx used it to kill Catherine s Mum',category: 'weapon' },
    8: { name: 'Jayce Mercury Hammer', price: 50, image: 'img/product8.png', description:'Jayce used the power of hextech to create it, it is so powerful and please careful when using it.',category: 'weapon' }
};


document.addEventListener('DOMContentLoaded', () => {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) return; // Exit if breadcrumb container doesn't exist

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category'); // Get category from URL
    const productId = urlParams.get('id'); // Get product ID from URL

    let breadcrumbHTML = `<a href="index.html" class="breadcrumb-link">Home</a>`; // Home link

    if (category) {
        // If on a category page, add clickable category link
        breadcrumbHTML += ` > <span class="breadcrumb-current">${capitalizeFirstLetter(category)}</span>`;
    }

    if (productId && typeof products !== 'undefined' && products[productId]) {
        // If on a product page, add category link and product name
        const product = products[productId];
        breadcrumbHTML += ` > <a href="category.html?category=${product.category}" class="breadcrumb-link">${capitalizeFirstLetter(product.category)}</a>`;
        breadcrumbHTML += ` > <span class="breadcrumb-current">${product.name}</span>`; // Non-clickable product name
    }

    // Set breadcrumbs in the DOM
    breadcrumb.innerHTML = breadcrumbHTML;
});

// Function to capitalize the first letter of a category
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
        loadProductsByCategory(category);
    } else {
        document.getElementById('product-list').innerHTML = '<p>Please select a category.</p>';
    }

    // Add the rest of your logic here
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = event.target.getAttribute('data-id');
            if (productId) {
                addToCart(productId);
            }
        }
    });
});


// Check if product ID exists for other purposes


// Load shopping list from localStorage
function loadShoppingList() {
    const savedList = localStorage.getItem('shoppingList');
    const savedAmount = localStorage.getItem('totalAmount');
    shoppingList = savedList ? JSON.parse(savedList) : {};
    totalAmount = savedAmount ? parseFloat(savedAmount) : 0;
    updateShoppingListDisplay();
}

// Save shopping list to localStorage
function saveShoppingList() {
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));
}

// Update the shopping list display
// Update the shopping list display
function updateShoppingListDisplay() {
    const cartTotalElement = document.getElementById('cart-total');
    const shoppingListItems = document.getElementById('shopping-list-items');

    if (cartTotalElement) {
        cartTotalElement.textContent = totalAmount.toFixed(2);
    }

    if (shoppingListItems) {
        shoppingListItems.innerHTML = ''; // Clear existing list items

        for (const productId in shoppingList) {
            const { name, quantity, price } = shoppingList[productId];

            // Create table row for the product
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td><input type="number" min="1" value="${quantity}" data-id="${productId}" class="quantity-input"></td>
                <td>$${(quantity * price).toFixed(2)}</td>
                <td><button class="remove-from-cart" data-id="${productId}">❌</button></td>
            `;
            shoppingListItems.appendChild(row);
        }
    }
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-from-cart')) {
        const productId = event.target.getAttribute('data-id');

        if (productId && shoppingList[productId]) {
            // Deduct the total price for that product
            totalAmount -= shoppingList[productId].quantity * shoppingList[productId].price;

            // Remove the item from the shopping list
            delete shoppingList[productId];

            // Save updated shopping list
            saveShoppingList();
            updateShoppingListDisplay();
        }
    }
});


// Add product to shopping list
function addToCart(productId) {
    const product = products[productId];
    if (!product) {
        console.error(`Product with ID ${productId} not found.`);
        return;
    }

    if (!shoppingList[productId]) {
        shoppingList[productId] = { ...product, quantity: 1 };
    } else {
        shoppingList[productId].quantity++;
    }

    totalAmount += product.price;
    saveShoppingList();
    updateShoppingListDisplay();
}

// Handle quantity changes
document.addEventListener('input', (event) => {
    if (event.target.classList.contains('quantity-input')) {
        const productId = event.target.dataset.id;
        const newQuantity = parseInt(event.target.value, 10);

        if (newQuantity > 0 && shoppingList[productId]) {
            const product = shoppingList[productId];
            totalAmount += (newQuantity - product.quantity) * product.price;
            product.quantity = newQuantity;

            saveShoppingList();
            updateShoppingListDisplay();
        }
    }
});

// Add to cart button event listener
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-cart')) {
        const productElement = event.target.closest('.product');
        if (productElement) {
            const productLink = productElement.querySelector('a[href]');
            const productId = productLink
                ? new URLSearchParams(new URL(productLink.href).search).get('id')
                : null;

            if (productId) {
                addToCart(productId);
            }
        }
    }
});

// Load the shopping list on page load
loadShoppingList();

document.addEventListener('click', (event) => {
    if (event.target.id === 'checkout-button') {
        // Show the success alert
        alert('Your shopping list successfully submitted to the Payment Gateway, thanks!');

        // Clear the shopping list and total amount
        shoppingList = {};
        totalAmount = 0;

        // Save the empty shopping list to localStorage
        saveShoppingList();

        // Update the shopping list display
        updateShoppingListDisplay();
    }
});
 // Display product details if found
 if (products[productId]) {
     document.getElementById('product-name').textContent = products[productId].name;
     document.getElementById('product-description').textContent = products[productId].description;
     document.getElementById('product-price').textContent = products[productId].price;
     document.getElementById('product-image').src = products[productId].image;
 } else {
     document.querySelector('.product-container').innerHTML = '<p>Product not found.</p>';
 }

 
 document.addEventListener('click', (event) => {
    // Handle Add to Cart button
    if (event.target.classList.contains('add-to-cart')) {
        const productElement = event.target.closest('.product-info');

        if (productElement) {
            // Extract product data from the page
            const productId = event.target.getAttribute('data-id');
            const productName = document.getElementById('product-name').textContent;
            const productPriceText = document.getElementById('product-price').textContent;
            const productPrice = parseFloat(productPriceText.replace(/[^0-9.]/g, '')); // Extract numeric value

            if (productId) {
                // Add the product to the cart
                if (!shoppingList[productId]) {
                    shoppingList[productId] = { name: productName, price: productPrice, quantity: 1 };
                } else {
                    shoppingList[productId].quantity++;
                }

                // Update total amount
                totalAmount += productPrice;

                // Save and update the UI
                saveShoppingList();
                updateShoppingListDisplay();
            }
        }
    }
});

function loadProductsByCategory(category) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear the existing products

    for (const id in products) {
        if (products[id].category === category) {
            const product = products[id];
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <a href="product.html?id=${id}">
                    <img src="${product.image}" alt="${product.name}" class="product-thumbnail">
                    <p class="product-name">${product.name}</p>
                </a>
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart" data-id="${id}">Add to Cart <i class="fa-solid fa-cart-shopping"></i></button>
            `;
            productList.appendChild(productElement);
        }
    }
}


