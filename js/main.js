var TAGGS = {};
(function ($) {
     "use strict";
    var $window = $(window),
        $document = $(document),
        $body = $('body'),
        swipers = {},
        $header = $('#site-header'),
        $animatedIcons = $('.js-animate-icon'),
        $asidePanel = $('.right-menu'),
        $primaryMenu = $('.primary-menu'),
        $footer = $('#site-footer');
    TAGGS.fixedHeader = function () {
        $header.headroom(
            {
                "offset": 210,
                "tolerance": 5,
                "classes": {
                    "initial": "animated",
                    "pinned": "swingInX",
                    "unpinned": "swingOutX"
                }
            }
        );
    };
    TAGGS.parallaxFooter = function () {
        if ($footer.length && $footer.hasClass('js-fixed-footer')) {
            $footer.before('<div class="block-footer-height"></div>');
            $('.block-footer-height').matchHeight({
                target: $footer
            });
        }
    };
    TAGGS.animateSvg = function () {
        if ($animatedIcons.length) {
            $animatedIcons.each(function () {
                jQuery(this).waypoint(function () {
                    var mySVG = $(this.element).find('> svg').drawsvg();
                    mySVG.drawsvg('animate');
                    this.destroy();
                }, {offset: '95%'});
            });
        }
    };
    TAGGS.customScroll = function () {
        if ($asidePanel.length) {
            $asidePanel.mCustomScrollbar({
                axis: "y",
                scrollEasing: "linear",
                scrollInertia: 150
            });
        }
    };
    TAGGS.togglePanel = function () {
        if ($asidePanel.length) {
            $asidePanel.toggleClass('opened');
            $body.toggleClass('overlay-enable');
        }
    };   
    TAGGS.mediaPopups = function () {
        $('.js-popup-iframe').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
        $('.js-zoom-image, .link-image').magnificPopup({
            type: 'image',
            removalDelay: 500,  
            callbacks: {
                beforeOpen: function () {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    this.st.mainClass = 'mfp-zoom-in';
                }
            },
            closeOnContentClick: true,
            midClick: true
        });
    }; 
    TAGGS.equalHeight = function () {
        $('.js-equal-child').find('.theme-module').matchHeight({
            property: 'min-height'
        });
    };
    TAGGS.taggsawardScrollAnnimation = function () {
        var controller = new ScrollMagic.Controller();
        new ScrollMagic.Scene({triggerElement: ".taggs-award"})
            .setVelocity(".taggs-award .images img:first-of-type", {opacity: 1, top: "-10"}, 400)
            .triggerHook("onEnter")
            .addTo(controller);
        new ScrollMagic.Scene({triggerElement: ".taggs-award"})
            .setVelocity(".taggs-award .images img:nth-child(2)", {opacity: 1, bottom: "0"}, 800)
            .triggerHook(0.7)
            .addTo(controller);
        new ScrollMagic.Scene({triggerElement: ".taggs-award"})
            .setVelocity(".taggs-award .images img:last-child", {opacity: 1, bottom: "0"}, 1000)
            .triggerHook(0.8)
            .addTo(controller);
    };
    TAGGS.OurgrantScrollAnnimation = function () {
        var controller = new ScrollMagic.Controller();

        new ScrollMagic.Scene({triggerElement: ".our-grant"})
            .setVelocity(".our-grant .elements", {opacity: 1}, 600)
            .triggerHook(0.6)
            .addTo(controller);
        new ScrollMagic.Scene({triggerElement: ".our-grant"})
            .setVelocity(".our-grant .healthtag", {opacity: 1, bottom: "-90"}, 1000)
            .triggerHook(1)
            .addTo(controller);
    };
    TAGGS.initSwiper = function () {
        var initIterator = 0;
        var $breakPoints = false;
        $('.swiper-container').each(function () {
            var $t = $(this);
            var index = 'swiper-unique-id-' + initIterator;
            $t.addClass('swiper-' + index + ' initialized').attr('id', index);
            var $effect = ($t.data('effect')) ? $t.data('effect') : 'slide',
                $crossfade = ($t.data('crossfade')) ? $t.data('crossfade') : true,
                $loop = ($t.data('loop') === false) ? $t.data('loop') : true,
                $showItems = ($t.data('show-items')) ? $t.data('show-items') : 1,
                $scrollItems = ($t.data('scroll-items')) ? $t.data('scroll-items') : 1,
                $scrollDirection = ($t.data('direction')) ? $t.data('direction') : 'horizontal',
                $mouseScroll = ($t.data('mouse-scroll')) ? $t.data('mouse-scroll') : false,
                $autoplay = ($t.data('autoplay')) ? parseInt($t.data('autoplay'), 10) : 0,
                $autoheight = ($t.hasClass('auto-height')) ? true: false,
                $slidesSpace = ($showItems > 1) ? 20 : 0;
            if ($showItems > 1) {
                $breakPoints = {
                    480: {
                        slidesPerView: 1,
                        slidesPerGroup: 1
                    },
                    768: {
                        slidesPerView: 2,
                        slidesPerGroup: 2
                    }
                };
            }
            swipers['swiper-' + index] = new Swiper('.swiper-' + index, {
                direction: $scrollDirection,
                mousewheelControl: $mouseScroll,
                mousewheelReleaseOnEdges: $mouseScroll,
                slidesPerView: $showItems,
                slidesPerGroup: $scrollItems,
                spaceBetween: $slidesSpace,
                keyboardControl: true,
                setWrapperSize: true,
                preloadImages: true,
                updateOnImagesReady: true,
                autoplay: $autoplay,
                autoHeight: $autoheight,
                loop: $loop,
                breakpoints: $breakPoints,
                effect: $effect,
                fade: {
                    crossFade: $crossfade
                },
                parallax: true,
                onImagesReady: function (swiper) {
                },
                onSlideChangeStart: function (swiper) {
                    if ($t.find('.slider-slides').length) {
                        $t.find('.slider-slides .slide-active').removeClass('slide-active');
                        var realIndex = swiper.slides.eq(swiper.activeIndex).attr('data-swiper-slide-index');
                        $t.find('.slider-slides .slides-item').eq(realIndex).addClass('slide-active');
                    }
                }
            });
            initIterator++;
        });
         $('.slider-slides .slides-item').on('click', function () {
            if ($(this).hasClass('slide-active')) return false;
            var activeIndex = $(this).parent().find('.slides-item').index(this);
            swipers['swiper-' + $(this).closest('.swiper-container').attr('id')].slideTo(activeIndex + 1);
            $(this).parent().find('.slide-active').removeClass('slide-active');
            $(this).addClass('slide-active');
            return false;
        });
    };
    TAGGS.burgerAnimation = function () {
        var beginAC = 80,
            endAC = 320,
            beginB = 80,
            endB = 320;
        function inAC(s) {
            s.draw('80% - 240', '80%', 0.3, {
                delay: 0.1,
                callback: function () {
                    inAC2(s);
                }
            });
        }
        function inAC2(s) {
            s.draw('100% - 545', '100% - 305', 0.6, {
                easing: ease.ease('elastic-out', 1, 0.3)
            });
        }
        function inB(s) {
            s.draw(beginB - 60, endB + 60, 0.1, {
                callback: function () {
                    inB2(s);
                }
            });
        }
        function inB2(s) {
            s.draw(beginB + 120, endB - 120, 0.3, {
                easing: ease.ease('bounce-out', 1, 0.3)
            });
        }
        function outAC(s) {
            s.draw('90% - 240', '90%', 0.1, {
                easing: ease.ease('elastic-in', 1, 0.3),
                callback: function () {
                    outAC2(s);
                }
            });
        }
        function outAC2(s) {
            s.draw('20% - 240', '20%', 0.3, {
                callback: function () {
                    outAC3(s);
                }
            });
        }
        function outAC3(s) {
            s.draw(beginAC, endAC, 0.7, {
                easing: ease.ease('elastic-out', 1, 0.3)
            });
        }
        function outB(s) {
            s.draw(beginB, endB, 0.7, {
                delay: 0.1,
                easing: ease.ease('elastic-out', 2, 0.4)
            });
        }
        function addScale(m) {
            m.className = 'menu-icon-wrapper scaled';
        }
        function removeScale(m) {
            m.className = 'menu-icon-wrapper';
        }
        var pathD = document.getElementById('pathD'),
            pathE = document.getElementById('pathE'),
            pathF = document.getElementById('pathF'),
            segmentD = new Segment(pathD, beginAC, endAC),
            segmentE = new Segment(pathE, beginB, endB),
            segmentF = new Segment(pathF, beginAC, endAC),
            wrapper2 = document.getElementById('menu-icon-wrapper'),
            trigger2 = document.getElementById('menu-icon-trigger'),
            toCloseIcon2 = true;
        wrapper2.style.visibility = 'visible';
        trigger2.onclick = function () {
            addScale(wrapper2);
            if (toCloseIcon2) {
                inAC(segmentD);
                inB(segmentE);
                inAC(segmentF);
            } else {
                outAC(segmentD);
                outB(segmentE);
                outAC(segmentF);
            }
            toCloseIcon2 = !toCloseIcon2;
            setTimeout(function () {
                removeScale(wrapper2);
            }, 450);
        };
    };
    $window.keydown(function (eventObject) {
        if (eventObject.which == 27) {
            if ($asidePanel.hasClass('opened')) {
                TAGGS.togglePanel();
            }
            if ($body.hasClass('open')) {
                TAGGS.toggleSearch();
            }
        }
    });
    jQuery(".js-close-aside").on('click', function () {
        if ($asidePanel.hasClass('opened')) {
            TAGGS.togglePanel();
        }
        return false;
    });
    jQuery(".js-open-aside").on('click', function () {
        if (!$asidePanel.hasClass('opened')) {
            TAGGS.togglePanel();
        }
        return false;
    });
    $document.on('click', function (event) {
        if (!$(event.target).closest($asidePanel).length) {
            if ($asidePanel.hasClass('opened')) {
                TAGGS.togglePanel();
            }
        }
    });

    jQuery('.back-to-top').on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        }, 1200);
        return false;
    });
    $document.ready(function () {
        if ($('#menu-icon-wrapper').length) {
            TAGGS.burgerAnimation();
        }
         $primaryMenu.taggsmenu({
            showSpeed: 300,
            hideSpeed: 200,
            trigger: "hover",
            animation: "drop-up",
            indicatorFirstLevel: "&#xf0d7",
            indicatorSecondLevel: "&#xf105"
        });
        TAGGS.fixedHeader();
        TAGGS.initSwiper();
        TAGGS.equalHeight();
        TAGGS.customScroll();
        TAGGS.mediaPopups();
        TAGGS.parallaxFooter();
         $('select').niceSelect();
        TAGGS.animateSvg();
        if ($('.taggs-award').length) {
            TAGGS.taggsawardScrollAnnimation();
        }
        if ($('.hhs-slider').length) {
            TAGGS.hhsScrollAnnimation();
        }
        if ($('.our-grant').length) {
            TAGGS.OurgrantScrollAnnimation();
        }
    });
})(jQuery);
TAGGS = (function (taggs, $, window, document){
    "use strict";
    var documentReady = function($){
	    $('.background-image-holder').each(function() {
	        var imgSrc = $(this).children('img').attr('src');
	        $(this).css('background', 'url("' + imgSrc + '")').css('background-position', 'initial').css('opacity','1');
	    });
    };
    TAGGS.backgrounds = {
        documentReady : documentReady        
    };

    TAGGS.components.documentReady.push(documentReady);
    return taggs;

}(TAGGS, jQuery, window, document));			
			
