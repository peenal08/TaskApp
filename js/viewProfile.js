app.controller('ViewProfileController', function($scope, $ionicModal) {
  console.log("View Profile Controller");

console.log("Admin: "+isAdmin);

$scope.user = {
  'username' : loggedInUser,
  'password' : "",
  'email' : "",
  'phone' : "",
  'address' : "",
  'dob' : "",
  'img' : ""
};
$scope.edit = {
  'email' : "",
  'phone' : "",
  'address' : "",
  'dob' : ""
};
if(isAdmin){
  var user = JSON.parse(localStorage.getItem("admin"));
  $scope.user = user;
  console.log(JSON.stringify(user));
}else{
  var users = [];
  users = JSON.parse(localStorage.getItem("users"));
  users.forEach(function(user){
    if($scope.user.username === user.username){
      $scope.user = user;
      console.log(JSON.stringify(user));
    }
  });
}

$scope.editProfile = function(){

  console.log("edit profile");
  $scope.edit.email = $scope.user.email;
  $scope.edit.phone = $scope.user.phone;
  $scope.edit.address = $scope.user.address;
  $scope.edit.dob = $scope.user.dob;

  $ionicModal.fromTemplateUrl('partials/editProfile.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modal = modal;
      $scope.openModal();
   });
   $scope.openModal = function() {
      $scope.modal.show();
      console.log("modal opened");
    };



   $scope.closeModal = function() {

     $scope.modal.hide();
   };

   $scope.$on('$destroy', function() {

         $scope.modal.remove();
      });

};

$scope.saveChanges = function(){
  $scope.user.email = $scope.edit.email;
  $scope.user.phone = $scope.edit.phone;
  $scope.user.address = $scope.edit.address;
  $scope.user.dob = $scope.edit.dob;

  if(isAdmin){
    localStorage.setItem("admin",$scope.user);
  }else{
    var users = [];
    users = JSON.parse(localStorage.getItem("users"));
    users.forEach(function(user){
      if($scope.user.username === user.username){
        user.email = $scope.user.email;
        user.phone = $scope.user.phone;
        user.address = $scope.user.address;
        user.dob = $scope.user.dob;
      }
    });
    localStorage.setItem("users",users);
  }

}

$scope.editImage = function(){

  function onSuccess(imageURI) {
    $scope.$apply(function () {
      $scope.user.img = imageURI;
    });

  }

  function onFail(message) {
      alert("Photo Upload Error!"+message);
  }
  navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
  destinationType: Camera.DestinationType.FILE_URI,
  sourceType: Camera.PictureSourceType.PHOTOLIBRARY });

};

$scope.back = function(){

  window.history.back();
};

});
