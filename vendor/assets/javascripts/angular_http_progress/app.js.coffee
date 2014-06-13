angular.module('angularHttpProgress', [])
angular.module('angularHttpProgress').config ['$httpProvider', ($httpProvider) ->
  $httpProvider.interceptors.push('httpProgressInterceptor')
]