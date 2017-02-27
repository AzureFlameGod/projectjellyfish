(function () {
  'use strict';

  angular.module('components.compare')
    .controller('CompareModalController', Controller);

  /** @ngInject */
  function Controller(NotificationsService, CartService) {
    var ctrl = this;

    ctrl.rows = [];

    ctrl.$onInit = onInit;
    ctrl.$onChanges = onChanges;
    ctrl.$postLink = postLink;
    ctrl.$onDestroy = onDestroy;

    ctrl.addToCart = addToCart;

    function onInit() {
    }

    function onChanges(changes) {
      if (changes.items) {
        ctrl.items = angular.copy(ctrl.items);

        buildRows();
      }
    }

    function postLink() {
    }

    function onDestroy() {
    }

    function addToCart(item) {
      CartService
        .addToCart(item)
        .then(function (response) {
        })
        .catch(function (errors) {
          NotificationsService.error('There was a problem adding the item to your cart.', 'Error')
        });
    }

    function buildRows() {
      // Reset row data
      ctrl.rows = [];

      // properties rows
      // price rows

      var propNames = [];
      var propRows = {};
      var priceRows = {
        setup: new Array(ctrl.items.length).fill(''),
        hourly: new Array(ctrl.items.length).fill(''),
        monthly: new Array(ctrl.items.length).fill('')
      };

      // Build row and column data for each item
      angular.forEach(ctrl.items, function (item, index) {
        var properties = item.attributes.properties;

        // Populate prices
        priceRows.setup[index] = ['$', +parseFloat(item.attributes.setup_price).toFixed(4)].join('');
        priceRows.hourly[index] = ['$', +parseFloat(item.attributes.hourly_price).toFixed(4)].join('');
        priceRows.monthly[index] = ['$', +parseFloat(item.attributes.monthly_price).toFixed(4)].join('');

        if (angular.isUndefined(properties) || properties.length == 0) {
          return;
        }

        // Populate properties taking care to combine common properties into a single row.
        angular.forEach(properties, function (property) {
          if (propNames.indexOf(property.name) === -1) {
            propNames.push(property.name);
            propRows[property.name] = new Array(ctrl.items.length).fill('');
          }

          propRows[property.name][index] = property.value;
        });
      });

      propNames.sort();

      angular.forEach(propNames, function (name) {
        ctrl.rows.push({
          name: name,
          values: propRows[name]
        });
      });

      ctrl.rows.push({name: 'Setup', values: priceRows.setup});
      ctrl.rows.push({name: 'Hourly', values: priceRows.hourly});
      ctrl.rows.push({name: 'Monthly', values: priceRows.monthly});
    }
  }
})();
