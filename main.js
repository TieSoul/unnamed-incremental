var Init = function() {
  window.Game = new Object();
    Game.points = 0;
}

document.getElementById("click").onclick = function() {
  Game.points++;
  document.getElementById("count").innerHTML = Game.points;
}

Init();
