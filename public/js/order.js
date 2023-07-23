const orderList = {
  init: () => {
    let orderTable = $("#order-datatable");
    // orderTable.DataTable();

    orderTable.dataTable({
      bLengthChange: false,
      bFilter: true,
      bAutoWidth: false,

      pageLength: 10,
      scrollCollapse: true,
      scrollY: "48vh",
    });
  },
  viewOrder: (e) => {
    const user_id = $(e.currentTarget).attr("data-id");
    const date = $(e.currentTarget).attr("data-date");
    $.ajax({
      type: "GET",
      url: `/order/${user_id}`,
      success: function (response, textStatus, xhr) {
        setTimeout(() => {
          const order = response;
          console.log(order);
          // $("#order_id").text(`Order ${order._id}`);
          // $("#order_date").text(`Placed on ${date}`);
          // $("#total_amont").text("₱" +order.total_amount.toFixed(2));
          // $("#order_items").text('Items:');
          // $("#total").text('Total Amount: ');
          const cartItems_ul = $("#orderitems-group");
          const order_div = $("#order_info");
          const total_div = $("#total_details");

          order_div.empty();
          cartItems_ul.empty();
          total_div.empty();

          order_div.append(
            ` <p id="order_id">Order ${order._id}</p> 
            <p id="order_date">Placed on ${date}</p>
            <hr style="margin: 15px 0" />`
          );

          order.items.forEach((order) => {
            const itemHtml = ` <li key="${order.id}" class="cartitems-list">
            <img src="../${order.img}" alt="" />
            <div class="cart-item-details">
              <span class="item-name">${order.name}</span>
              <p id="totalPrice">Price: ₱${order.price}</p>
            </div>
            <div class="cart-item-action">
              <span class="item-price">Qty: ${order.qty}</span>
            </div>
          </li>`;

            cartItems_ul.append(itemHtml);
          });

          total_div.append(`<hr style="margin: 15px 0" />
          <div class="justifycontent">
          <p>Total Items: </p>
          <p id="total_items">${order.total_qty}</p>
        </div>
        <div class="justifycontent">
          <p>Total Amount: </p>
          <p id="total_amont">₱${order.total_amount.toFixed(2)}</p>
        </div>
        `);
        }, 1000);
      },
    });
  },
};

$(document).ready(function () {
  orderList.init();
  $(".view-order").on("click", (e) => orderList.viewOrder(e));
});
