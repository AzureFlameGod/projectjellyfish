(function () {
  'use strict';

  angular.module('components.auth')
    .factory('AuthService', AuthService);

  /** @ngInject */
  function AuthService($q, $http, $auth) {
    var service = {
      login: login,
      logout: logout,
      requireAuthentication: requireAuthentication,
      requireRole: requireRole,
      isManager: isManager,
      isAdmin: isAdmin,
      isAuthenticated: isAuthenticated,
      getUser: getUser,
      requestPasswordReset: requestPasswordReset,
      resetPassword: resetPassword
    };

    var userData = null;

    return service;

    function login(user) {
      var data = {
        data: {
          type: 'sessions',
          attributes: user
        }
      };

      return $http
        .post('api/sessions', data)
        .then(storeUserData);
    }

    function logout() {
      userData = null;
      $auth.logout();

      return $q.resolve();
    }

    function requireAuthentication() {
      if ($auth.isAuthenticated()) {
        if (isAuthenticated()) {
          return $q.resolve(userData);
        }

        return $http
          .get('api/account_info')
          .then(storeUserData);
      }

      return $q.reject();
    }

    // Match any role
    function requireRole(roles) {
      if (!angular.isArray(roles)) {
        roles = [roles];
      }

      return requireAuthentication()
        .then(checkRole);

      function checkRole(user) {
        if (-1 !== roles.indexOf(user.attributes.role)) {
          return true;
        }

        return $q.reject();
      }
    }

    function isManager() {
      if (!userData) {
        return false;
      }

      return userData.attributes.role == 'manager' || userData.attributes.role == 'admin';
    }

    function isAdmin() {
      if (!userData) {
        return false;
      }

      return userData.attributes.role == 'admin';
    }

    function isAuthenticated() {
      return !!userData;
    }

    function getUser() {
      if (userData) {
        return userData;
      }
    }

    function requestPasswordReset(email) {
      var data = {
        data: {
          type: 'passwords',
          attributes: {
            email: email
          }
        }
      };

      return $http.post('api/passwords', data);
    }

    function resetPassword(token, reset) {
      var data = {
        data: {
          id: token,
          type: 'passwords',
          attributes: reset
        }
      };

      return $http.put('api/passwords', data);
    }

    function storeUserData(response) {
      var data = response.data;

      $auth.setToken(response.headers('Authorization'));
      userData = data.data;

      return userData;
    }
  }
})();
