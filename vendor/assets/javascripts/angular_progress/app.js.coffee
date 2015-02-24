angular.module('AngularProgress', [])
angular.module('AngularProgress').config ['$httpProvider', ($httpProvider) ->
  _ref = undefined
  if (_ref = $httpProvider.interceptors) != null then _ref.push('httpProgressInterceptor') else undefined
]
