let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

//Create a Pixi Application
let app = new PIXI.Application({width: 1920, height: 1080});
app.renderer.backgroundColor = 0xFFFFFF;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);


const graphics = new PIXI.Graphics();

renderRoad(300, 100);
addLaneMarking(125);
addLaneMarking(250);
addLaneMarking(375);


function renderRoad(roadWidth, yPosition){
	let road = new PIXI.Graphics();
	road.beginFill(0x807E78);
	road.drawRect(0,yPosition,app.renderer.width,roadWidth);
	road.endFill();
	app.stage.addChild(road);
}

function addLaneMarking(yPosition){
	let marking = new PIXI.Graphics();
	//marking.position.set(0,yPosition);
	marking.lineStyle(10, 0xffffff);
	marking.moveTo(0,yPosition);
	//marking.drawDashLine(app.renderer.width,yPosition, dash=100, gap=50);
	marking.lineTo(app.renderer.width,yPosition);
	app.stage.addChild(marking);
}

function addVehicle(){

}


