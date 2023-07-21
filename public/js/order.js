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
      scrollY: '48vh'
    });
  },
  viewOrder: (e) => {
    const user_id = $(e.currentTarget).attr("data-id");
    const items = $(e.currentTarget).attr("data-items");

    items.forEach(or => {
      console.log(or);

    })

    
  }
};

$(document).ready(function () {
  orderList.init();
  $(".view-order").on("click" , (e) => orderList.viewOrder(e));
});
