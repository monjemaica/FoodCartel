const cartItemsData = {
  init: () => {
    const path = window.location.pathname;
    const navbar = $("#navbar");

    if ($.cookie("COOKI3-AUTH")) {
      if (path === "/cart" || path === "/checkout" || path === '/orders') {
        console.log("test");
        navbar.addClass(" nav--black");
      }
    }

    const paymethod_btn = $(".outline_btn");

    paymethod_btn.on("click", function () {
      paymethod_btn.removeClass("selected");
      $(this).addClass("selected");
    });

    displayCartItems();
    updateCartTotal();
    cartItemsData.validDate();
  },
  addToCart: (e) => {
    const data = {
      id: $(e.currentTarget).attr("data-id"),
      name: $(e.currentTarget).attr("data-name"),
      price: parseInt($(e.currentTarget).attr("data-price")),
      img: $(e.currentTarget).attr("data-img"),
      qty: 1,
    };

    const cart_data = localStorage.getItem("cart");
    if (cart_data) {
      let cartItems = JSON.parse(cart_data);

      let existItem = cartItems.find((item) => item.id === data.id);

      if (existItem) {
        existItem.qty++;
        existItem.price += existItem.price;
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
  },
  clearCartData: () => {
    localStorage.setItem("cart", []);
    $("#cart-total").text("");
    $("#subtotal").text("");
    cartItemsData.init();
  },
  validDate: () => {
    var maxDate = year + "-" + month + "-" + day;
    $("#txtDate").attr("min", maxDate);

    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    var maxDate = year + "-" + month + "-" + day;

    $("#date").attr("min", maxDate);
  },
  placeOrder: (e) => {
    e.preventDefault();
    const user_id = $(`#user-id`).val();
    const table_number = $(`#tables`).val();
    const date = $(`#date`).val();
    const time = $(`#time`).val();
    const note = $(`#note`).val();
    const items = cartItemsData.getCartData();
    
    const total_amount = items.reduce( (a, { price }) => a + price, 0);
    const total_qty = items.reduce((a, c) => a + c.qty, 0);

    const reservation = {
      user_id,
      table_number,
      date,
      time,
      note,
    }
  
    const orders = {
      user_id,
      items,
      total_amount,
      total_qty,
      status: "Pending",
    };

    $.ajax({
      type: "POST",
      url: "/orders",
      data: orders,
      success: function (response, textStatus, xhr) {
        setTimeout(() => {
          console.log(response);
        }, 1000);
      }
    });
    
    console.log(reservation);
    console.log(orders);
    cartItemsData.clearCartData();
    $("#payment-form")[0].reset();
  },
};

const getCookie = () => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; COOKI3-AUTH=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
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
      <button onclick="remove('${food.id}')" class="minus-btn"><i class="fa fa-trash-o" style="color:red;" aria-hidden="true"></i></button>
    </div>
  </li>`;

    cartItems_ul.append(itemHtml);
  });
}

function updateCartTotal() {
  const cartItems = cartItemsData.getCartData();

  const totalItems = cartItems.reduce((a, c) => a + c.qty, 0);
  const subtotal = cartItems.reduce((a, { price }) => a + price, 0);
  console.log(subtotal);
  if (totalItems === 0) return null;
  if (subtotal === 0) return null;

  $("#cart-total").text(totalItems);
  $("#subtotal").text("₱" + subtotal.toFixed(2));
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
    existItem.price += existItem.price;
  } else {
    cartItems.push(data);
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  cartItemsData.init();
}

function decrease(id, name, qty, img, price) {
  const data = {
    id: id,
    name: name,
    qty: qty,
    price: price,
    img: img,
  };

  if (data.qty === "1") {
    remove(data.id);
  } else {
    let cartItems = cartItemsData.getCartData();

    let existItem = cartItems.find((item) => item.id === id);

    if (existItem) {
      existItem.qty--;
      existItem.price -= existItem.price;
    } else {
      cartItems.push(data);
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    // cartItemsData.init();
    displayCartItems();
    updateCartTotal();
  }
}

function remove(id) {
  const cartItems = cartItemsData.getCartData();

  let newItems = cartItems.filter((item) => item.id !== id);

  localStorage.setItem("cart", JSON.stringify(newItems));
  $("#subtotal").text("");
  cartItemsData.init();
}

function payCredit() {
  console.log("credit");
}

function payPal() {
  console.log("paypal");
}

$(document).ready(function () {
  cartItemsData.init();
  $(".add-cart").on("click", (e) => cartItemsData.addToCart(e));
  $("#payment-form").on("submit", (e) => cartItemsData.placeOrder(e));
});
