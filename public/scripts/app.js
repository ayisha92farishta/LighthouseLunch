// Client facing scripts here
$(() => {
  const deleteItemFromCart = function(itemId) {
    console.log(itemId)
    return $.ajax({
      method: 'DELETE',
      url: `/cart/${itemId}`,
    })
  }
  $('.deleteItem').on('submit', function (event) {
    event.preventDefault();
    const id = $(this).attr("data-id");
    // console.log(this);
    // console.log(id);
    deleteItemFromCart(id)
    .then((response) => {
      //console.log(response);
      window.location.reload();
    })
    .catch((error) => {
      console.log(error)
      //console.log("hi");
    });
  });

  const addSameItem = function(itemId) {
    return $.ajax({
      method: 'POST',
      url: `/cart/${itemId}`,
    })
  }
  $('.addItem').on('submit', function(event) {
    event.preventDefault();
    const id = $(this).attr("data-id");
    //console.log(this);
    //console.log(id);
    addSameItem(id)
    .then(() => {
      window.location.reload();
    });
  });

});


