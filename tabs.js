var Init = function() {
    document.getElementById("mainTab").setAttribute("onclick", "switchTab(\"main\"");
    document.getElementById("buildingsTab").setAttribute("onlick", "switchTab(\"main\"");
}
var tabList = [document.getElementById("main"),
    document.getElementById("buildings")];
var tabButtons = [document.getElementById("mainTab"),
    document.getElementById("buildingsTab")];


var switchTab = function(tab) {
    for (var i=0;i<tabList.length;i++) {
        if (tabList[i].getAttribute("id") != tab) {
            tabList[i].setAttribute("class", "hidden");
        } else {
            tabList[i].setAttribute("class", "");
        }
    }
    document.getElementById(tab + "Tab").setAttribute("class", "tab-disabled");
};

Init();
switchTab("main");