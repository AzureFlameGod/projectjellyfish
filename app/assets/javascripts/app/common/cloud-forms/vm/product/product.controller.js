(function () {
  'use strict';

  angular.module('common')
    .controller('CloudFormsVmProductController', Controller);

  /** @ngInject */
  function Controller($q, NotificationsService, ProviderDataService) {
    var ctrl = this;

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.$postLink = postLink;
    ctrl.$onDestroy = onDestroy;

    ctrl.setProvider = setProvider;
    ctrl.setTemplate = setTemplate;
    ctrl.setFlavor = setFlavor;
    // ctrl.doEvent = doEvent;

    function onInit() {
      initProviderData();
    }

    function onChanges(changes) {
    }

    function postLink() {
    }

    function onDestroy() {
    }

    // function doEvent(event, item) {
    //   return ctrl['on' + event]({
    //     $event: {
    //       cloudFormsVmProduct: item
    //     }
    //   });
    // }

    function setProvider(event) {
      ctrl.provider = event.providerData;
      ctrl.item.attributes.settings.provider_ext_id = event.providerData.attributes.ext_id;
      updateDataLayout();
    }

    function setTemplate(event) {
      ctrl.template = event.providerData;
      ctrl.item.attributes.settings.template_ext_id = event.providerData.attributes.ext_id;
    }

    function setFlavor(event) {
      ctrl.flavor = event.providerData;
      ctrl.item.attributes.settings.flavor_ext_id = event.providerData.attributes.ext_id;
    }

    function initProviderData() {
      var pPromise = fetchProviderData(ctrl.item.attributes.settings.provider_ext_id, 'provider')
        .then(setProvider)
        .catch(function (error) {
          if (error) {
            NotificationsService.error('The information for the external management system failed to load.', 'EMS Error', {
              more: 'RecordNotFound error for ext_id:' + ctrl.item.attributes.settings.provider_ext_id + ', data_type:provider'
            });
          }

          return false;
        });
      var tPromise = fetchProviderData(ctrl.item.attributes.settings.template_ext_id, 'template')
        .then(setTemplate)
        .catch(function (error) {
          if (error) {
            NotificationsService.error('The information for the vm template failed to load.', 'VM Template Error', {
              more: 'RecordNotFound error for ext_id:' + ctrl.item.attributes.settings.template_ext_id + ', data_type:template'
            });
          }

          return false;
        });
      var fPromise = fetchProviderData(ctrl.item.attributes.settings.flavor_ext_id, 'flavor')
        .then(setFlavor)
        .catch(function (error) {
          if (error) {
            NotificationsService.error('The information for the vm flavor failed to load.', 'VM Flavor Error', {
              more: 'RecordNotFound error for ext_id:' + ctrl.item.attributes.settings.flavor_ext_id + ', data_type:flavor'
            });
          }

          return false;
        });

      ctrl.isLoading = true;

      // After we've gotten all the things
      $q.all([pPromise, tPromise, fPromise])
        .then(function () {
          ctrl.isLoading = false;
        })
        .finally(function () {
          updateDataLayout();
        });
    }

    function fetchProviderData(ext_id, type) {
      var query = {
        filter: {
          provider_id: ctrl.item.attributes.provider_id,
          ext_id: ext_id,
          data_type: type
        }
      };

      if (angular.isUndefined(ext_id) || !ext_id) {
        // No data; Not an error
        return $q.reject(false);
      }

      return ProviderDataService.search(query)
        .then(function (results) {
          if (results.length > 0) {
            return {
              providerData: results[0]
            };
          }

          return $q.reject(true);
        });
    }

    function updateDataLayout() {
      var showTemplate = true;
      var showFlavor = true;
      var showDiskSize = true;
      var providerType;

      if (ctrl.isLoading) {
        return;
      }

      if (angular.isUndefined(ctrl.provider) || !ctrl.provider) {
        ctrl.showTemplate = false;
        ctrl.showFlavor = false;
        ctrl.showDiskSize = false;
        return;
      }

      // Allows controlling which inputs will be displayed and required
      providerType = ctrl.provider.attributes.properties.type;

      // Clear values when the provider changes and our template or flavor don't have a matching ext_group_id
      if (ctrl.template && ctrl.template.attributes.ext_group_id != ctrl.provider.attributes.ext_id) {
        ctrl.template = undefined;
        ctrl.item.attributes.settings.template_ext_id = null;
      }
      if (ctrl.flavor && ctrl.template.attributes.ext_group_id != ctrl.provider.attributes.ext_id) {
        ctrl.flavor = undefined;
        ctrl.item.attributes.settings.flavor_ext_id = null;
      }

      switch (providerType) {
        case 'google':
          break;
        case 'vmware':
          showFlavor = false;
          showDiskSize = false;
          break;
        case 'aws':
          showDiskSize = false;
          break;
        case 'azure':
          showDiskSize = false;
          break;
        default:
          showTemplate = false;
          showFlavor = false;
          showDiskSize = false;
          break;
      }

      ctrl.showTemplate = showTemplate;
      ctrl.showFlavor = showFlavor;
      ctrl.showDiskSize = showDiskSize;
    }
  }
})();
