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
  function configure($compileProvider, $logProvider, $locationProvider, cfpLoadingBarProvider) {
    var isLocal = !![/^localhost/, /^127.0.0.1/, /^\[::1]/].find(function(address) {
      return address.test(window.location.host)
    });

    // Disable debug info for all remote requests
    $compileProvider.debugInfoEnabled(isLocal);
    $logProvider.debugEnabled(isLocal);

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
