(function () {
  'use strict';

  angular.module('components.filter')
    .controller('PoliciesController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    var edits = [];

    ctrl.$onChanges = onChanges;

    ctrl.editing = editing;
    ctrl.edit = edit;
    ctrl.cancel = cancel;

    ctrl.processTags = processTags;
    ctrl.doEvent = doEvent;

    function onChanges(changes) {
      if (changes.policies) {
        ctrl.policies = angular.copy(ctrl.policies);
      }
    }

    function editing(index) {
      return edits.indexOf(index) != -1;
    }

    function edit(index) {
      edits.push(index);
    }

    function cancel(index) {
      ctrl.policies[index] = processTags(ctrl.policies[index]);
      edits.splice(edits.indexOf(index), 1);
    }

    function processTags(policy) {
      var item = angular.copy(policy);

      item.attributes.tag_list = item.attributes.tag_list.map(function (tag) {
        return tag.text;
      });

      return item;
    }

    function doEvent(event, policy) {
      var index = ctrl.policies.findIndex(function (item) {
        return item.id == policy.id;
      });

      if (angular.isUndefined(ctrl['on' + event])) {
        return;
      }

      return ctrl['on' + event]({
        $event: {
          policy: policy
        }
      })
        .finally(function () {
          cancel(index);
        });
    }
  }
})();
