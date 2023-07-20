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
};

$(document).ready(function () {
  orderList.init();
});
