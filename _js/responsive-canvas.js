exports.ResponsiveCanvas = ResponsiveCanvas;

function ResponsiveCanvas(el) {
  var self = this;
  this.canvasContainer = el;
  this.canvas = el.find('canvas');
  $(window).resize(function() {
    self.resize();
  });
}

ResponsiveCanvas.prototype.resize = function() {
  this.canvas.attr('width', this.canvasContainer.width());
}
