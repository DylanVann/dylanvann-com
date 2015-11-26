exports.CollapsingMenu = function () {

  $(document).ready( function() {

    $(window).scroll( function() {
      var docViewTop = $(window).scrollTop();
      if (docViewTop > 100) {
        $(".nav .container").removeClass('nav-lg');
        $(".nav .container").addClass('nav-sm');
      }
      else {
        $(".nav .container").removeClass('nav-sm');
        $(".nav .container").addClass('nav-lg');
      }
    });

    $('.nav-toggle').on('click', function(e) {
          $('.nav-links').slideToggle();
          e.preventDefault();
    });

    $(window).resize(function(){
        var w = $(window).width();
        if(w > 500 && $('.nav-links').is(':hidden')) {
            $('.nav-links').removeAttr('style');
        }
    });

  });

}
