angular.module('RestaurantApp', ['ui.router', 'RestaurantCtrl'])

.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/404')

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/home.html',
      controller: 'HomeCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/login.html',
      controller: 'LoginCtrl'
    })
    .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/signup.html',
    controller: 'SignupCtrl'
    }) 
    .state('restaurant', {
      url: '/restaurant/:id',
      templateUrl: 'app/views/restaurant.html',
      controller: 'ShowCtrl'
    })
    .state('allRestaurants', {
      url: '/restaurants',
      templateUrl: 'app/views/allRestaurants.html',
      controller: 'AllRestaurantsCtrl'
    })
    .state('404', {
      url: '/404',
      templateUrl: 'app/views/404.html'
    })
    $locationProvider.html5Mode(true);
}])

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor')
}])