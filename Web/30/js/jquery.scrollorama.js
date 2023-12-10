/*
	scrollorama - The jQuery plugin for doing cool scrolly stuff
	by John Polacek (@johnpolacek)
	
	Dual licensed under MIT and GPL.
*/

(function($) {
    $.scrollorama = function(options) {
		
		// PRIVATE VARS
		var blocks = [],
			browserPrefix = '',
			onBlockChange = function() {};
		
		var scrollorama = this;
		
		var defaults = {offset:0, enablePin:true};
		
		scrollorama.settings = $.extend({}, defaults, options);
		scrollorama.blockIndex = 0;
		
		if (options.blocks === undefined) alert('ERROR: Must assign blocks class selector to scrollorama plugin');
		
		// PRIVATE FUNCTIONS
		function init() {
			if (typeof scrollorama.settings.blocks === 'string')  scrollorama.settings.blocks = $(scrollorama.settings.blocks);
			
			// set browser prefix
			if ($.browser.mozilla)	browserPrefix = '-moz-';
			if ($.browser.webkit)	browserPrefix = '-webkit-';
			if ($.browser.opera)	browserPrefix = '-o-';
			if ($.browser.msie)		browserPrefix = '-ms-';
			
			// create blocks array to contain animation props
			$('body').css('position','relative');
			
			var i;
			for (i=0; i<scrollorama.settings.blocks.length; i++) {
				var block = scrollorama.settings.blocks.eq(i);
				blocks.push({
					block: block,
					top: block.offset().top - parseInt(block.css('margin-top'), 10),
					pin: 0,
					animations:[]
				});
			}
			
			// convert block elements to absolute position
			if (scrollorama.settings.enablePin.toString() == 'true') {
				for (i=0; i<blocks.length; i++) {
					blocks[i].block
						.css('position', 'absolute')
						.animate('top', blocks[i].top);
				}
			}
			
			$('body').prepend('<div id="scroll-wrap"></div>');
			
			var didScroll = false;
			$(window).scroll(function(){
				didScroll = true; 
			});
			setInterval(function(){ 
				if(didScroll){
					onScrollorama();
					didScroll = false;
				}				
			}, 0);
		}
		
		function onScrollorama() {
			var scrollTop = $(window).scrollTop();
			var currBlockIndex = getCurrBlockIndex(scrollTop);
			
			// update all animations
			for (var i=0; i<blocks.length; i++) {
				
				// go through the animations for each block
				if (blocks[i].animations.length) {
					for (var j=0; j<blocks[i].animations.length; j++) {
						var anim = blocks[i].animations[j];
						
						// if above current block, settings should be at start value
						if (i > currBlockIndex) {
							if (currBlockIndex != i-1 && anim.baseline != 'bottom') {
								setProperty(anim.element, anim.property, anim.startVal);
							}
							if (blocks[i].pin) {
								blocks[i].block
									.css('position', 'absolute')
									.animate('top', blocks[i].top);
							}
						}
						
						// if below current block, settings should be at end value
						// unless on an element that gets animated when it hits the bottom of the viewport
						else if (i < currBlockIndex) {
							setProperty(anim.element, anim.property, anim.endVal);
							if (blocks[i].pin) {
								blocks[i].block
									.css('position', 'absolute')
									.animate('top', (blocks[i].top + blocks[i].pin));
							}
						}
						
						// otherwise, set values per scroll position
						if (i == currBlockIndex || (currBlockIndex == i-1 && anim.baseline == 'bottom')) {
							// if block gets pinned, set position fixed
							if (blocks[i].pin && currBlockIndex == i) {
								blocks[i].block
									.css('position', 'fixed')
									.animate('top', 0);
							}
							
							// set start and end animation positions
							var startAnimPos = blocks[i].top + anim.delay;
							if (anim.baseline == 'bottom')  startAnimPos -= $(window).height();
							var endAnimPos = startAnimPos + anim.duration;							
							
							// if scroll is before start of animation, set to start value
							if (scrollTop < startAnimPos)  setProperty(anim.element, anim.property, anim.startVal);
							
							// if scroll is after end of animation, set to end value
							else if (scrollTop > endAnimPos) {
								setProperty(anim.element, anim.property, anim.endVal);
								if (blocks[i].pin) {
									blocks[i].block
											.css('position', 'absolute')
											.animate('top', (blocks[i].top + blocks[i].pin));
								}
							}
							
							// otherwise, set value based on scroll
							else {
								// calculate percent to animate
								var animPercent = (scrollTop - startAnimPos) / anim.duration;
								// account for easing if there is any
								if ( anim.easing && $.isFunction( $.easing[anim.easing] ) ){
									animPercent = $.easing[anim.easing](	animPercent, animPercent*1000, 0, 1, 1000 );
								}
								// then multiply the percent by the value range and calculate the new value
								var animVal = anim.startVal + (animPercent * (anim.endVal - anim.startVal));
								setProperty(anim.element, anim.property, animVal);
							}
						}
					}
				}
			}
			
			// update blockIndex and trigger event if changed
			if (scrollorama.blockIndex != currBlockIndex) {
				scrollorama.blockIndex = currBlockIndex;
				onBlockChange();
			}
		}
		
		function getCurrBlockIndex(scrollTop) {
			var currBlockIndex = 0;
			for (var i=0; i<blocks.length; i++) {
				// check if block is in view
				if (blocks[i].top <= scrollTop - scrollorama.settings.offset)  currBlockIndex = i;
			}
			return currBlockIndex;
		}
		
		function setProperty(target, prop, val) {
			if (prop === 'rotate' || prop === 'zoom' || prop === 'scale') {
				if (prop === 'rotate') {
					target.css(browserPrefix+'transform', 'rotate('+val+'deg)');
				} else if (prop === 'zoom' || prop === 'scale') {
					var scaleCSS = 'scale('+val+')';
					if (browserPrefix !== '-ms-') {
						target.css(browserPrefix+'transform', scaleCSS);
					} else {
						target.css('zoom', scaleCSS);
					}
				}
			}
			else if(prop === 'background-position-x' || prop === 'background-position-y' ){
				var currentPosition = target.css('background-position').split(' ');
				if(prop === 'background-position-x'){
					target.css('background-position',val+'px '+currentPosition[1])
				}
				if(prop === 'background-position-y'){
					target.css('background-position',currentPosition[0]+' '+val+'px')
				}
			} 
			else if(prop === 'text-shadow' ){
				target.css(prop,'0px 0px '+val+'px #ffffff');
			} else {
				target.css(prop, val);
			}	
		}
		
		
		// PUBLIC FUNCTIONS
		scrollorama.animate = function(target) {
			/*
				target		= animation target
				arguments	= array of animation parameters
				
				animation parameters:
				delay		= amount of scrolling (in pixels) before animation starts
				duration	= amount of scrolling (in pixels) over which the animation occurs
				property	= css property being animated
				start		= start value of the property
				end			= end value of the property
				pin			= pin block during animation duration (applies to all animations within block)
				baseline	= top (default, when block reaches top of viewport) or bottom (when block first comies into view)
				easing		= just like jquery's easing functions
			*/
			
			// if string, convert to DOM object
			if (typeof target === 'string')  target = $(target);
			
			// find block of target
			var targetIndex;
			var targetBlock;
			for (var i=0; i<blocks.length; i++) {
				if (blocks[i].block.has(target).length) {
					targetBlock = blocks[i];
					targetIndex = i;
				}
			}
			
			// add each animation to the blocks animations array
			for (i=1; i<arguments.length; i++) {
				
				var anim = arguments[i];
				
				// for top/left/right/bottom, set relative positioning if static
				if (anim.property == 'top' || anim.property == 'left' || anim.property == 'bottom' || anim.property == 'right' ) {
					
					if (target.css('position') == 'static')	target.css('position','relative');
					
					// set anim.start, anim.end defaults
					if (anim.start === undefined)			anim.start = 0;
					else if (anim.end === undefined)		anim.end = 0;
				}
				
				// set anim.start/anim.end defaults for rotate, zoom/scale, letter-spacing
				if (anim.property == 'rotate') {
					if (anim.start === undefined)	anim.start = 0;
					if (anim.end === undefined)		anim.end = 0;
				} else if (anim.property == 'zoom' || anim.property == 'scale' ) {
					if (anim.start === undefined)	anim.start = 1;
					if (anim.end === undefined)		anim.end = 1;
				} else if (anim.property == 'letter-spacing' && target.css(anim.property)) {
					if (anim.start === undefined)	anim.start = 1;
					if (anim.end === undefined)		anim.end = 1;
				}
				
				if (anim.baseline === undefined) {
					if (anim.pin || targetBlock.pin || targetIndex === 0)	anim.baseline = 'top';
					else													anim.baseline = 'bottom';
				}
				
				if (anim.delay === undefined)  anim.delay = 0;
				
				targetBlock.animations.push({
					element: target,
					delay: anim.delay,
					duration: anim.duration,
					property: anim.property,
					startVal: anim.start !== undefined ? anim.start : parseInt(target.css(anim.property),10),	// if undefined, use current css value
					endVal: anim.end !== undefined ? anim.end : parseInt(target.css(anim.property),10),			// if undefined, use current css value
					baseline: anim.baseline !== undefined ? anim.baseline : 'bottom',
					easing: anim.easing
				});
				
				if (anim.pin) {
					if (targetBlock.pin < anim.duration + anim.delay) {
						var offset = anim.duration + anim.delay - targetBlock.pin;
						targetBlock.pin += offset;
						
						// adjust positions of blocks below target block
						for (var j=targetIndex+1; j<blocks.length; j++) {
							blocks[j].top += offset;
							blocks[j].block.css('top', blocks[j].top);
						}
					}
				}
			}
			
			onScrollorama();
		};
		
		// function for passing blockChange event callback
		scrollorama.onBlockChange = function(f) {
			onBlockChange = f;
		};
		
		// function for getting an array of scrollpoints
		// (top of each animation block and animation element scroll start point)
		scrollorama.getScrollpoints = function() {
			var scrollpoints = [];
			for (var i=0; i<blocks.length; i++) {
				scrollpoints.push(blocks[i].top);
				// go through the animations for each block
				if (blocks[i].animations.length && blocks[i].pin > 0) {
					for (var j=0; j<blocks[i].animations.length; j++) {
						var anim = blocks[i].animations[j];
						scrollpoints.push(blocks[i].top + anim.delay + anim.duration);
					}
				}
			}
			// make sure scrollpoints are in numeric order
			scrollpoints.sort(function(a,b){return a - b;});
			return scrollpoints;
		};
		
		
		// INIT
		init();
		
		return scrollorama;
    };

	//
	//		Easing functions COPIED DIRECTLY from jQuery UI
	//
	$.extend($.easing,
	{
		def: 'easeOutQuad',
		swing: function (x, t, b, c, d) {
			//alert($.easing.default);
			return $.easing[$.easing.def](x, t, b, c, d);
		},
		easeInQuad: function (x, t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		easeOutQuad: function (x, t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		easeInOutQuad: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		easeInCubic: function (x, t, b, c, d) {
			return c*(t/=d)*t*t + b;
		},
		easeOutCubic: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		easeInOutCubic: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		},
		easeInQuart: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		},
		easeOutQuart: function (x, t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		easeInOutQuart: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		easeInQuint: function (x, t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		},
		easeOutQuint: function (x, t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		easeInOutQuint: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		},
		easeInSine: function (x, t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		easeOutSine: function (x, t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		easeInOutSine: function (x, t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		easeInExpo: function (x, t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		easeOutExpo: function (x, t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		easeInOutExpo: function (x, t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		easeInCirc: function (x, t, b, c, d) {
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		easeOutCirc: function (x, t, b, c, d) {
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		easeInOutCirc: function (x, t, b, c, d) {
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		},
		easeInElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOutElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		easeInOutElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		},
		easeInBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOutBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInOutBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		easeInBounce: function (x, t, b, c, d) {
			return c - $.easing.easeOutBounce (x, d-t, 0, c, d) + b;
		},
		easeOutBounce: function (x, t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		easeInOutBounce: function (x, t, b, c, d) {
			if (t < d/2) return $.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
			return $.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
		}
	});
     
})(jQuery);


	$(document).ready(function() {
		var $window = $(window);
		var leftpoz1= 283
		var leftpoz2= 467
		var leftpoz3= 2020
		var leftpoz4= 334
		var leftpoz5= 286
		var leftpoz6= 1350
		var leftpoz7= 300
		var leftpoz8= 200
		var rightpoz1= 371
		var rightpoz2= 421
		var rightpoz3= 200
		var rightpoz4= 100
		var poz200 = 200
		if ($window.width() < 1370) {
			leftpoz1= 23
			leftpoz2= 193
			leftpoz3= 1400
			leftpoz4= 34
			leftpoz5= 26
			leftpoz6= 820
			leftpoz7= 100
			leftpoz8= 0
			rightpoz1= 51
			rightpoz2= 81
			rightpoz3= 0
			rightpoz4= 0
			poz200 = 100
		}
		if ($window.width() < 1025) {
			leftpoz1= 0
			leftpoz2= 150
			leftpoz3= 1000
			leftpoz4= 0
			leftpoz5= 26
			leftpoz6= 570
			leftpoz7= 100
			leftpoz8= 0
			rightpoz1= 51
			rightpoz2= 81
			rightpoz3= 0
			rightpoz4= 0
			poz200 = 0
		}
		var scrollorama = $.scrollorama({blocks:'.scrollblock'});
		scrollorama.animate('.birds_1',{ duration:300, property:'zoom', end:0});
		scrollorama.animate('.birds_1',{ duration:300, property:'opacity', end:0});
		scrollorama.animate('.birds_2',{ duration:400, property:'zoom', end:0});
		scrollorama.animate('.birds_2',{ duration:400, property:'top',start:545, end:0});
		scrollorama.animate('.birds_2',{ duration:300, property:'right',start:rightpoz2, end:0});
		scrollorama.animate('.birds_3',{ delay:700, duration:600, property:'opacity', end:0});
		scrollorama.animate('.birds_3',{ delay:700, duration:600, property:'zoom', end:0});
		scrollorama.animate('.birds_3',{ delay:700, duration:800, property:'top',start:1728, end:1900});
		scrollorama.animate('.birds_3',{ delay:700, duration:800, property:'left',start:leftpoz4, end:leftpoz4+100});
		scrollorama.animate('.birds_4',{ delay:700, duration:600, property:'zoom', end:0});
		scrollorama.animate('.birds_4',{ delay:700, duration:500, property:'top',start:1696, end:1600});
		scrollorama.animate('.birds_4',{ delay:700, duration:500, property:'left',start:leftpoz5, end:0});
		scrollorama.animate('.birds_5',{ delay:2000, duration:500, property:'opacity', end:.5});
		scrollorama.animate('.birds_5',{ delay:2000, duration:1500, property:'zoom', end:0});
		scrollorama.animate('.birds_6',{ delay:3100, duration:600, property:'zoom', end:0});
		scrollorama.animate('.birds_6',{ delay:3100, duration:600, property:'opacity', end:0});
		
		scrollorama.animate('.balloon_1',{ duration:800, property:'left',start:leftpoz1, end:-500});
		scrollorama.animate('.balloon_1',{ duration:800, property:'top',start:376, end:-500});
		scrollorama.animate('.balloon_1,.balloon_2',{ duration:600, property:'zoom',end:0});
		scrollorama.animate('.balloon_1,.balloon_2',{ duration:800, property:'opacity', end:.5});
		scrollorama.animate('.balloon_2',{ duration:800, property:'left',start:leftpoz2, end:leftpoz3});
		scrollorama.animate('.balloon_2',{ duration:800, property:'top',start:721, end:1000});
		
		scrollorama.animate('.balloon_3',{ duration:800, property:'right',start:rightpoz1, end:2100});
		scrollorama.animate('.balloon_3',{ duration:1000, property:'top',start:204, end:800});
		
		scrollorama.animate('.balloon_4',{ delay:900, duration:1500, property:'opacity', end:0});
		scrollorama.animate('.balloon_4',{ delay:900, duration:1500, property:'zoom', end:0});
		scrollorama.animate('.balloon_4',{ delay:300, duration:2000, property:'top',start:1300, end:2300});
		scrollorama.animate('.balloon_4',{ delay:300, duration:2000, property:'right',start:0, end:1000});
		
		
		scrollorama.animate('.balloon_5',{ delay:3400, duration:800, property:'left',start:leftpoz7, end:0});
		scrollorama.animate('.balloon_5',{ delay:3400, duration:800, property:'zoom', end:0});
		
		scrollorama.animate('.people1',{ delay:1500, duration:800, property:'left',start:-300, end:leftpoz6});
		scrollorama.animate('.people1',{ delay:1500, duration:800, property:'top',start:2382, end:2800});
		scrollorama.animate('.people1',{ delay:1500, duration:800, property:'zoom', end:.6});
		
		scrollorama.animate('.cloud1',{ duration:1300, property:'left',start:leftpoz8, end:0});
		scrollorama.animate('.cloud1',{ duration:1300, property:'top',start:100, end:200});
		scrollorama.animate('.cloud2',{ duration:1300, property:'left',start:0, end:rightpoz3});
		scrollorama.animate('.cloud2',{ duration:1300, property:'top',start:1000, end:1100});
		scrollorama.animate('.cloud4',{ delay:2600, duration:1500, property:'left',start:10, end:poz200});
});