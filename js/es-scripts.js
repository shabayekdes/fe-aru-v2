jQuery(document).ready(function() {

    var nt_example2 = jQuery('#nt-example2').newsTicker({
        row_height: 30,
        max_rows: 1,
        speed: 300,
        duration: 6000,
        prevButton: jQuery('#nt-example2-prev'),
        nextButton: jQuery('#nt-example2-next'),
        hasMoved: function() {
            jQuery('#nt-example2-infos-container').fadeOut(200, function(){
                jQuery('#nt-example2-infos .infos-hour').text(jQuery('#nt-example2 li:first span').text());
                jQuery('#nt-example2-infos .infos-text').text(jQuery('#nt-example2 li:first').data('infos'));
                jQuery(this).fadeIn(400);
            });
        },
        pause: function() {
            jQuery('#nt-example2 li i').removeClass('fa-play').addClass('fa-pause');
        },
        unpause: function() {
            jQuery('#nt-example2 li i').removeClass('fa-pause').addClass('fa-play');
        }
    });
    //Expand header button
    jQuery(".navbar-toggler").toggle(
        function(){
            jQuery(".main-menu").addClass("collnav");
            jQuery(".navbar-collapse").addClass("show");
        },
        function(){
            jQuery(".main-menu").removeClass("collnav");
            jQuery(".navbar-collapse").removeClass("show");
    });
    //Header to top fixed
    jQuery(function(){
        var shrinkHeader = 300;
        jQuery(window).scroll(function() {
            var scroll = getCurrentScroll();
            if ( scroll >= shrinkHeader ) {
                jQuery('.main-menu').addClass('shrink');
            }
            else {
                jQuery('.main-menu').removeClass('shrink');
            }
        });
        function getCurrentScroll() {
            return window.pageYOffset || document.documentElement.scrollTop;
        }
    });

});
    /* Button to top */
    //When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("btn-top").style.display = "block";
        } else {
            document.getElementById("btn-top").style.display = "none";
        }
    }
    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
/* Search Bar */ 
new UISearch( document.getElementById( 'sb-search' ) );
jQuery(document).ready(function() {
    if (!$.browser.webkit) {
        jQuery('.wrapper').html('<p>Sorry! Non webkit users. :(</p>');
    }
});   
(function() {
    [].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
      var menuItems = menu.querySelectorAll('.menu__link'),
        setCurrent = function(ev) {
          ev.preventDefault();
  
          var item = ev.target.parentNode; // li
  
          // return if already current
          if (classie.has(item, 'menu__item--current')) {
            return false;
          }
          // remove current
          classie.remove(menu.querySelector('.menu__item--current'), 'menu__item--current');
          // set current
          classie.add(item, 'menu__item--current');
        };
  
      [].slice.call(menuItems).forEach(function(el) {
        el.addEventListener('click', setCurrent);
      });
    });
  
    [].slice.call(document.querySelectorAll('.link-copy')).forEach(function(link) {
      link.setAttribute('data-clipboard-text', location.protocol + '//' + location.host + location.pathname + '#' + link.parentNode.id);
      new Clipboard(link);
      link.addEventListener('click', function() {
        classie.add(link, 'link-copy--animate');
        setTimeout(function() {
          classie.remove(link, 'link-copy--animate');
        }, 300);
      });
    });
  })(window);
/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 */
!function(s){"use strict";function e(s){return new RegExp("(^|\\s+)"+s+"(\\s+|$)")}function n(s,e){var n=a(s,e)?c:t;n(s,e)}var a,t,c;"classList"in document.documentElement?(a=function(s,e){return s.classList.contains(e)},t=function(s,e){s.classList.add(e)},c=function(s,e){s.classList.remove(e)}):(a=function(s,n){return e(n).test(s.className)},t=function(s,e){a(s,e)||(s.className=s.className+" "+e)},c=function(s,n){s.className=s.className.replace(e(n)," ")});var i={hasClass:a,addClass:t,removeClass:c,toggleClass:n,has:a,add:t,remove:c,toggle:n};"function"==typeof define&&define.amd?define(i):s.classie=i}(window);
/*!
 * newsTicker - class helper functions
 */
