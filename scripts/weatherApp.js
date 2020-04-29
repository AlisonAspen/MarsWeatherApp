var app = {
     //const key = "DV9GfmfFzhVDS4gqyx5nAar0bim5IxevRHp6EhlY",
     temps : [],
     url: "https://api.nasa.gov/insight_weather/?api_key=DV9GfmfFzhVDS4gqyx5nAar0bim5IxevRHp6EhlY&feedtype=json&ver=1.0",
     initialize: function() {
          app.getData();
     },
     getData: function(){
          $.ajax({
               url: app.url,
               type: 'get',
               dataType: 'json',
               error: function(err) {
                    console.log("something is wrong");
                    console.log(err);
               },
               success: function(data) {
                    console.log(app.url);
                    for(var i = 499; i <= 500; i++){
                         app.temps[i - 499] = data[i]["AT"]["av"];
                    }
                    //console.log(data[503]["AT"]["av"]);
                    console.log(app.temps);
                    app.makeHTML();
               }
          });
     },
     makeHTML: function() {
          let theHTML = '';
          theHTML += "<p>Temperatures: </p><br>";
          for(var i = 0; i < app.temps.length; i++){
               theHTML += "<div class='temp'>";
               if(i === 0) {
                    theHTML += "<p>Current Sol: " + app.temps[i] + " degrees</p></div>";
               } else {
                    theHTML += "<p>Yestersol: " + app.temps[i] + " degrees</p></div>";
               }

               $(".dataCont").html(theHTML);
          }
     },
};
app.initialize();
