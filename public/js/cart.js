$(document).ready(function () {
  const path = window.location.pathname;
  const navbar = $('#navbar');

  if(path === "/cart"){
    navbar.addClass(' nav--black');
  }
  
  
  updateCartTotal();


// CLICK EVENTS

  $(".add-cart").on("click", function (event) {
    const data = {
      id: this.id,
      name: $(this).find("#food-name").text(),
      price: $(this).find("#food-price").text(),
      img: $(this).find("#food-img").attr("src"),
      qty: 1,
    };

    console.log(data);
    const cart_data = localStorage.getItem("cart");
    if (cart_data) {
      var cartItems = JSON.parse(cart_data);

      var existItem = cartItems.find((item) => item.id === data.id);

      if (existItem) {
        existItem.qty++;
      } else {
        cartItems.push(data);
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      var newCart = [data];

      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    updateCartTotal();
});





  function updateCartTotal() {
    var cart = localStorage.getItem('cart');
    var cartItems = cart ? JSON.parse(cart) : [];
    
    const totalItems = cartItems.reduce((a, c)=> a + c.qty, 0)

    if(totalItems === 0) return null;

    $('#cart-total').text(totalItems);
  }
});
