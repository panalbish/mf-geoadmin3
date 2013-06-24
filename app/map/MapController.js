(function() {
  goog.provide('ga_map_controller');
  goog.require('app.map.pan');

  var module = angular.module('ga_map_controller', []);

  module.controller('GaMapController', ['$scope', function($scope) {

    var swissExtent = [485869.5728, 837076.5648, 76443.1884, 299941.7864];
    var swissProjection = ol.proj.configureProj4jsProjection({
      code: 'EPSG:21781',
      extent: swissExtent
    });

    var map = new ol.Map({
      renderer: ol.RendererHint.CANVAS,
      view: new ol.View2D({
        projection: swissProjection,
        center: ol.extent.getCenter(swissExtent),
        resolutions: [
                    650, 500, 250, 100, 50, 20, 10, 5,
                    2.5, 2, 1, 0.5, 0.25, 0.1
        ],
        zoom: 2
      })
    });
    new app.map.Pan({
      map: map
    });

    $scope.map = map;

  }]);

})();
