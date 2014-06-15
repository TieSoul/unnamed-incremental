var InitTabs = function() { //Initialize several values
    tabButtons = document.getElementsByClassName("tab");
    tabList = document.getElementsByClassName("tabcontent");
    activeTab = "main";
    document.getElementById("mainTab").onclick = function() {switchTab("main");};
    document.getElementById("buildingsTab").onclick = function() {switchTab("buildings");};
    document.getElementById("settingsTab").onclick = function() {switchTab("settings");};
    switchTab("main");
};
var tabList;
var tabButtons;
var activeTab;

var switchTab = function(tab) {
    for (var i=0;i<tabList.length;i++) { //hides all tabs except the one you're switching to
        if (tabList[i].getAttribute("id") != tab) {
            tabList[i].setAttribute("class", "tabcontent nodisplay");
        } else {
            tabList[i].setAttribute("class", "tabcontent");
        }
    }
    document.getElementById(tab + "Tab").setAttribute("class", "tab tab-disabled");
    if (activeTab != tab) document.getElementById(activeTab + "Tab").setAttribute("class", "tab");
    activeTab = tab;
};