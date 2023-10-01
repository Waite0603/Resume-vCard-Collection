/*	################################################################
	File Name: custom.js
	Template Name: Pera
	Created By: ThemenGraph
	http://themengraph.com
################################################################# */

$('document').ready(function() {
    /*==============================
        PRELOADER
    ===============================*/
    (function($){
        $(window).load(function() {
    	    $('#preloader').hide();
        });
    })(jQuery);
    /*==============================
       STICKY MENU
    ==============================*/
    (function($){


        var lastId,
        topMenu = $("#top-menu"),
        topMenuHeight = topMenu.outerHeight()+15,
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

        // so we can get a fancy scroll animation
        menuItems.click(function(e){
            var href = $(this).attr("href"),
                offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 300);
            e.preventDefault();
        });

        // Bind to scroll
        $(window).scroll(function(){
            var fromTop = $(this).scrollTop()+topMenuHeight;
            var cur = scrollItems.map(function(){
                if ($(this).offset().top < fromTop)
                return this;
            });
           cur = cur[cur.length-1];
           var id = cur && cur.length ? cur[0].id : "";
           if (lastId !== id) {
                lastId = id;
                menuItems
                 .parent().removeClass("active")
                 .end().filter("[href=#"+id+"]").parent().addClass("active");
            }
        });
    })(jQuery);

    (function($){
        $(".navbar-nav li:nth-child(1) a").click(function(){
            $(".section").removeClass("active")
            $(".cover-section").addClass("active");
        })
        $(".navbar-nav li:nth-child(2) a").click(function(){
            $(".section").removeClass("active")
            $(".about-section").addClass("active");
        })
        $(".navbar-nav li:nth-child(3) a").click(function(){
            $(".section").removeClass("active")
            $(".resume-section").addClass("active");
        })
        $(".navbar-nav li:nth-child(4) a").click(function(){
            $(".section").removeClass("active")
            $(".portfolio-section").addClass("active");
        })
        $(".navbar-nav li:nth-child(5) a").click(function(){
            $(".section").removeClass("active")
            $(".news-section").addClass("active");
        })
        $(".navbar-nav li:nth-child(6) a").click(function(){
            $(".section").removeClass("active")
            $(".contact-section").addClass("active");
        })
        $(".navbar-nav li a").click(function(){
            $(".navbar-nav li").removeClass("active");
            $(this).parent().addClass("active");
        })
    })(jQuery);

    (function($){
        $(".section").niceScroll({
            cursorborder:"",
            cursorcolor:"#00F",
            boxzoom:false,
            scrollspeed:60,
            cursorcolor: "#52e5ab",
            cursorwidth: "5px",
            zindex: "99999999999",
            mousescrollstep:40,
            enablemousewheel: true,
        });
   })(jQuery);

    (function($){
        $(".rotate").textrotator({
            animation: "flipUp",
            speed: 1750
        });
   })(jQuery);
   /*==============================
        PRETTY PHOTO
    ==============================*/
    (function($){
        $("area[data-gal^='prettyPhoto']").prettyPhoto();
        $(".work:first a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'pp_default',slideshow:3000, autoplay_slideshow: false, social_tools:''});
        $(".work:gt(0) a[data-gal^='prettyPhoto']").prettyPhoto({animation_speed:'fast',slideshow:10000, hideflash: true});
    })(jQuery);
    /*==============================
        ISOTOPE
    ==============================*/
    (function($){
        $(window).load(function() {
            var selectedCategory;
            var $grid = $('.work').isotope({
                itemSelector: '.col-md-3',
                masonry: {
                    columnWidth: '.col-md-3',
                },
                getSortData: {
                    selectedCategory: function( itemElem ) {
                        return $( itemElem ).hasClass( selectedCategory ) ? 0 : 1;
                    }
                }
            });
            var $items = $('.work').find('.work-item');
            $('.sort-button-group').on( 'click', '.button', function() {
                selectedCategory = $( this ).attr('data-category');
                if ( selectedCategory == 'all' ) {
                    $grid.isotope({
                        sortBy: 'original-order'
                    });
                    $items.css({
                        opacity: 1
                    });
                    return;
                }
                var selectedClass = '.' + selectedCategory;
                $items.filter( selectedClass ).css({
                    opacity: 1
                });
                $items.not( selectedClass ).css({
                    opacity: 0.1
                });
                $grid.isotope('updateSortData');
                $grid.isotope({ sortBy: 'selectedCategory' });
            });

            $('.button-group').each( function( i, buttonGroup ) {
                var $buttonGroup = $( buttonGroup );
                $buttonGroup.on( 'click', 'li', function() {
                    $buttonGroup.find('.active').removeClass('active');
                    $( this ).addClass('active');
                });
            });
        });

    })(jQuery);

});




