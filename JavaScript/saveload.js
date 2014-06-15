function save() {
    localStorage.Game = JSON.stringify(Game);
    document.getElementById("message").innerHTML = "Saved.";
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
        delete Game.show_buytimber;
    }

    if (!('activeDisplaySetting' in Game)) {
        Game.activeDisplaySetting = '1,23';
    }
    
    for (offer in prices) {
        if ( !(offer in Game.show) ) {
            Game.show[offer] = false;
        }
        if ( !(Game.show[offer]) ) {
            document.getElementById("click_"+offer).setAttribute("class", "click hidden");
        }
    }
    for (resource in names) {
        if ( !(resource in Game) ) {
            Game[resource] = 0;
        }
        
        // Always show rowless resources. The others will be overwritten by row_visibility.
        Game.show["display_"+resource] = true;
    }
    for (resource in rows) {
        row_visibility(resource);
    }
    
    Game.save_format_version = 5; // Version 5: Display settings
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
        load();
        alert("Import successful.")
    } catch(e) {
        alert("Import failed.");
    }
}

function reset() {
    if (confirm("Are you sure you want to reset the game?")) {
        delete localStorage.Game;
        delete Game;
        load();
    }
}

