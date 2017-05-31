(function () {
  'use strict';

  var component = {
    templateUrl: 'common/providers/edit/edit.html',
    controller: 'ProviderEditController',
    bindings: {
      provider: '<'
    }
  };

  angular.module('common')
    .component('providerEdit', component)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('providers.edit', {
        url: '/{id:[a-f0-9-]{36}}/edit',
        views: {
          'main@app': 'providerEdit'
        },
        resolve: {
          provider: function($transition$, ProviderService) {
            var id = $transition$.params().id;

            return ProviderService.show(id);
          }
        }
      });
  }
})();
