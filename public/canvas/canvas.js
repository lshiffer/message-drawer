
var stage, oldX, oldY, color, size, shape, drawing, previousImage;

function init() {
	checkForEdit();
	createCanvas();
	setVariables();
	setEvents();
}

function checkForEdit() {
	previousImage = JSON.parse(getParameterByName('data'));
	if (previousImage)
		previousImage = previousImage.src;
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function createCanvas() {
	stage = new createjs.Stage("canvasDrawer");
	stage.enableDOMEvents(true);
	shape = new createjs.Shape();
	stage.addChild(shape);

	if (previousImage) {
		var image = new Image();
	    image.src = previousImage;
	    image.onload = attachImageToCanvas;
	}

	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight;
}

function attachImageToCanvas(event) {
    var image = event.target;
    var bitmap = new createjs.Bitmap(image);
    stage.addChild(bitmap);
    stage.update();
}

function setVariables() {
	color = "#000000";
	size = 2;
	drawing = false;
}

function setEvents() {
	canvasEvents();

	buttonEvents();
}

function canvasEvents() {
	stage.on("stagemousemove", function(evt) {
		if (drawing && oldX) {
			shape.graphics.beginStroke(color)
						  .setStrokeStyle(size, "round")
						  .moveTo(oldX, oldY)
						  .lineTo(evt.stageX, evt.stageY);
			stage.update();
		}

		oldX = evt.stageX;
		oldY = evt.stageY;
	});

	stage.on("stagemousedown", function(evt) {
		drawing = true;
	});

	stage.on("stagemouseup", function(evt) {
		drawing = false;
	});
}

function buttonEvents() {
	document.getElementById("clear").addEventListener("click", function( event ) {
    	shape.graphics.clear();
		stage.update();
  	}, false);

	document.getElementById("send").addEventListener("click", function( event ) {
		Mixmax.done({
        src: stage.toDataURL(),
      });
  	}, false);
}