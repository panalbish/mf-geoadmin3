(function() {
  goog.provide('ga_search_directive');
  goog.require('ga_search_service');

  var module = angular.module('ga_search_directive', [
    'ga_search_service'
  ]);
  module.directive('gaSearch',
      ['gaSearchService',
        function(gaSearchService) {
          return {
            restrict: 'A',
            replace: true,
            scope: {
              options: '=gaSearchOptions'
            },
            template:
                '<input type="text" ng-model="options.params.searchText" ' +
                'typeahead="res.attrs.label for res in ' +
                'searchInfos($viewValue)" placeholder=' +
                '"Search for a location or a map info...">',
            link: function(scope, element, attrs) {
              var url = scope.options.url;
              var options = scope.options.params;
              scope.searchInfos = function() {
                return gaSearchService.load(url, options).then(
                    function success(response) {
                      return response.locations;
                    }, function error(response) {
                      // Decide what to do
                      console.log('error');
                    });
              };
            }
          };
        }]);
})();
