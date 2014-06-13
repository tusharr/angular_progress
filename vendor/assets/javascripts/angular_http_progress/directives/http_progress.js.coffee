angular.module('angularHttpProgress').directive 'httpProgress', [ '$timeout', '$sce',  ($timeout, $sce) ->
  template: """
<div ng-show="requestInProgress" ng-bind-html="httpPending"></div>
<div ng-show="requestSucceeded" ng-bind-html="httpOnSuccess"></div>
<div ng-show="requestFailed" ng-bind-html="httpOnError"></div>
<div ng-transclude ng-show="!requestInProgress && !requestSucceeded && !requestFailed"></div>
            """
  restrict: 'AE'
  scope: {}
  transclude: true
  link: (scope, element, attributes, controller) ->
    scope.requestName = attributes.requestName || attributes.httpProgress
    scope.requestCount = 0
    scope.httpOnSuccess = $sce.trustAsHtml(attributes.httpSuccess)
    scope.httpOnError = $sce.trustAsHtml(attributes.httpError)
    scope.httpPending = $sce.trustAsHtml(attributes.httpPending)
    scope.requestInProgress = false
    scope.requestSucceeded = false
    scope.requestFailed = false

    scope.revertToOriginal = ->
      scope.requestInProgress = false
      scope.requestSucceeded = false
      scope.requestFailed = false

    scope.httpProgressSuccess = ->
      if scope.httpOnSuccess
        scope.requestInProgress = false
        scope.requestSucceeded = true
        scope.requestFailed = false
        $timeout(scope.revertToOriginal, 3000)
      else
        scope.revertToOriginal()

    scope.httpProgressError = ->
      if scope.httpOnError
        scope.requestInProgress = false
        scope.requestSucceeded = false
        scope.requestFailed = true
        $timeout(scope.revertToOriginal, 5000)
      else
        scope.revertToOriginal()

    scope.$on 'startHttpProgress', (event, target) ->
      return unless scope.requestName is target.requestName
      scope.requestCount += 1
      if scope.requestCount >= 1
        scope.revertToOriginal()
        scope.requestInProgress = true

    scope.$on 'stopHttpProgress', (event, target) ->
      return unless scope.requestName is target.requestName
      scope.requestCount -= 1
      scope.requestCount = 0 if scope.requestCount < 0
      if target.success is true && scope.requestCount is 0
        scope.httpProgressSuccess()
      else if scope.requestCount is 0
        scope.httpProgressError()
]