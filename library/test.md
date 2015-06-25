#JS moule patterns

      var myModule = {
       
        myProperty: "someValue",
       
        // object literals can contain properties and methods.
        // e.g we can define a further object for module configuration:
        myConfig: {
          useCaching: true,
          language: "en"
        },
       
        // a very basic method
        saySomething: function () {
          console.log( "Where in the world is Paul Irish today?" );
        },
       
        // output a value based on the current configuration
        reportMyConfig: function () {
          console.log( "Caching is: " + ( this.myConfig.useCaching ? "enabled" : "disabled") );
        },
       
        // override the current configuration
        updateMyConfig: function( newConfig ) {
       
          if ( typeof newConfig === "object" ) {
            this.myConfig = newConfig;
            console.log( this.myConfig.language );
          }
        }
      };
       
      // Outputs: Where in the world is Paul Irish today?
      myModule.saySomething();
       
      // Outputs: Caching is: enabled
      myModule.reportMyConfig();
       
      // Outputs: fr
      myModule.updateMyConfig({
        language: "fr",
        useCaching: false
      });
       
      // Outputs: Caching is: disabled
      myModule.reportMyConfig();

another pattern

      var basketModule = (function () {
       
        // privates
       
        var basket = [];
       
        function doSomethingPrivate() {
          //...
        }
       
        function doSomethingElsePrivate() {
          //...
        }
       
        // Return an object exposed to the public
        return {
       
          // Add items to our basket
          addItem: function( values ) {
            basket.push(values);
          },
       
          // Get the count of items in the basket
          getItemCount: function () {
            return basket.length;
          },
       
          // Public alias to a private function
          doSomething: doSomethingPrivate,
       
          // Get the total value of items in the basket
          getTotal: function () {
       
            var q = this.getItemCount(),
                p = 0;
       
            while (q--) {
              p += basket[q].price;
            }
       
            return p;
          }
        };
      })();




