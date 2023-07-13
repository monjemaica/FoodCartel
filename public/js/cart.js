const cartItemsData = {
  init: () => {
    const path = window.location.pathname;
    const navbar = $("#navbar");

    if (path === "/cart") {
      navbar.addClass(" nav--black");
    }

    displayCartItems();
    updateCartTotal();
  },
  addToCart: (e) => {
    const data = {
      id: $(e.currentTarget).attr("data-id"),
      name: $(e.currentTarget).attr("data-name"),
      price: parseInt($(e.currentTarget).attr("data-price")),
      img: $(e.currentTarget).attr("data-img"),
      qty: 1,
    };

    console.log(data);
    const cart_data = localStorage.getItem("cart");
    if (cart_data) {
      let cartItems = JSON.parse(cart_data);

      let existItem = cartItems.find((item) => item.id === data.id);

      if (existItem) {
        existItem.qty++;
        existItem.price = existItem.price + existItem.price;
      } else {
        cartItems.push(data);
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      let newCart = [data];

      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    displayCartItems();
    updateCartTotal();
  },
  getCartData: () => {
    let cart = localStorage.getItem("cart");
    let cartItems = cart ? JSON.parse(cart) : [];
  
    return cartItems;
  }

};


function displayCartItems() {
  const cartItems = cartItemsData.getCartData();

  const cartItems_ul = $("#cartitems-group");
  cartItems_ul.empty();

  cartItems.forEach((food) => {
    const itemHtml = `<li key="${food.id}" class="cartitems-list">
    <img src="${food.img}" alt="" />
    <div class="cart-item-details">
      <span class="item-name">${food.name}</span>
      <p id="totalPrice">Price: ₱${food.price}</p>
    </div>
    <div class="cart-item-action">
      <button onclick="decrease('${food.id}', '${food.name}', '${food.qty}', '${food.img}', '${food.price}')"  class="plus-btn" >-</button>
      <span class="item-price">${food.qty}</span>
      <button onclick="increase('${food.id}', '${food.name}', '${food.qty}', '${food.img}', '${food.price}')" class="minus-btn">+</button>
    </div>
  </li>`;

    cartItems_ul.append(itemHtml);
  });
}

function updateCartTotal() {
  const cartItems = cartItemsData.getCartData();

  const totalItems = cartItems.reduce((a, c) => a + c.qty, 0);
  const subtotal = cartItems.reduce((a, {price, qty}) => a + price * qty, 0);

  if (totalItems === 0) return null;
  if (subtotal === 0) return null;

  $("#cart-total").text(totalItems);
  $("#subtotal").text(subtotal);
}

function increase(id, name, qty, img, price) {
  const data = {
    id: id,
    name: name,
    qty: qty,
    price: price,
    img: img,
  };

  let cart = localStorage.getItem("cart");
  let cartItems = cart ? JSON.parse(cart) : [];

  let existItem = cartItems.find((item) => item.id === id);

  if (existItem) {
    existItem.qty++;
  } else {
    cartItems.push(data);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  cartItemsData.init()
}

function decrease(id, name, qty, img, price) {
  const data = {
    id: id,
    name: name,
    qty: qty,
    price: price,
    img: img,
  };

  let cart = localStorage.getItem("cart");
  let cartItems = cart ? JSON.parse(cart) : [];

  let existItem = cartItems.find((item) => item.id === id);

  if (existItem) {
    existItem.qty--;
  } else {
    cartItems.push(data);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  cartItemsData.init()
}

$(document).ready(function () {
  cartItemsData.init();
  $(".add-cart").on("click", (e) => cartItemsData.addToCart(e));
});
