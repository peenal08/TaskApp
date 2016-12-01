app.controller('LoginController', function($scope) {
  console.log("Login controller");

console.log("Admin: "+isAdmin);
isAdmin = false;

$scope.users = [];
$scope.login = {
  'username' : "",
  'password' : ""
};

if(localStorage.getItem("users")){
   $scope.users = JSON.parse(localStorage.getItem("users"));
   console.log(JSON.stringify($scope.users));
}

$scope.admin = JSON.parse(localStorage.getItem("admin"));

$scope.login = function(){


  if(($scope.login.username === $scope.admin.username) && ($scope.login.password === $scope.admin.password)){
    isAdmin = true;
    console.log("Admin :"+isAdmin);
    isLoggedIn = true;
    loggedInUser = $scope.login.username;
    location.href = "#/home/"+loggedInUser;

  }else{
    console.log("Not admin");
    if($scope.users.length > 0){
        console.log(JSON.stringify($scope.users));
        $scope.users.forEach(function(user){
        console.log(JSON.stringify(user));
          if($scope.login.username === user.username){

            if($scope.login.password === user.password){
              isLoggedIn = true;
              loggedInUser = $scope.login.username;
              $scope.login.username = "";
              $scope.login.password = "";
              location.href = "#/home/"+loggedInUser;
            }else{
              alert("Incorrect Password!");
            }
          }
        });
    }else{
      alert("User does not exist!");
    }

  }
};

});
