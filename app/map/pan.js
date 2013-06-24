goog.provide('app.map.pan');
//goog.require('goog.dom');
//goog.require('goog.dom.TagName');
//goog.require('goog.events');
//goog.require('goog.events.EventType');
//goog.require('ol.control.Control');



/**
 * @constructor
 * @extends {ol.control.Control}
 * @param {ol.control.PanOptions=} opt_options Options.
 */
app.map.Pan = function(opt_options) {
  var options = goog.isDef(opt_options) ? opt_options : {};
  this.delta_ = goog.isDef(options.delta) ? options.delta : 128;

  var element = goog.dom.createDom(goog.dom.TagName.DIV, {
    'class': 'pan'
  });
  var svge = goog.dom.htmlToDocumentFragment('<svg version="1.1" height="32" ' +
      'width="32" xmlns="http://www.w3.org/2000/svg/"><g><path id="north" d="' +
      'm 7.5087931,6.872769 a 12.064596,12.064596 0 0 1 17.0619149,-6e-7 l -8' +
      '.530957,8.5309586 z" transform="matrix(1.3261944,0,0,1.3261944,-5.2718' +
      '281,-4.4283)"/><path id="south" d="m 24.570709,23.934684 a 12.064596,1' +
      '2.064596 0 0 1 -17.0619158,0 l 8.5309578,-8.530957 z" transform="matri' +
      'x(1.3261944,0,0,1.3261944,-5.2718282,-4.4283)"/><path id="east" d="m 2' +
      '4.570708,6.8727684 a 12.064596,12.064596 0 0 1 1e-6,17.0619166 l -8.53' +
      '0958,-8.530958 z" transform="matrix(1.3261944,0,0,1.3261944,-5.2718281' +
      ',-4.4283)"/><path id="west" d="m 7.5087932,23.934684 a 12.064596,12.06' +
      '4596 0 0 1 -1e-7,-17.061915 l 8.5309579,8.530958 z" transform="matrix(' +
      '1.3261944,0,0,1.3261944,-5.2718281,-4.4283)"/></g></svg>');
  goog.dom.appendChild(element, svge);
  var northe = goog.dom.findNode(svge, function(e) {
    return e.id == 'north';
  });
  var southe = goog.dom.findNode(svge, function(e) {
    return e.id == 'south';
  });
  var easte = goog.dom.findNode(svge, function(e) {
    return e.id == 'east';
  });
  var weste = goog.dom.findNode(svge, function(e) {
    return e.id == 'west';
  });

  goog.events.listen(northe, [
    goog.events.EventType.CLICK
  ], function(e) {
    this.pan(0, 1, e);
  }, false, this);
  goog.events.listen(southe, [
    goog.events.EventType.CLICK
  ], function(e) {
    this.pan(0, -1, e);
  }, false, this);
  goog.events.listen(easte, [
    goog.events.EventType.CLICK
  ], function(e) {
    this.pan(1, 0, e);
  }, false, this);
  goog.events.listen(weste, [
    goog.events.EventType.CLICK
  ], function(e) {
    this.pan(-1, 0, e);
  }, false, this);

  goog.base(this, {
    element: element,
    map: options.map
  });
};
goog.inherits(app.map.Pan, ol.control.Control);


/**
 * @param {Number} x
 * @param {Number} y
 * @param {Object} e
 */
app.map.Pan.prototype.pan =
    function(x, y, e) {
  var view = this.map_.getView();
  goog.asserts.assertInstanceof(view, ol.View2D);
  var resolution = view.getResolution();
  var rotation = view.getRotation();
  var mapUnitsDelta = resolution * this.delta_;
  var delta = [mapUnitsDelta * x, mapUnitsDelta * y];
  ol.coordinate.rotate(delta, rotation);
  ol.interaction.Interaction.pan(
      this.map_, view, delta, 100);
  e.preventDefault();
};
