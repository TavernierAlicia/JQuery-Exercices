'use strict';

(function ($) {
  $.fn.SearchEngine = function (options) {
    this.settings = $.extend({
      'pokemons': [],
      'types': []
    }, options);

    //VARIABLES
    var priv = {};
    var pokemons = this.settings.pokemons;
    var pokemonTypes = this.settings.types[0]['typesList'];

    // Public Methods - External methods
    Object.assign(this, {

      /**
       * Display list
       */

      'setList': function () {
        //set search bar
        $('body').append('<input class="search" list="pokelist">');
        $('.search').append('<datalist id="pokelist"></datalist>');

        //set input filter
        $('body').append('<select class="selectType">');


        for(var i = 0; i < pokemonTypes.length; i++){
          $('.selectType').append('<option value="'+pokemonTypes[i]+'">'+pokemonTypes[i]+'</option>');
        }

        //set input level
        $('body').append('<input type=text class="selectLevel" placeholder="niveau">');

        //set fake buton
        $('body').append('<div class="button" style="border: 1px solid black" >Rechercher</div>');

        //display data list
        $('body').append('<ul class="pokemonList"></ul>');
        
        var count = 0;

        //display infos about each pokemon
        pokemons.forEach(pokemon => {
          $('.pokemonList').append('<li class="pokemon"><div id="pokemon-list-'+count+'"></div></li>');
          $('#pokemon-list-'+count).append('<h3>'+pokemon['name']+'</h3>');
          $('#pokemon-list-'+count).append('<td><img src="'+pokemon['picture']+'" width=50 height=50></td>');
          $('#pokemon-list-'+count).append('<td><p class="type">Type: '+pokemon['type']+' '+pokemon['type2']+'</p>');
          $('#pokemon-list-'+count).append('<p class="weight">Poids: '+pokemon['weight']+'kg</p>');
          $('#pokemon-list-'+count).append('<p class="pv">PV: '+pokemon['pv']+'</p>');
          $('#pokemon-list-'+count).append('<p class="att">ATT: '+pokemon['att']+'</p>');
          $('#pokemon-list-'+count).append('<p class="def">DEF: '+pokemon['def']+'</p>');
          $('#pokemon-list-'+count).append('<p class="attspe">ATT SPE: '+pokemon['att.spe']+'</p>');
          $('#pokemon-list-'+count).append('<p class="defspe">DEF SPE: '+pokemon['def.spe']+'</p>');
          $('#pokemon-list-'+count).append('<p class="vit">VIT: '+pokemon['vit']+'</p>');
          $('#pokemon-list-'+count).append('<p class="spe">SPE: '+pokemon['spe']+'</p>');

          //add options to datalist
          $('#pokelist').append('<option value="'+pokemon['name']+'"');

          count++;
        });


        $('.button').click(function (){

          //get research data
          var nameSearch = $('.search').val();
          var selected = $('.selectType').val();
          var level = $('.selectLevel').val();
          console.log(level);

          var y = 0;

          //remove pokemon list
          $('.pokemonList').remove();
          $('body').append('<ul class="pokemonList"></ul>');

          //for each pokemon
          pokemons.forEach(pokemon => {

            //compare pokemon types to selected type
            if(pokemon['type'] == selected || pokemon['type2'] == selected && pokemon['name'] == nameSearch){

              //if types matched display pokemon
              $('.pokemonList').append('<li class="pokemon"><div id="pokemon-list-'+y+'"></div></li>');
              $('#pokemon-list-'+y).append('<h3>'+pokemon['name']+'</h3>');
              $('#pokemon-list-'+y).append('<td><img src="'+pokemon['picture']+'" width=50 height=50></td>');
              $('#pokemon-list-'+y).append('<td><p class="type">Type: '+pokemon['type']+' '+pokemon['type2']+'</p>');
              $('#pokemon-list-'+y).append('<p class="weight">Poids: '+pokemon['weight']+'kg</p>');
              $('#pokemon-list-'+y).append('<p class="pv">PV: '+pokemon['pv']+'</p>');
              $('#pokemon-list-'+y).append('<p class="att">ATT: '+pokemon['att']+'</p>');
              $('#pokemon-list-'+y).append('<p class="def">DEF: '+pokemon['def']+'</p>');
              $('#pokemon-list-'+y).append('<p class="attspe">ATT SPE: '+pokemon['att.spe']+'</p>');
              $('#pokemon-list-'+y).append('<p class="defspe">DEF SPE: '+pokemon['def.spe']+'</p>');
              $('#pokemon-list-'+y).append('<p class="vit">VIT: '+pokemon['vit']+'</p>');
              $('#pokemon-list-'+y).append('<p class="spe">SPE: '+pokemon['spe']+'</p>');
            }

            //if nothing is selected, display all
            else if (selected == '' && nameSearch == '') {
              $('.pokemonList').append('<li class="pokemon"><div id="pokemon-list-'+y+'"></div></li>');
              $('#pokemon-list-'+y).append('<h3>'+pokemon['name']+'</h3>');
              $('#pokemon-list-'+y).append('<td><img src="'+pokemon['picture']+'" width=50 height=50></td>');
              $('#pokemon-list-'+y).append('<td><p class="type">Type: '+pokemon['type']+' '+pokemon['type2']+'</p>');
              $('#pokemon-list-'+y).append('<p class="weight">Poids: '+pokemon['weight']+'kg</p>');
              $('#pokemon-list-'+y).append('<p class="pv">PV: '+pokemon['pv']+'</p>');
              $('#pokemon-list-'+y).append('<p class="att">ATT: '+pokemon['att']+'</p>');
              $('#pokemon-list-'+y).append('<p class="def">DEF: '+pokemon['def']+'</p>');
              $('#pokemon-list-'+y).append('<p class="attspe">ATT SPE: '+pokemon['att.spe']+'</p>');
              $('#pokemon-list-'+y).append('<p class="defspe">DEF SPE: '+pokemon['def.spe']+'</p>');
              $('#pokemon-list-'+y).append('<p class="vit">VIT: '+pokemon['vit']+'</p>');
              $('#pokemon-list-'+y).append('<p class="spe">SPE: '+pokemon['spe']+'</p>');
            }
            y++;
          });
          //if no pokemon finded, display error
          if ($('.pokemonList li').length == 0) {
            $('.pokemonList').append('<p>Aucun pokémon trouvé</p>')
            console.log('none');
          }
        });
        return this;
      },
    });

    // Private Methods - Internal Methods
    Object.assign(priv, {
      'init': function () {
        this.setList();
      }.bind(this)
    });

    // Initialise the plugin
    priv.init();
    return this;

  };
}(jQuery));
