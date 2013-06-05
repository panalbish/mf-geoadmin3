var getBBoxParameter = function () {
    if (!$('input[name=usegeobox]').is(':checked') ||
        !map) {
        return '';
    }
    var ext = map.getExtent();
    return 'bbox=' + ext.left + ',' + ext.bottom + ',' +
           ext.right + ',' + ext.top;

            
}

$('#search').typeahead([{
  name: 'allinone',
  header: '<strong> ai1 search:</strong>',
  valueKey: 'attrs',
  template: function(context) {
      return '<div>' + context.attrs.detail + '<span class="entry-info"> (' + context.attrs.detail_datasource + ' - ' + context.weight + ')</span> <span class="pull-right">' + context.attrs.geom_quadindex + '</span></div>'
  },
  remote: {
    url: 'http://mf-chsdi0t.bgdi.admin.ch/ltjeg/wsgi/ai1?query=%QUERY',
    beforeSend: function(jqXhr, settings) {
        var bbox = getBBoxParameter();
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
  header: '<strong>swisssearch:</strong>',
  valueKey: 'label',
  template: function(context) {
    return '<div>' + context.label + '<small class="pull-right">(' +
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
  header: '<strong>swisstopo layers:</strong>',
  valueKey: 'kurzbezeichnung',
  template: function(context) {
    return '<div><i class="icon-plus-sign"></i> Add <strong>' + context.kurzbezeichnung + '</strong> layer to the map </div>';
  },
  remote: {
    url: 'http://api.geo.admin.ch/main/wsgi/layers?query=%QUERY',
    filter: function(response) {
      return response.results;
    }
  }
}]).on('typeahead:selected', function(event, datum) {
  debugger;
}).on('typeahead:opened', function() {
  $('.tt-dropdown-menu').css('z-index', '10000');
});
