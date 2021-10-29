// Client facing scripts here

$(() => {
  const removeItemFromCart = function (itemId) {
    console.log(itemId);
    return $.ajax({
      method: "DELETE",
      url: `/cart/${itemId}`,
    });
  };
  $(".deleteItem").on("submit", function (event) {
    event.preventDefault();
    const id = $(this).attr("data-id");
    // console.log(this);
    // console.log(id);
    removeItemFromCart(id)
      .then((response) => {
        //console.log(response);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        //console.log("hi");
      });
  });

  const addSameItem = function (itemId) {
    return $.ajax({
      method: "POST",
      url: `/cart/${itemId}`,
    });
  };
  $(".addItem").on("submit", function (event) {
    event.preventDefault();
    const id = $(this).attr("data-id");
    //console.log(this);
    //console.log(id);
    addSameItem(id).then(() => {
      window.location.reload();
    });
  });

  const deleteSameItem = function (itemId) {
    return $.ajax({
      method: "PATCH",
      url: `/cart/${itemId}`,
    });
  };
  $(".dleteoneItem").on("submit", function (event) {
    event.preventDefault();
    const id = $(this).attr("data_id");
    // const form = $(`[data-id=${id}]`).children();
    // console.log('form', form);
    //console.log(id);
    deleteSameItem(id).then(() => {
      window.location.reload();
    });
  });
});
