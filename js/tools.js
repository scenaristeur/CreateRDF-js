function windowResized() {
//	resizeCanvas(windowWidth, windowHeight);
 var  canvas = document.getElementById("myCanvas");
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    //ramener les noeuds dans le graphe
     for (var i=0; i<noeuds.length; i++) {
    var x=noeuds[i].x;
    var y=noeuds[i].y;
   // console.log(x+" "+y);
    if (noeuds[i].x>windowWidth){
      noeuds[i].x=windowWidth-10;
    }
        if (noeuds[i].y>windowHeight){
      noeuds[i].y=windowHeight-10;
    }
  }
}
