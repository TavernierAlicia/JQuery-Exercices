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
          $('.picture').append('<li style="position:absolute; list-style-type:none"><img src="'+picture['link']+'" alt="'+picture['alternative']+'" width="'+styles[0]['images-width']+'" height="'+styles[0]['images-height']+'"></li>');
        });

        //display buttons
        $('.slider').append('<div id="prev"><img src="'+styles[0]['arrow-left']+'" height="'+styles[0]['arrow-height']+'" width="'+styles[0]['arrow-width']+'" ></div>');
        $('.slider').append('<div id="next"><img src="'+styles[0]['arrow-right']+'" height="'+styles[0]['arrow-height']+'" width="'+styles[0]['arrow-width']+'" ></div>');


        //make it slide
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
