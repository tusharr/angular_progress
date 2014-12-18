# AngularProgress

Display progress of an HTTP action using AngularJS. Use it for spinners, progress-messages, success messages.

## Installation

There are two ways to use AngularProgress

#### Javascript

[Download Javascript](https://raw.githubusercontent.com/tusharr/angular_progress/master/compiled/angular_progress.js)

#### Ruby gem

Add this line to your application's Gemfile:

    gem 'angular_progress'

And then execute:

    $ bundle

And then add this to your application.js in your Rails 3.1+ Application

   `//= require angular_http_progress`

Or install it yourself as:

    $ gem install angular_progress

## Usage

When calling $http methods in angular, use the requestName as a property for the data argument. [$http Angular Documentation](https://code.angularjs.org/1.2.18/docs/api/ng/service/$http)

Use the requestName as value of the http-progress attribute to tie it all together. Multiple directives can listen to the same requestName at the same time.


Sample: Button with pending & success message

![button](https://dl.dropboxusercontent.com/u/23457337/angular_progress_1.gif)

Sample: Button with pending & error message

![button_with_error](https://dl.dropboxusercontent.com/u/23457337/angular_progress_with_error.gif)

Sample: Pending & Success message

![with_message](https://dl.dropboxusercontent.com/u/23457337/angular_progress_with_message.gif)

#### Markup
```html
    <div ng-controller="SampleController">
        <a  http-progress="sampleHttpRequest" class="btn btn-default" ng-click="startRequest()"
            http-pending="Saving..."
            http-success="Saved Successfully"
            http-error="Uh oh...">
         Save
        </div>
    </div>
```
#### Javascript
```javascript

angular.module('SampleApp', ['AngularProgress']);

angular.module('SampleApp').controller('SampleController', [
'$http', '$scope', function($http, $scope) {
    $scope.startRequest = function() {
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
