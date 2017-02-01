(function () {
  'use strict';

  angular.module('components.product-category')
    .controller('ProductCategoryFormController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onInit = onInit;

    ctrl.doCreate = doCreate;
    ctrl.doUpdate = doUpdate;
    ctrl.doDelete = doDelete;

    function onInit() {
      ctrl.model = ctrl.productCategory.attributes;
      mapTags();
      ctrl.serverErrors = null;
    }

    function doCreate() {
      ctrl.serverErrors = null;

      unmapTags();
      ctrl.onCreate({
        $event: {
          productCategory: ctrl.productCategory
        }
      }).catch(function(errors) {
        ctrl.serverErrors = errors;
      });
    }

    function doUpdate() {
      ctrl.serverErrors = null;

      unmapTags();
      ctrl.onUpdate({
        $event: {
          productCategory: ctrl.productCategory
        }
      }).catch(function(errors) {
        ctrl.serverErrors = errors;
      });
    }

    function doDelete() {
      ctrl.serverErrors = null;

      ctrl.onDelete({
        $event: {
          productCategory: ctrl.productCategory
        }
      }).catch(function(errors) {
        ctrl.serverErrors = errors;
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
