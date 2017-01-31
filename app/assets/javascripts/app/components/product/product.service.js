(function () {
  'use strict';

  angular.module('components.product')
    .factory('ProductService', Service);

  /** @ngInject */
  function Service(ApiService) {
    var service = {
      build: build,
      create: create,
      search: search,
      show: show,
      update: update,
      destroy: destroy
    };

    var API_ROUTE = ApiService.routes.products;

    return service;

    function build(provider, productType) {
      var product = {
        id: null,
        type: 'products',
        attributes: {
          type: '',
          product_type_id: null,
          name: '',
          description: '',
          setup_price: '0.0',
          hourly_price: '0.0',
          monthly_price: '0.0',
          properties: [],
          settings: {},
          tag_list: [],
          active: true
        }
      };

      product.attributes.type = productType.attributes.type.replace(/_type$/, '');
      product.attributes.provider_id = provider.id;
      product.attributes.product_type_id = productType.id;
      product.attributes.properties = productType.attributes.properties;
      product.attributes.settings = productType.attributes.default_settings;
      product.attributes.tag_list = provider.attributes.tag_list.concat(productType.attributes.tag_list);

      return product;
    }

    function search(query) {
      return ApiService.search(API_ROUTE, query);
    }

    function show(id, query) {
      return ApiService.show(API_ROUTE + '/' + id, query);
    }

    function create(data, query) {
      return ApiService.create(API_ROUTE, data, query);
    }

    function update(data, query) {
      return ApiService.update(API_ROUTE + '/' + data.id, data, query);
    }

    function destroy(data) {
      return ApiService.destroy(API_ROUTE + '/' + data.id);
    }
  }
})();
