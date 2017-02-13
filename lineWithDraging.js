var x0,y0, x1, y1 ,dx, dy; //global variables

var canvas = document.getElementById("canvas");
var canvasObject = canvas.getContext("2d");
var canvasWidth = canvas.width; // geting width from html view
var canvasHeight = canvas.height; // geting height from html view

  function reOffset()
  {
      var sizeOfElement = canvas.getBoundingClientRect();
      offsetX = sizeOfElement.left;
      offsetY = sizeOfElement.top;

    }

    var offsetX, offsetY;
    reOffset(); // function calling

    window.onscroll = function(e)
    {
      reOffset();

    }

    window.onresize = function(e)
    {
      reOffset();
    }

// dragging vars
  var isDown = false;
  var startX, startY;

// line vars and array of lines
  var nearest;
  var lines = [];
  lines.push({  x0: 400,y0: 50,x1: 0,y1: 50}); // co-ordinates for horizontal line one
  lines.push({x0: 400,y0: 90,x1: 0,y1: 90}); // co-ordinates for horizontal line two
  lines.push({x0: 250,y0: 0,  x1: 100,  y1: 200}); // co-ordinates for transversal line

  draw();

// listen for mouse events
$("#canvas").mousedown(function(e)
{
    handleMouseDown(e);
});
$("#canvas").mousemove(function(e)
{
    handleMouseMove(e);
});
$("#canvas").mouseup(function(e)
{
    handleMouseUpOut(e);
});
$("#canvas").mouseout(function(e)
{
    handleMouseUpOut(e);
});

// select the nearest line to the mouse
function closestLine(mx, my) {
    var dist = 100000000;
    var index, point;
    for (var i = 0; i < lines.length; i++)
    {

        var xy = closestXY(lines[i], mx, my);

        var dx = mx - xy.x;
        var dy = my - xy.y;
        var thisDist = dx * dx + dy * dy;
        if (thisDist < dist)
        {
            dist = thisDist;
            point = xy;
            index = i;
        }
    }

    var line = lines[index];
    return ({
        point: point,
        line: line,
        originalLine: {
            x0: line.x0,
            y0: line.y0,
            x1: line.x1,
            y1: line.y1
        }
    });
}

// linear interpolation -- needed in setClosestLine()
function lerp(a, b, x) {
    return (a + x * (b - a));
}

// find closest XY on line to mouse XY
function closestXY(line, mx, my) {
     x0 = line.x0;
     y0 = line.y0;
     x1 = line.x1;
     y1 = line.y1;
    dx = x1 - x0;
     dy = y1 - y0;
    var t = ((mx - x0) * dx + (my - y0) * dy) / (dx * dx + dy * dy);
    t = Math.max(0, Math.min(1, t));
    var x = lerp(x0, x1, t);
    var y = lerp(y0, y1, t);
    return ({
        x: x,
        y: y
    });
}

// draw the scene
function draw() {
    canvasObject.clearRect(0, 0, canvasWidth, canvasHeight);
    // draw all lines at their current positions
    for (var i = 0; i < lines.length; i++) {
        drawLine(lines[i], 'black');
    }
    // draw markers if a line is being dragged
    if (nearest) {
        // point on line nearest to mouse
        canvasObject.beginPath();
        canvasObject.arc(nearest.point.x, nearest.point.y, 5, 0, Math.PI * 2);
        canvasObject.strokeStyle = 'green';

        canvasObject.stroke();
        // marker for original line before dragging
        drawLine(nearest.originalLine, 'red');
        // hightlight the line as its dragged
        drawLine(nearest.line, 'red');
    }
}

function drawLine(line, color) {
    canvasObject.beginPath();
    canvasObject.moveTo(line.x0, line.y0);

    canvasObject.lineTo(line.x1, line.y1);


    canvasObject.lineWidth=2;
    canvasObject.lineCap='round';
    canvasObject.strokeStyle = color;
    canvasObject.stroke();
      console.log("x0 value="+line.x0);
        console.log("y0 value="+line.y0);
          console.log("x1 value="+line.x1);
            console.log("y1 value="+line.y1);

}

function handleMouseDown(e)
{
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // mouse position
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    // find nearest line to mouse
    nearest = closestLine(startX, startY);
    draw();
    // set dragging flag
    isDown = true;
}

function handleMouseUpOut(e)
{
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // clear dragging flag
    isDown = false;
    nearest = null;
    draw();
}

function handleMouseMove(e)
{
    if (!isDown)
    {
        return;
    }
    // tell the browser we're handling this event
    e.preventDefault();
    e.stopPropagation();
    // mouse position
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    // calc how far mouse has moved since last mousemove event
    var dx = mouseX - startX;
    var dy = mouseY - startY;
    startX = mouseX;
    startY = mouseY;
    // canvasHeightange nearest line vertices by distance moved
    var line = nearest.line;
    line.x0 += dx;
    line.y0 += dy;
    line.x1 += dx;
    line.y1 += dy;
    // redraw
    draw();
    console.log("inside");
}
function findAngle(line )
{
console.log("inside angle function");
var angle1 = Math.atan2(y0 - y1, x0 -x1);
 //angle = angle1 - angle2;
angle1 = angle1*180/Math.PI;
 if(angle1 < 0)
 angle1= -angle1;
 if(360 - angle1 < angle1)
 angle1 = 360 - angle1;
console.log((angle1.toString()));
}

canvasObject.fillText("1",205,50);
canvasObject.fillText("2",220,50);
canvasObject.fillText("3",200,60);
canvasObject.fillText("4",210,60);
canvasObject.fillText("5",175,90);
canvasObject.fillText("6",190,90);
canvasObject.fillText("7",170,100);
canvasObject.fillText("8",180,100);
