(function () {
  'use strict';

  var component = {
    templateUrl: 'common/providers/show/show.html',
    controller: 'ProviderShowController',
    bindings: {
      provider: '<'
    }
  };

  angular.module('common')
    .component('providerShow', component)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('providers.show', {
        url: '/{id:[a-f0-9-]{36}}',
        views: {
          'main@app': 'providerShow'
        },
        resolve: {
          provider: function($transition$, ProviderService) {
            var id = $transition$.params().id;

            return ProviderService.show(id);
          }
        }
      })
  }
})();
