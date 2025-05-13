import { menuArray } from "/data.js";

document.getElementById("page-wrapper").addEventListener("click", handleClicks);

function handleClicks(e) {
  if (e.target.dataset.btn) {
    handleMenuAddBtn(e.target.dataset.btn);
  }
}

function handleMenuAddBtn(id) {
  const orderItemInner = document.getElementById("order-item-inner");
  //   let orderedItems = "";
  const menuItemObject = menuArray.filter(function (menuItem) {
    return menuItem.id === Number(id);
  })[0];

  console.log(menuItemObject);
  document.getElementById("order-section").style.display = "block";
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

// orderedItems += `
// <div class="order-item">
//     <p class="order-item-name">${menuItemObject.name}</p>
//     <button class="order-item-remove-btn">remove</button>
//     <p class="order-item-price">$${menuItemObject.price}</p>
//   </div>
// `;
