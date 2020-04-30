
var app = {
     //const key = "DV9GfmfFzhVDS4gqyx5nAar0bim5IxevRHp6EhlY",
     temps : [],
     keys: [],
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
                    console.log(data['sol_keys']);

                    for(i = 0; i < data["sol_keys"].length; i++){
                         app.keys[i] = data["sol_keys"][i];
                    }
                    console.log(app.keys);

                    //previous seven days average temperature
                    for(i = 0; i < app.keys.length; i++){
                         app.temps[i] = data[app.keys[i]]["AT"]["av"];
                    }

                    console.log(app.temps);
                    app.makeHTML();
               }
          });
     },
     makeHTML: function() {
          let theHTML = '';
          theHTML += "<div class='textCont'><p>Temperatures: </p></div>";
          theHTML += "<div class='temp'><p>Current Sol: " + app.temps[6] + "</p></div>";
          $(".dataCont").html(theHTML);
          $("#tempHolder").text(app.temps[6]);

     }//end makeHTML

};
app.initialize();

//global variables


//p5 for temperature canvas
function setup(){
     var canvas = createCanvas(800, 800);
     background(0, 0, 0, 0);
     canvas.parent("canvasHolder");
}
function draw(){

     stroke(255, 193, 38);
     fill(255, 149, 5);
     strokeWeight(15);
     circle(width/2, height/2, 400);
     textSize(64);
     fill(0);
     noStroke();

     text(app.temps[6], width/3 , height/2);
}
