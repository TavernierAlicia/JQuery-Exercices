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


        for (var i = 0; i < pokemonTypes.length; i++) {
          $('.selectType').append('<option value="' + pokemonTypes[i] + '">' + pokemonTypes[i] + '</option>');
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
          $('.pokemonList').append('<li class="pokemon"><div id="pokemon-list-' + count + '"></div></li>');
          $('#pokemon-list-' + count).append('<h3>' + pokemon['name'] + '</h3>');
          $('#pokemon-list-' + count).append('<td><img src="' + pokemon['picture'] + '" width=50 height=50></td>');
          $('#pokemon-list-' + count).append('<td><p class="type">Type: ' + pokemon['type'] + ' ' + pokemon['type2'] + '</p>');
          $('#pokemon-list-' + count).append('<p class="weight">Poids: ' + pokemon['weight'] + 'kg</p>');
          $('#pokemon-list-' + count).append('<p class="pv">PV: ' + pokemon['pv'] + '</p>');
          $('#pokemon-list-' + count).append('<p class="att">ATT: ' + pokemon['att'] + '</p>');
          $('#pokemon-list-' + count).append('<p class="def">DEF: ' + pokemon['def'] + '</p>');
          $('#pokemon-list-' + count).append('<p class="attspe">ATT SPE: ' + pokemon['att.spe'] + '</p>');
          $('#pokemon-list-' + count).append('<p class="defspe">DEF SPE: ' + pokemon['def.spe'] + '</p>');
          $('#pokemon-list-' + count).append('<p class="vit">VIT: ' + pokemon['vit'] + '</p>');
          $('#pokemon-list-' + count).append('<p class="spe">SPE: ' + pokemon['spe'] + '</p>');

          //add options to datalist
          $('#pokelist').append('<option value="' + pokemon['name'] + '"');

          count++;
        });


        $('.button').click(function () {

          //get research data
          var nameSearch = $('.search').val();
          var selected = $('.selectType').val();
          var level = $('.selectLevel').val();
          var y = 0;
          var calculate = false;

          //verify level value
          if (level != '' && level.match(/^[0-9]*$/)) {
            calculate = true;
          }

          //remove pokemon list
          $('.pokemonList').remove();
          $('body').append('<ul class="pokemonList"></ul>');

          //for each pokemon
          pokemons.forEach(pokemon => {

            //calculate new values

            //get default values
            var pv = pokemon['pv'];
            var att = pokemon['att'];
            var def = pokemon['def'];
            var attspe = pokemon['att.spe'];
            var defspe = pokemon['def.spe'];
            var vit = pokemon['vit'];
            var spe = pokemon['spe'];
            var nature = pokemon['nature'];
            var ev = pokemon['ev'];
            var attiv = pokemon['attiv'];
            var defiv = pokemon['defiv'];
            var vitiv = pokemon['vitiv'];
            var speiv = pokemon['speiv'];

            //if the level field is not null
            if (calculate == true) {

              //get N (nature does not count in this case, set to 1)
              var nature = 1;

              //var ev (set 0 if null)
              if (ev == '') {
                ev = 0;
              }

              //get stats iv (if empty, set random)
              if (attiv == '') {
                attiv = Math.floor(Math.random() * Math.floor(16));
              }
              if (defiv == '') {
                defiv = Math.floor(Math.random() * Math.floor(16));
              }
              if (vitiv == '') {
                vitiv = Math.floor(Math.random() * Math.floor(16));
              }
              if (speiv == '') {
                speiv = Math.floor(Math.random() * Math.floor(16));
              }

              //get iv
              var iv = 0
              if (attiv % 2 == 1) {
                iv + 8;
              }
              if (defiv % 2 == 1) {
                iv + 4;
              }
              if (vitiv % 2 == 1) {
                iv + 2;
              }
              if (speiv % 2 == 1) {
                iv + 1;
              }


              //calc att, attspe, def, defspe, vit and spe
              var attCalc = Math.floor(Math.floor((2 * att + iv + ev) * level / 100 + 5) * nature)
              var defCalc = Math.floor(Math.floor((2 * def + iv + ev) * level / 100 + 5) * nature)
              var attspeCalc = Math.floor(Math.floor((2 * attspe + iv + ev) * level / 100 + 5) * nature)
              var defspeCalc = Math.floor(Math.floor((2 * defspe + iv + ev) * level / 100 + 5) * nature)
              var vitCalc = Math.floor(Math.floor((2 * vit + iv + ev) * level / 100 + 5) * nature)
              var speCalc = Math.floor(Math.floor((2 * spe + iv + ev) * level / 100 + 5) * nature)

              //calc pv
              var pvCalc = Math.floor((2 * pv + iv + ev) * level / 100 + level + 10)

              console.log(attCalc);



              //search by name and type
              if (selected != '' && pokemon['name'] != '' && pokemon['name'] == nameSearch && (pokemon['type2'] == selected || pokemon['type'] == selected)) {
                $('.pokemonList').append('<li class="pokemon"><div id="pokemon-list-' + y + '"></div></li>');
                $('#pokemon-list-' + y).append('<h3>' + pokemon['name'] + '</h3>');
                $('#pokemon-list-' + y).append('<td><img src="' + pokemon['picture'] + '" width=50 height=50></td>');
                $('#pokemon-list-' + y).append('<td><p class="type">Type: ' + pokemon['type'] + ' ' + pokemon['type2'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="weight">Poids: ' + pokemon['weight'] + 'kg</p>');

                $('#pokemon-list-' + y).append('<p class="pv">PV: ' + pvCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="att">ATT: ' + attCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="def">DEF: ' + defCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="attspe">ATT SPE: ' + attspeCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="defspe">DEF SPE: ' + defspeCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="vit">VIT: ' + vitCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="spe">SPE: ' + speCalc + '</p>');
              }

              //search by type
              if (selected != '' && pokemon['type2'] == selected || pokemon['type'] == selected) {

                //if types matched display pokemon
                $('.pokemonList').append('<li class="pokemon"><div id="pokemon-list-' + y + '"></div></li>');
                $('#pokemon-list-' + y).append('<h3>' + pokemon['name'] + '</h3>');
                $('#pokemon-list-' + y).append('<td><img src="' + pokemon['picture'] + '" width=50 height=50></td>');
                $('#pokemon-list-' + y).append('<td><p class="type">Type: ' + pokemon['type'] + ' ' + pokemon['type2'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="weight">Poids: ' + pokemon['weight'] + 'kg</p>');

                $('#pokemon-list-' + y).append('<p class="pv">PV: ' + pvCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="att">ATT: ' + attCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="def">DEF: ' + defCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="attspe">ATT SPE: ' + attspeCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="defspe">DEF SPE: ' + defspeCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="vit">VIT: ' + vitCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="spe">SPE: ' + speCalc + '</p>');
              }

              //search by name
              else if (nameSearch != '' && pokemon['name'] == nameSearch) {
                $('.pokemonList').append('<li class="pokemon"><div id="pokemon-list-' + y + '"></div></li>');
                $('#pokemon-list-' + y).append('<h3>' + pokemon['name'] + '</h3>');
                $('#pokemon-list-' + y).append('<td><img src="' + pokemon['picture'] + '" width=50 height=50></td>');
                $('#pokemon-list-' + y).append('<td><p class="type">Type: ' + pokemon['type'] + ' ' + pokemon['type2'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="weight">Poids: ' + pokemon['weight'] + 'kg</p>');

                $('#pokemon-list-' + y).append('<p class="pv">PV: ' + pvCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="att">ATT: ' + attCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="def">DEF: ' + defCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="attspe">ATT SPE: ' + attspeCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="defspe">DEF SPE: ' + defspeCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="vit">VIT: ' + vitCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="spe">SPE: ' + speCalc + '</p>');
              }

              //if nothing is selected, display all
              else if (selected == '' && nameSearch == '') {
                $('.pokemonList').append('<li class="pokemon"><div id="pokemon-list-' + y + '"></div></li>');
                $('#pokemon-list-' + y).append('<h3>' + pokemon['name'] + '</h3>');
                $('#pokemon-list-' + y).append('<td><img src="' + pokemon['picture'] + '" width=50 height=50></td>');
                $('#pokemon-list-' + y).append('<td><p class="type">Type: ' + pokemon['type'] + ' ' + pokemon['type2'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="weight">Poids: ' + pokemon['weight'] + 'kg</p>');

                $('#pokemon-list-' + y).append('<p class="pv">PV: ' + pvCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="att">ATT: ' + attCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="def">DEF: ' + defCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="attspe">ATT SPE: ' + attspeCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="defspe">DEF SPE: ' + defspeCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="vit">VIT: ' + vitCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="spe">SPE: ' + speCalc + '</p>');
              }
            } else {
              //search by name and type
              if (selected != '' && pokemon['name'] != '' && pokemon['name'] == nameSearch && (pokemon['type2'] == selected || pokemon['type'] == selected)) {
                $('.pokemonList').append('<li class="pokemon"><div id="pokemon-list-' + y + '"></div></li>');
                $('#pokemon-list-' + y).append('<h3>' + pokemon['name'] + '</h3>');
                $('#pokemon-list-' + y).append('<td><img src="' + pokemon['picture'] + '" width=50 height=50></td>');
                $('#pokemon-list-' + y).append('<td><p class="type">Type: ' + pokemon['type'] + ' ' + pokemon['type2'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="weight">Poids: ' + pokemon['weight'] + 'kg</p>');

                $('#pokemon-list-' + y).append('<p class="pv">PV: ' + pvCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="att">ATT: ' + attCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="def">DEF: ' + defCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="attspe">ATT SPE: ' + attspeCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="defspe">DEF SPE: ' + defspeCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="vit">VIT: ' + vitCalc + '</p>');
                $('#pokemon-list-' + y).append('<p class="spe">SPE: ' + speCalc + '</p>');
              }

              //search by type
              if (selected != '' && pokemon['type2'] == selected || pokemon['type'] == selected) {

                //if types matched display pokemon
                $('.pokemonList').append('<li class="pokemon"><div id="pokemon-list-' + y + '"></div></li>');
                $('#pokemon-list-' + y).append('<h3>' + pokemon['name'] + '</h3>');
                $('#pokemon-list-' + y).append('<td><img src="' + pokemon['picture'] + '" width=50 height=50></td>');
                $('#pokemon-list-' + y).append('<td><p class="type">Type: ' + pokemon['type'] + ' ' + pokemon['type2'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="weight">Poids: ' + pokemon['weight'] + 'kg</p>');

                $('#pokemon-list-' + y).append('<p class="pv">PV: ' + pokemon['pv'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="att">ATT: ' + pokemon['att'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="def">DEF: ' + pokemon['def'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="attspe">ATT SPE: ' + pokemon['attspe'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="defspe">DEF SPE: ' + pokemon['defspe'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="vit">VIT: ' + pokemon['vit'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="spe">SPE: ' + pokemon['spe'] + '</p>');
              }

              //search by name
              else if (nameSearch != '' && pokemon['name'] == nameSearch) {
                $('.pokemonList').append('<li class="pokemon"><div id="pokemon-list-' + y + '"></div></li>');
                $('#pokemon-list-' + y).append('<h3>' + pokemon['name'] + '</h3>');
                $('#pokemon-list-' + y).append('<td><img src="' + pokemon['picture'] + '" width=50 height=50></td>');
                $('#pokemon-list-' + y).append('<td><p class="type">Type: ' + pokemon['type'] + ' ' + pokemon['type2'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="weight">Poids: ' + pokemon['weight'] + 'kg</p>');

                $('#pokemon-list-' + y).append('<p class="pv">PV: ' + pokemon['pv'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="att">ATT: ' + pokemon['att'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="def">DEF: ' + pokemon['def'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="attspe">ATT SPE: ' + pokemon['attspe'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="defspe">DEF SPE: ' + pokemon['defspe'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="vit">VIT: ' + pokemon['vit'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="spe">SPE: ' + pokemon['spe'] + '</p>');
              }

              //if nothing is selected, display all
              else if (selected == '' && nameSearch == '') {
                $('.pokemonList').append('<li class="pokemon"><div id="pokemon-list-' + y + '"></div></li>');
                $('#pokemon-list-' + y).append('<h3>' + pokemon['name'] + '</h3>');
                $('#pokemon-list-' + y).append('<td><img src="' + pokemon['picture'] + '" width=50 height=50></td>');
                $('#pokemon-list-' + y).append('<td><p class="type">Type: ' + pokemon['type'] + ' ' + pokemon['type2'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="weight">Poids: ' + pokemon['weight'] + 'kg</p>');

                $('#pokemon-list-' + y).append('<p class="pv">PV: ' + pokemon['pv'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="att">ATT: ' + pokemon['att'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="def">DEF: ' + pokemon['def'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="attspe">ATT SPE: ' + pokemon['attspe'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="defspe">DEF SPE: ' + pokemon['defspe'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="vit">VIT: ' + pokemon['vit'] + '</p>');
                $('#pokemon-list-' + y).append('<p class="spe">SPE: ' + pokemon['spe'] + '</p>');
              }
            }


            y++;
          });
          //if no pokemon finded, display error
          if ($('.pokemonList li').length == 0) {
            $('.pokemonList').append('<p>Aucun pokémon trouvé</p>')
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
