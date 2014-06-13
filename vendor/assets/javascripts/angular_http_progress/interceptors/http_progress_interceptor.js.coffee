angular.module('angularHttpProgress').factory 'httpProgressInterceptor', ['$q', '$rootScope', ($q, $rootScope) ->
  request: (request) ->
    requestName = request.requestName || request.config?.requestName || request.data?.requestName
    if requestName
      $rootScope.$broadcast('startHttpProgress', { requestName: requestName })
    request

  response: (response) ->
    requestName = response.config?.requestName || response.config?.data?.requestName
    if requestName
      $rootScope.$broadcast('stopHttpProgress', { requestName: requestName, success: true })
    response

  responseError: (rejection) ->
    requestName = rejection.config?.requestName || rejection.data?.requestName
    if requestName
      $rootScope.$broadcast('stopHttpProgress', { requestName: requestName, success: false })

    $q.reject(rejection)
]

