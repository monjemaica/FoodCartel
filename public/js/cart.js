$(document).ready(function () {
  const path = window.location.pathname;
  const navbar = $("#navbar");

  if (path === "/cart") {
    navbar.addClass(" nav--black");
  }

  getCartItems();
  updateCartTotal();

  // CLICK EVENTS

  $(".add-cart").on("click", function (event) {
    const data = {
      id: this.id,
      name: $(this).find("#food-name").text(),
      price: $(this).find("#food-price").text().substring(1),
      img: $(this).find("#food-img").attr("src"),
      qty: 1,
    };

    console.log(data);
    const cart_data = localStorage.getItem("cart");
    if (cart_data) {
      let cartItems = JSON.parse(cart_data);

      let existItem = cartItems.find((item) => item.id === data.id);

      if (existItem) {
        existItem.qty++;
      } else {
        cartItems.push(data);
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      let newCart = [data];

      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    
    getCartItems();
    updateCartTotal();
  });

  function updateCartTotal() {
    let cart = localStorage.getItem("cart");
    let cartItems = cart ? JSON.parse(cart) : [];

    const totalItems = cartItems.reduce((a, c) => a + c.qty, 0);

    if (totalItems === 0) return null;

    $("#cart-total").text(totalItems);
  }

  function getCartItems() {
    let cart = localStorage.getItem("cart");
    let cartItems = cart ? JSON.parse(cart) : [];

    const cartItems_ul = $("#cartitems-group");
    cartItems_ul.empty();

    cartItems.forEach((food) => {
      const itemHtml = `<li key="${food.id}" class="cartitems-list">
      <img src="${food.img}" alt="" />
      <div class="cart-item-details">
        <span class="item-name">${food.name}</span>
        <p>Price: ₱${food.price}</p>
      </div>
      <div class="cart-item-action">
        <button class="plus-btn">-</button>
        <span class="item-price">${food.qty}</span>
        <button class="minus-btn">+</button>
      </div>
    </li>`;

      cartItems_ul.append(itemHtml);
    });
  }
});
