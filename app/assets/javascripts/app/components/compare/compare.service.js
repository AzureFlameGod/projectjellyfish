(function () {
  'use strict';

  angular.module('components.compare')
    .factory('CompareService', Service);

  /** @ngInject */
  function Service() {
    var service = {
      maximum: 4,
      add: add,
      remove: remove,
      list: list,
      isListed: isListed,
      subscribe: subscribe,
      unsubscribe: unsubscribe
    };

    var items = [];
    var listeners = [];

    return service;

    function add(item) {
      if (items.length < service.maximum) {
        items.push(item);
        notifyListeners('add', item);
      }
    }

    function remove(item) {
      var index = indexOf(item);

      if (index >= 0) {
        items.splice(index, 1);
        notifyListeners('remove', item);
      }
    }

    function list() {
      return angular.copy(items);
    }

    function isListed(item) {
      return indexOf(item) >= 0;
    }

    function subscribe(func) {
      listeners.push(func);
    }

    function unsubscribe(func) {
      var index = listeners.indexOf(func);

      if (index >= 0) {
        listeners.splice(index, 1);
      }
    }

    function notifyListeners(event, item) {
      angular.forEach(listeners, function(listener) {
        listener.call(null, {
          event: event,
          item: item,
          items: angular.copy(items)
        });
      });
    }

    function indexOf(item) {
      return items.findIndex(function(listItem) {
        return item.id == listItem.id && item.type == listItem.type;
      });
    }
  }
})();
