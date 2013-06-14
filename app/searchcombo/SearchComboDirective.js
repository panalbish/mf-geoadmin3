(function() {
  goog.provide('ga_searchcombo_directive');

  var module = angular.module('ga_searchcombo_directive', []);

  module.directive('gaSearchCombo', 
      ['$parse', function($parse) {
    var SEARCH_LIMIT = 10;
    var getBBoxParameter = function (map) {
      if (!map) {
        return '';
      }
      var ext = map.getView().calculateExtent(map.getSize());
      return 'bbox=' + ext[0] + ',' + ext[2] + ',' +
          ext[1] + ',' + ext[3];
    };

    var _handleMouseOver = function (datum) {
//      console.log(datum);
    };

    return {
      restrict: 'A',
      replace: true,
      scope: {
        map: '=appSearchComboMap'
      },
      template: '<div><input type="text" class="search-query" id="search">' +
          //TODO: review -> not sure about this div here at this place
          '<div style="display: none;"' +
          '<div id=searchComboPopup"></div>' +
          '</div></div>',
      link: function(scope, element, attrs) {
        var map = $parse(attrs.appSearchComboMap)(scope);
        
        $(element).find('input').typeahead([{
          name: 'allinone',
          limit: SEARCH_LIMIT,
          header: '<strong> ai1 search:</strong>',
          valueKey: 'attrs',
          template: function(context) {
            return '<div>' + context.attrs.detail +
                '<span class="search-info"> (' +
                context.attrs.detail_datasource + ' - ' +
                context.weight + ')</span> <span class="search-right">' +
                context.attrs.geom_quadindex + '</span></div>'
          },
          remote: {
            url: 'http://mf-chsdi0t.bgdi.admin.ch/ltjeg/wsgi/ai1?query=%QUERY',
            beforeSend: function(jqXhr, settings) {
              var bbox = getBBoxParameter(map);
              if (bbox.length > 0) {
                settings.url = settings.url + '&' + bbox;
              }
            },
            filter: function(response) {
              return response.results.re3.matches;
            }
          }
        }, {
          name: 'swisssearch',
          limit: SEARCH_LIMIT,
          header: '<strong>swisssearch:</strong>',
          valueKey: 'label',
          template: function(context) {
            return '<div>' + context.label + '<small class="search-right">(' +
                context.service + ')</small></div>';
          },
          remote: {
            url: 'http://api.geo.admin.ch/main/wsgi/swisssearch/geocoding?query=%QUERY',
            filter: function(response) {
              return $.map(response.results, function(val) {
                // removes <b> and </b> tags
                val.label = val.label.replace('<b>', '').replace('</b>', '');
                return val;
              });
            }
          }
        }, {
          name: 'layers',
          limit: SEARCH_LIMIT,
          header: '<strong>swisstopo layers:</strong>',
          valueKey: 'kurzbezeichnung',
          template: function(context) {
            return '<div><i class="icon-plus-sign"></i> Add <strong>' +
                context.kurzbezeichnung + '</strong> layer to the map </div>';
          },
          remote: {
            url: 'http://api.geo.admin.ch/main/wsgi/layers?query=%QUERY',
            filter: function(response) {
              return response.results;
            }
          }
        }]).on('typeahead:mouseOver', function(event, datum) {
          _handleMouseOver(datum);
        }).on('typeahead:opened', function() {
          $('.tt-dropdown-menu').css('z-index', '10000');
        });
      }
    };
  }]);
})();
