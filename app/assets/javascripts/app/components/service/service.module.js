(function () {
  'use strict';

  angular.module('components.service', [
    'ui.router'
  ]).config(configure);

  /** @ngInject */
  function configure($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ssh|mailto):/);
  }
})();
