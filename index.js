import { menuArray } from "/data.js";

const orderedItems = [];

document.getElementById("page-wrapper").addEventListener("click", handleClicks);

function handleClicks(e) {
  if (e.target.dataset.btn) {
    handleMenuAddBtn(e.target.dataset.btn);
  } else if (e.target.dataset.remove) {
    handleRemoveBtn(e.target.dataset.remove);
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
  getOrderTotal();
}

function handleRemoveBtn(id) {
  console.log(orderedItems);
  const selectedItemToRemove = orderedItems.find(function (item) {
    return item.id === Number(id);
  });

  const index = orderedItems.findIndex(function (item) {
    return item.id === Number(id);
  });

  console.log(index);

  console.log(selectedItemToRemove);
}

function renderOrderedItems() {
  const orderItemInner = document.getElementById("order-item-inner");

  orderItemInner.innerHTML = orderedItems
    .map((item) => {
      return `
      <div class="order-item">
          <p class="order-item-name">${item.name}</p>
          <button class="order-item-remove-btn" data-remove="${item.id}">remove</button>
          <p class="order-item-price">$${item.price}</p>
      </div>
      `;
    })
    .join("");
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
