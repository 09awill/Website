function getRandomAnimal() {
   $.getJSON("animals.json", function(result){
    var animal = result[Math.floor(Math.random() * 223)];
    var div = document.getElementById('AnimalResponse');
    div.innerHTML +=(animal  + ' ');
  });
}