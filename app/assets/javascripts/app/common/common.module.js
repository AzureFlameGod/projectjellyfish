(function () {
  'use strict';

  angular.module('common', [
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngSanitize',
    'ui.router',
    'angular-loading-bar',
    'chart.js'
  ]).config(configure)
    .run(setup);

  /** @ngInject */
  function configure($compileProvider, $locationProvider, cfpLoadingBarProvider) {
    // Disable debug info
    // TODO: Enable for the 'test' environments
    $compileProvider.debugInfoEnabled(false);

    // Use HTML5 routing for clean routes; Backing server must have a catch-all route
    $locationProvider.html5Mode(true);

    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar-spinner" class="text--primary"><small><i class="fa fa-cog fa-spin"></i> Loading...</small></div>';
  }

  /** @ngInject */
  function setup($transitions, $state, AuthService, cfpLoadingBar) {
    // $transitions.onStart({}, cfpLoadingBar.start);
    // $transitions.onSuccess({}, cfpLoadingBar.complete);
    // $transitions.onError({}, cfpLoadingBar.complete);
  }
})();
