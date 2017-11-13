function Task(name){
	this.name = name;
	this.id = Task.nextTaskId++;
	this.created = new Date();
	this.priority = Task.priorities.norma;
	this.status = Task.statueses.notStarted;
	this.pctComplete = 0;
	this.startDate = null;
	this.dueDate = null;
}
function TaskList(task){
	task = task || [];
	
	this.getTask = function(){
		return task;
	};
	this.addTask = function(task){
		tasks.push(task);
		return this;
	};
	this.removeTask = function(taskId){
		var i = getTaskIndex(taskId);
		if(i >= 0){
			var task = task[i];
			task.splice(i,1);
			return task;
		}
		return null;
	};
}
function getTaskIndex(taskId){
	for(var i  in task){
		if(tasks[i].id == taskId){
			return parseInt(i);
		}
	}
	return -1;
	
	this.getTask = function(taskId){
		var index = getTaskIndex(taskId);
		return(index >= 0 ? task[index] : null);
	};
	
	this.each = function(callback){
		for(var i in task){
			callback(tasks[i]);
		}
	};
}

Task.nextTaskId = 1;
Task.priorities = {
	none: 0,
	low: 1,
	normal: 2,
	high: 3
};
Task.statueses = {
	none: 0,
	notStarted: 1,
	started: 2,
	completed: 3
};