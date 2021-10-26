$(document).ready(function() {

  // $(".menu").on("load", loadMenuItems);

  const loadMenuItems = function () {
    $.ajax('/menu', { method: 'GET' })
      .then(function (getMenuItems) {
console.log("Test",getMenuItems);
        //renderMenuItems(getMenuItems);
      });
  };

  // ********** functions **********

  const createMenuItem = function() {

    const $menuItem = $(`<article class="menu item"</article>`);

    let html = `
      <article class='menu item'>
        <img src=${menu_items.thumbnail_photo_url}>
        <h3>$${menu_items.price}</h3>
        <h3>${menu_items.description}</h3>
        <button type='submit'>Add To Cart</button>
      </article>
    `;

    let menuElement = $menuItem.append(html);

    return menuElement;

  };

  const renderMenuItems = function (items) {
    $('#menu-items-container').html('');
    for (let item of items) {
      const $menuItem = createMenuItem(item);
      $('#menu-items-container').append($menuItem);
    }
  };
});




