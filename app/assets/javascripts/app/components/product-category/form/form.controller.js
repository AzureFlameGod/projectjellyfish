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
    }

    function doCreate() {
      unmapTags();
      ctrl.onCreate({
        $event: {
          productCategory: ctrl.productCategory
        }
      });
    }

    function doUpdate() {
      unmapTags();
      ctrl.onUpdate({
        $event: {
          productCategory: ctrl.productCategory
        }
      });
    }

    function doDelete() {
      ctrl.onDelete({
        $event: {
          productCategory: ctrl.productCategory
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
