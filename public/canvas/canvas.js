
var stage, oldX, oldY, color, size, shape, drawing;

function init() {
	createCanvas();
	setVariables();
	setEvents();
}

function createCanvas() {
	stage = new createjs.Stage("canvasDrawer");
	stage.enableDOMEvents(true);
	shape = new createjs.Shape();
	stage.addChild(shape);

	stage.canvas.width = window.innerWidth;
	stage.canvas.height = window.innerHeight;
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