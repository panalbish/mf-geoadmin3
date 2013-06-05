var projection = ol.proj.configureProj4jsProjection({
  code: 'EPSG:21781',
  extent: [485869.5728, 837076.5648, 76443.1884, 299941.7864]
});

var parser = new ol.parser.ogc.WMTSCapabilities();
var capabilities, map;

var template = Hogan.compile($('#layerlist').text());


$.ajax({
  url: 'http://wmts.geo.admin.ch/1.0.0/WMTSCapabilities.xml',
  dataType: 'xml',
  success: function(data) {
    capabilities = parser.read(data);

    $('#layertree').html(template.render(capabilities.contents));
    $('.layertree').sortable({
      axis: 'y',
      handle: '.icon-reorder'
    });

    map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({}, [
        new ol.control.ScaleLine({
          target: document.getElementById('ol-scaleline'),
          units: ol.control.ScaleLineUnits.METRIC
        })
      ]),
      renderer: ol.RendererHint.CANVAS,
      layers: [
        new ol.layer.TileLayer({
          source: new ol.source.WMTS(ol.source.WMTS.optionsFromCapabilities(capabilities, 'ch.swisstopo.pixelkarte-farbe'))
        })
      ],
      view: new ol.View2D({
        projection: projection,
        center: ol.extent.getCenter(projection.getExtent()),
        zoom: 2
      })
    });
  }
});


