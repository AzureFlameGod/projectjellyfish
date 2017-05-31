(function () {
  'use strict';

  angular.module('common')
    .controller('ProjectsListController', Controller);

  /** @ngInject */
  function Controller($state, ProjectService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.$onChanges = onChanges;
    ctrl.onSelect = onSelect;
    ctrl.reload = reload;
    ctrl.changePage = changePage;
    ctrl.sort = sort;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }
    }

    function onSelect(event) {
      $state.go('projects.show', {id: event.project.id});
    }

    function reload() {
      ctrl.reloading = true;

      return ProjectService.search(ctrl.query)
        .then(function (response) {
          ctrl.projects = response;
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

    function sort(event) {
      var sortParam = [
        (event.sortDir === -1 ? '-' : ''),
        event.sortBy
      ].join('');

      ctrl.query.sort = sortParam;

      reload();
    }
  }
})();
