(function ($) {
    
    "use strict";
    
    // Header Style and Scroll to Top
    function headerStyle() {
        if ($('.main-header').length) {
            var windowpos = $(window).scrollTop();
            var siteHeader = $('.main-header');
            var scrollLink = $('.scroll-top');
            if (windowpos >= 250) {
                siteHeader.addClass('fixed-header');
                scrollLink.fadeIn(300);
            } else {
                siteHeader.removeClass('fixed-header');
                scrollLink.fadeOut(300);
            }
        }
    }
    headerStyle();

    // dropdown menu

    var mobileWidth = 992;
    var navcollapse = $('.navigation li.dropdown');

    navcollapse.hover(function () {
        if ($(window).innerWidth() >= mobileWidth) {
            $(this).children('ul').stop(true, false, true).slideToggle(300);
            $(this).children('.megamenu').stop(true, false, true).slideToggle(300);
        }
    });

    //Submenu Dropdown Toggle
    if ($('.main-header .navigation li.dropdown ul').length) {
        $('.main-header .navigation li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');

        //Dropdown Button
        $('.main-header .navigation li.dropdown .dropdown-btn').on('click', function () {
            $(this).prev('ul').slideToggle(500);
            $(this).prev('.megamenu').slideToggle(800);
        });

        //Disable dropdown parent link
        $('.navigation li.dropdown > a').on('click', function (e) {
            e.preventDefault();
        });
    }

    //Submenu Dropdown Toggle
    if ($('.main-header .main-menu').length) {
        $('.main-header .main-menu .navbar-toggle').on("click", function () {
            $(this).prev().prev().next().next().children('li.dropdown').hide();
        });
    }

    // Add a class beside main-header for changing menu background color
    $(".navbar-toggle").on("click", function () {
        $(".main-header").toggleClass("bg-black");
    });

    /* Main Slider */
    if ($('.slider-active').length) {
        $('.slider-active').slick({
            infinite: false,
            autoplay: false,
            arrows: false,
            dots: true,
            fade: true,
            pauseOnHover: false,
            autoplaySpeed: 2000,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
    }

    // Partner Slider
    if ($('.partner-active').length) {
      $('.partner-active').slick({
           infinite: true,
           autoplay: true,
           arrows: false,
           dots: false,
           pauseOnHover: false,
           autoplaySpeed: 5000,
           slidesToShow: 4,
           slidesToScroll: 1,
           responsive: [
               {
                   breakpoint: 992,
                   settings: {
                       slidesToShow: 3
                   }
               },
               {
                   breakpoint: 768,
                   settings: {
                       slidesToShow: 2
                   }
               },
               {
                   breakpoint: 480,
                   settings: {
                       slidesToShow: 1
                   }
               }
           ]
      });
    }

    // Blog Slider
    if ($('.blog-active').length) {
      $('.blog-active').slick({
           infinite: true,
           autoplay: false,
           arrows: true,
           dots: false,
           prevArrow: '<button class="blog-prev"><i class="flaticon-left-arrow"></i></button>',
           nextArrow: '<button class="blog-next"><i class="flaticon-right-arrow-angle"></i></button>',
           pauseOnHover: false,
           autoplaySpeed: 5000,
           slidesToShow: 2,
           slidesToScroll: 1,
           responsive: [
               {
                   breakpoint: 767,
                   settings: {
                       slidesToShow: 1
                   }
               }
           ]
      });
    }

    // Testimonial Authors
    if ($('.author-images').length) {
       $('.author-images').slick({
           infinite: true,
           autoplay: false,
           arrows: true,
           prevArrow: '<button class="testimonial-prev"><i class="flaticon-left-arrow"></i></button>',
           nextArrow: '<button class="testimonial-next"><i class="flaticon-right-arrow-angle"></i></button>',
           pauseOnHover: false,
           autoplaySpeed: 2000,
           slidesToShow: 1,
           slidesToScroll: 1,
           fade: true,
           cssEase: 'linear',
           asNavFor: '.testimonials',
       });
    }

    // Testimonials
    if ($('.testimonials').length) {
       $('.testimonials').slick({
           infinite: true,
           autoplay: false,
           arrows: false,
           prevArrow: '<button class="testi-prev"><i class="flaticon-left-arrow"></i></button>',
           nextArrow: '<button class="testi-next"><i class="flaticon-right-arrow-angle"></i></button>',
           pauseOnHover: false,
           autoplaySpeed: 2000,
           slidesToShow: 1,
           slidesToScroll: 1,
           fade: true,
           cssEase: 'linear',
           asNavFor: '.author-images',
           responsive: [
               {
                   breakpoint: 992,
                   settings: {
                       arrows: true,
                   }
               }
           ]
       });
    }

    // Video Magnific Popup
    if ($('.video-play').length) {
        $('.video-play').magnificPopup({
            type: 'video',
        });
    }

    // Skillbars Animation
    if ($(".skillbar").length) {
        $(".skillbar").appear(function () {
            $(".skillbar").skillBars({ from: 0, speed: 4000, interval: 100 });
        });
    }

    // Circle Skills Animation
    if ($.fn.circleProgress) {
      var progress = $('.circle-skill')
      if($.fn.circleProgress) {
        progress.appear(function () {
        progress.circleProgress({
          value: 0.85,
          size: 170,
          animation : { duration: 4000},
          fill: '#ffcc33',
          }).on('circle-animation-progress', function(event, progress) {
          $(this).find('b').html(Math.round(85 * progress) + '<span>%</span>');
          });
        });
      };
    };
    if ($.fn.circleProgress) {
      var progress2 = $('.circle-skill.two')
      if($.fn.circleProgress) {
        progress2.appear(function () {
        progress2.circleProgress({
          value: 0.75,
          }).on('circle-animation-progress', function(event, progress) {
          $(this).find('b').html(Math.round(75 * progress) + '<span>%</span>');
          });
        });
      };
    };
    if ($.fn.circleProgress) {
      var progress3 = $('.circle-skill.three')
      if($.fn.circleProgress) {
        progress3.appear(function () {
        progress3.circleProgress({
          value: 0.80,
          }).on('circle-animation-progress', function(event, progress) {
          $(this).find('b').html(Math.round(80 * progress) + '<span>%</span>');
          });
        });
      };
    };

    // Contact Map
    if ($("#map").length !== 0) {
        var map = L.map("map", {
          center: [23.777176, 90.399452],
          zoom: 12,
          zoomControl: false,
          scrollWheelZoom: true
        });

        L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {}).addTo(map);
    }

    // Scroll to a Specific Div
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function () {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 2000);

        });
    }


