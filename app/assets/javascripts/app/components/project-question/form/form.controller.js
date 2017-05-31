(function () {
  'use strict';

  angular.module('components.project-question')
    .controller('ProjectQuestionFormController', Controller);

  /** @ngInject */
  function Controller(ProjectQuestionService) {
    var ctrl = this;

    ctrl.$onChanges = onChanges;
    ctrl.doCreate = doCreate;
    ctrl.doUpdate = doUpdate;
    ctrl.doDelete = doDelete;

    ctrl.moveAnswer = moveAnswer;
    ctrl.addAnswer = addAnswer;
    ctrl.removeAnswer = removeAnswer;

    function onChanges(changes) {
      if (changes.projectQuestion) {
        ctrl.projectQuestion = angular.copy(ctrl.projectQuestion);
        ctrl.model = ctrl.projectQuestion.attributes;
      }
    }

    function doCreate() {
      return ctrl.onCreate({
        $event: {
          projectQuestion: convertTags(angular.copy(ctrl.projectQuestion))
        }
      });
    }

    function doUpdate() {
      return ctrl.onUpdate({
        $event: {
          projectQuestion: convertTags(angular.copy(ctrl.projectQuestion))
        }
      });
    }

    function doDelete() {
      return ctrl.onDelete({
        $event: {
          projectQuestion: ctrl.projectQuestion
        }
      });
    }

    function moveAnswer(index, dir) {
      var tmp = ctrl.model.answers[index + dir];

      ctrl.model.answers[index + dir] = ctrl.model.answers[index];
      ctrl.model.answers[index] = tmp;
    }

    function addAnswer() {
      ctrl.model.answers.push(ProjectQuestionService.buildAnswer());
    }

    function removeAnswer(index) {
      ctrl.model.answers.splice(index, 1);
    }

    function convertTags(question) {
      question.attributes.answers.forEach(function (answer) {
        answer.require = (answer.require || []).map(function (item) {
          return item.text;
        });
        answer.exclude = (answer.exclude || []).map(function (item) {
          return item.text;
        });
      });

      return question;
    }
  }
})();
