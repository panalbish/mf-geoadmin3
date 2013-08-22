(function() {
  goog.provide('ga_print_controller');

  var module = angular.module('ga_print_controller', []);

  module.controller('GaPrintController',
      ['$scope', 'gaGlobalOptions',
       function($scope, gaGlobalOptions) {
         $scope.options = {
           proxyUrl: gaGlobalOptions.baseUrlPath + '/ogcproxy?url=',
           validationServiceUrl: 'http://www.kmlvalidator.org/validate.htm'
         };
  }]);
})();
