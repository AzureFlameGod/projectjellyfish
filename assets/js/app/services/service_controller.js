'use strict';

/**@ngInject*/
function ServiceController($scope, $sce, service, viewValues) {
  this.$scope = $scope;

  $scope.service = service;
  $scope.viewValues = viewValues;
  $scope.tab = "feature";

  service.feature = $sce.trustAsHtml(service.feature);
  service.specification = $sce.trustAsHtml(service.specification);
  service.review = $sce.trustAsHtml(service.review);
}

ServiceController.prototype.setTab = function(tab) {
  var self = this;

  self.$scope.tab = tab;
};

ServiceController.resolve = {
  /**@ngInject*/
  service: function(Service, $stateParams) {
    return Service.get({id: $stateParams.serviceId});
  },
  /**@ngInject*/
  viewValues: function(DataService) {
    return DataService.getMarketplaceValues();
  }
};

module.exports = ServiceController;

