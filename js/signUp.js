app.controller('SignUpController', function($scope) {
  console.log("Sign Up controller");


console.log("Admin: "+isAdmin);

$scope.users = [];
$scope.user = {
  'username' : "",
  'password' : "",
  'email' : "",
  'phone' : "",
  'address' : "",
  'dob' : "",
  'img' : "img/profilePic.jpg"
};
$scope.login = {
  'username' : "",
  'password' : "",
  'confirmPassword' : ""
};

if(localStorage.getItem("users")){
   $scope.users = JSON.parse(localStorage.getItem("users"));
}

$scope.signUp = function(){

  $scope.users.forEach(function(user){
    if($scope.login.username === user.username){
        alert("User already exists..");
        location.href = "#/signUp";
    }
  });
  if($scope.login.password === $scope.login.confirmPassword){
    $scope.user.username = $scope.login.username;
    $scope.user.password = $scope.login.password;
    $scope.users.push($scope.user);
    localStorage.setItem("users", JSON.stringify($scope.users));
    console.log(JSON.stringify($scope.users));

    isLoggedIn = true;
    loggedInUser = $scope.login.username;
    alert("You have successfully signed in!");
    location.href = "#/home/"+loggedInUser;
  }else{
    alert("Passwords do not match!");
  }

};

});
