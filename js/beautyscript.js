
var myImage= document.getElementById("myPhoto");
var imageArray= ["images/tips5.jpg", "images/tips4.jpg", "images/tips7.jpg"];
var imageIndex=0;
var thecart = document.querySelectorAll("#cart ul")[0];
var total = 0;

function changeImage(){
  myPhoto.setAttribute("src", imageArray[imageIndex]);
  imageIndex++;
  if(imageIndex>=imageArray.length){
    imageIndex=0;
  }
}

var intervalHandler=setInterval(changeImage,2000);
myPhoto.onclick=function(){
  clearInterval(intervalHandler);
}

function addEvent(element, event, delegate ) {
  if (typeof (window.event) != 'undefined' && element.attachEvent)
    element.attachEvent('on' + event, delegate);
  else 
    element.addEventListener(event, delegate, false);
}
    var items = document.querySelectorAll("#products td");
    var cart = document.querySelectorAll("#cart")[0];

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      item.setAttribute("draggable", "true");
      addEvent(item, 'dragstart', onDrag);
    };
    function onDrag(event) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      var target = event.target || event.srcElement;
      event.dataTransfer.setData("text", target.id);
    }

    function onDragOver(event) {
      if(event.preventDefault) event.preventDefault();
        if (event.stopPropagation)
          event.stopPropagation();
        else
          event.cancelBubble = true;
        return false;
    }

    function onDrop(event) {
      if(event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
        else event.cancelBubble = true;      

        var id = event.dataTransfer.getData("text");
        addToCart(id);
        
        return false;
      }

      addEvent(cart, 'dragover', onDragOver);
      addEvent(cart, 'drop', onDrop);

      var clearCart = document.getElementById("clear");
      addEvent(clearCart, 'click', onClear);

      function onClear(event) {
      	localStorage.names = '';
      	localStorage.prices = '';
      	localStorage.quantities = '';
        thecart.innerHTML = '';
        showTotal([],[]);
      }

      function addToCart(id) {

        var item = document.getElementById(id);    

        var _names = localStorage.names.toString().split(',');
        var _prices = localStorage.prices.toString().split(',');
        var _quantities = localStorage.quantities.toString().split(',');

        var quantity = 1;
        var price = item.getAttribute("data-price");

        var product_name = item.getAttribute("data-name");
        var product_index = _names.indexOf(product_name);

        if (product_index != -1) {
          _quantities[product_index] = Number(_quantities[product_index]) + 1;
          localStorage.quantities = _quantities;
        } else {
          localStorage.names += ',' + product_name;
          localStorage.prices +=  ',' + price;
          localStorage.quantities += ',' + quantity;
        }

        showCart();  
             
      }

      function showCart() {
        thecart.innerHTML = '';
        if (localStorage.names.length > 0) {
          var names = localStorage.names.toString().split(',');
          var prices = localStorage.prices.toString().split(',');
          var quantities = localStorage.quantities.toString().split(',');

          
          for (var i = 0; i < names.length; i++) {
            var listitem = document.createElement("li");
            listitem.innerHTML = names[i] + " " + prices[i] + " x" + quantities[i];
            thecart.appendChild(listitem);
          }
        }

        showTotal(prices, quantities);
      }

      function showTotal(prices, quantities) {

        total = 0;
        for (var i = 0; i < prices.length; i++) {
          total += prices[i] * quantities[i];
        }
        
        var spantotal = document.getElementById('total');
        spantotal.innerHTML = " N" + total ; 
      }
   
    showCart();