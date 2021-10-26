// Client facing scripts here
$(() => {
  const deleteItemFromCart = function(itemId) {
    return $.ajax({
      method: 'POST',
      url: `/cart/${itemId}`,
    })
  }
  $('.deleteItem').on('submit', function (event) {
    event.preventDefault();
    const id = $(this).attr("data-id");
    console.log(this);
    console.log(id);
    deleteItemFromCart(id)
    .then(() => {
      window.location.reload();
    })
  } )
})


