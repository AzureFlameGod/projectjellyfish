(function () {
  'use strict';

  angular.module('common')
    .controller('ShowProjectUsersController', Controller);

  /** @ngInject */
  function Controller($window, UserService, MemberService, MembershipService) {
    var ctrl = this;

    ctrl.reloading = false;

    ctrl.users = [];
    ctrl.findingUsers = false;

    ctrl.$onChanges = onChanges;
    ctrl.reload = reload;
    ctrl.changePage = changePage;

    ctrl.onSave = onSave;
    ctrl.onDelete = onDelete;

    ctrl.findUsers = findUsers;
    ctrl.selectUser = selectUser;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }

      if (changes.members) {
        ctrl.meta = angular.copy(ctrl.members.meta());
        ctrl.members = angular.copy(ctrl.members);
      }
    }

    function reload() {
      ctrl.reloading = true;

      return MemberService.search(ctrl.query)
        .then(function (members) {
          ctrl.meta = angular.copy(members.meta());
          ctrl.members = angular.copy(members);
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

    function onSave(event) {
      var membership = {
        id: event.member.id,
        type: 'memberships',
        attributes: {
          user_id: event.member.attributes.user_id,
          project_id: event.member.attributes.project_id,
          role: event.member.attributes.role
        }
      };

      // Members is a readonly VIEW; direct changes to the Membership
      return MembershipService.update(membership);
    }

    function onDelete(event) {
      var message = 'Remove ' + event.member.attributes.user_name + ' from the project?';

      if ($window.confirm(message)) {
        // Members is a readonly VIEW; direct changes to the Membership
        return MembershipService.destroy(event.member)
          .then(function () {
            reload();
          });
      }
    }

    function findUsers(event) {
      ctrl.findingUsers = true;

      return UserService.search({
        fields: {
          users: 'name,avatar_url'
        },
        filter: {
          like: event.query
        },
        page: {
          number: 1,
          size: 10
        },
        sort: 'name'
      })
        .then(function (results) {
          ctrl.users = results.map(function (user) {
            return { label: user.attributes.name, value: user };
          });
        })
        .finally(function () {
          ctrl.findingUsers = false;
        });
    }

    function selectUser(event) {
      var membership = MembershipService.build(ctrl.project, event.item.value);

      return MembershipService.create(membership)
        .then(function () {
          reload();
        });
    }
  }
})();
