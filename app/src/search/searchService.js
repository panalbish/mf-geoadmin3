(function() {
  goog.provide('ga_search_service');

  var module = angular.module('ga_search_service', []);

  module.provider('gaSearchService', function() {

    this.$get = ['$q', '$http', function($q, $http) {
      return {
        load: function(url, options) {
          var deferred = $q.defer();
          var params = '&features=' + options.features +
                       '&searchText=' + options.searchText +
                       '&lang=' + options.lang +
                       '&bbox=' + options.bbox;

          var url = url + params;

          $http.jsonp(url
          ).success(function(data, status) {
            deferred.resolve(data);
          }).error(function(data, status) {
            deferred.reject();
          });

          return deferred.promise;
        }
      };
    }];
  });
})();
