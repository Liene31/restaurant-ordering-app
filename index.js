import { menuArray } from "/data.js";

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
            <button class="menu-item-add-btn">+</button>
        </div>   
        `;
    })
    .join("");
}

function render() {
  document.getElementById("menu-section").innerHTML = getMenuItems();
}

render();