!function(t,i,s,n){"use strict";function o(i,s){this.element=i,this.$el=t(i),this.options=t.extend({},h,s),this._defaults=h,this._name=e,this.moveInterval,this.state=0,this.paused=0,this.moving=0,this.$el.is("ul")&&this.init()}var e="newsTicker",h={row_height:20,max_rows:3,speed:400,duration:2500,direction:"up",autostart:1,pauseOnHover:1,nextButton:null,prevButton:null,startButton:null,stopButton:null,hasMoved:function(){},movingUp:function(){},movingDown:function(){},start:function(){},stop:function(){},pause:function(){},unpause:function(){}};o.prototype={init:function(){this.$el.height(this.options.row_height*this.options.max_rows).css({overflow:"hidden"}),this.checkSpeed(),this.options.nextButton&&"undefined"!=typeof this.options.nextButton[0]&&this.options.nextButton.click(function(t){this.moveNext(),this.resetInterval()}.bind(this)),this.options.prevButton&&"undefined"!=typeof this.options.prevButton[0]&&this.options.prevButton.click(function(t){this.movePrev(),this.resetInterval()}.bind(this)),this.options.stopButton&&"undefined"!=typeof this.options.stopButton[0]&&this.options.stopButton.click(function(t){this.stop()}.bind(this)),this.options.startButton&&"undefined"!=typeof this.options.startButton[0]&&this.options.startButton.click(function(t){this.start()}.bind(this)),this.options.pauseOnHover&&this.$el.hover(function(){this.state&&this.pause()}.bind(this),function(){this.state&&this.unpause()}.bind(this)),this.options.autostart&&this.start()},start:function(){this.state||(this.state=1,this.resetInterval(),this.options.start())},stop:function(){this.state&&(clearInterval(this.moveInterval),this.state=0,this.options.stop())},resetInterval:function(){this.state&&(clearInterval(this.moveInterval),this.moveInterval=setInterval(function(){this.move()}.bind(this),this.options.duration))},move:function(){this.paused||this.moveNext()},moveNext:function(){"down"===this.options.direction?this.moveDown():"up"===this.options.direction&&this.moveUp()},movePrev:function(){"down"===this.options.direction?this.moveUp():"up"===this.options.direction&&this.moveDown()},pause:function(){this.paused||(this.paused=1),this.options.pause()},unpause:function(){this.paused&&(this.paused=0),this.options.unpause()},moveDown:function(){this.moving||(this.moving=1,this.options.movingDown(),this.$el.children("li:last").detach().prependTo(this.$el).css("marginTop","-"+this.options.row_height+"px").animate({marginTop:"0px"},this.options.speed,function(){this.moving=0,this.options.hasMoved()}.bind(this)))},moveUp:function(){if(!this.moving){this.moving=1,this.options.movingUp();var t=this.$el.children("li:first");t.animate({marginTop:"-"+this.options.row_height+"px"},this.options.speed,function(){t.detach().css("marginTop","0").appendTo(this.$el),this.moving=0,this.options.hasMoved()}.bind(this))}},updateOption:function(t,i){"undefined"!=typeof this.options[t]&&(this.options[t]=i,("duration"==t||"speed"==t)&&(this.checkSpeed(),this.resetInterval()))},getState:function(){return paused?2:this.state},checkSpeed:function(){this.options.duration<this.options.speed+25&&(this.options.speed=this.options.duration-25)},destroy:function(){this._destroy()}},t.fn[e]=function(i){var s=arguments;return this.each(function(){var n=t(this),h=t.data(this,"plugin_"+e),p="object"==typeof i&&i;h||n.data("plugin_"+e,h=new o(this,p)),"string"==typeof i&&h[i].apply(h,Array.prototype.slice.call(s,1))})}}(jQuery,window,document);