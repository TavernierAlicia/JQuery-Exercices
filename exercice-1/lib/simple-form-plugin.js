'use strict';

(function ($) {
  $.fn.SimpleForm = function (options) {
    this.settings = $.extend({
      'form': []
    }, options);

    //VARIABLES
    var priv = {};

    // Public Methods - External methods
    Object.assign(this, {

      /**
       * Generate form
       */

      'setForm': function () {
        //create fields in the form
        var count = 0;
        this.settings.form.forEach(form => {
          if (this.settings.form[count].type != 'list') {
            $('.simpleForm').append('<div class="' 
              + this.settings.form[count]['class']+ '" id=" simple-form-div-' + count
              + '"><p class=title>' + this.settings.form[count]['name']
              + '</p><input type="' + this.settings.form[count]['type']
              + '" ' + this.settings.form[count]['required']
              + '" name="' + this.settings.form[count]['name']
              + '"placeholder="' + this.settings.form[count]['placeholder']
              + '"></div>');

            //set some data
            $('#simple-form-div-' + count).data("regex", this.settings.form[count]['regex']);
            $('#simple-form-div-' + count).data("required", this.settings.form[count]['required']);
            $('#simple-form-div-' + count).data("error", this.settings.form[count]['errormessage']);

          } else {

            //insert select
            $('.simpleForm').append('<div class="' + this.settings.form[count]['class']
              + '" id="simple-form-div-' + count
              + '"><p class=title>' + this.settings.form[count]['name']
              + '</p><select name="' + this.settings.form[count]['datalist']
              + '" ' + this.settings.form[count]['required']
              + ' placeholder="' + this.settings.form[count]['placeholder']
              + '" id="' + this.settings.form[count]['datalist']
              + '"></div>');

            //set some data
            $('#simple-form-div-' + count).data("regex", this.settings.form[count]['regex']);
            $('#simple-form-div-' + count).data("required", this.settings.form[count]['required']);
            $('#simple-form-div-' + count).data("error", this.settings.form[count]['errormessage']);

            //set list options
            for (var i = 0; i < this.settings.form[count].options.length; i++) {
              $('#' + this.settings.form[count]['datalist']).append('<option value="' + this.settings.form[count]['options'][i] + '">' + this.settings.form[count]['options'][i] + '</option>');
            }
          }
          count++;
        });

        //create fake button in the form
        $('.simpleForm').append('<div class="button" style="border: 1px solid black" >Submit</div>');

        //affect event
        $('input').change(function () {
          //Used to be a function but not working don't know why
          //REDUNDANT BUT NO CHOICE NOW
          //this.verifyForm();

          //get necessary data
          var elem = $(this).closest('div');
          var req = elem.data('required');
          var reg = elem.data('regex');
          var err = elem.data('error');
          //if the required field is empty
          if (req == 'required' && this.value == '') {
            //display error
            $(elem).append('<p class="error">' + err + '</p> ');

            //else remove errormessage
          } else {
            if (this.nextSibling) {
              this.nextSibling.remove();
            }
          }

          //if a regex is set
          if (reg) {
            //match regex then remove error message if exists
            if (this.value.match(reg)) {
              if (this.nextSibling) {
                this.nextSibling.remove();
              }
              //display error message
            } else {
              $(elem).append('<p class="error">' + err + '</p> ');
            }
          }
          return this;
        });

        //if the button is clicked
        $('.button').click(function () {
          //verify each with a function
          $('form :input').each(function () {
            //REDUNDANT BUT NO CHOICE NOW
            //this.verifyForm();

            //get necessary data
            var elem = $(this).closest('div');
            var req = elem.data('required');
            var reg = elem.data('regex');
            var err = elem.data('error');
            //if the required field is empty
            if (req == 'required' && this.value == '') {
              //display error
              $(elem).append('<p class="error">' + err + '</p> ');

              //else remove errormessage
            } else {
              if (this.nextSibling) {
                this.nextSibling.remove();
              }
            }

            //if a regex is set
            if (reg && this.value != '') {
              //match regex then remove error message if exists
              if (this.value.match(reg)) {
                if (this.nextSibling) {
                  this.nextSibling.remove();
                }
                //display error message
              } else {
                $(elem).append('<p class="error">' + err + '</p> ');
              }
            }
            return this;
          });

          if ($('.error').length) {
            //display error (!!! bug if the inputs doesn't changed at all)
            $('body').append('<p>There is an error somewhere</p>')
          } else {
            //create a list
            $('body').append('<ul></ul>');
            //display the value of each input
            $('form :input').each(function () {
              $('ul').append('<li>' + $(this).attr('name') + ' : ' + this.value + '</li>')
            });
          }
          //then scroll to the bottom to see infos
          $("html, body").animate({ scrollTop: $(document).height() }, "fast");
        });

        return this;
      },


      /*    verifyForm FUNCTION
            'verifyForm': function () {
              //get necessary data
              var elem = $(this).closest('div');
              var req = elem.data('required');
              var reg = elem.data('regex');
              var err = elem.data('error');
              //if the required field is empty
              if (req == 'required' && this.value == '') {
                //display error
                $(elem).append('<p class="error">' + err + '</p> ');
      
                //else remove errormessage
              } else {
                if (this.nextSibling) {
                  this.nextSibling.remove();
                }
              }
      
              //if a regex is set
              if (reg) {
                //match regex then remove error message if exists
                if (this.value.match(reg)) {
                  if (this.nextSibling) {
                    this.nextSibling.remove();
                  }
                  //display error message
                } else {
                  $(elem).append('<p class="error">' + err + '</p> ');
                }
              }
              return this;
            }, */
    });

    // Private Methods - Internal Methods
    Object.assign(priv, {
      'init': function () {
        $('body').append('<form class="simpleForm"></form>');
        this.setForm();
      }.bind(this)
    });

    // Initialise the plugin
    priv.init();
    return this;

  };
}(jQuery));
