import { menuArray } from "/data.js";

let orderedItems = [];
const innerModal = document.getElementById("inner-modal");
const orderSection = document.getElementById("order-section");
const orderConfirmation = document.getElementById("order-confirmation");

document.getElementById("page-wrapper").addEventListener("click", handleClicks);

function handleClicks(e) {
  if (e.target.dataset.btn) {
    handleMenuAddBtn(Number(e.target.dataset.btn));
  } else if (e.target.dataset.index) {
    handleRemoveBtn(Number(e.target.dataset.index));
  } else if (e.target.id === "order-complete-btn") {
    handleOrderCompleteBtn();
  } else if (e.target.id === "payment-form-btn") {
    e.preventDefault();
    handlePaymentBtn();
  }
}

// Handles the item add button

function handleMenuAddBtn(id) {
  orderConfirmation.innerHTML = "";
  const menuItem = menuArray.filter((item) => {
    return item.id === id;
  })[0];

  orderedItems.push(menuItem);

  renderOrderedItems();
  getOrderTotal();
}

function handleRemoveBtn(index) {
  orderedItems.splice(index, 1);

  renderOrderedItems();
  getOrderTotal();
}

function handleOrderCompleteBtn() {
  innerModal.style.display = "block";
}

function handlePaymentBtn() {
  const nameInput = document.getElementById("name-input");

  innerModal.style.display = "none";
  renderOrderConfirmationMsg(nameInput.value);
  nameInput.value = "";
  document.getElementById("input-card-number").value = "";
  document.getElementById("input-cvv-number").value = "";
  orderSection.style.display = "none";
}

function renderOrderConfirmationMsg(name) {
  orderConfirmation.innerHTML = `
    <div class="order-confirmation-inner" id="order-confirmation-inner">
      <p>Thanks, ${name}! Your order is on its way!</p>
    </div>
  `;
  orderedItems = [];
}

// Render section of ordered items

function renderOrderedItems() {
  const orderItemInner = document.getElementById("order-item-inner");

  if (orderedItems.length) {
    orderItemInner.innerHTML = orderedItems
      .map((item, index) => {
        return `
      <div class="order-item">
          <p class="order-item-name">${item.name}</p>
          <button class="order-item-remove-btn" data-index="${index}">remove</button>
          <p class="order-item-price">$${item.price}</p>
      </div>
      `;
      })
      .join("");

    orderSection.style.display = "block";
  } else {
    orderItemInner.innerHTML = "";
    orderSection.style.display = "none";
  }
}

function getOrderTotal() {
  const orderTotal = document.getElementById("order-total");

  const totalOfOrder = orderedItems.reduce((accumulator, item) => {
    return accumulator + item.price;
  }, 0);

  orderTotal.innerHTML = `$${totalOfOrder}`;
}

// Get Items from Array and Render in HTML

function getMenuItems() {
  return menuArray
    .map((item) => {
      return `
        <div class="menu-item">
            <img
              class="menu-item-img"
              src="${item.image}"
              alt="image of ${item.name}"
            />
            <div class="menu-item-details">
              <h3 class="menu-item-title">${item.name}</h3>
              <p class="menu-item-ingredients">
                ${item.ingredients}
              </p>
              <p class="menu-item-price">$${item.price}</p>
            </div>
            <button class="menu-item-add-btn" data-btn="${item.id}">+</button>
        </div>   
        `;
    })
    .join("");
}

function renderMenuItems() {
  document.getElementById("menu-section").innerHTML = getMenuItems();
}

renderMenuItems();
