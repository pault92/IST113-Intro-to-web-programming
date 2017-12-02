var gamePts;

function game(){
	
	this.start = function(click){
		
		if(click == true){
			checkUserAnswer();
		}else{
			getQuestion();
		}
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
		var $correct = (data[0].answer);
		checkUserAnswer($correct);
	}
	function checkUserAnswer(correct){
		//allows the user answer to appear.
		var $Correct = this.correct ? this.correct : "";
		$("#useAns").show();
		var $userGuess = ($('#AnsBx').val()).toLowerCase();
		//var $Correct = correct.toUpperCase();
		//$("#userA").val(userGuess);
		
		//$("#userA").html(userGuess);
		//$("#userA").html($userGuess);
		$("#Result").show();
		$("#Result").html($Correct);
		
		
		if($userGuess === $Correct.toLowerCase()){
			$("#userA").html($userGuess)
		}
		else{
			$("#userA").html("wrong");
		}
		// can't figure out why the toUpperCase won't work, getting cannot read property 'toUpperCase' of undefined
	}
	function guessCount(){
		var guesses;
		
		//if user answer = game anwser 1 try and win = true, print number of tries
		
		//if user answer != game anwser ct+1 anwser again
		
		//if user try = 10 end game show answer to question.
	}
}
//was last working on the comparasion to allow the game to be functional.