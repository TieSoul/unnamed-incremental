var Init = function() {
    tabButtons = [document.getElementById("mainTab"),
                  document.getElementById("buildingsTab")];
    tabList = [document.getElementById("main"),
               document.getElementById("buildings")];
    activeTab = "main";
    document.getElementById("mainTab").onclick = function() {switchTab("main");};
    document.getElementById("buildingsTab").onclick = function() {switchTab("buildings");};
};
var tabList;
var tabButtons;
var activeTab;

var switchTab = function(tab) {
    for (var i=0;i<tabList.length;i++) {
        if (tabList[i].getAttribute("id") != tab) {
            tabList[i].setAttribute("class", "hidden");
        } else {
            tabList[i].setAttribute("class", "");
        }
    }
    document.getElementById(tab + "Tab").setAttribute("class", "tab-disabled");
    if (activeTab != tab) document.getElementById(activeTab + "Tab").setAttribute("class", "tab");
    activeTab = tab;
};

Init();
switchTab("main");