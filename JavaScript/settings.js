function InitSettings() {
    displaySettings = [document.getElementById("1,23"),
                       document.getElementById("1.23"),
                       document.getElementById("si"),
                       document.getElementById("latin"),
                       document.getElementById("extlatin")];
    document.getElementById(Game.activeDisplaySetting).setAttribute("class", "click disabled");
    for (var i=0;i<displaySettings.length;i++) {
        displaySettings[i].onclick = function() {
            document.getElementById(Game.activeDisplaySetting).setAttribute("class", "click");
            Game.activeDisplaySetting = this.id;
            this.setAttribute("class", "click disabled");
        }
    }
}
var displaySettings;