"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v1.0",
	appStorage = new AppStorage("taskAtHand"),
	taskList = new TaskList(),
	timeoutId = 0;
	
	function setStatus(msg, noFade){
		$("#app>footer").text(msg).show();
		if(!noFade){
			$("#app>footer").fadeOut(1000);
		}
	}
	function saveTaskList(){
		appStorage.setValue("taskList", taskList.getTask());
		
		if(timeoutId) clearTimeout(timeoutId);
		setStatus("saving changes...", true);
		timeoutId = setTimeout(function(){
			appStorage.setValue("taskList", taskList.getTask());
			timeoutId = 0;
			setStatus("changes saved.");
		},
		2000);
	}
	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message);
	}

	// creating a public function
	this.start = function()
	{
            $("#new-task-name").keypress(function (e){
                if(e.which == 13){
                    addTask();
                    return false;
                }
            })
            .focus();
            $("#app>header").append(version);
			loadTaskList();
            setStatus("ready");
			$("#theme").change(onChangeTheme);
			
			function onChangeTheme(){
			var theme = $("#theme>option").filter(":selected").val();
			setTheme(theme);
			appStorage.setValue("theme",theme);
			}
	}
	

	function addTask(){
		var taskName = $("#new-task-name").val();
		if(taskName){
			var task = new Task(taskName);
			taskList.addTask(task);
			appStorage.setValue("nextTaskId", Task.nextTaskId);
			addTaskElement(taskName);
			$("#new-task-name").val("").focus();
		}
		saveTaskList();
	}
	function addTaskElement(taskName){

		
		function removeTask($task){
			$task.remove();
			saveTaskList();
		}
		function moveTask($task, moveUp){
			if(moveUp){
				$task.insertBefore($task.prev());
			}else{
				$task.insertAfter($task.next());
			}
			saveTaskList();
		}
		
		var $task = $("#task-template .task").clone();
		$task.data("task-id", task.id);
		$("span.task-name",$task).text(taskName);
		
		$("#task-list").append($task);
		
		$("button.toggle-details", $task).click(function(){
			toggleDetails($task);
		});
		
		$("button.delete",$task).click(function(){
			$task.remove();
		});
		$("button.move-up",$task).click(function(){
			$task.insertBefore($task.prev());
		});
		$("button.move-down",$task).click(function(){
			$task.insertAfter($task.next());
		});
		
		$("span.task-name",$task).click(function(){
			onEditTaskName($(this));
		});
		$("input.task-name",$task).change(function(){
			onChangeTaskName($(this));
		})
		.blur(function(){
			$(this).hide().siblings("span.task-name").show();
		});
		$task.click(function(){onSelectTask($task);});
		
		$(".details input, .details select", $task).ecah(function(){
			var $input = $(this);
			var fieldName = $input.data("field");
			$input.val(task[fieldName]);
		});
		
		$(".details input, .details select", $task).change(function(){
			onChnageTaskDetails(task.id, $(this));
		});
	}
	
	function onChangeTaskDetails(taskId, $input){
		var task = taskList.getTask(taskId)
		if(task){
			var fieldName = $input.data("field");
			task[fieldName] = $input.val();
			saveTaskList();
		}
	}
	function rebuildTaskList(){
		//had a #
		$("task-list").empty();
		taskList.each(function(task){
			addTaskElement(task);
		});
	}
	function toggleDetails($task){
			$(".details", $task).slideToggle();
			$("button.toggle-details", $task).toggleClass("expanded");
	}
	function onEditTaskName($span){
		$span.hide()
		.siblings("input.task-name")
		.val($span.text())
		.show().focus();
	}
	
	function onChangeTaskName($input){
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if($input.val()){
			$span.text($input.val());
		}
		$span.show();
	}
	function loadTaskList(){
		var tasks = appStorage.getValue("taskList");
		taskList = new TaskList(tasks);
		rebuildTaskList();
	}
	function onSelectTask($task){
		if($task){
			$task.siblings(".selected").removeClass("selected");
			$task.addClass("selected");
		}
	}
	function setTheme(theme){
		$("#theme-style").attr("href", "themes/"+ theme +".css");
	}
	function loadTheme(){
		var theme = appStorage.getValue("theme");
		if(theme){
			setTheme(theme);
		$("#theme>option[value="+theme+"]").attr("select","selected");
		}
	}
}// end MyApp

/* 	JQuery's shorthand for the document ready event handler
		could be written: $(document).ready(handler);

		When this page loads, we'll create a global variable
		named "app" by attaching it to the "window" object
		(part of the BOM - Browser Object Model)
*/
$(function() {
	window.app = new TaskAtHandApp();
	window.app.start();
});