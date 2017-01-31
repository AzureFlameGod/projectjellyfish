(function () {
  'use strict';

  angular.module('components.member')
    .component('members', {
      templateUrl: 'components/member/members/list.html',
      controller: 'MembersController',
      bindings: {
        members: '<',
        maxRole: '<',
        onSave: '&?',
        onDelete: '&?'
      }
    });
})();
