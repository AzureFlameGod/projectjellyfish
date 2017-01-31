(function () {
  'use strict';

  angular.module('components.pagination')
    .controller('PaginationController', Controller);

  /** @ngInject */
  function Controller() {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.changePage = changePage;

    function onChanges(changes) {
      if (changes.pagination) {
        ctrl.page = parseInt(ctrl.pagination.page.number, 10);
        ctrl.total_pages = parseInt(ctrl.pagination.total_pages, 10);
        ctrl.pages = intermediatePages();
      }
    }

    function changePage(page) {
      if (page == ctrl.page) {
        return;
      }

      return ctrl.onChangePage({
        $event: {
          page: page
        }
      });
    }

    function intermediatePages() {
      var pages = [];

      if (ctrl.page != 1) {
        pages.push({page: 1, label: 1});
      }
      if (ctrl.page >= 4) {
        pages.push({page: ctrl.page - 2, label: ctrl.page > 4 ? '...' : ctrl.page - 2})
      }
      if (ctrl.page > 1 && ctrl.page != 2) {
        pages.push({page: ctrl.page - 1, label: ctrl.page - 1})
      }
      pages.push({page: ctrl.page, label: ctrl.page});
      if (ctrl.page < ctrl.total_pages && ctrl.page != ctrl.total_pages - 1) {
        pages.push({page: ctrl.page + 1, label: ctrl.page + 1})
      }
      if (ctrl.page < ctrl.total_pages - 3) {
        pages.push({page: ctrl.page + 2, label: ctrl.page < ctrl.total_pages - 3 ? '...' : ctrl.page + 2})
      }
      if (ctrl.total_pages > 1 && ctrl.total_pages != ctrl.page) {
        pages.push({page: ctrl.total_pages, label: ctrl.total_pages});
      }


      return pages;
    }
  }
})();
