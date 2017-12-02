function MyApp(){
	this.start = function(){
		
		//hides the error
		$("#error").hide();
		$("#useAns").hide();
		//$("#Result").hide();
		
		//object call game.js
		var Game = new game();
		//listens for the click of the start button and sends calls the constructor of game.js
		$("#start").on("click", function(){
			Game.start();
		});
		$("#ans").on("click",function(){
			var click = true;
			Game.start(click);
			
		});
	}
}
$(function() {
	window.app = new MyApp();
	window.app.start();
});