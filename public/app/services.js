angular.module('RestaurantServices', ['ngResource'])
.factory('Restaurant', ['$resource', function($resource) {
  return $resource('/api/restaurants/:id');
}])

.factory('Auth', ['$window', function($window) {
  return { 
    saveToken: function(token) {
      $window.localStorage['secretrestaurants-token'] = token; 
    },
    getToken: function() {
      return $window.localStorage['secretrestaurants-token'];
    },
    removeToken: function() {
      $window.localStorage.removeItem('secretrestaurants-token');
    },
    isLoggedIn: function() { 
      var token = this.getToken();
      return token ? true : false;
    }
  };
}])

.factory('AuthInterceptor', ['Auth', function(Auth) {
  return {
    request: function(config) {
      var token = Auth.getToken();
      if (token) {
        config.headers.Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7Il9fdiI6ImluaXQiLCJfaWQiOiJpbml0IiwicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwibmFtZSI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwiX2lkIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiZW1haWwiOnRydWUsIm5hbWUiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJfaWQiOiI1NmY0N2QxNGMzMTA0OTU3OGVlMDBjMjkiLCJwYXNzd29yZCI6IiQyYSQxMCRuTnkxc1FXUHNyaDVrN0plbEVJbnZlWm1ES092bzAvYkp4TDloVFBUYkZBMWZhM2NFL0d6dSIsImVtYWlsIjoic2NvdHRAaGVyb24uY29tIiwibmFtZSI6IlNjb3R0In0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGwsbnVsbF19LCJfcG9zdHMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W119LCJpYXQiOjE0NTg4NjQwNjJ9.gjmOyBsYbyou14ND0EEgqutrTRbIzrU4KoOy5A8WsOE';
      }
      return config;
    }
  }
}])