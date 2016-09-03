var cnv;
var noeuds = [];
var selection = [];
var init = true;
var yoff = 0;
var dOff = 1;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  document.getElementById("myCanvas").style.width = windowWidth;
  document.getElementById("myCanvas").style.height = windowHeight;

}

function draw() {
  background(255);
  if ((yoff > TWO_PI) || (yoff < 0)) {
    dOff *= -1;
  }
  if (init) {
    text("Dessinez des cercles pour ajouter de nouveaux éléments", 100, 100);
    text("Dessinez des rectangles autour pour les selectionner", 100, 120);

    text("Draw circles to add elements", 100, 150);
    text("Draw rectangles to select them", 100, 170);
    noLoop();
  }
  for (var i = 0; i < noeuds.length; i++) {
    noeuds[i].move();
    noeuds[i].display();
  }
  if (selection.length > 0) {
    // console.log("rect");
    rect(selection[0], selection[1], selection[2], selection[3]);
  }

}


function deselect() {
  selection = [];
}


function addCircle(thingName, x, y) {
  if (init) {
    init = false;
    loop();

  }
  //  console.log("addCircle" + thingName);
  var noeud = new Noeud();
  noeud.name = thingName;
  noeud.x = x;
  noeud.y = y;
  noeuds.push(noeud);
  // console.log(noeuds);
}


function selectPoint(points) {
  console.log(points);
}


function rectangleSelection(debX, debY, finX, finY) {

  console.log(debX, debY, finX, finY);
  selection = [debX, debY, finX - debX, finY - debY];
  noFill();
  rect(debX, debY, finX, finY);
  for (var i = 0; i < noeuds.length; i++) {
    var noeud = noeuds[i];
    console.log(noeud.x, noeud.y);
    if ((noeud.x > debX) && (noeud.x < finX) && (noeud.y > debY) && (noeud.y < finY)) {
      noeud.selected = true;
      console.log(noeud.selected);
    } else {
      noeud.selected = false;
    }



  }

}









function Noeud() {
  this.name = "_blank";
  this.x = random(10, width - 10);
  this.y = random(20, height - 20);

  this.diameter = random(10, 30);
  this.speed = .1;
  this.selected = false;
  this.colorSelected = color(204, 102, 0);

  this.move = function() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  };

  this.display = function() {
    if (this.selected) {
      stroke(this.colorSelected);
    } else {
      stroke(0);
    }


    push();
   
    translate(this.x, this.y);
     rotate(PI/2);
    beginShape();
    var xoff = 0;

    for (var a = 0; a <= TWO_PI+0.2; a += 0.1) {
      var offset = map(noise(xoff + yoff), 0, 1, -this.diameter, this.diameter);
      var r = this.diameter + offset / 4;
      var x = r * cos(a);
      var y = r * sin(a);
      vertex(x, y);
      xoff += 1 * dOff;

    }

    endShape();

    pop();
    textAlign(CENTER);
    text(this.name, this.x, this.y);
    yoff += 0.001 * dOff;

    // ellipse(this.x, this.y, this.diameter, this.diameter);
  };
}