var myImage= document.getElementById("myPhoto");
var imageArray= ["images/tips5.jpg", "images/tips4.jpg", "images/tips7.jpg"];
var imageIndex=0;
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
    var total = 0;

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
        var item = document.getElementById(id);    
        var thecart = document.querySelectorAll("#cart ul")[0];

        var listitem = document.createElement("li");
        listitem.innerHTML = item.innerHTML;
        var price = item.getAttribute("data-price");

        var quantity = prompt("how many do yu want");
        price = price * Number(quantity);

        thecart.appendChild(listitem);
        total = total + Number(price);
         
        var spantotal = document.getElementById('total');
        spantotal.innerHTML = " N" + total ;        
             
        
        return false;
      }

      addEvent(cart, 'dragover', onDragOver);
      addEvent(cart, 'drop', onDrop);
   