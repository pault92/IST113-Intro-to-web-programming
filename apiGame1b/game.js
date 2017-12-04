var $gamePts = 0;
var $questionPts;
var $correct;
var $guesses;

function game(){
	
	this.start = function(click){
		//hides the error
		$("#cat").hide();
		$("#error").hide();
		$("#useAns").hide();
		$("#gameStatus").hide();
		$("#result").hide();
		$("#AnsSection").hide();
		$("#start").on("click", function(){
			getQuestion();
		});
		$("#ans").on("click",function(){
			checkUserAnswer();
		});
		$("#AnsBx").keypress(function(e){
			if(e.which == 13){
				checkUserAnswer();
			}
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
		$("#cat").show();
		$("#AnsSection").show();
		$("#result").show();
		$("#Category").html(data[0].category.title);
		$("#question").html(data[0].question);
		$correct = (data[0].answer);
		$questionPts = (data[0].value);
		$("#points").html($questionPts);
		$("#Result").show();
		$("#Result").html($correct);
	}
	//correct goes into the attributes
	function checkUserAnswer(){
		//changes the api variable into a string.
		
		var $Correct;
		$Correct = $correct;
		$("#useAns").show();
		var $userGuess = null;
		$userGuess = $('#AnsBx').val().toString();
		
		if($userGuess.toLowerCase() == $Correct.toLowerCase()){
			$("#userA").html($userGuess)
			//alert($Correct);
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
		
		//alert($questionPts);
		
		if(guess == true){
			$gamePts = $gamePts + $questionPts;
			$("#gamePts").html($gamePts);
			getQuestion();
		}
		else{
	
			if($gamePts > 0){
				$gamePts = $gamePts - $questionPts;
				$("#gamePts").html($gamePts);
				getQuestion();
			}
			else{
				$("#gameStatus").show();
				$("#gamePts").html("0");
				$("#gameSts").html("You lost!!!");
				
			}
		}
	}
}
$(function() {
	window.app = new game();
	window.app.start();
});
//was last working on the comparasion to allow the game to be functional.