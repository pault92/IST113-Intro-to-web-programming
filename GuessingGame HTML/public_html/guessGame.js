var num;
var guess;
function number(){
	num = parseInt(document.getElementById("numIn").value);
	//alert(num);
}
function guess(){
	guess = parseInt(document.getElementById("input").value);
	alert(num);
	if(guess == num){
		//have the program send back correct
		document.getElementById("anw").innerHTML = "<p> You got it right! <p>";
		return play(false);
	}
	if(guess > num){
		//send back to high
		document.getElementById("anw").innerHTML = "<p> Your guess is to high <p>";
	}
	if(guess < num){
		//send back to low
		document.getElementById("anw").innerHTML = "<p> Your guess is to low <p>";
	}
}