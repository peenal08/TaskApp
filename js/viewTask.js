app.controller('ViewTaskController', function($scope, $stateParams) {
  console.log("View Task controller");

$scope.isAdmin = isAdmin;
console.log("Admin: "+isAdmin);

$scope.currentTask = $stateParams.taskname;
console.log("Current task :"+$scope.currentTask);

$scope.tasks = [];

var tasks = [];

$scope.task = {
  'username' : "",
  'taskname' : "",
  'text' : "",
  'createdTime' : "",
  'isCompleted' : false,
  'isSelected' : false,
  'createdBy' : ""
};


$scope.getTask = function(){

  $scope.task = JSON.parse(localStorage.getItem("currentTask"));

};

$scope.getTask();

$scope.saveTask = function(){

  tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach(function(task){

     console.log(JSON.stringify(task));
     if(task.taskname == $scope.task.taskname){
           task.text = $scope.task.text;
           task.isCompleted = $scope.task.isCompleted;
     }
     localStorage.setItem("tasks",JSON.stringify(tasks));

   });
   console.log(JSON.parse(localStorage.getItem("tasks")));
   location.href = "#/home/"+loggedInUser;
};

$scope.back = function(){

  window.history.back();
};


});

