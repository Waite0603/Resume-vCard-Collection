/*
==============================================
	KNIT
	Version: 1.0
	Author: BootEx
	Author URL: http://www.ahadhossain.com
------------------------------------------------
================================================
*/

'use strict';

$(window).on('load', function() { 
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");


	/*------------------
	Isotope Filter
	--------------------*/
	var $container = $('.isotope_items');
	$container.isotope();

	$('.portfolio-filter li').on("click", function(){
		$(".portfolio-filter li").removeClass("active");
		$(this).addClass("active");				 
		var selector = $(this).attr('data-filter');
		$(".isotope_items").isotope({
				filter: selector,
				animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			}
		});
		return false;
	});

});


(function($){

	/*------------------
		Navigation
	--------------------*/
	$('.responsive-switch').on('click', function(e) {
		$('.site-menu').toggleClass('active');	
		e.preventDefault();
	});

	$('.menu-list>li>a, .sm-close').on('click', function() {
		$('.site-menu').removeClass('active');
	});

	$('.menu-list').onePageNav({
		easing: 'swing'
	});


	/*------------------
		Hero section
	--------------------*/
	var hero_h = $('.hero-section').innerHeight(),
		body_h = $('body').innerHeight(),
		header_height =  hero_h - body_h;

	$(window).on('scroll resize',function(e) {
		if ($(this).scrollTop() > header_height) {
			$('.hero-content').addClass('sticky');
		}else{
			$('.hero-content').removeClass('sticky');
		}
		e.preventDefault();
	});



	/*------------------
		Background set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	/*------------------
		PROGRESS BAR
	--------------------*/
	$('.progress-bar-style').each(function() {
		var progress = $(this).data("progress");
		var prog_width = progress + '%';
		if (progress <= 100) {
			$(this).append('<div class="bar-inner" style="width:' + prog_width + '"><span>' + prog_width + '</span></div>');
		}
		else {
			$(this).append('<div class="bar-inner" style="width:100%"><span>100%</span></div>');
		}
	});



	/*------------------
		Popup
	--------------------*/
	$('.work-image').magnificPopup({
		type: 'image',
		removalDelay: 400,
		zoom:{enabled: true, duration: 300}
	});

	$('.work-video').magnificPopup({
		type: 'iframe',
	});



	/*------------------
		Service
	--------------------*/
	$('.service-slider').owlCarousel({
		loop:true,
		autoplay:true,
		nav:false,
		dots: false,
		margin:30,
		responsive:{
			0:{
				items:1
			},
			720:{
				items:2
			},
			992:{
				items:3
			}
		}
	});



	/*------------------
		Testimonial
	--------------------*/
	$('.review-slider').owlCarousel({
		dots: false,
		nav: true,
		loop: true,
		margin:30,
		smartSpeed: 700,
		items:1,
		autoplay:true,
		navText: ['<i class="ti-arrow-left"></i>', '<i class="ti-arrow-right"></i>']
	});


	/*------------------
		WOW JS
	--------------------*/
	new WOW().init();


	/*------------------
		CONTACT FORM
	--------------------*/
	$('#contact-form').on('submit', function() {
		var send_btn = $('#send-form'),
			form = $(this),
			formdata = $(this).serialize(),
			chack = $('#form-chack');
			send_btn.text('Wait...');

		function reset_form(){
		 	$("#name").val('');
			$("#email").val('');
			$("#massage").val('');
		}

		$.ajax({
			url:  $(form).attr('action'),
			type: 'POST',
			data: formdata,
			success : function(text){
				if (text == "success"){
					send_btn.addClass('done');
					send_btn.text('Success');
					setTimeout(function() {
						reset_form();
						send_btn.removeClass('done');
						send_btn.text('Send Massage');
					}, 3000);
				}
				else {
					reset_form();
					send_btn.addClass('error');
					send_btn.text('Error');
					setTimeout(function() {
						send_btn.removeClass('error');
						send_btn.text('Send Massage');
					}, 5000);
				}
			}
		});
		return false;
	});

})(jQuery);