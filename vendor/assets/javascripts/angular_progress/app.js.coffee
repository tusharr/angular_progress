angular.module('AngularProgress', [])
angular.module('AngularProgress').config ['$httpProvider', ($httpProvider) ->
  $httpProvider.interceptors?.push('httpProgressInterceptor')
]
