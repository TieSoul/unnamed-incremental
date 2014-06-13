function Init() {  // Run each time we start up
    load();
    
    save_timer = setInterval(save, 30*1000); // autosave every 30 seconds
    onunload = save; // autosave when leaving the page (e.g. closing the tab, going to another page, or reloading)
    
    document.getElementById("click").onclick = click;
    document.getElementById("reset").onclick = reset;
}

function save() {
    localStorage.Game = JSON.stringify(Game);
}
function load() { // Load new or existing game
    if ('Game' in localStorage) {
        Game = JSON.parse(localStorage.Game);
    } else {
        Game = new Object();
    }
    if ( !('points' in Game) )  {
        Game.points = 0;
    }
    
    Game.save_format_version = 1;
    save();
    display();
}

function display() {
    document.getElementById("count").innerHTML = Beautify(Game.points,1);     
}

function Beautify(what,floats) //will expand on this function later.
{
    return what
}

function click() {  //Makes the button increase point amount
    Game.points++;
    display();
}
function reset() {
    if (confirm("Are you sure you want to reset the game?")) {
        delete localStorage.Game;
        delete Game;
        load();
        display();
    }
}

Init();
