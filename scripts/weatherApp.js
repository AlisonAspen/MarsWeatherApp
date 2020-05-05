
var app = {
     //const key = "DV9GfmfFzhVDS4gqyx5nAar0bim5IxevRHp6EhlY",
     temps : [],
     keys: [],
     wind: [],
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
          theHTML += "<h2>(Previous) Weekly Forecast</h2><br>";
          theHTML += "<p>Current Sol: " + app.temps[6] + "</p>";
          for(i = 5; i > 3; i--){
               switch(i){
                    case 5: theHTML += "<p>YesterSol: " + app.temps[i] + "</p>";
                    break;
                    case 4: theHTML += "<p>Sol-before-YesterSol: " + app.temps[i] + "</p>";
                    break;
               }
          }
          $(".dataCont").html(theHTML);


     }//end makeHTML

};
app.initialize();

//global variables


//p5 for temperature canvas
function setup(){
     var canvas = createCanvas(windowWidth / 2, 800);
     background(0, 0, 0, 0);
     canvas.parent("canvasHolder");
     textFont("Abril Fatface");
     textAlign(CENTER, CENTER);
}


function draw(){
     stroke(255, 193, 38);
     fill(255, 149, 5);
     strokeWeight(15);
     circle(width/2, height/2, 400);
     textSize(64);
     fill(255);
     noStroke();
     let word = app.temps[6];
     text(word, width/2, height/2);
     textSize(24);
     //textFont("Staatliches");
     text("(fahrenheit)", width/2, (height/2) + 50);

}
