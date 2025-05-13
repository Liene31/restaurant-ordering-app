import { menuArray } from "/data.js";

const priceArray = [];
const orderedItems = [];

document.getElementById("page-wrapper").addEventListener("click", handleClicks);

function handleClicks(e) {
  if (e.target.dataset.btn) {
    handleMenuAddBtn(e.target.dataset.btn);
  }
}

// Handles the item add button

function handleMenuAddBtn(id) {
  const orderSection = document.getElementById("order-section");

  const menuItem = menuArray.filter((item) => {
    return item.id === Number(id);
  })[0];

  orderSection.style.display = "block";
  orderedItems.push(menuItem);

  renderOrderedItems();
  getOrderTotal(menuItem.price);
}

function renderOrderedItems() {
  const orderItemInner = document.getElementById("order-item-inner");

  orderItemInner.innerHTML = orderedItems
    .map(function (item) {
      return `
      <div class="order-item">
          <p class="order-item-name">${item.name}</p>
          <button class="order-item-remove-btn">remove</button>
          <p class="order-item-price">$${item.price}</p>
      </div>
      `;
    })
    .join("");
}

function getOrderTotal(price) {
  const orderTotal = document.getElementById("order-total");
  priceArray.push(price);
  const totalOfOrder = priceArray.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  });

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
