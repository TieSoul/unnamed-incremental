var Init = function() {
  var Game = new Object();
    Game.points = 0;
}

document.getElementById("click").onclick = function() {
  points++;
  document.getElementById("count").innerHTML = points;
}

Init();
