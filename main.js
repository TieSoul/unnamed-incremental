function Init() {  // Run each time we start up
    // Bulk operations are less efficient in terms of input resources to output resources,
    // but more efficient in terms of resource processing per click.
    prices = {
        timber:        {pay:0,   get:1,   pay_what:'timber', get_what:'timber', always_show:true },
        lumber:        {pay:10,  get:1,   pay_what:'timber', get_what:'lumber', always_show:true },
        money:         {pay:1,   get:10,  pay_what:'lumber', get_what:'money',  always_show:true },
        
        buytimber:     {pay:2,   get:4,   pay_what:'money',  get_what:'timber', always_show:false},
        bulklumber:    {pay:100, get:9,   pay_what:'timber', get_what:'lumber', always_show:false},
        
        buybulktimber: {pay:100, get:180, pay_what:'money',  get_what:'timber', always_show:false},
        bulkmoney:     {pay:10,  get:90,  pay_what:'lumber', get_what:'money',  always_show:false},
    }
    names = {
        timber: 'raw timber',
        lumber: 'lumber',
        money: 'money',
    }
    
    for (var offer in prices) {
        var p = prices[offer];
        try {
            document.getElementById("click_"+offer).onclick = click(offer);
        } catch(e) {
            alert(offer);
        }
        document.getElementById("click_"+offer).setAttribute("title", "Get "+p.get+" "+names[p.get_what]+" for "+p.pay+" "+names[p.pay_what]+".");
    }
    document.getElementById("click_timber").setAttribute("title", "Gather "+prices.timber.get+" "+names.timber+".");
    
    document.getElementById("save").onclick = save;
    document.getElementById("export").onclick = export_save;
    document.getElementById("import").onclick = import_save;
    document.getElementById("reset").onclick = reset;
    
    load();
    save_timer = setInterval(save, 30*1000); // autosave every 30 seconds
    onunload = save; // autosave when leaving the page (e.g. closing the tab, going to another page, or reloading)
    
    display();
}

function save() {
    localStorage.Game = JSON.stringify(Game);
    document.getElementById("message").innerHTML = "Saved."
    setTimeout(function(){document.getElementById("message").innerHTML = ""}, 1000);
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
    
    if ( !('show' in Game) ) {
        Game.show = new Object();
    }
    
    if ('show_buytimber' in Game) {
        Game.show.buytimber = false;
        delete Game.show_buytimber
    }
    
    for (resource in names) {
        if ( !(resource in Game) ) {
            Game[resource] = 0;
        }
    }
    for (offer in prices) {
        if ( !(offer in Game.show) ) {
            Game.show[offer] = prices[offer].always_show;
        }
        if ( !(Game.show[offer]) ) {
            document.getElementById("click_"+offer).setAttribute("class", "click hidden");
        }
    }
    
    Game.save_format_version = 3;
    save();
    
    display();
}
function export_save() {
    prompt("Copy this code and keep it somewhere safe.", btoa(unescape(encodeURIComponent(JSON.stringify(Game)))));
}
function import_save() {
    try {
        Game = JSON.parse(decodeURIComponent(escape(atob(prompt("Paste your save code here.", "")))));
        save();
        display();
        alert("Import successful.")
    } catch(e) {
        alert("Import failed.");
    }
}

function display() {
    for (resource in names) {
        display_stat(resource);
    }
    
    for (offer in prices) {
        if (Game[prices[offer].pay_what] >= prices[offer].pay) {
            enable_button(offer);
            Game.show[offer] = true;
        } else {
            if (Game.show[offer] || Game[prices[offer].pay_what] >= prices[offer].pay/2) {
                disable_button(offer);
            }
        }
    }
}

function display_stat(resource) {
    document.getElementById("display_"+resource).innerHTML = resource+": "+Beautify(Game[resource],1);
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

function click(offer) {
    return function() {
        if (Game[prices[offer].pay_what] >= prices[offer].pay) {
            Game[prices[offer].pay_what] -= prices[offer].pay;
            Game[prices[offer].get_what] += prices[offer].get;
            display();
        }
    }
}

function reset() {
    if (confirm("Are you sure you want to reset the game?")) {
        delete localStorage.Game;
        delete Game;
        load();
    }
}

Init();
