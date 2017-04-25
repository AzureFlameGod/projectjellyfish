(function () {
  'use strict';

  angular.module('common')
    .controller('CloudFormsVmProductTemplateController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.isLoading = false;
    ctrl.isOpen = false;
    ctrl.tableSettings = {
      headers: ['Name', 'Description'],
      columns: ['attributes.name', 'attributes.description']
    };

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.$postLink = postLink;
    ctrl.$onDestroy = onDestroy;

    ctrl.openModal = openModal;
    ctrl.doSelect = doSelect;

    function onInit() {
    }

    function onChanges(changes) {
      if (changes.template) {
        ctrl.template = angular.copy(ctrl.template);
        setValueText();
      }
    }

    function postLink() {
    }

    function onDestroy() {
    }

    // init
    function buildQuery() {
      ctrl.query = {
        filter: {
          provider_id: ctrl.vm.item.attributes.provider_id,
          data_type: 'template',
          deprecated: false,
          ext_group_id: ctrl.vm.provider.attributes.ext_id || null
        },
        page: {
          number: 1,
          size: 5
        }
      };
    }

    // input
    function setValueText() {
      if (angular.isUndefined(ctrl.template)) {
        ctrl.text = '';
        return;
      }

      ctrl.text = ctrl.template.attributes.name;

      if (ctrl.template.attributes.deprecated) {
        ctrl.text = ctrl.text + ' (deprecated)';
      }
    }

    // input
    function openModal() {
      buildQuery();

      ctrl.query.page.number = 1;
      ctrl.isOpen = true;
    }

    function doSelect(event) {
      ctrl.template = angular.copy(event.providerData);
      setValueText();
      ctrl.isOpen = false;
      ctrl.onSelect({
        $event: {
          providerData: event.providerData
        }
      });
    }
  }
})();
