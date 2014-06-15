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
            if (offer == 'timber' && Game.show[rows['timber'][2]] &&
                Game.show[rows['lumber'][1]] &&
                Game.show[rows['money' ][1]]  ) {
                document.getElementById('cell_timber').setAttribute("class", "click nodisplay"); //Don't display Harvest Timber if all bulk buttons are visible.
                                                                                                 //This is for aesthetic purposes.
            } else {
                if (Game[prices[offer].pay_what] >= prices[offer].pay &&
                    (offer != "gutter" || Game.barrels >= 1)) // Disable gutters button unless there's at least one barrel.

                {
                    enable_button(offer);
                    Game.show[offer] = true;
                } else {
                    if ((Game.show[offer] ||
                        Game[prices[offer].pay_what] >= prices[offer].pay / 2)) {
                        disable_button(offer);
                        Game.show[offer] = true;
                    }
                }
            }
        }

        for (resource in rows) {
            row_visibility(resource);
        }

        for (resource in names) {
            display_stat(resource);
        }
    } else if (activeTab == 'buildings') {
        document.getElementById("timber-buildings").innerHTML = "Timber: " + Beautify(Game.timber);
        document.getElementById("lumber-buildings").innerHTML = "Lumber: " + Beautify(Game.lumber);
        document.getElementById("money-buildings" ).innerHTML = "Money: "  + Beautify(Game.money );
        for (var building in buildings) {
            var b = buildings[building];
            var coststring = "";
            var prodstring = "";
            for (var cost in b.current_pay) {
                if (cost < b.current_pay.length - 1 && cost > 0) {
                    coststring += Beautify(b.current_pay[cost], true) + " " + b.pay_what[cost] + ", ";
                } else if (cost == 0 && b.current_pay.length == 1) {
                    coststring += Beautify(b.current_pay[cost], true) + " " + b.pay_what[cost] + " ";
                } else {
                    coststring += "and " + b.current_pay[cost] + " " + b.pay_what[cost] + " ";
                }
            }
            for (var prod in b.produce) {
                if (prod < b.produce.length - 1 && prod > 0) {
                    prodstring += Beautify(b.produce[prod], true) + " " + b.produce_what[prod] + ", ";
                } else if (prod == 0 && b.produce.length == 1) {
                    prodstring += Beautify(b.produce[prod], true) + " " + b.produce_what[prod] + " ";
                } else {
                    prodstring += "and " + Beautify(b.produce[prod], true) + " " + b.produce_what[prod] + " ";
                }
            }
            set_title("building-"+building, "Needs a " + b.require + ", costs "+ coststring + "and produces " + prodstring + "per second.");
        }

        for (var property in properties) {
            b = properties[property];
            var coststring = "";
            for (var cost in b.current_pay) {
                if (cost < b.current_pay.length - 1 && cost > 0) {
                    coststring += Beautify(b.current_pay[cost], true) + " " + b.pay_what[cost] + ", ";
                } else if (cost == 0 && b.current_pay.length == 1) {
                    coststring += Beautify(b.current_pay[cost], true) + " " + b.pay_what[cost];
                } else {
                    coststring += "and " + Beautify(b.current_pay[cost], true) + " " + b.pay_what[cost];
                }
            }
            set_title("property-"+property, "Costs "+ coststring + ".")
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

function Beautify(what, forcecomma)
{
    what = Math.floor(what);
    if (Game.activeDisplaySetting == "1,23" || Game.activeDisplaySetting == "1.23" || forcecomma) {
        if (what.toString().indexOf('e') != -1) return what.toString();
        var str = Math.round(what).toString();
        var tempstr = str;
        str = "";
        while (tempstr.length > 3) {
            if (Game.activeDisplaySetting == "1,23" || forcecomma) {str = "," + tempstr.slice(-3, tempstr.length) + str;}
            else str = "." + tempstr.slice(-3,tempstr.length) + str;
            tempstr = tempstr.slice(0, -3);

        }
        str = tempstr + str;
        return str;
    }
    else {
        if (what < 1000) return what.toString();
        if (what >= 1e27) return what.toString();
        var prefix = Game.activeDisplaySetting;
        var list = prefixes[prefix];
        for (var i=0;i<list.length;i++) {
            if (what >= 1000) {
                var currentPrefix = list[i];
                what /= 1000;
            }
        }
        str = what.toString();
        if (str.indexOf(".") != -1) {
            return str.slice(0,str.indexOf('.')+4) + " <span style=\"text-transform: none;\">" + currentPrefix + "</span>";
        } else {
            return str + " <span style=\"text-transform: none;\">" + currentPrefix + "</span>";
        }
    }
}
