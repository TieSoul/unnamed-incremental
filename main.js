function Init() {  // Run each time we start up
    prices = new Object();
    
    prices.timber = {pay:0, get:1};
    document.getElementById("click_timber").onclick = click_timber;
    document.getElementById("click_timber").setAttribute("title", "Gather "+prices.timber.get+" raw timber.");
    
    prices.lumber = {pay:10, get:1};
    document.getElementById("click_lumber").onclick = click_lumber;
    document.getElementById("click_lumber").setAttribute("title", "Process "+prices.lumber.pay+" raw timber into "+prices.lumber.get+" lumber.");
    
    prices.money = {pay:1, get:10};
    document.getElementById("click_money").onclick = click_money;
    document.getElementById("click_money").setAttribute("title", "Sell "+prices.money.pay+" lumber for "+prices.money.get+" money.");
    
    prices.buytimber = {pay:2, get:4};
    document.getElementById("click_buytimber").onclick = click_buytimber;
    document.getElementById("click_buytimber").setAttribute("title", "Pay "+prices.buytimber.pay+" money for "+prices.buytimber.get+" raw timber.");
    
    document.getElementById("reset").onclick = reset;
    
    
    load();
    
    save_timer = setInterval(save, 30*1000); // autosave every 30 seconds
    onunload = save; // autosave when leaving the page (e.g. closing the tab, going to another page, or reloading)
    
    
    display();
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
    
    if (Game.save_format_version==1) { // For version 2, change "points" to "timber".
        Game.timber = Game.points;
    }
    if ('points' in Game) { // And clear out the old "points" stat.
        delete Game.points;
    }
    if ( !('timber' in Game) ) {
        Game.timber = 0;
    }
    
    if ( !('lumber' in Game) ) {
        Game.lumber = 0;
    }
    
    if ( !('money' in Game) ) {
        Game.money = 0;
    }
    
    if ( !('show_buytimber' in Game) ) {
        Game.show_buytimber = false;
    }
    
    Game.save_format_version = 2;
    save();
    
    document.getElementById("click_buytimber").setAttribute("class", "click hidden");
    
    display();
}

function display() {
    display_stat('timber');
    display_stat('lumber');
    display_stat('money');
    
    if (Game.timber >= prices.lumber.pay) {
        enable_button('lumber');
    } else {
        disable_button('lumber');
    }
    
    if (Game.lumber >= prices.money.pay) {
        enable_button('money');
    } else {
        disable_button('money');
    }
    
    if (Game.money >= prices.buytimber.pay) {
        enable_button('buytimber');
        Game.show_buytimber = true;
    } else {
        if (Game.show_buytimber) {
            disable_button('buytimber');
        }
    }
}

function display_stat(key) {
    document.getElementById("display_"+key).innerHTML = key+": "+Beautify(Game[key],1);
}

function disable_button(id) {
    element = document.getElementById("click_"+id)
    if (element.getAttribute("class") != "click disabled") {
        element.setAttribute("class", "click disabled");
    }
}
function enable_button(id) {
    element = document.getElementById("click_"+id)
    if (element.getAttribute("class") != "click") {
        element.setAttribute("class", "click");
    }
}

function Beautify(what,floats) //will expand on this function later.
{
    return what
}

function click_timber() {  // Harvest raw timber
    Game.timber++;
    display();
}
function click_lumber() { // Process raw timber into lumber
    if (Game.timber >= prices.lumber.pay) {
        Game.timber -= prices.lumber.pay;
        Game.lumber += prices.lumber.get;
        display();
    }
}
function click_money() { // Sell lumber for money
    if (Game.lumber >= prices.money.pay) {
        Game.lumber -= prices.money.pay;
        Game.money  += prices.money.get;
        display();
    }
}
function click_buytimber() { // Pay money for raw timber
    if (Game.money  >= prices.buytimber.pay) {
        Game.money  -= prices.buytimber.pay;
        Game.timber += prices.buytimber.get;
        display();
    }
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
