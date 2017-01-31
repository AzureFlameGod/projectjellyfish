(function () {
  'use strict';

  angular.module('common')
    .controller('UsersListController', Controller);

  /** @ngInject */
  function Controller($window, $state, UserService) {
    var ctrl = this;

    ctrl.terms = '';
    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.onShow = onShow;
    ctrl.onUpdate = onUpdate;
    ctrl.onAction = onAction;
    ctrl.onSearch = onSearch;
    ctrl.reload = reload;
    ctrl.changePage = changePage;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
        ctrl.terms = ctrl.query.filter.like;
      }
    }

    function onShow(event) {
      $state.go('users.show', {id: event.user.id});
    }

    function onUpdate(event) {
      $state.go('users.edit', {id: event.user.id});
    }

    function onAction(event) {
      var message = 'Confirm you want to ' + event.action + ' this user?';

      if ($window.confirm(message)) {
        UserService
          .action(event.user.id, UserService.buildAction(event.user, event.action))
          .then(function (response) {
            ctrl.users = ctrl.users.map(function (user) {
              if (user.id === response.id) {
                return response;
              }
              return user;
            });
          });
      }
    }

    function onSearch() {
      if (ctrl.terms == '') {
        delete ctrl.query.filter['like'];
      } else {
        ctrl.query.filter.like = ctrl.terms;
      }

      $state.go('.', {terms: ctrl.terms}, {notify: false});

      if (ctrl.query.page) {
        ctrl.query.page.number = 1;
      }

      reload();
    }

    function reload() {
      ctrl.reloading = true;

      return UserService.search(ctrl.query)
        .then(function (response) {
          ctrl.users = response;
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }

    function changePage(event) {
      $state.go('.', {page: event.page}, {notify: false});
      ctrl.query.page.number = event.page;
      reload();
    }
  }
})();
