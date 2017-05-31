(function () {
  'use strict';

  var component = {
    templateUrl: 'common/providers/list/list.html',
    controller: 'ProvidersListController',
    bindings: {
      query: '<',
      providers: '<'
    }
  };

  angular.module('common')
    .component('providersList', component)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('providers.list', {
        url: '',
        views: {
          'main@app': 'providersList'
        },
        resolve: {
          query: function() {
            return {
              sort: 'name'
            }
          },
          providers: function(query, ProviderService) {
            return ProviderService.search(query);
          }
        }
      });
  }
})();
