require('./collapsing-menu.js').CollapsingMenu();

var InfiniteScroll = require('./jekyll-infinite-scroll.js').JekyllInfiniteScroll;
var infiniteScroll = new InfiniteScroll();

var ProcessingLoader = require('./processing-loader.js').ProcessingLoader;
var processingLoader = new ProcessingLoader();
processingLoader.load();
infiniteScroll.on('fetched', function() {
    processingLoader.load();
});
