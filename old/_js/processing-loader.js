exports.ProcessingLoader = ProcessingLoader;

function ProcessingLoader() {
    this.sketches = {};
}

ProcessingLoader.prototype.load = function() {
    var self = this;
    var sketches = $('.processing-sketch');
    for (var i = 0; i < sketches.length; i++) {
        var canvas = $(sketches[i]);
        if (canvas.data('processing-status')) continue;
        var source = canvas.data('processing-sources');
        canvas.data('processing-status', 'loading');
        require.ensure([], function(require) {
            var $script = require("scriptjs");
            $script('/js/libs/processing.min.js', function() {
                Processing.disableInit();
                var ResponsiveCanvas = require('./responsive-canvas.js').ResponsiveCanvas;
                var responsiveCanvas = new ResponsiveCanvas(canvas.parent());
                Processing.loadSketchFromSources(canvas[0], [source], function(sketch) {
                    responsiveCanvas.resize();
                    canvas.data('processing-status', 'loaded');
                });
            });
        });
    }
}
