(function () {
  'use strict';

  angular.module('common')
    .controller('CloudFormsVmProductProviderController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.isLoading = false;
    ctrl.isOpen = false;
    ctrl.tableSettings = {
      headers: ['Name', 'Type'],
      columns: ['attributes.name', 'attributes.properties.type']
    };

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.$postLink = postLink;
    ctrl.$onDestroy = onDestroy;

    ctrl.doEvent = doEvent;
    ctrl.openModal = openModal;
    ctrl.doSelect = doSelect;

    function onInit() {
    }

    function onChanges(changes) {
      if (changes.item) {
        ctrl.item = angular.copy(ctrl.item);
        buildQuery();
      }

      if (changes.provider) {
        ctrl.provider = angular.copy(ctrl.provider);
        setValueText();
      }
    }

    function postLink() {
    }

    function onDestroy() {
    }

    function doEvent(event, item) {
      return ctrl['on' + event]({
        $event: {
          providerData: item
        }
      });
    }

    // init
    function buildQuery() {
      ctrl.query = {
        filter: {
          provider_id: ctrl.item.attributes.provider_id,
          data_type: 'provider',
          deprecated: false
        },
        page: {
          number: 1,
          size: 5
        }
      };
    }

    // input
    function setValueText() {
      if (angular.isUndefined(ctrl.provider)) {
        ctrl.text = '';
        return;
      }

      ctrl.text = ctrl.provider.attributes.name;

      if (ctrl.provider.attributes.deprecated) {
        ctrl.text = ctrl.text + ' (deprecated)';
      }
    }

    // input
    function openModal() {
      ctrl.query.page.number = 1;
      ctrl.isOpen = true;
    }

    function doSelect(event) {
      ctrl.provider = angular.copy(event.providerData);
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
