// Client facing scripts here
const deleteItemFromCart = function(item) {
  return $.ajax({
    method: 'DELETE',
    url: `./cart/${item}`,
  })
}
