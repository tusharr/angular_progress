# AngularProgress

Display progress of an HTTP action using AngularJS. Use it for spinners, progress-messages, success messages.

## Installation

There are two ways to use AngularProgress

#### Javascript


#### Ruby gem

Add this line to your application's Gemfile:

    gem 'angular_progress'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install angular_progress

## Usage

Example: Button with pending & success message ![button](https://dl.dropboxusercontent.com/u/23457337/angular_progress_1.gif)

Example: Button with pending & error message ![button_with_error](https://dl.dropboxusercontent.com/u/23457337/angular_progress_with_error.gif)
#### Markup

    <div ng-controller="TestController">
        <a  ng-angular-progress="sampleHttpRequest" class="btn btn-default" ng-click="startRequest()"
            http-pending="Saving..."
            http-success="Saved Successfully"
            http-error="Uh oh...">
         Save
        </div>
    </div>

#### Javascript
```javascript

angular.module('SampleApp', ['AngularProgress']);

angular.module('SampleApp').controller('SampleController', [
'$http', '$scope', function($http, $scope) {
    $scope.makeRequest = function() {
        $http.post('/my/endpoint', {
            param1: 'value1'
        }, {
            requestName: 'sampleHttpRequest'
        });
    };
    }
]);
```
## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
