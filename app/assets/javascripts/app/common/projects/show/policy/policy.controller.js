(function () {
  'use strict';

  angular.module('common')
    .controller('ProjectPoliciesController', Controller);

  /** @ngInject */
  function Controller($window, FilterService) {
    var ctrl = this;

    ctrl.reloading = false;
    ctrl.newPolicy = null;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;
    ctrl.changePage = changePage;

    ctrl.buildPolicy = buildPolicy;
    ctrl.onCreate = onCreate;
    ctrl.onCancel = onCancel;
    ctrl.onSave = onSave;
    ctrl.onDelete = onDelete;

    function onChanges(changes) {
      if (changes.policies) {
        ctrl.meta = angular.copy(ctrl.policies.meta());
        ctrl.policies = angular.copy(ctrl.policies);
      }

      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }
    }

    function reload() {
      ctrl.reloading = true;

      return FilterService.search(ctrl.query)
        .then(function (results) {
          ctrl.meta = angular.copy(results.meta());
          ctrl.policies = angular.copy(results);
        })
        .finally(function() {
          ctrl.reloading = false;
        });
    }

    function changePage(event) {
      $state.go('.', {page: event.page}, {notify: false});
      ctrl.query.page.number = event.page;
      reload();
    }

    function buildPolicy() {
      ctrl.newPolicy = FilterService.build(ctrl.project.id, 'Project');
    }

    function onCreate(event) {
      ctrl.reloading = true;

      return FilterService.create(event.policy)
        .then(function() {
          ctrl.newPolicy = null;
          reload();
        });
    }

    function onCancel() {
      ctrl.newPolicy = null;
    }

    function onSave(event) {
      ctrl.reloading = true;

      return FilterService.update(event.policy)
        .finally(function () {
          ctrl.reloading = false;
        });
    }

    function onDelete(event) {
      var message = 'Remove this filter?';

      if ($window.confirm(message)) {
        return FilterService.destroy(event.policy)
          .then(function () {
            reload();
          });
      }
    }
  }
})();
