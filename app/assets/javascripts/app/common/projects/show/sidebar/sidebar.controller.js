(function () {
  'use strict';

  angular.module('common')
    .controller('ProjectSidebarController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.items = [];

    ctrl.$onChanges = onChanges;

    function onChanges(changes) {
      if (changes.project) {
        ctrl.project = angular.copy(ctrl.project);
        ctrl.stateParams = {id: ctrl.project.id};
      }

      if (changes.member) {
        ctrl.member = angular.copy(ctrl.member);
      }

      ctrl.items.length = 0;
      setMenuItems();
    }

    function setMenuItems() {
      ctrl.items.push({label: 'Back to Projects', icon: 'fa-caret-left', state: 'projects.list'});
      ctrl.items.push({divider: true});
      ctrl.items.push({label: 'Project Info', state: 'projects.show.info', params: ctrl.stateParams});
      ctrl.items.push({label: 'Services', state: 'projects.show.services', params: ctrl.stateParams});

      if (isManager()) {
        ctrl.items.push({label: 'Members', state: 'projects.show.users', params: ctrl.stateParams});
      }

      ctrl.items.push({label: 'Marketplace', state: 'marketplace.list', params: {projectId: ctrl.project.id}});

      if (isManager()) {
        ctrl.items.push({label: 'Product Policy', state: 'projects.show.policy', params: ctrl.stateParams});
      }
    }

    function isManager() {
      return isAdmin() || ctrl.member.attributes.role == 'manager';
    }

    function isAdmin() {
      return isOwner() || ctrl.member.attributes.role == 'admin';
    }

    function isOwner() {
      return ctrl.member.attributes.role == 'owner';
    }
  }
})();
