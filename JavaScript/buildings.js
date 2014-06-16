function buy_building(building) {
    return function() {
        if (document.getElementById('building-'+building).getAttribute("class") == "click") {
            Game.buildings[building]['amount']++;
            Game.properties[Game.buildings[building].require].amount--;
            for (var cost in Game.buildings[building].current_pay) {
                eval("Game." + Game.buildings[building].pay_what[cost] + " -= Game.buildings[building].current_pay[cost]");
            }
            update_properties();
            update_buildings();
            display();
        }
    }
}

function buy_property(property) {
    return function() {
        if (document.getElementById("property-"+property).getAttribute("class") == "click") {
            Game.properties[property].amount++;
            for (var cost in Game.properties[property].current_pay) {
                eval("Game." + Game.properties[property].pay_what[cost] + " -= Game.properties[property].current_pay[cost]");
            }
            update_properties();
            display();
        }
    }
}

function update_buildings() {
    building_income_lumber = 0;
    building_income_money = 0;
    building_income_timber = 0;
    for (var building in Game.buildings) {
        var b = Game.buildings[building];
        for (var cost in b.current_pay) {
            b.current_pay[cost] = b.base_pay[cost] * Math.pow(1.10, b.amount);
        }
        for (var prod in b.produce) {
            eval("building_income_" + b.produce_what[prod] + "+= b.produce[prod] * b.amount;");
        }
    }
}

function update_properties() {
    for (var property in Game.properties) {
        var p = Game.properties[property];
        for (var cost in p.current_pay) {
            p.current_pay[cost] = p.base_pay[cost] * Math.pow(1.10, p.amount);
        }
    }
}

var building_income_timber;
var building_income_lumber;
var building_income_money ;