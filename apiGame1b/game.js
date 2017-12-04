var $gamePts = 0;
var $questionPts;
var $correct;
var $guesses;

function game(){
	
	this.start = function(click){
		//hides the error
		$("#error").hide();
		$("#useAns").hide();
		$("#start").on("click", function(){
			getQuestion();
		});
		$("#ans").on("click",function(){
			checkUserAnswer();
		});
	}
	function getQuestion(){

		$.ajax({
			url:"http://jservice.io/api/random",
			dataType: "json"
		})
		//after the ajax call the data is sent to the populateQuestion method.
		.done(function(data){populateQuestion(data);})
		.fail(function(jqXHR, textStatus, errorThrown){
			showError(errorThrown);
		});
	}
	function populateQuestion(data){
		
		$("#Category").html(data[0].category.title);
		$("#question").html(data[0].question);
		$correct = (data[0].answer);
		$questionPts = data[0].value;
		
		checkUserAnswer();
	}
	//correct goes into the attributes
	function checkUserAnswer(){
		//changes the api variable into a string.
		//var $Correct = this.correct ? this.correct : "";
		var $Correct = null;
		$Correct = $correct;
		$("#useAns").show();
		var $userGuess = null;
		$userGuess = $('#AnsBx').val().toString();
		
		$("#Result").show();
		$("#Result").html($correct);
		alert($Correct);
		
		if($userGuess.toLowerCase() == $Correct.toLowerCase()){
			$("#userA").html($userGuess)
			alert($Correct);
			guessCount(true);
		}else if($userGuess.toLowerCase() != $Correct.toLowerCase()){
			$("#userA").html($userGuess);
			$("#AnsBx").html("Wrong");
			guessCount(false);
		}
		else{
			$("#AnsBx").html("Wrong");
		}
		
	}
	function guessCount(guess){
		
		alert($questionPts);
		
		if(guess == true){
			$gamePts = $gamePts + $questionPts;
			$guesses = $guesses+1;
			//alert($gamePts);
			populateQuestion();
		}
		if(guess != true){
			$guesses = $guesses+1;
			//alert($guesses);
		}
		//take varaible from checkUserAnswer to determine what the counter will do.
		//if user answer = game anwser 1 try and win = true, print number of tries
		
		//if user answer != game anwser ct+1 anwser again
		
		//if user try = 5 end game show answer to question.
	}
}
$(function() {
	window.app = new game();
	window.app.start();
});
//was last working on the comparasion to allow the game to be functional.