(function() {
  goog.provide('ga_search_controller');

  var module = angular.module('ga_search_controller', ['ui.bootstrap']);

  module.controller('GaSearchController',
      ['$scope', function($scope) {
        var map = $scope.$parent.map;
        var view = map.getView();
        var size = map.getSize();
        // Map size awlways undefined ??
        var extent = size ? view.calculateExtent(size) : '';
        $scope.options = {
          url: 'http://mf-chsdi30t.bgdi.admin.ch/ltgal/' +
               'rest/services/geoadmin/SearchServer?callback=JSON_CALLBACK',
          params: {
            searchText: '',
            bbox: extent,
            features: '',
            lang: 'de'
          }
        };
      }]);
})();
