app.controller('CreateUserController', function($scope) {
  console.log("Create User Controller");


console.log("Admin: "+isAdmin);


$scope.users = [];
$scope.user = {
  'username' : "",
  'password' : "12345",
  'email' : "",
  'phone' : "",
  'address' : "",
  'dob' : "",
  'img' : "img/profilePic.jpg"
};
$scope.newUser = {
  'username' : "",
  'email' : ""
};

if(localStorage.getItem("users")){
   $scope.users = JSON.parse(localStorage.getItem("users"));
}

$scope.createUser = function(){

  $scope.users.forEach(function(user){
    if($scope.newUser.username === user.username){
        alert("User already exists..");
        location.href = "#/createUser";
    }
  });
  $scope.user.username = $scope.newUser.username;
  $scope.user.email = $scope.newUser.email;

  $scope.users.push($scope.user);
  localStorage.setItem("users", JSON.stringify($scope.users));
  console.log(JSON.stringify($scope.users));

  var emailTo = $scope.user.email;
  var emailCC = "peenal.iyer@gmail.com";
  var emailSubj = "New User Creation";
  var emailBody = "You are now a user on TaskApp. Username :"+$scope.user.username+
                    "Password : 12345";

  location.href = "mailto:"+emailTo+'?cc='+emailCC+'&subject='+emailSubj+'&body='+emailBody;

};
$scope.back = function(){
  window.history.back();
};
});
