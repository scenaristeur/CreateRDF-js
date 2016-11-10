var cnv;
var noeuds = [];
var links = [];
var selection = [];
var init = true;
var yoff = 0;
var dOff = 1;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  console.log(windowWidth+" "+windowHeight);
  document.getElementById("myCanvas").style.width = windowWidth;
  document.getElementById("myCanvas").style.height = windowHeight;
/*  cnv.style.position = fixed;
  cnv.style.top = 0;
  cnv.style.left = 0;
  //cnv.style.vertical-align = top;
  cnv.style.z-index = 2;*/

}

function draw() {
  background(255);
  if ((yoff > TWO_PI) || (yoff < 0)) {
    dOff *= -1;
  }
  if (init) {
    text("Dessinez des cercles pour ajouter de nouveaux éléments", 100, 100);
    text("Dessinez des rectangles autour pour les selectionner", 100, 120);
    text("Dessinez des lignes pour les relier", 100, 140);

    text("Draw circles to add elements", 100, 170);
    text("Draw rectangles to select them", 100, 190);
    text("Draw lines to link them", 100, 210);
    noLoop();
  }
  for (var i = 0; i < noeuds.length; i++) {
    noeuds[i].move();
    noeuds[i].display();
  }

  for (var i = 0; i < links.length; i++) {
  //  noeuds[i].move();
    links[i].display();
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

//  console.log(debX, debY, finX, finY);
  selection = [debX, debY, finX - debX, finY - debY];
  noFill();
  rect(debX, debY, finX, finY);
  for (var i = 0; i < noeuds.length; i++) {
    var noeud = noeuds[i];
  //  console.log(noeud.x, noeud.y);
    if ((noeud.x > debX) && (noeud.x < finX) && (noeud.y > debY) && (noeud.y < finY)) {
      noeud.selected = true;
  //    console.log(noeud.selected);
    } else {
      noeud.selected = false;
    }
  }
}

function relieNoeuds(first,last){
//  console.log(first);
//  console.log(last);
  var noeudFirst, noeudLast;
  var distFirst = windowWidth + windowHeight;
  var distLast = windowWidth + windowHeight;
  for (var i = 0; i < noeuds.length; i++) {
    var noeud = noeuds[i];
//    console.log(noeud.x, noeud.y, noeud.diameter);
    var dF = int(dist(first.X, first.Y, noeud.x, noeud.y));
    var dL = int(dist(last.X, last.Y, noeud.x, noeud.y));
//console.log(dF +" "+dL)
  //  if ( && ( dL < noeud.diameter )){
      if (( dF < distFirst ) && ( dF < noeud.diameter )) {
        distFirst = dF;
        noeudFirst = noeud;
    //    console.log(noeudFirst);
      }
      if (( dL < distLast ) && ( dL < noeud.diameter )) {
        distLast = dL;
        noeudLast = noeud;
      //    console.log( noeudLast);
      }
  //  }
  }
  console.log( noeudFirst);
  console.log( noeudLast);
//  noeud.selected = true;
if (noeudFirst && noeudLast){
var propName = prompt("Quelle est la nature de la relation entre "+noeudFirst.name+" et "+noeudLast.name+" ?");
var link = new Link(noeudFirst,noeudLast);
link.name = propName;
links.push(link);
console.log(links);
}
}




function Link(_deb,_end){
  this.name ="_blank";
  this.deb = _deb;
  this.end = _end;
  var x1=this.deb.x;
  var y1=this.deb.y;
  var x2=this.end.x;
  var y2=this.end.y;

  this.display = function() {
    if (this.selected) {
      stroke(this.colorSelected);
    } else {
      stroke(0);
    }

    line (x1,y1,x2,y2);
    push();
 translate( (x1+x2)/2, (y1+y2)/2 );
 rotate( atan2(y2-y1,x2-x1) );
 text(this.name, 0, -5);
 pop();
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
