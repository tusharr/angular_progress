// Generated by CoffeeScript 1.7.1
(function() {
  angular.module('AngularProgress', []);

  angular.module('AngularProgress').config([
    '$httpProvider', function($httpProvider) {
      var _ref;
      return (_ref = $httpProvider.interceptors) != null ? _ref.push("httpProgressInterceptor") : void 0;
    }
  ]);

  angular.module('AngularProgress').directive('httpProgress', [
    '$timeout', '$sce', function($timeout, $sce) {
      return {
        template: "<div ng-show=\"requestInProgress\" ng-bind-html=\"httpPending\"></div>\n<div ng-show=\"requestSucceeded\" ng-bind-html=\"httpOnSuccess\"></div>\n<div ng-show=\"requestFailed\" ng-bind-html=\"httpOnError\"></div>\n<div ng-transclude ng-show=\"!requestInProgress && !requestSucceeded && !requestFailed\"></div>",
        restrict: 'AE',
        scope: {},
        transclude: true,
        link: function(scope, element, attributes, controller) {
          scope.requestName = attributes.requestName || attributes.httpProgress;
          scope.requestCount = 0;
          scope.httpOnSuccess = $sce.trustAsHtml(attributes.httpSuccess);
          scope.httpOnError = $sce.trustAsHtml(attributes.httpError);
          scope.httpPending = $sce.trustAsHtml(attributes.httpPending);
          scope.requestInProgress = false;
          scope.requestSucceeded = false;
          scope.requestFailed = false;
          scope.revertToOriginal = function() {
            scope.requestInProgress = false;
            scope.requestSucceeded = false;
            return scope.requestFailed = false;
          };
          scope.httpProgressSuccess = function() {
            if (scope.httpOnSuccess) {
              scope.requestInProgress = false;
              scope.requestSucceeded = true;
              scope.requestFailed = false;
              return $timeout(scope.revertToOriginal, 3000);
            } else {
              return scope.revertToOriginal();
            }
          };
          scope.httpProgressError = function() {
            if (scope.httpOnError) {
              scope.requestInProgress = false;
              scope.requestSucceeded = false;
              scope.requestFailed = true;
              return $timeout(scope.revertToOriginal, 5000);
            } else {
              return scope.revertToOriginal();
            }
          };
          scope.$on('startHttpProgress', function(event, target) {
            if (scope.requestName !== target.requestName) {
              return;
            }
            scope.requestCount += 1;
            if (scope.requestCount >= 1) {
              scope.revertToOriginal();
              return scope.requestInProgress = true;
            }
          });
          return scope.$on('stopHttpProgress', function(event, target) {
            if (scope.requestName !== target.requestName) {
              return;
            }
            scope.requestCount -= 1;
            if (scope.requestCount < 0) {
              scope.requestCount = 0;
            }
            if (target.success === true && scope.requestCount === 0) {
              return scope.httpProgressSuccess();
            } else if (scope.requestCount === 0) {
              return scope.httpProgressError();
            }
          });
        }
      };
    }
  ]);

  angular.module('AngularProgress').factory('httpProgressInterceptor', [
    '$q', '$rootScope', function($q, $rootScope) {
      return {
        request: function(request) {
          var requestName, _ref, _ref1;
          requestName = request.requestName || ((_ref = request.config) != null ? _ref.requestName : void 0) || ((_ref1 = request.data) != null ? _ref1.requestName : void 0);
          if (requestName) {
            $rootScope.$broadcast('startHttpProgress', {
              requestName: requestName
            });
          }
          return request;
        },
        response: function(response) {
          var requestName, _ref, _ref1, _ref2;
          requestName = ((_ref = response.config) != null ? _ref.requestName : void 0) || ((_ref1 = response.config) != null ? (_ref2 = _ref1.data) != null ? _ref2.requestName : void 0 : void 0);
          if (requestName) {
            $rootScope.$broadcast('stopHttpProgress', {
              requestName: requestName,
              success: true
            });
          }
          return response;
        },
        responseError: function(rejection) {
          var requestName, _ref, _ref1;
          requestName = ((_ref = rejection.config) != null ? _ref.requestName : void 0) || ((_ref1 = rejection.data) != null ? _ref1.requestName : void 0);
          if (requestName) {
            $rootScope.$broadcast('stopHttpProgress', {
              requestName: requestName,
              success: false
            });
          }
          return $q.reject(rejection);
        }
      };
    }
  ]);

}).call(this);
