(function () {
  'use strict';

  var apiBase = 'api/';

  var routes = {
    appSettings: apiBase + 'app_settings',
    cart: apiBase + 'cart',
    filters: apiBase + 'filters',
    members: apiBase + 'members',
    memberships: apiBase + 'memberships',
    products: apiBase + 'products',
    productTypes: apiBase + 'product_types',
    projects: apiBase + 'projects',
    projectQuestions: apiBase + 'project_questions',
    projectRequests: apiBase + 'project_requests',
    providers: apiBase + 'providers',
    providerTypes: apiBase + 'provider_types',
    productCategories: apiBase + 'product_categories',
    services: apiBase + 'services',
    serviceDetails: apiBase + 'service_details',
    serviceRequests: apiBase + 'service_requests',
    serviceOrders: apiBase + 'service_orders',
    users: apiBase + 'users'
  };

  angular.module('common')
    .constant('ApiBase', apiBase)
    .factory('ApiService', Factory);

  /** @ngInject */
  function Factory($q, $http, ErrorsService) {
    var service = {
      routes: routes,
      buildUrl: buildUrl,
      parse: parse,
      search: search,
      show: show,
      create: create,
      update: update,
      destroy: destroy
    };

    return service;

    function buildUrl(base, parameters) {
      if (angular.isUndefined(parameters)) {
        return base;
      }

      return [base, '?', serialize(parameters)].join('')
    }

    function parse(response) {
      var data;
      var meta;
      var links;

      if (response.status == 204) {
        return null;
      }

      // Expect JSONAPI responses
      if (angular.isUndefined(response.data) || angular.isUndefined(response.data.data)) {
        $q.reject(response);
      }

      data = angular.copy(response.data.data);
      meta = angular.copy(response.data.meta) || {};
      links = angular.copy(response.data.links) || {};

      data.meta = function () {
        return meta;
      };
      data.links = function () {
        return links;
      };

      if (angular.isArray(data)) {
        data.forEach(function (item) {
          functionizeRelationships(item);
        });
      } else {
        functionizeRelationships(data);
      }

      return $q.resolve(data);

      // TODO: Believe this will leak like a missing Hoover Dam.
      function functionizeRelationships(resource) {
        if (angular.isUndefined(resource.relationships)) {
          return resource;
        }

        angular.forEach(resource.relationships, function (relationship, key) {
          if (!relationship) {
            this.attributes[key] = function () {
            };
          } else if (angular.isArray(relationship.data)) {
            this.attributes[key] = (function many(relationship, included) {
              var type = relationship[0].type;
              var ids = relationship.map(function (item) {
                return item.id;
              });
              var results = null;

              return function () {
                return results || (results = included.filter(function (item) {
                    return item.type == type && -1 != ids.indexOf(item.id);
                  }));
              };
            })(relationship.data, response.data.included);
          } else if (angular.isObject(relationship.data)) {
            this.attributes[key] = (function one(relationship, included) {
              var results = null;

              return function () {
                return results || (results = included.find(function (item) {
                    return item.type == relationship.type && item.id == relationship.id;
                  }));
              };
            })(relationship.data, response.data.included);
          }
        }, resource);

        delete resource.relationships;
      }
    }

    function parseError(response) {
      return $q.reject(ErrorsService.parse(response));
    }

    function search(path, parameters) {
      var url = buildUrl(path, parameters);

      return $http
        .get(url)
        .then(parse)
        .catch(parseError);
    }

    function show(path, parameters) {
      var url = buildUrl(path, parameters);

      return $http
        .get(url)
        .then(parse)
        .catch(parseError);
    }

    function create(path, data, parameters) {
      var url = buildUrl(path, parameters);

      return $http
        .post(url, buildRequest(data))
        .then(parse)
        .catch(parseError);
    }

    function update(path, data, parameters) {
      var url = buildUrl(path, parameters);

      return $http
        .put(url, buildRequest(data))
        .then(parse)
        .catch(parseError);
    }

    function destroy(path) {
      var url = buildUrl(path);

      return $http
        .delete(url)
        .then(parse)
        .catch(parseError);
    }

    function buildRequest(request) {
      if (angular.isDefined(request.data)) {
        return request;
      }

      return {data: request};
    }

    function serialize(obj, prefix) {
      var query = [];
      var param;

      for (param in obj) {
        if (obj.hasOwnProperty(param)) {
          var key = prefix ? prefix + '[' + param + ']' : param;
          var value = obj[param];
          var serializedValue = '';

          if (Array.isArray(value)) {
            serializedValue = value.map(function (item) {
              return encodeURIComponent(key + '[]') + '=' + encodeURIComponent(item);
            }).join('&');
          } else if (typeof value === 'object') {
            serializedValue = serialize(value, key);
          } else {
            serializedValue = encodeURIComponent(key) + '=' + encodeURIComponent(value);
          }

          query.push(serializedValue);
        }
      }

      return query.join('&');
    }
  }
})();
