function init()
{
var  canvas = document.getElementById("myCanvas");
canvas.width = document.body.clientWidth; //document.width is obsolete
canvas.height = document.body.clientHeight; //document.height is obsolete

}

//
// Startup
//
var _isDown, _points, _r, _g, _rc;
//var debX,debY,finX,finY;
function onLoadEvent()
{
  _points = new Array();
  _r = new DollarRecognizer();
windowResized();
  var canvas = document.getElementById('myCanvas');
  _g = canvas.getContext('2d');
  _g.fillStyle = "rgb(0,0,225)";
  _g.strokeStyle = "rgb(0,0,225)";
  _g.lineWidth = 3;
  _g.font = "16px Gentilis";
  _rc = getCanvasRect(canvas); // canvas rect on page
  _g.fillStyle = "rgb(255,255,136)";
  _g.fillRect(0, 0, _rc.width, 20);

  _isDown = false;

}



function getCanvasRect(canvas)
{
  var w = canvas.width;
  var h = canvas.height;

  var cx = canvas.offsetLeft;
  var cy = canvas.offsetTop;
  while (canvas.offsetParent != null)
  {
    canvas = canvas.offsetParent;
    cx += canvas.offsetLeft;
    cy += canvas.offsetTop;
  }
  return {x: cx, y: cy, width: w, height: h};
}
function getScrollY()
{
  var scrollY = $(window).scrollTop();
  return scrollY;
}


function arrondi(n, d) // arrondi 'n' to 'd' decimals
{
  d = Math.pow(10, d);
  return Math.round(n * d) / d
}


function drawText(str)
{
  _g.fillStyle = "rgb(255,255,136)";
  _g.fillRect(0, 0, _rc.width, 20);
  _g.fillStyle = "rgb(0,0,255)";
  _g.fillText(str, 1, 14);
}


function drawConnectedPoint(from, to)
{
  _g.beginPath();
  _g.moveTo(_points[from].X, _points[from].Y);
  _g.lineTo(_points[to].X, _points[to].Y);
  _g.closePath();
  _g.stroke();
}
