function WeatherWidget($widget){
	
	this.update = function(){
		//hides result until it's called
		$(".results", $widget).hide();
		$(".loading",$widget).show();
		getLocation();
		//getWeatherReport();
	};
	function getWeatherReport(lat, lon){
		
		var coords = lat + "," + lon;
		//calls the file from weather.gov 
		$.ajax({
			url:"https://api.weather.gov/points/"+coords+"/forecast",
			dataType: "json"
			
		})
		.done(function(data) {populateWeather(data);})
		.fail(function(jqXHR, textStatus, errorThrown){
			showError(errorThrown);
		});
	}
	//use data in the json calls because that's what I passed.
	function populateWeather(data){
		//where I put the array call?
		//var observation = data.current_observation;
		
		var observation = data.properties.periods[0];
		$(".results header img", $widget).attr("src", observation.icon);
		//$(".location>span", $widget).text(observation.windSpeed);
		
		$(".conditions>span").each(function(i, e){
			var $span = $(this);
			var field = $span.data("field");
			$(this).text(observation[field]);
		});
		$(".loading",$widget).fadeOut(function(){
			$(".results", $widget).fadeIn();
		});
	}
	function getLocation(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(
			function(position){
				$("#latitude").val(position.coords.latitude);
				$("#longitude").val(position.coords.longitude);
				var lat = $("#latitude").val();
				var lon = $("#longitude").val();
				if(lat && lon){
					$("#weather-widget").fadeIn();
					getWeatherReport(lat,lon);
				}
		});
		//function(error){
		//	$("#controls .error").text("ERROR: "+ error.message).slideDown();
		//});
			/*
			alert(lon);
			if(lat && lon){
			$("#weather-widget").fadeIn();
			getWeatherReport(lat,lon);
			}
			*/
		//}
	}
	function showError(){
		
	}
}
}