/* ==========================================================================
   When document is resize, do
   ========================================================================== */

  $(window).on('resize', function () {
      var mobileWidth = 992;
      var navcollapse = $('.navigation li.dropdown');
      navcollapse.children('ul').hide();
      navcollapse.children('.megamenu').hide();
      if ($(window).innerWidth() >= mobileWidth) {
          $(".main-header").removeClass("bg-black");
      }

  });

/* ==========================================================================
   When document is scroll, do
   ========================================================================== */

  $(window).on('scroll', function () {

      // Header Style and Scroll to Top
      function headerStyle() {
          if ($('.main-header').length) {
              var windowpos = $(window).scrollTop();
              var siteHeader = $('.main-header');
              var scrollLink = $('.scroll-top');
              if (windowpos >= 100) {
                  siteHeader.addClass('fixed-header');
                  scrollLink.fadeIn(300);
              } else {
                  siteHeader.removeClass('fixed-header');
                  scrollLink.fadeOut(300);
              }
          }
      }

      headerStyle();

  });

/* ==========================================================================
   When document is loaded, do
   ========================================================================== */

  $(window).on('load', function () {

      //Hide Loading Box (Preloader)
      function handlePreloader() {
          if ($('.preloader').length) {
              $('.preloader').delay(200).fadeOut(500);
          }
      }
      handlePreloader();

  });


})(window.jQuery);
