(function () {
  'use strict';

  // from: https://github.com/angular/angular.js/issues/11378#issuecomment-88521956

  angular.module('common')
    .directive('onEnter', Directive);

  /** @ngInject */
  function Directive($parse) {
    var directive = {
      restrict: 'A',
      compile: compile
    };

    return directive;

    function compile(_elem, attr) {
      var parsedFn = $parse(attr.onEnter, null, true);

      return keypressHandler;

      function keypressHandler(scope, element) {
        element.on('keypress', function (event) {
          var keyCode = event.which || event.keyCode;

          if (keyCode == 13) {
            scope.$apply(function() {
              parsedFn(scope, { $event: event });
            });
            event.preventDefault();
          }
        });
      }
    }
  }

  // var ngKeyCodeEventDirective = ['$parse', function($parse) {
  //   return {
  //     restrict: 'A',
  //     compile: function($element, attr){
  //       // We expose the powerful $event object on the scope that provides access to the Window,
  //       // etc. that isn't protected by the fast paths in $parse.  We explicitly request better
  //       // checks at the cost of speed since event handler expressions are not executed as
  //       // frequently as regular change detection.
  //       var simpleParseFn = $parse(attr.ngKeyCodeEvent, /* interceptorFn */ null, /* expensiveChecks */ true);
  //
  //       // Since the object is already evaluated we need not parse it, and just call the function value for the keycode
  //       var objectParseFn = function(parseObject, keyCode){
  //         return parseObject[keyCode];
  //       };
  //
  //       return function keyCodeEventHandler(scope, element, attrs) {
  //         element.on("keypress", function(event){
  //           // If the object based keyMap notation is used we need to evaluate it
  //           // to check which keyCodes are triggered.
  //           var parseObject = scope.$eval(attrs.object) || {};
  //
  //           var keyCode = event.which || event.keyCode;
  //           var simpleParseCallback = function() {
  //             simpleParseFn(scope, {$event: event});
  //           };
  //           var objectParseCallback = function(keycodeObject, keyCodeMapKey) {
  //             objectParseFn(keycodeObject, keyCodeMapKey)(event);
  //           };
  //           if (attrs.hasOwnProperty('code') && keyCode == attrs.code ) {
  //             scope.$apply(simpleParseCallback);
  //           } else if (attrs.hasOwnProperty('object') && parseObject[keyCode]) {
  //             scope.$apply(function(){
  //               objectParseCallback(parseObject, keyCode);
  //             });
  //           }
  //         });
  //       };
  //     }
  //   };
  // }];
})();
