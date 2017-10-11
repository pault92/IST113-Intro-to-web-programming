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