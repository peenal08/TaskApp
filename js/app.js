
var isAdmin = false;
var isLoggedIn = false;
var loggedInUser = "";

var admin = {
  'username' : "admin",
  'password' : "12345",
  'email' : "",
  'phone' : "",
  'address' : "",
  'dob' : "",
  'img' : "img/profilePic.jpg"
};

localStorage.setItem("admin",JSON.stringify(admin));


var app = angular.module('taskApp', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider) {
     $stateProvider
         .state('login', {
             url: '/login',
             templateUrl: 'partials/login.html',
             controller: 'LoginController'
         }).state('home', {
              url: '/home/:username',
              templateUrl: 'partials/home.html',
              controller: 'HomeController'
          }).state('createTask', {
              url: '/createTask',
              templateUrl: 'partials/createTask.html',
              controller: 'HomeController'
          }).state('signUp', {
              url: '/signUp',
              templateUrl: 'partials/signUp.html',
              controller: 'SignUpController'
          }).state('viewProfile', {
              url: '/viewProfile',
              templateUrl: 'partials/viewProfile.html',
              controller: 'ViewProfileController'
          }).state('createUser', {
              url: '/createUser',
              templateUrl: 'partials/createUser.html',
              controller: 'CreateUserController'
          }).state('viewTask', {
              url: '/viewTask/:taskname',
              templateUrl: 'partials/viewTask.html',
              controller: 'ViewTaskController'
          }).state('viewUsers', {
              url: '/viewUsers',
              templateUrl: 'partials/viewUsers.html',
              controller: 'ViewUsersController'
          });

 });

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    /*if(isLoggedIn){
      console.log("User already logged in");
      location.href = "#/home/:"+loggedInUser;
    }else{
      console.log("Redirecting to Login");*/
      location.href = "#/login";
    /*}*/
  });
});


