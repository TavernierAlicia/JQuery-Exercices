'use strict';

(function ($) {
  $.fn.SearchEngine = function (options) {
    this.settings = $.extend({
      'pokemons': [],
      'types': []
    }, options);

    //VARIABLES
    var priv = {};
    console.log(this.settings.pokemons);
    var pokemonTypes = this.settings.types[0]['typesList'];
    console.log(pokemonTypes.length);

    // Public Methods - External methods
    Object.assign(this, {

      /**
       * Display list
       */

      'setList': function () {
        //set search bar
        $('body').append('<input type="search" name="s">')
        //set input filter
        $('body').append('<select class="selectType">');

        for(var i = 0; i < pokemonTypes.length; i++){
          console.log(pokemonTypes[i]);
          $('.selectType').append('<option value="'+pokemonTypes[i]+'">'+pokemonTypes[i]+'</option>');
        }

        //set input level
        $('body').append('<input type=text class="selectLevel" placeholder="niveau">');

        //display data list

        return this;
      },
    });

    // Private Methods - Internal Methods
    Object.assign(priv, {
      'init': function () {
        $('body').append('<ul class="pokemonList"></ul>');
        this.setList();
      }.bind(this)
    });

    // Initialise the plugin
    priv.init();
    return this;

  };
}(jQuery));
