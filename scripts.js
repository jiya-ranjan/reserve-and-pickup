document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-list');
    const searchBar = document.getElementById('search-bar');

    const products = [
        { id: 1, name: 'Apples', image: 'https://via.placeholder.com/150', description: 'Fresh apples', price: 3.99 },
        { id: 2, name: 'Bananas', image: 'https://via.placeholder.com/150', description: 'Ripe bananas', price: 1.99 },
        { id: 3, name: 'Carrots', image: 'https://via.placeholder.com/150', description: 'Crunchy carrots', price: 2.49 },
        // Add more products as needed
    ];

    // Display products
    function displayProducts(productArray) {
        productList.innerHTML = '';
        productArray.forEach(product => {
            const div = document.createElement('div');
            div.className = 'product-item';
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
                <button onclick="addToLiked(${product.id})">
                    <i class="fas fa-heart"></i> Like
                </button>
            `;
            productList.appendChild(div);
        });
    }

    displayProducts(products);

    // Handle add to cart
    window.addToCart = function(id, name, price) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === id);

        if (itemIndex > -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    // Update cart display
    function updateCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartList.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} (x${item.quantity}) - $${(item.quantity * item.price).toFixed(2)}
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>`;
            cartList.appendChild(li);
        });
    }

    // Handle remove from cart
    window.removeFromCart = function(id) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    // Search products
    window.searchProducts = function() {
        const query = searchBar.value.toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
        displayProducts(filteredProducts);
    }

    updateCart(); // Load cart on page load
});
