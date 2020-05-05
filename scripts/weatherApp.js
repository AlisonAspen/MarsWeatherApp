
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
          for(i = 5; i >= 0; i--){
               switch(i){
                    case 5: theHTML += "<p>YesterSol:    " + app.temps[i] + "</p>";
                    break;
                    case 4: theHTML += "<p>Current Sol -2: " + app.temps[i] + "</p>";
                    break;
                    case 3: theHTML += "<p>Current Sol -3: " + app.temps[i] + "</p>";
                    break;
                    case 2: theHTML += "<p>Current Sol -4: " + app.temps[i] + "</p>";
                    break;
                    case 1: theHTML += "<p>Current Sol -5: " + app.temps[i] + "</p>";
                    break;
                    default: theHTML += "<p>Current Sol -6: " + app.temps[i] + "</p>";
                    break;
               }

          }
          $(".dataCont").html(theHTML);


     }//end makeHTML

};
app.initialize();

//global variables


//p5 for temperature canvas
/*
function setup(){
     var canvas = createCanvas(windowWidth / 2, 800);
     background(0, 0, 0, 0);
     canvas.parent("canvasHolder1");
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

} */
let tempSketch = function(ts) {
     ts.setup = function() {
          var canvas;
          if(ts.windowWidth <= 400){
               canvas = ts.createCanvas(ts.windowWidth, 400);
          } else if(ts.windowWidth <= 425){
               canvas = ts.createCanvas(ts.windowWidth, 400);
          } else if(ts.windowWidth <= 800){
               canvas = ts.createCanvas(ts.windowWidth, 800);
          }else {
               canvas = ts.createCanvas(ts.windowWidth / 2, 800);
          }
          ts.background(0, 0, 0, 0);
          canvas.parent("canvasHolder1");
          ts.textFont("Abril Fatface");
          ts.textAlign(ts.CENTER, ts.CENTER);
     };
     ts.draw = function() {
          ts.stroke(255, 193, 38);
          ts.fill(255, 149, 5);
          ts.strokeWeight(15);
          if(ts.windowWidth <= 420){
               ts.circle(ts.width/2, ts.height/2, 250);
          } else {
               ts.circle(ts.width/2, ts.height/2, 400);
          }
          //ts.circle(ts.width/2, ts.height/2, 400);
          ts.textSize(64);
          ts.fill(255);
          ts.noStroke();
          let word = app.temps[6];
          ts.text(word, ts.width/2, ts.height/2);
          ts.textSize(24);
          //textFont("Staatliches");
          ts.text("(fahrenheit)", ts.width/2, (ts.height/2) + 50);
     };

};

let marsDiag = function(m){
     m.setup = function() {
          var canv2;
          if(m.windowWidth <= 425) {
               canv2 = m.createCanvas(400, 300);
          } else if(m.windowWidth <= 800){
               canv2 = m.createCanvas(m.windowWidth, 400);
          } else{
               canv2 = m.createCanvas(m.windowWidth/2, 800);
          }
          m.background(0, 0, 0, 0);
          canv2.parent("canvasHolder2");
     };
     m.draw = function() {
          m.noStroke();
          mX = m.width/2;
          mY = m.height/2;
          m.stroke(255, 193, 38);
          m.fill(196, 89, 31);
          if(m.windowWidth <=425) {
               m.circle(mX, mY, 100);
               m.stroke(117, 170, 255);
               m.fill(0, 0, 0);
               m.circle(mX + 75, mY - 20, 30);
               m.circle(mX + 55, mY - 70, 25);
          } else {
               m.circle(mX, mY, 200);
               m.stroke(117, 170, 255);
               m.fill(0, 0, 0);
               m.circle(mX + 75, mY - 150, 50);
               m.circle(mX + 150, mY + 50, 25);
          }

          //drawing mars' moons

     };

};

//instantiating p5 sketches
let temperatureHolder = new p5(tempSketch);
let marsSketch = new p5(marsDiag);
