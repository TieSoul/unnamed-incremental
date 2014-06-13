var Init = function() {  //Initializes the game
  window.Game = new Object();
    Game.points = 0;
}

function Beautify(what,floats)//turns 9999999 into 9,999,999; credits to Orteil for this code snippet
{
	var str='';
	if (!isFinite(what)) return 'Infinity';
	if (what.toString().indexOf('e')!=-1) return what.toString();
	what=Math.round(what*10000000)/10000000;//get rid of weird rounding errors
	if (floats>0)
	{
		var floater=what-Math.floor(what);
		floater=Math.round(floater*10000000)/10000000;//get rid of weird rounding errors
		var floatPresent=floater?1:0;
		floater=(floater.toString()+'0000000').slice(2,2+floats);//yes this is hacky (but it works)
		if (parseInt(floater)===0) floatPresent=0;
		str=Beautify(Math.floor(what))+(floatPresent?('.'+floater):'');
	}
	else
	{
		what=Math.floor(what);
		what=(what+'').split('').reverse();
		for (var i in what)
		{
			if (i%3==0 && i>0) str=','+str;
			str=what[i]+str;
		}
	}
	return str;
}
document.getElementById("click").onclick = function() {  //Makes the button increase point amount
  Game.points++;
  document.getElementById("count").innerHTML = Beautify(Game.points,1); 
}
Init();
