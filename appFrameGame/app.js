"use strict";
/*
// using a function contructor form to create an object
var app window;
var num;
var guess;

function number(){
	num = parseInt(document.getElementById("numIn").value);
        document.getElementById("numIn").value = "";
}
function guess(){
	guess = parseInt(document.getElementById("inputguess").value);
        if(guess === num){
            //have the program send back correct
            document.getElementById("inputguess").value = "You're right!!";
            //document.getElementById("inputguess").reset();
        }
        if(guess > num){
	//send back to high
            document.getElementById("inputguess").value = "Your guess is to high";
            //document.getElementById("inputguess").reset();
        }
        if(guess < num){
            //send back to low
            document.getElementById("inputguess").value = "Your guess is to low";
            //document.getElementById("inputguess").reset();
        }
}
*/
//functions that load the page and resources
function MyApp()
{
	var version = "v1.0";
	var num;
	var guess;
	var ct = 1;

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
		$("#app>header").append(version);
		setStatus("ready");
		//This listens for the submit which is already listening for the number() function which will then takes in first the number and then submit2 will accept the guess.
		$("#submit").on("click", number);
		$("#submit2").on("click", guess);
		
	};
	function number(){
	num = parseInt(document.getElementById("numIn").value);
		//$("numIn").val() = "";
        document.getElementById("numIn").val = "";
	}
	function guess(){
		guess = parseInt(document.getElementById("inputguess").value);
        if(guess === num){
            //have the program send back correct
            document.getElementById("inputguess").value = "You're right!! It took "+ct+" try(ies)";
            //document.getElementById("inputguess").reset();
        }
        if(guess > num){
	//send back to high
            document.getElementById("inputguess").value = "Your guess is to high";
			ct++;
        }
        if(guess < num){
            //send back to low
            document.getElementById("inputguess").value = "Your guess is to low";
            ct++;
        }
}
} // end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new MyApp();
	window.app.start();
});