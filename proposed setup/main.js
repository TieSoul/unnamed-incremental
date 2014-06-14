DOM_INVENTORY = "inventory";

function Init() {  // Run each time we start up
    load();
    save_timer = setInterval(save, 30*1000); // autosave every 30 seconds
    onunload = save; // autosave when leaving the page (e.g. closing the tab, going to another page, or reloading)
    
    document.getElementById("click").onclick = click;
    document.getElementById("reset").onclick = reset;
    document.getElementById("cheat").onclick = cheat;

}
function newgame() { // Initialize a new game
    Game = new Object();
    Inventory = new Object();
    Inventory.item_1 = 0;
    Inventory.item_2 = 0;
    Inventory.item_3 = 0;
    Inventory.item_4 = 0;
    Game.points = 0;
    save();

    // inventory object
}



function save() {
    localStorage.Game = JSON.stringify(Game);
}
function load() {
    if ('Game' in localStorage) {
        Game = JSON.parse(localStorage.Game);
    } else {
        newgame();
    }
    display();
}

function display() {
    document.getElementById("count").innerHTML = Beautify(Game.points,1);
    displayInventory();
}

function Beautify(what,floats) //will expand on this function later.
{
    return what
}

function click() {  //Makes the button increase point amount
    Game.points++;
    randomEncounter();
    display();
}
function reset() {
    if (confirm("Are you sure you want to reset the game?")) {
        newgame();
        display();
    }
}

function randomEncounter() {
    var magic_num = Math.floor(Math.random()*100000);
    console.log(magic_num);
    if( magic_num < 70000 ) {
        Inventory.item_1 +=1;
    }else if( 70000 <= magic_num && magic_num < 90000){
        Inventory.item_2 +=1;
        console.log('d')
    }else if( 90000 <= magic_num && magic_num < 99900){
        Inventory.item_3 +=1;
    }else if( 99900 <= magic_num && magic_num <= 100000){
        Inventory.item_4 +=1;
    }
}

function displayInventory() { // Doest the Inventory part for the display() function, written only for discussion purposes as of now
    html = ''

    for(i in Inventory) {
        html += "<div class='inventory_slot'> \
        <strong>" + i + ":</strong> \
        <span style='float:right;'>" + Inventory[i] +"</span> \
        </div>"
    }
    document.getElementById(DOM_INVENTORY).innerHTML = html;     

}

function cheat(){
    console.log("23")
    var counter = 0;
    while (counter <1000){
        click();
        counter++
    }

}

newgame();
Init();
