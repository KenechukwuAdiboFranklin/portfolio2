let cartBody = document.querySelector("#cart-body");
let itemNo = document.querySelector("#items-no");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let totalItemQuantity = 0;

cart.length !== 0 ? cart.map((item, id) => {
    totalItemQuantity += item.quantity;
    itemNo.textContent = totalItemQuantity;

    const tr = document.createElement("tr");

    const itemInfo = document.createElement("td");
    itemInfo.innerHTML = `
        <img src="${item.thumbnail}" width="50">
        <span>${item.title}</span>
    `;

    const itemPrice = document.createElement("td");
    itemPrice.className = "price";
    itemPrice.textContent = `$${item.price}`;

    const totalQuantity = document.createElement("td");
    totalQuantity.className = "quantity";
    totalQuantity.textContent = (item.quantity * item.price).toFixed(2);

    const quantityData = document.createElement("td");
    const quantityText = document.createElement("span");
    quantityText.textContent = item.quantity;

    const increaseQuantity = document.createElement("button");
    increaseQuantity.className = "plus";
    increaseQuantity.textContent = "+";

    const decreaseQuantity = document.createElement("button");
    decreaseQuantity.className = "minus";
    decreaseQuantity.textContent = "-";

    increaseQuantity.addEventListener("click", function() {
        item.quantity++;
        totalItemQuantity++;
        itemNo.textContent = totalItemQuantity;
        quantityText.textContent = item.quantity;
        totalQuantity.textContent = (item.quantity * item.price).toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    });

    decreaseQuantity.addEventListener("click", function() {
        if (item.quantity > 1) {
            item.quantity--;
            totalItemQuantity--;
            itemNo.textContent = totalItemQuantity;
            quantityText.textContent = item.quantity;
            totalQuantity.textContent = (item.quantity * item.price).toFixed(2);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    });

    quantityData.appendChild(decreaseQuantity);
    quantityData.appendChild(quantityText);
    quantityData.appendChild(increaseQuantity);

    const removeData = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑️ Remove";
    removeBtn.className = "remove-btn";

    removeBtn.addEventListener("click", () => {
        totalItemQuantity -= item.quantity;
        itemNo.textContent = totalItemQuantity;

        cart.splice(id, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        tr.remove();
    });

    removeData.appendChild(removeBtn);

    tr.appendChild(itemInfo);
    tr.appendChild(itemPrice);
    tr.appendChild(quantityData);
    tr.appendChild(totalQuantity);
    tr.appendChild(removeData);

    cartBody.appendChild(tr);
}) : [];