(function () {
  'use strict';

  angular.module('components.filter')
    .controller('PolicyModalController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.doEvent = doEvent;

    function onChanges(changes) {
      if (changes.policy) {
        ctrl.policy = angular.copy(ctrl.policy);
      }
    }

    function doEvent(event) {
      return ctrl['on' + event]({
        $event: {
          policy: processTags(ctrl.policy)
        }
      });
    }

    function processTags(policy) {
      var item = angular.copy(policy);

      item.attributes.tag_list = item.attributes.tag_list.map(function(tag) {
        return tag.text;
      });

      return item;
    }
  }
})();
