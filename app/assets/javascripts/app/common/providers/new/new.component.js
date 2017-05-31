(function () {
  'use strict';

  var componentStep1 = {
    templateUrl: 'common/providers/new/step-1.html',
    controller: 'ProviderNewStep1Controller',
    bindings: {
      providerTypes: '<'
    }
  };

  var componentStep2 = {
    templateUrl: 'common/providers/new/step-2.html',
    controller: 'ProviderNewStep2Controller',
    bindings: {
      providerType: '<'
    }
  };

  angular.module('common')
    .component('providerNewStep1', componentStep1)
    .component('providerNewStep2', componentStep2)
    .config(configure);

  /** @ngInject */
  function configure($stateProvider) {
    $stateProvider
      .state('providers.new', {
        url: '/new',
        views: {
          'main@app': 'providerNewStep1'
        },
        resolve: {
          providerTypes: function(ProviderTypeService) {
            return ProviderTypeService.getProviderTypes();
          }
        }
      })
      .state('provider-new-step-2', {
        parent: 'providers.new',
        url: '/:id',
        views: {
          'main@app': 'providerNewStep2'
        },
        resolve: {
          providerType: function($transition$, providerTypes, ProviderTypeService) {
            var id = $transition$.params().id;
            var providerType = providerTypes.find(function(item) {
              return item.id === id;
            });

            if (providerType) {
              return providerType;
            }

            return ProviderTypeService.getProviderTypeById(id);
          }
        }
      });
  }
})();
