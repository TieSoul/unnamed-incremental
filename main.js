function Init() {  //Initializes the game
    Game = new Object();
    Game.points = 0;
    load();
    save_timer = setInterval(save, 30*1000); // autosave every 30 seconds
    onunload = save; // autosave when leaving the page (e.g. closing the tab, going to another page, or reloading)
}

function save() {
    localStorage.Game = JSON.stringify(Game);
}
function load() {
    if ('Game' in localStorage) {
        Game = JSON.parse(localStorage.Game);
    }
    display();
}

function display() {
    document.getElementById("count").innerHTML = Beautify(Game.points,1);     
}

function Beautify(what,floats) //will expand on this function later.
{
    return what
}
document.getElementById("click").onclick = function() {  //Makes the button increase point amount
    Game.points++;
    display();
}
Init();
