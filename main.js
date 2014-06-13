var Init = function() {  //Initializes the game
  window.Game = new Object();
    Game.points = 0;
}

document.getElementById("click").onclick = function() {  //Makes the button increase point amount
  Game.points++;
  document.getElementById("count").innerHTML = Game.points; 
}

Init();
