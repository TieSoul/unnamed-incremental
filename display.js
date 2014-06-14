function row_visibility(resource) {
    var showme = false;
    for (i in rows[resource]) {
        var offer = Game.show[rows[resource][i]];
        showme = showme || offer;
    }
    Game.show["display_"+resource] = showme;
}

function display() {
    if (activeTab == "main") {
        for (offer in prices) {
            if (Game[prices[offer].pay_what] >= prices[offer].pay &&
                (offer != "gutter" || Game.barrels >= 1)) // Disable gutters button unless there's at least one barrel.
            {
                enable_button(offer);
                Game.show[offer] = true;
            } else {
                if (Game.show[offer] ||
                    Game[prices[offer].pay_what] >= prices[offer].pay / 2) {
                    disable_button(offer);
                    Game.show[offer] = true;
                }
            }
        }

        for (resource in rows) {
            row_visibility(resource);
        }

        for (resource in names) {
            display_stat(resource);
        }
    }
}

function display_stat(resource) {
    if (Game.show["display_"+resource]) {
        document.getElementById("display_"+resource).setAttribute("class", "count");
    } else {
        document.getElementById("display_"+resource).setAttribute("class", "count hidden");
    }
    
    if (resource == 'rainwater') {
        document.getElementById("display_"+resource).innerHTML = 
            resource+": "+Beautify(Game[resource],1)+"/"+Beautify((Game.barrels*100),1);
    } else {
        document.getElementById("display_"+resource).innerHTML = 
            resource+": "+Beautify(Game[resource],1);
    }
}

function disable_button(id) {
    var element = document.getElementById("click_"+id)
    if (element.getAttribute("class") != "click disabled") {
        element.setAttribute("class", "click disabled");
    }
}

function enable_button(id) {
    var element = document.getElementById("click_"+id)
    if (element.getAttribute("class") != "click") {
        element.setAttribute("class", "click");
    }
}

function Beautify(what,floats) //will expand on this function later.
{
    return what;
}
