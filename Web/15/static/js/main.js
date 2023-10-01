(function($) {
  "use strict";

  $(document).ready(onDocumentReady);


  $('.owl-carousel').owlCarousel({
    loop:true,
    autoplay: true,
    margin:0,
    nav:false,
    dots: true,
    mouseDrag: false,
    slideBy: 2,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:2
        }
    }
  })

  $('.chat-wrap').click(function(){
    $(this).addClass('active');
    $('.contactme').addClass('active');
    $('.overlay').fadeIn();
  });

  // overlay escape click
  $('.overlay').click(function(){
    $('.chat-wrap').removeClass('active');
    $('.contactme').removeClass('active');
    $('.overlay').fadeOut();
  });

  // inputs background on blur
  $('.inputs').blur(function(){
    if($(this).val().length > 0){
      $(this).addClass('white');
    } else {
      $(this).removeClass('white');
    }
  });


  function onDocumentReady() {
    var wow = new WOW({
      boxClass: "animate-item",
      animateClass: "is-visible",
      mobile: false
    });

    wow.init();
  }

})(jQuery);

(function($) {
  "use strict";

  $(document).ready(onDocumentReady);

  /**
   * All functions to be called on $(document).ready() should be in this function
   */

   // Menu elevator animation
  $('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        var width = $(window).width();
        if(width < 991) {
          $('.menu-trigger').removeClass('active');
          $('.header-area .nav').slideUp(200);  
        }       
        $('html,body').animate({
          scrollTop: (target.offset().top) - 80
        }, 700);
        return false;
      }
    }
  });

  $(document).ready(function () {
      $(document).on("scroll", onScroll);
      
      //smoothscroll
      $('.scroll-to-section a[href^="#"]').on('click', function (e) {
          e.preventDefault();
          $(document).off("scroll");
          
          $('.scroll-to-section a').each(function () {
              $(this).removeClass('active');
          })
          $(this).addClass('active');
        
          var target = this.hash,
          menu = target;
          var target = $(this.hash);
          $('html, body').stop().animate({
              scrollTop: (target.offset().top) - 100
          }, 500, 'swing', function () {
              window.location.hash = target;
              $(document).on("scroll", onScroll);
          });
      });
  });

  function onScroll(event){
      var scrollPos = $(document).scrollTop();
      $('.nav a').each(function () {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              $('.nav ul li a').removeClass("active");
              currLink.addClass("active");
          }
          else{
              currLink.removeClass("active");
          }
      });
  }


  function onDocumentReady() {
    setTimeout(function() {
      simpleDropDown();
    }, 100);
  }

  function simpleDropDown() {
    var menu_items = $(".header-nav > ul > li");

    menu_items.each(function() {
      var _this = $(this);

      if (_this.find(".sub-menu").length) {
        var dropDownWrapper = _this.find(".sub-menu");

        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
          _this
            .on("touchstart mouseenter", function() {
              dropDownWrapper.css({
                overflow: "visible",
                visibility: "visible",
                opacity: "1"
              });
            })
            .on("mouseleave", function() {
              dropDownWrapper.css({
                overflow: "hidden",
                visiblity: "hidden",
                opacity: "0"
              });
            });
        } else {
          var config = {
            interval: 0,
            over: function() {
              setTimeout(function() {
                dropDownWrapper.addClass("sub-menu-open");
              }, 150);
            },
            timeout: 150,
            out: function() {
              dropDownWrapper.removeClass("sub-menu-open");
            }
          };

          _this.hoverIntent(config);
        }
      }
    });
  }
})(jQuery);

(function($) {
  "use strict";

  $(document).ready(onDocumentReady);

  /**
   * All functions to be called on $(document).ready() should be in this function
   */
  function onDocumentReady() {
    mobileMenu();
  }

  function mobileMenu() {
    var openMobileNav = $("#menu-show-mobile-nav"),
      mobileNav = $(".mobile-nav-wrapper"),
      overlay = $(".mobile-menu-overlay"),
      dropdownOpener = $(
        "ul.mobile-menu .sub-icon, ul.mobile-menu .has-sub > a"
      ),
      ps = new PerfectScrollbar(".mobile-menu-inner", {
        wheelPropagation: true,
        scrollYMarginOffset: 20,
        suppressScrollX: true
      });

    // Open Mobile Nav
    if (openMobileNav.length && mobileNav.length) {
      openMobileNav.on("tap click", function(e) {
        e.stopPropagation();
        e.preventDefault();

        openMobileNav.addClass("active");
        mobileNav.addClass("is-open");
        overlay.addClass("is-open");
      });
    }

    // Close Mobile Nav
    if (overlay.length) {
      overlay.on("tap click", function() {
        openMobileNav.removeClass("active");
        mobileNav.removeClass("is-open");
        overlay.removeClass("is-open");
      });
    }

    // Open/Close Submenus
    if (dropdownOpener.length) {
      dropdownOpener.each(function() {
        var _this = $(this);

        _this.on("tap click", function(e) {
          var thisItemParent = _this.parent("li"),
            thisItemParentSiblingswithDrop = thisItemParent.siblings(
              ".has-sub"
            );

          if (thisItemParent.hasClass("has-sub")) {
            var submenu = thisItemParent.find("> ul.sub-menu");

            if (submenu.is(":visible")) {
              submenu.slideUp(450, "easeInOutQuad");
              thisItemParent.removeClass("is-open");
            } else {
              thisItemParent.addClass("is-open");

              if (thisItemParentSiblingswithDrop.length === 0) {
                thisItemParent
                  .find(".sub-menu")
                  .slideUp(400, "easeInOutQuad", function() {
                    submenu.slideDown(250, "easeInOutQuad");
                  });
              } else {
                thisItemParent
                  .siblings()
                  .removeClass("is-open")
                  .find(".sub-menu")
                  .slideUp(250, "easeInOutQuad", function() {
                    submenu.slideDown(250, "easeInOutQuad");
                  });
              }
            }
          }
        });
      });
    }

    $(window).on("resize", function() {
      ps.update();
    });
  }
})(jQuery);
