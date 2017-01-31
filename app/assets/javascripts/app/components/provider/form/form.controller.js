(function () {
  'use strict';

  angular.module('components.provider')
    .controller('ProviderFormController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;

    ctrl.onChange = onChange;
    ctrl.doCreate = doCreate;
    ctrl.doUpdate = doUpdate;
    ctrl.doDelete = doDelete;

    function onInit() {
      ctrl.provider = angular.copy(ctrl.provider);
      ctrl.model = ctrl.provider.attributes;
      mapTags();
    }

    function onChange(event) {
      ctrl.provider = angular.copy(ctrl.provider);
      ctrl.model = ctrl.provider.attributes;
      ctrl.model.credentials = angular.merge({}, event.credentials);
    }

    function doCreate() {
      unmapTags();
      ctrl.onCreate({
        $event: {
          provider: ctrl.provider
        }
      });
    }

    function doUpdate() {
      unmapTags();
      ctrl.onUpdate({
        $event: {
          provider: ctrl.provider
        }
      });
    }

    function doDelete() {
      ctrl.onDelete({
        $event: {
          provider: ctrl.provider
        }
      });
    }

    function mapTags() {
      ctrl.tags = ctrl.model.tag_list.map(function(tag) {
        return {text: tag};
      });
    }

    function unmapTags() {
      ctrl.model.tag_list = ctrl.tags.map(function(tag) {
        return tag.text;
      });
    }
  }
})();
