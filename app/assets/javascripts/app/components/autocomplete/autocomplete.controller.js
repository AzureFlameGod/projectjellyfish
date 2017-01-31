(function () {
  'use strict';

  angular.module('components.autocomplete')
    .controller('AutocompleteController', Controller);

  /** @ngInject */
  function Controller($timeout) {
    var ctrl = this;

    var key = {up: 38, down: 40, enter: 13, esc: 27, tab: 9};

    var lastQuery = null;
    var nextQuery = null;

    ctrl.selectedIndex = -1;

    ctrl.$onChanges = onChanges;

    ctrl.onKeyup = onKeyup;
    ctrl.doChange = doChange;
    ctrl.doSelect = doSelect;

    function onChanges(changes) {
      if (changes.items) {
        ctrl.items = angular.copy(ctrl.items);
        reset();
      }
    }

    function doChange(query) {
      if (query == '') {
        clear();
      }

      if (ctrl.isLoading) {
        nextQuery = query;
        return;
      }

      lastQuery = query;

      if (query != null && query != '') {
        return ctrl.onChange({
          $event: {
            query: query
          }
        })
          .finally(function () {
            if (nextQuery != lastQuery) {
              $timeout(function () {
                doChange(nextQuery);
              });
            }
          });
      }
    }

    function doSelect(item) {
      return ctrl.onSelect({
        $event: {
          query: ctrl.input,
          item: item
        }
      })
        .finally(function () {
          clear();
        });
    }

    function onKeyup(event) {
      var keycode = event.keyCode || event.which;

      switch (keycode) {
        case key.down:
          if (ctrl.selectedIndex < ctrl.items.length-1) {
            ctrl.selectedIndex += 1;
          } else {
            ctrl.selectedIndex = 0;
          }
          break;
        case key.up:
          if (ctrl.selectedIndex > 0) {
            ctrl.selectedIndex -= 1;
          } else {
            ctrl.selectedIndex = ctrl.items.length - 1;
          }
          break;
        case key.tab:
        case key.enter:
          if (ctrl.selectedIndex != -1) {
            doSelect(ctrl.items[ctrl.selectedIndex]);
          }
          break;
        case key.esc:
          reset();
          clear();
      }
    }

    function reset() {
      ctrl.selectedIndex = -1;
    }

    function clear() {
      nextQuery = null;
      ctrl.input = '';
      ctrl.items.length = 0;
    }
  }
})();
