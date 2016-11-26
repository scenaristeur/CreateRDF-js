var cnv;
var noeuds = [];
var statements = [];
var selection = [];
var init = true;
var yoff = 0;
var dOff = 1;
var noeudsSelectionnes = [];

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
	for (var i = 0; i < statements.length; i++) {
		//statements[i].move();
		statements[i].display();
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
	
	var selectPoint=points[0];

    for (var i = 0; i < noeuds.length; i++) {
		var noeud = noeuds[i];
		var diam=noeud.diameter;
		var vecteurPoint = createVector(selectPoint.X,selectPoint.Y);
		var vecteurNoeud = createVector(noeud.x,noeud.y);
		//var dist = Math.sqrt((selectPoint.X-=noeud.x)*(selectPoint.X) + (selectPoint.Y-=noeud.y)*selectPoint.Y);
		var dist = vecteurNoeud.dist(vecteurPoint);
		
		if(dist<diam){
			if(noeud.selected){
				noeud.selected=false;
				console.log("deselecte "+noeud.name);
			//	noeudsSelectionnes.splice(noeud);
			var index = noeudsSelectionnes.indexOf(noeud);
			console.log(noeud);
			if (index > -1) {
    noeudsSelectionnes.splice(index, 1);
	console.log ("remove "+noeud);
}
console.log(noeudsSelectionnes);
				}else{
				noeud.selected=true;
				console.log("selecte "+noeud.name);
				noeudsSelectionnes.push(noeud);
				console.log(noeudsSelectionnes);
				if(noeudsSelectionnes.length==2){
					console.log("LINK");
						var propName = prompt("Nommez cette relation ?");
							
							if (propName != null) {
							var statement = new Statement(propName,noeudsSelectionnes[0],noeudsSelectionnes[1]);
							statements.push(statement);
							//console.log(statements);
							//var secondNoeud=noeudsSelectionnes[1];
							var des=noeudsSelectionnes.pop();
							//secondNoeud.selected=false;
							console.log("deselect2 "+des );
							console.log(noeudsSelectionnes);
								/*document.getElementById("demo").innerHTML =
								"Hello " + person + "! How are you today?";*/
								//var centerX=(xMin+xMax)/2;
								//var centerY=(yMin+yMax)/2;
								
							}
					}
			}
		}
	}
}


function rectangleSelection(debX, debY, finX, finY) {
	
	console.log(debX, debY, finX, finY);
	selection = [debX, debY, finX - debX, finY - debY];
	noFill();
	rect(debX, debY, finX, finY);
	for (var i = 0; i < noeuds.length; i++) {
		var noeud = noeuds[i];
		//console.log(noeud.x, noeud.y);
		if ((noeud.x > debX) && (noeud.x < finX) && (noeud.y > debY) && (noeud.y < finY)) {
			noeud.selected = true;
			noeudsSelectionnes.push(noeud);
			//  console.log(noeud.selected);
			} else {
			noeud.selected = false;
			noeudsSelectionnes.pop(noeud);
		}
		
		
		
	}
	
}









