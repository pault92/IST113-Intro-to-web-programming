
function guess(){
	var num = parseInt(document.getElementById("numIn").value);
	var guess = parseInt(document.getElementById("inputguess").value);
	if(guess = num){
		//have the program send back correct
		document.getElementById("inputfield").placeholder = 'Youre right!!';
	}
	if(guess > num){
		//send back to high
		document.getElementById("inputfield").placeholder = 'Your guess is to high';
	}
	if(guess < num){
		//send back to low
		document.getElementById("inputfield").placeholder = 'Your guess is to low';
	}
}