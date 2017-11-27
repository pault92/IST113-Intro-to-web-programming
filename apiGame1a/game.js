function game(){
	
	this.start = function(){
		getQuestion();
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
		$("#answer").html(data[0].answer);
	}
}