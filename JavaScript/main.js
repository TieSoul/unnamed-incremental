function Init() {  // Run each time we start up
    // Bulk operations are less efficient in terms of input resources to output resources,
    // but more efficient in terms of resource processing per click.
    InitTabs();
    prefixes = {
        si:       ["K", "M", "G", "T", "P" , "E" , "Z" , "Y" ],
        latin:    ["k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp"],
        extlatin: ["thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion"]
    };

    prices = {
        timber:        {pay:0,     get:1,   pay_what:'timber',    get_what:'timber'  },
        buytimber:     {pay:2,     get:4,   pay_what:'money',     get_what:'timber'  },
        buybulktimber: {pay:100,   get:180, pay_what:'money',     get_what:'timber'  },
        
        lumber:        {pay:10,    get:1,   pay_what:'timber',    get_what:'lumber'  },
        bulklumber:    {pay:100,   get:9,   pay_what:'timber',    get_what:'lumber'  },
        
        money:         {pay:1,     get:10,  pay_what:'lumber',    get_what:'money'   },
        bulkmoney:     {pay:10,    get:90,  pay_what:'lumber',    get_what:'money'   },
        sellwater:     {pay:100,   get:100, pay_what:'rainwater', get_what:'money'   },
        
        barrel:        {pay:500,   get:1,   pay_what:'lumber',     get_what:'barrels'},
        gutter:        {pay:500,   get:1,   pay_what:'lumber',     get_what:'gutters'}
    };

    names = {
        timber: 'raw timber',
        lumber: 'lumber',
        money: 'money',
        barrels: 'rain barrel', // The singulars and plurals here are somewhat brittle.
        gutters: 'rain gutter', // This should be improved at some point.
        rainwater: 'rainwater'
    };

    rows = {
        timber:    ['timber', 'buytimber', 'buybulktimber'],
        lumber:    ['lumber', 'bulklumber'],
        money:     ['money', 'bulkmoney', 'sellwater'],
        rainwater: ['barrel', 'gutter']
    };

    for (var offer in prices) {
        var p = prices[offer];
        try {
            document.getElementById("click_"+offer).onclick = click(offer);
        } catch(e) {
            alert(offer);
        }
        set_title("click_"+offer, "Get "+p.get+" "+names[p.get_what]+" for "+p.pay+" "+names[p.pay_what]+".");
    }




    set_title("click_timber", "Gather "+prices.timber.get+" "+names.timber+".");
    set_title("click_barrel", "Costs "+prices.barrel.pay+" "+names.lumber+". Collects 1 "+names.rainwater+" per second. Holds up to "+prices.sellwater.pay+" "+names.rainwater+".");
    set_title("click_gutter", "Costs "+prices.gutter.pay+" "+names.lumber+". Collects 2 "+names.rainwater+" per second.");
    
    document.getElementById("save").onclick = save;
    document.getElementById("export").onclick = export_save;
    document.getElementById("import").onclick = import_save;
    document.getElementById("reset").onclick = reset;
    
    load();
    InitSettings(); //this needs to be after load to disable the active button.
    save_timer = setInterval(save, 30*1000); // autosave every 30 seconds
    tick_timer = setInterval(tick, 1000); // main loop
    onunload = save; // autosave when leaving the page (e.g. closing the tab, going to another page, or reloading)
    for (var building in Game.buildings) {
        var b = Game.buildings[building];
        document.getElementById("building-"+building).onclick = buy_building(building);
    }
    for (var property in Game.properties) {
        var p = Game.buildings[building];
        document.getElementById("property-"+property).onclick = buy_property(property);
    }
    display();
}

function set_title(id, title) { // Set title-text, also known as hovertext.
    document.getElementById(id).setAttribute("title", title);
}

function click(offer) {
    return function() {
        if (document.getElementById("click_"+offer).getAttribute("class") == "click") {
            Game[prices[offer].pay_what] -= prices[offer].pay;
            Game[prices[offer].get_what] += prices[offer].get;
            display();
        }
    }
}

function tick() { // Main loop.
    Game.rainwater += (Game.barrels + (Game.gutters*2));
    Game.rainwater = Math.min(Game.rainwater, (Game.barrels * prices.sellwater.pay));
    Game.timber += building_income_timber;
    Game.lumber += building_income_lumber;
    Game.money  += building_income_money ;
    display();
}

var prices;
var names;
var rows;
var save_timer;
var tick_timer;
var prefixes;

Init();
