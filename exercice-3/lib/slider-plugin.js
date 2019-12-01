'use strict';

(function ($) {
  $.fn.Slider = function (options) {
    this.settings = $.extend({
      'pictures': [],
      'styles': []
    }, options);

    //VARIABLES
    var priv = {};
    var pictures = this.settings.pictures;
    var styles = this.settings.styles;
    var count = 0;

    // Public Methods - External methods
    Object.assign(this, {

      /**
       * Display pictures
       */

      'setPictures': function () {

        //create div and ul
        $('body').append('<div class=slider style="height:'+styles[0]['height']+'px; width:'+styles[0]['width']+'px; background-color:'+styles[0]['border-color']+'" ></div>');
        $('.slider').append('<ul class="picture" ></ul>');

        //add each picture ro ul
        pictures.forEach(picture => {
          $('.picture').append('<li id="'+picture['id']+'" style="position:absolute; list-style-type:none"><img src="'+picture['link']+'" alt="'+picture['alternative']+'" width="'+styles[0]['images-width']+'" height="'+styles[0]['images-height']+'"></li>');
          count++;
        });

        //display buttons
        $('.slider').append('<div id="prev"><img src="'+styles[0]['arrow-left']+'" height="'+styles[0]['arrow-height']+'" width="'+styles[0]['arrow-width']+'" ></div>');
        $('.slider').append('<div id="next"><img src="'+styles[0]['arrow-right']+'" height="'+styles[0]['arrow-height']+'" width="'+styles[0]['arrow-width']+'" ></div>');

        //make it slide

        //define wich picture is playing
        var total = count-1;
        var now = 0;

        //click on previous button
        $('#prev').click(function () {
          now --;
          //remove ariane
          $('.ariane').remove();
          if (now < 0) {
            now = total;
          }
          //hide all pictures
          for (var i=0; i < $('img').length; i++ ){
            $('li').hide();
          }
          //show the right one
          $('#'+now).show();

          //add ariane icon
          for(var o = -1; o < now; o++) {
            $('.slider').append('<p class="ariane"><img src="'+styles[0]['ariane-icon']+'" width="'+styles[0]['ariane-icon-width']+'" height="'+styles[0]['ariane-icon-height']+'"></p>');
          }

          
          console.log(now);
        });

        //click on next button
        $('#next').click(function () {
          now++;
          //remove ariane
          $('.ariane').remove();
          if (now > total) {
            now = 0;
          }
          //hide all pictures
          for (var i=0; i < $('img').length; i++ ){
            $('li').hide();
          }
          //show the right one
          $('#'+now).show();

          //add ariane icon
          for(var o = -1; o < now; o++) {
            $('.slider').append('<p class="ariane"><img src="'+styles[0]['ariane-icon']+'" width="'+styles[0]['ariane-icon-width']+'" height="'+styles[0]['ariane-icon-height']+'"></p>');
          }
          console.log(now);
        });

        return this;
      },
    });



    // Private Methods - Internal Methods
    Object.assign(priv, {
      'init': function () {
        this.setPictures();
      }.bind(this)
    });

    // Initialise the plugin
    priv.init();
    return this;

  };
}(jQuery));
