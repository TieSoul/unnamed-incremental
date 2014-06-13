var Init = function() {
  var Game = new Object();
    Game.points = 0;
}

var click = function() {
  points++;
  document.getElementById("count").innerHTML = points;
}

Init();
