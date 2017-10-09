var num;
var guess;
function number(){
	num = parseInt(document.getElementById("numIn").value);
	//alert(num);
}
function guess(){
	num = parseInt(document.getElementById("numIn").value);
	guess = parseInt(document.getElementById("inputguess").value);
	
	if(guess == num){
		//have the program send back correct
		document.getElementById("inputguess").placeholder = "You're right!!";
	}
	if(guess > num){
		//send back to high
		document.getElementById("inputguess").placeholder = "Your guess is to high";
	}
	if(guess < num){
		//send back to low
		document.getElementById("inputguess").placeholder = "Your guess is to low";
	}
}