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

var vehicles = new Array();
var lanes = new Array();


addLane("pedestrian", "east");
addLane("cycle", "east");
addLane("car", "east");
addLane("car", "west");
addLane("cycle", "west");
addLane("pedestrian", "west");

updateLaneColour(lanes[1], 0xF0FFE0);


function renderRoad(roadWidth, yPosition){
	let road = new PIXI.Graphics();
	road.beginFill(0x807E78);
	road.drawRect(0,yPosition,app.renderer.width,roadWidth);
	road.endFill();
	app.stage.addChild(road);
}

function updateTimeDisplay(){
	var slider = document.getElementById("timeSlider");
	 	sliderText.innerHTML = slider.value;
	 	sliderText.innerHTML = slider.value;
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

function getLaneWidthByVehicleType(vehicleType){
	if(vehicleType=="car"){
		return 150;
	}
	if(vehicleType=="cycle"){
		return 50;
	}
	if(vehicleType=="pedestrian"){
		return 100;
	}
	return 0;
}

function getLaneYPosition(lane){
	var yPosition = 0;
	for(let i=0;i<lanes.length;i++){
		if(lane.uuid==lanes[i].uuid){
			return yPosition;
		}
		yPosition += lanes[i].width;
	}
	return 0;
}

function generateUUID(){
	return Math.floor(Math.random() * Math.floor(0xFFFFFFFF));
}

function addLane(vehicleType, direction){
	var lane = new Object();
	lane.uuid=generateUUID();
	lanes.push(lane);
	lane.width=getLaneWidthByVehicleType(vehicleType);
	lane.yPosition=getLaneYPosition(lane);
	lane.vehicleType=vehicleType;
	lane.vehicles = new Array();
	lane.surface = new PIXI.Graphics();
	lane.surface.beginFill(0x807E78);
	lane.surface.lineStyle(5,0xFFFFFF);
	lane.surface.drawRect(0,lane.yPosition,app.renderer.width,lane.width);
	lane.surface.endFill();
	app.stage.addChild(lane.surface);
	lane.direction=direction;
}

function deleteLane(lane){
	//Mark lane for closure
	//Wait until traffic clears
	for(let i=0;i<lanes.length;i++){
		if(lane.uuid == lanes[i].uuid){
			lanes=lanes.splice(i,1);
		}
		lanes[i].yPosition=getLaneYPosition(lanes[i]);
	}
}


function getVehicleSize(vehicleType){
	if(vehicleType=="car"){
		return 30;
	}
	if(vehicleType=="cycle"){
		return 15;
	}
	if(vehicleType=="pedestrian"){
		return 5;
	}
	return 0;
}

function getVehicleColour(vehicleType){
	if(vehicleType=="car"){
		return 0xFF00FF;
	}
	if(vehicleType=="cycle"){
		return 0x0000FF;
	}
	if(vehicleType=="pedestrian"){
		return 0x00FFFF;
	}
	return 0;
}

function updateLaneColour(lane, colour){
	console.log(colour);
	lane.surface.clear();
	lane.surface.beginFill(colour);
	lane.surface.lineStyle(5,0xFFFFFF);
	lane.surface.drawRect(0,lane.yPosition,app.renderer.width,lane.width);
	lane.surface.endFill();
	//app.stage.addChild(lane.surface);
}

function getLaneCentre(lane){
	var centre=(lane.width/2)+lane.yPosition;
	return centre;
}

function addVehicle(colour,lane){
	var size=getVehicleSize(lane.vehicleType);
	var colour=getVehicle
	var yPosition = getLaneCentre();
	let vehicle = new PIXI.Graphics()
	vehicle.lane = lane;
	vehicle.moveTo(0,yPosition);
	vehicle.beginFill(colour);
	vehicle.drawCircle(0,yPosition,size);
	vehicles.push(vehicle);
	app.stage.addChild(vehicle);
}


