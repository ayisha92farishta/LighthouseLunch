
$(document).ready(function() {
  console.log("ready!");

  var sumPrice = 0;
  var tdPrice = document.getElementById('tablePrice').getElementsByTagName('td');

  for (var i = 0; i < tdPrice.length; i++) {

    if (tdPrice[i].className == "item-price") {
      sumPrice += isNaN(tdPrice[i].innerHTML) ? 0 : parseInt(tdPrice[i].innerHTML);
    }
  }
  document.getElementById('sumPrice').innerHTML = sumPrice;


});
