function InitSettings() {
    displaySettings = document.getElementsByClassName("display");
    document.getElementById(Game.activeDisplaySetting).setAttribute("class", "click display disabled");
    for (var i=0;i<displaySettings.length;i++) {
        displaySettings[i].onclick = function() {
            document.getElementById(Game.activeDisplaySetting).setAttribute("class", "click display");
            Game.activeDisplaySetting = this.id;
            this.setAttribute("class", "click display disabled");
        }
    }
}
var displaySettings;