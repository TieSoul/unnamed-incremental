var Init = function() {  //Initializes the game
  window.Game = new Object();
    Game.points = 0;
}

var Beautify = function(num, floats) {
  var isFloating = (num == floor(num));
  numstring = num + "";
  if (isFloating) {
    var afterFloat = numstring.substring(numstring.indexOf("."));
    if (Boolean(afterFloat.substring(0,floats).match(/[1-9]/))) {
      num = floor(num) + "";
    }
    else num = numstring.substring(0,numstring.indexOf(".")-1) + afterFloat.substring(0,floats);
    try {var beforeFloat = num.substring(0,numstring.indexOf(".")-1);} catch SyntaxError {var beforeFloat;}
  }
}

document.getElementById("click").onclick = function() {  //Makes the button increase point amount
  Game.points++;
  document.getElementById("count").innerHTML = Game.points; 
}
document.getElementById("count").innerHTML = Beautify(1.0000001,5);
Init();
