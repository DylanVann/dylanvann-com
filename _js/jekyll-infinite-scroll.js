exports.JekyllInfiniteScroll = JekyllInfiniteScroll;

var Emitter = require('component-emitter');
Emitter(JekyllInfiniteScroll.prototype);
function JekyllInfiniteScroll() {
  var self = this;

  this.postListSelector = '.posts';
  this.postSelector = 'article.post';

  this.navSelector = '.navigation';
  this.navNextSelector = '.next';

  this.postURLs;
  this.pageURLs;
  this.isFetching = false;
  this.shouldFetchPosts = false;
  this.loadNewPostsThreshold = 1000;

  this.nextLink = $(self.navSelector+' '+self.navNextSelector).attr('href');
  // Remove the navigation.
  if ($(self.navSelector).length > 0) {
    this.shouldFetchPosts = true;
  }
  $(self.navSelector).html('<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>');

  $(window).scroll(function(e){
    self.onScroll();
  });
}

JekyllInfiniteScroll.prototype.fetchPosts = function() {
  this.isFetching = true;
  var self = this;
  self.emit('fetching');
  $.ajax({
    type: "GET",
    url: this.nextLink,
    cache: true,
    dataType: "html",
    success: function(data) {
      // Find loaded posts and append to page.
      data = $(data);
      var loadedPosts = data.find(self.postSelector);
      var lastPost = $(self.postListSelector+' '+self.postSelector+':last');
      lastPost.after(loadedPosts);
      // Get the new next page link.
      self.nextLink = data.find(self.navSelector+' '+self.navNextSelector).attr('href');
      if (!self.nextLink) self.fetchedAllPosts();
      // Done.
      self.isFetching = false;
      self.emit('fetched');
    }
  });
};


JekyllInfiniteScroll.prototype.fetchedAllPosts = function() {
  this.isFetching = false;
  $(this.navSelector).fadeOut();
};

JekyllInfiniteScroll.prototype.onScroll = function() {
  // Are we close to the end of the page? If we are, load more posts
  if (!this.nextLink || this.isFetching) return;

  var windowHeight = $(window).height();
  var windowScrollPosition = $(window).scrollTop();
  var bottomScrollPosition = windowHeight + windowScrollPosition;
  var documentHeight = $(document).height();

  // If we've scrolled past the loadNewPostsThreshold, fetch posts
  if ((documentHeight - this.loadNewPostsThreshold) < bottomScrollPosition) {
    this.fetchPosts();
  }
};