TAGGS = (function (taggs, $, window, document){
    "use strict";
    
    var documentReady = function($){
        
        var $window      = $(window); 
        var windowWidth  = $window.width();
        var windowHeight = $window.height();
        var navHeight    = $('nav').outerHeight(true);


        if ((/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
            $('section').removeClass('parallax');
        }

        if (windowWidth > 768) {
            var parallaxHero = $('.parallax:nth-of-type(1)'),
                parallaxHeroImage = $('.parallax:nth-of-type(1) .background-image-holder');

            parallaxHeroImage.css('top', -(navHeight));
            if(parallaxHero.outerHeight(true) == windowHeight){
                parallaxHeroImage.css('height', windowHeight + navHeight);
            }
        }
    };

    TAGGS.parallax = {
        documentReady : documentReady        
    };

    TAGGS.components.documentReady.push(documentReady);
    return taggs;

}(TAGGS, jQuery, window, document));



	TAGGS = (function (taggs, $, window, document){
    "use strict";
    
    taggs.notifications = {};

    var documentReady = function($){
        
        $('.notification').each(function(){
            var notification = $(this);
            if(!notification.find('.notification-close').length){
                notification.append('<div class="notification-close-cross notification-close"></div>');
            }
        });
    

        $('.notification[data-autoshow]').each(function(){
            var notification = $(this);
            var millisecondsDelay = notification.attr('data-autoshow') * 1;

            if(typeof notification.attr('data-cookie') !== typeof undefined){
                if(!taggs.cookies.hasItem(notification.attr('data-cookie'))){
                    taggs.notifications.showNotification(notification, millisecondsDelay);
                }
            }else{
                taggs.notifications.showNotification(notification, millisecondsDelay);
            }
        });

        $('[data-notification-link]:not(.notification)').on('click', function(){
            var notificationID = $(this).attr('data-notification-link');
            var notification = $('body').find('.notification[data-notification-link="'+notificationID+'"]');
            notification.removeClass('notification--dismissed');
            taggs.notifications.showNotification(notification, 0);
            return false;
        });

        $('.notification-close').on('click', function(){
            var closeButton = $(this);
            taggs.notifications.closeNotification(closeButton);

            if(closeButton.attr('href') === '#'){
                return false;
            }
        });
    
    };
    
    taggs.notifications.documentReady = documentReady;

    taggs.notifications.showNotification = function(notification, millisecondsDelay){
        var delay = (typeof millisecondsDelay !== typeof undefined) ? (1*millisecondsDelay) : 0;
        setTimeout(function(){
            notification.addClass('notification--reveal');
            notification.closest('nav').addClass('notification--reveal');
            if(notification.find('input').length){
                notification.find('input').first().focus();
            }
        },delay);
    };

    taggs.notifications.closeNotification = function(notification){

        var $notification = $(notification);
        
        notification = $notification.is('.notification-close') ? 
                       $notification.closest('.notification') : 
                       $('body').find('.notification[data-notification-link="'+notification+'"]');

        notification.addClass('notification--dismissed');
        notification.closest('nav').removeClass('notification--reveal');

        if(typeof notification.attr('data-cookie') !== typeof undefined){
            taggs.cookies.setItem(notification.attr('data-cookie'), "true", Infinity);
        }
    };

    taggs.components.documentReady.push(documentReady);
    return taggs;

}(TAGGS, jQuery, window, document));
