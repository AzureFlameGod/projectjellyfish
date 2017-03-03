(function () {
  'use strict';

  angular.module('components.provider')
    .controller('ProviderDataModalController', Controller);

  /** @ngInject */
  function Controller($parse, ProviderDataService) {
    var ctrl = this;

    ctrl.isLoading = false;

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.$postLink = postLink;
    ctrl.$onDestroy = onDestroy;

    ctrl.doEvent = doEvent;
    ctrl.changePage = changePage;
    ctrl.select = select;
    ctrl.search = search;

    function onInit() {
      reload();
    }

    function onChanges(changes) {
      if (changes.tableSettings) {
        ctrl.headers = angular.copy(ctrl.tableSettings.headers);
        ctrl.getters = ctrl.tableSettings.columns.map(function(expression) {
          return $parse(expression);
        });
      }

      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }
    }

    function postLink() {
    }

    function onDestroy() {
    }

    function doEvent(event, item) {
      if (angular.isUndefined(ctrl['on' + event])) {
        return;
      }

      return ctrl['on' + event]({
        $event: {
          providerData: item
        }
      });
    }

    // ----

    // modal
    function changePage(event) {
      ctrl.query.page.number = event.page;
      reload();
    }

    // modal
    function select(item) {
      ctrl.onSelect({
        $event: {
          provider: item
        }
      });
    }

    // modal
    function search(event) {
      ctrl.query.filter.like = event.search;
      ctrl.query.page.number = 1;
      reload();
    }

    // modal
    function reload() {
      ctrl.isLoading = true;

      return ProviderDataService
        .search(ctrl.query)
        .then(function(rows) {
          ctrl.rows = angular.copy(rows);
          ctrl.meta = angular.copy(rows.meta());
        })
        .finally(function () {
          ctrl.isLoading = false;
        });
    }
  }
})();
