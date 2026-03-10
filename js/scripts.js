/*!
* Start Bootstrap - Shop Homepage v5.0.6 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/

// Fetch products from FakeStore API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Store products globally for modal access
let allProducts = [];

// Display products in the container
function displayProducts(products) {
    allProducts = products; // Store for later access
    const container = document.getElementById('productsContainer');
    container.innerHTML = ''; // Clear existing content

    let tableHtml = `
        <table class="table table-striped table-hover">
            <thead class="table-dark">
                <tr>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    products.forEach(product => {
        tableHtml += `
            <tr class="product-row" data-product-id="${product.id}" style="cursor: pointer;">
                <td><img src="${product.image}" alt="${product.title}" style="height: 60px; object-fit: contain;" /></td>
                <td>${product.title}</td>
                <td>${product.category}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <span class="text-warning">${'⭐'.repeat(Math.round(product.rating.rate))}</span>
                    <small>(${product.rating.count} reviews)</small>
                </td>
                <td><a class="btn btn-sm btn-outline-dark" href="#" onclick="event.stopPropagation();">Add to cart</a></td>
            </tr>
        `;
    });

    tableHtml += `
            </tbody>
        </table>
    `;

    container.innerHTML = tableHtml;

    // Add click event listeners to product rows
    document.querySelectorAll('.product-row').forEach(row => {
        row.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const product = allProducts.find(p => p.id == productId);
            if (product) {
                showProductModal(product);
            }
        });
    });
}

// Show product details in modal
function showProductModal(product) {
    document.getElementById('modalTitle').textContent = 'Product Details';
    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalProductName').textContent = product.title;
    document.getElementById('modalCategory').textContent = product.category;
    document.getElementById('modalPrice').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modalRating').textContent = '⭐'.repeat(Math.round(product.rating.rate));
    document.getElementById('modalReviewCount').textContent = product.rating.count;
    document.getElementById('modalDescription').textContent = product.description;

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', fetchProducts);