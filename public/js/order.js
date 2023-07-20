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
    console.log('click', $(e.currentTarget).attr("data-id"));
  }
};

$(document).ready(function () {
  orderList.init();
  $(".view-order").on("click" , (e) => orderList.viewOrder(e));
});
