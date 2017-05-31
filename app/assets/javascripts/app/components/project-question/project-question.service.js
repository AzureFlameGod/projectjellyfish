(function () {
  'use strict';

  angular.module('components.project-question')
    .factory('ProjectQuestionService', Factory);

  /** @ngInject */
  function Factory(ApiService) {
    var service = {
      build: build,
      buildAnswer: buildAnswer,
      search: search,
      show: show,
      create: create,
      update: update,
      destroy: destroy
    };

    var API_ROUTE = ApiService.routes.projectQuestions;

    return service;

    function build() {
      return {
        id: null,
        type: 'project_questions',
        attributes: {
          label: '',
          required: true,
          answers: [
            buildAnswer(),
            buildAnswer()
          ]
        }
      };
    }

    function buildAnswer() {
      return {
        label: '',
        require: [],
        exclude: []
      };
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
