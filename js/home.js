app.controller('HomeController', function($scope, $ionicSideMenuDelegate, $stateParams, $ionicModal, $ionicActionSheet) {
  console.log("Home controller");

$scope.isAdmin = isAdmin;
console.log("Admin: "+isAdmin);

$scope.currentUser = $stateParams.username;
console.log("Current user :"+$scope.currentUser);

$scope.tasks = [];
$scope.noTask = true;
console.log("No task:" +$scope.noTask);

var selectedTasks = [];
$scope.isSelected = false;

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

$scope.modals = {
  'username' : "",
  'taskname' : "",
  'text' : "",
};


$ionicModal.fromTemplateUrl('partials/createTask.html', {
  scope: $scope,
  animation: 'slide-in-up',
}).then(function(modal) {
  $scope.modal = modal;
  //$scope.openModal();
});

$scope.getTasks = function(){

  console.log("GET TASK");
  $scope.tasks = [];
  $scope.tasks = JSON.parse(localStorage.getItem("tasks"));
  /*tasks = [];
  tasks = JSON.parse(localStorage.getItem("tasks"));

  if(isAdmin){
    if(tasks){
      //$scope.tasks.push(tasks);
      $scope.noTask = false;
      $scope.tasks = tasks;
    }

  }else{
      tasks.forEach(function(task){

        console.log(JSON.stringify(task));
        console.log(task.username+$scope.currentUser);

        if(task.username == $scope.currentUser){
              $scope.tasks.push(task);

        }
      });
      $scope.noTask = false;
  }*/
  console.log(JSON.stringify($scope.tasks));

};

if(localStorage.getItem("tasks")){
  $scope.noTask = false;
  $scope.getTasks();
}



 $scope.openModal = function() {
    $scope.modal.show();
    console.log("modal opened");
 };

 $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.getTasks();
 };

 //Cleanup the modal when we're done with it!
 $scope.$on('$destroy', function() {
    $scope.modal.remove();
 });


$scope.checkUser = function(username){

  var checkUser = false;
  var users = [];
  users = JSON.parse(localStorage.getItem("users"));
  users.forEach(function(user){

    if(user.username == username){

      checkUser = true;
    }
  });

  return checkUser;
};

$scope.saveTask = function(){

  console.log("saveTask");
  if(isAdmin){
    //console.log($scope.modals.username);
    //console.log($scope.checkUser($scope.modals.username));
    if($scope.checkUser($scope.modals.username)){
      
      $scope.task.username = $scope.modals.username;
    }else{
      alert("User does not exist!");
      return;
    }

  }else{
    $scope.task.username = $scope.currentUser;
  }

  if(($scope.modals.taskname !== "") && ($scope.modals.text !== "")){

    $scope.task.taskname = $scope.modals.taskname;
    $scope.task.text = $scope.modals.text;
    $scope.task.createdBy = $scope.currentUser;
    $scope.task.createdTime = new Date().getTime();
  }

  console.log("Before pushing:"+JSON.stringify($scope.tasks));
  $scope.tasks.push($scope.task);
  localStorage.setItem("tasks", JSON.stringify($scope.tasks));
  console.log(JSON.stringify($scope.tasks));

  $scope.closeModal();
};


$scope.viewTask = function(task){

  localStorage.setItem("currentTask",JSON.stringify(task));
  location.href = "#/viewTask/"+task.taskname;
};

$scope.showActionSheet = function(){

   var showActionSheet = $ionicActionSheet.show({
         buttons: [
            { text: 'Enter username' }
         ],

         titleText: 'Assign task to User',
         cancelText: 'Cancel',

         cancel: function() {
            console.log("cancel");
            $scope.isSelected = false;
         },

         buttonClicked: function(index) {
            if(index === 0) {
               var username = prompt("Enter the username","");
               if(username){

                tasks = [];
                tasks = JSON.parse(localStorage.getItem("tasks"));

                selectedTasks.forEach(function(task){
                $scope.task.username = username;
                $scope.task.taskname = task.taskname;
                $scope.task.text = task.text;
                $scope.task.createdBy = "admin";
                $scope.task.createdTime = new Date().getTime();
                $scope.task.isSelected = false;

                tasks.push($scope.task);
               });
               localStorage.setItem("tasks",JSON.stringify(tasks));
               console.log(JSON.stringify(tasks));
               $scope.getTasks();
               }
            }
         }

      });
};

$scope.onHold = function(task){

  console.log("------Inside onHold()--------");

  if($scope.isAdmin){

    if(!task.isSelected){
      task.isSelected = true;
      selectedTasks.push(task);
      console.log(JSON.stringify(selectedTasks));
    }else{
      task.isSelected = false;
      removeByAttr(selectedTasks,'taskname',task.taskname);
      console.log(JSON.stringify(selectedTasks));
    }

   if(selectedTasks.length > 0){
      $scope.isSelected = true;
    }else{
      $scope.isSelected = false;
    }
  }
   // console.log($scope.isSelected);
};


$scope.completeTask = function(selectedTask){

  if (confirm("Is the task completed?")) {
      tasks = JSON.parse(localStorage.getItem("tasks"));

      tasks.forEach(function(task){
        if(selectedTask.taskname === task.taskname){
          task.isCompleted = true;
        }
      });
      console.log(JSON.stringify(tasks));
      localStorage.setItem("tasks",JSON.stringify(tasks));
      $scope.getTasks();
  }
};

$scope.deleteTask = function(task){

  if (confirm("Do you wish to delete this task?")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        removeByAttr(tasks,'taskname',task.taskname);
        console.log("Delete Task");
        console.log(JSON.stringify(tasks));
        localStorage.setItem("tasks",JSON.stringify(tasks));
        $scope.getTasks();
    }
};

var removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if(arr[i] && arr[i][attr] && (arguments.length > 2 && arr[i][attr] === value )){
           arr.splice(i,1);
       }
    }
    return arr;
}

$scope.toggleLeft = function(){

    $ionicSideMenuDelegate.toggleLeft();
};

$scope.logout = function(){

  console.log("Logout");
  if (confirm("Do you really wish to exit?")) {
      /*isLoggedIn = false;
      loggedInUser = "";
      location.href = "#/login";*/
      ionic.Platform.exitApp();
      ionic.Platf
  }
};


});

