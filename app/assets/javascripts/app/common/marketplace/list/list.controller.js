(function () {
  'use strict';

  angular.module('common')
    .controller('MarketplaceListingController', Controller);

  /** @ngInject */
  function Controller($state, $stateParams, CartService, ProductService, NotificationsService) {
    var ctrl = this;

    ctrl.reloading = false;
    ctrl.search = $stateParams.search;

    ctrl.$onChanges = onChanges;
    ctrl.onSelectCategory = onSelectCategory;
    ctrl.onSelectProject = onSelectProject;
    ctrl.doSearch = doSearch;
    ctrl.changePage = changePage;
    ctrl.addToCart = addToCart;

    function onChanges(changes) {
      if (changes.query) {
        ctrl.query = angular.copy(ctrl.query);
      }

      if (changes.products) {
        ctrl.meta = angular.copy(ctrl.products.meta());
        ctrl.products = angular.copy(ctrl.products);
      }
    }

    function doSearch(search) {
      if (search == '') {
        delete ctrl.query.filter['search'];
      }
      $state.go('.', {search: search, page: 1}, {notify: true});
      reload();
    }

    function reload() {
      ctrl.reloading = true;

      return ProductService.search(ctrl.query)
        .then(function(results) {
          ctrl.meta = angular.copy(results.meta());
          ctrl.products = angular.copy(results);
        })
        .finally(function () {
          ctrl.reloading = false;
        });
    }

    function changePage(event) {
      $state.go('.', {page: event.page});
      ctrl.query.page.number = event.page;
      reload();
    }

    function onSelectCategory(event) {
      // Forces a page reload; To change that, the param would need to be taken out of the URL and made into a query param
      if (event.productCategory) {
        $state.go('.', {productCategoryId: event.productCategory.id, page: 1});
      } else {
        $state.go('.', {productCategoryId: 'all', page: 1});
      }
    }

    function onSelectProject(event) {
      if (event.project) {
        $state.go('.', {projectId: event.project.id, page: 1});
        ctrl.query.filter.project_policy = event.project.id;
        ctrl.project = angular.copy(event.project);
        CartService.project = angular.copy(event.project);
      } else {
        $state.go('.', {projectId: null, page: 1});
        delete ctrl.query.filter.project_policy;
        ctrl.project = null;
        CartService.project = null;
      }
      reload();
    }

    function addToCart(event) {
      CartService
        .addToCart(event.product)
        .catch(function (errors) {
          console.log(errors);
          if (errors.errors['project_id']) {
            NotificationsService.error('You must select a project first.', 'Project Missing');
          }
        });
    }
  }
})();
