(function($) {
  'use strict';

  // Activate Tooltips & Popovers
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    // Dismiss Popovers on next click
    $('.popover-dismiss').popover({
      trigger: 'focus'
    })
  });
	AOS.init();	
  // Bootstrap Fixed Header
  $(function() {
    // Check to see if there is a bakcground class on loading
    if ($('.js-navbar-scroll').offset().top > 150) {
      $('.js-navbar-scroll').addClass('navbar-bg-onscroll');
    }

    // Check to add a background class on scrolling
    $(window).on('scroll', function() {
      var navbarOffset = $('.js-navbar-scroll').offset().top > 150;
      if(navbarOffset) {
        $('.js-navbar-scroll').addClass('navbar-bg-onscroll');
      }
      else {
        $('.js-navbar-scroll').removeClass('navbar-bg-onscroll');
        $('.js-navbar-scroll').addClass('navbar-bg-onscroll--fade');
      }
    });
  });

  // Scroll to (Section)
  $(function() {
    $('a[href*=#js-scroll-to-]:not([href=#js-scroll-to-])').on('click', function() {
      if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 10
          }, 1000);
          return false;
        }
      }
    });
  });
  
          $('.portfolio-item').isotope({
         	itemSelector: '.item',
         	layoutMode: 'fitRows'
         });
         $('.portfolio-menu ul li').click(function(){
         	$('.portfolio-menu ul li').removeClass('active');
         	$(this).addClass('active');
         	
         	var selector = $(this).attr('data-filter');
         	$('.portfolio-item').isotope({
         		filter:selector
         	});
         	return  false;
         });
         $(document).ready(function() {
         var popup_btn = $('.popup-btn');
         popup_btn.magnificPopup({
         type : 'image',
         gallery : {
         	enabled : true
         }
         });
         });
		 
}(jQuery));