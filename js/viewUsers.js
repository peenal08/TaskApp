app.controller('ViewUsersController', function($scope) {
  console.log("View Users controller");

$scope.isAdmin = isAdmin;
console.log("Admin: "+isAdmin);

$scope.users = [];
$scope.noUsers = false;

$scope.getUsers = function(){

  $scope.users = JSON.parse(localStorage.getItem("users"));
  console.log(JSON.stringify($scope.users));
  if(!$scope.users){
    $scope.noUsers = true;
  }
};

$scope.getUsers();

$scope.createUser = function(){
  location.href = "#/createUser";
}

$scope.back = function(){

  window.history.back();
};

});

