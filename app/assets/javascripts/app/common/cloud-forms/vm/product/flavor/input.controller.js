(function () {
  'use strict';

  angular.module('common')
    .controller('CloudFormsVmProductFlavorController', Controller);

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
      if (changes.flavor) {
        ctrl.flavor = angular.copy(ctrl.flavor);
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
          data_type: 'flavor',
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
      if (angular.isUndefined(ctrl.flavor)) {
        ctrl.text = '';
        return;
      }

      ctrl.text = ctrl.flavor.attributes.name;

      if (ctrl.flavor.attributes.deprecated) {
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
      ctrl.flavor = angular.copy(event.providerData);
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
