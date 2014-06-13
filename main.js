function Init() {  //Initializes the game
    window.Game = new Object();
    Game.points = 0;
}

function Beautify(what,floats) //will expand on this function later.
{
    return what
}
document.getElementById("click").onclick = function() {  //Makes the button increase point amount
    Game.points++;
    document.getElementById("count").innerHTML = Beautify(Game.points,1); 
}

Init();
