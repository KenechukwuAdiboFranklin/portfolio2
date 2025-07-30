let authUser = false;
localStorage.setItem("authUser", authUser);

window.addEventListener("DOMContentLoaded", function() {
    localStorage.getItem("authUser");
    insertFadeStyle(); // Inject fade-in CSS
    getProducts();
});

const container = document.getElementById("productsContainer");
const filterButtons = document.querySelectorAll(".filter-btn");
let allProducts = [];

function getProducts() {
    fetch("https://dummyjson.com/products?limit=20")
        .then(res => res.json())
        .then(data => {
            allProducts = data.products;
            displayProducts(allProducts);
        })
        .catch(error => console.error("Error fetching products:", error));
}

function displayProducts(products) {
    container.innerHTML = "";

    products.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "product-card fade-in";
        card.style.animationDelay = `${index * 0.1}s`; // stagger the fade-in

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
        `;

        const addToCartBtn = card.querySelector(".add-to-cart-btn");
        addToCartBtn.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    title: product.title,
                    thumbnail: product.thumbnail,
                    price: product.price,
                    quantity: 1
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${product.title} added to cart!`);
        });

        container.appendChild(card);
    });
}

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        if (category === "all") {
            displayProducts(allProducts);
        } else {
            const filtered = allProducts.filter(p => p.category === category);
            displayProducts(filtered);
        }
    });
});

// Inject fade-in CSS into the page
function insertFadeStyle() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.4s ease forwards;
        }

        @keyframes fadeInUp {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}