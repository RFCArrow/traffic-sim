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
addLane("pedestrian", "west");
addLane("cycle", "east");
addLane("cycle", "west");
addLane("cycle", "west");
addLane("car", "west");


// addVehicle(lanes[0]);
// addVehicle(lanes[1]);
// addVehicle(lanes[2]);
// addVehicle(lanes[3]);
// addVehicle(lanes[4]);
// addVehicle(lanes[5]);


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
	console.log(lane.yPosition);
	lane.vehicleType=vehicleType;
	lane.colour=0x807E78;
	lane.vehicles = new Array();
	lane.surface = new PIXI.Graphics();
	lane.surface.beginFill(lane.colour);
	lane.surface.lineStyle(5,0xFFFFFF);
	lane.surface.drawRect(0,lane.yPosition,app.renderer.width,lane.width);
	lane.surface.endFill();
	app.stage.addChild(lane.surface);
	lane.direction=direction;
}

function addLaneText(lane){
	var laneText = new PIXI.Text()

}

function adjustNumberOfLanes(desiredNumberOfLanes, vehicleType){
	var lanesFound = 0;
	for(let i=0;i<lanes.length;i++){
		if(lanes[i].vehicleType == vehicleType){
			lanesFound += 1;
			if(lanesFound > desiredNumberOfLanes){
				deleteLane(lanes[i]);
			}

		}
	}
	while(lanesFound < desiredNumberOfLanes){
		addLane(vehicleType, "west");
		lanesFound += 1;
	}
	redrawLanes();
}

function deleteLane(lane){
	//Mark lane for closure
	//Wait until traffic clears
	for(let i=0;i<lanes.length;i++){
		if(lane.uuid == lanes[i].uuid){
			lanes.splice(i,1);
			lane.surface.clear();
			return;
		}
	}
	console.log(lanes);
}

function redrawLanes(){

	for(let i=0;i<lanes.length;i++){
		lanes[i].yPosition=getLaneYPosition(lanes[i]);
		updateLanePosition(lanes[i]);
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
	lane.colour=colour;
	lane.surface.clear();
	lane.surface.beginFill(colour);
	lane.surface.lineStyle(5,0xFFFFFF);
	lane.surface.drawRect(0,lane.yPosition,app.renderer.width,lane.width);
	lane.surface.endFill();
	//app.stage.addChild(lane.surface);
}

function updateLanePosition(lane){
	lane.surface.clear();
	lane.surface.beginFill(lane.colour);
	lane.surface.lineStyle(5,0xFFFFFF);
	lane.surface.drawRect(0,lane.yPosition,app.renderer.width,lane.width);
	lane.surface.endFill();


}

function getLaneCentre(lane){
	var centre=(lane.width/2)+lane.yPosition;
	return centre;
}



function updateVehicle(lane){
	for(let i=0;i<lane.vehicles.length;i++){
		if(i>0){
// 			if(distanceToNextCar(lane, i) < 5){
// 				//decrease speed
// 				var acceleratingVelocity = Math.max((lane.vehicles[i-1].velocity-1), 0);
// 				lane.vehicles[i].velocity = acceleratingVelocity;
// 			}
// 			if(distanceToNextCar(lane, i) > 10 && ){
// 				var acceleratingVelocity = Math.max((lane.vehicles[i-1].velocity+1), laneSpeed);
// 				lane.vehicles[i].velocity = decleratingVelocity;
// 			}
 		}
// 		//redraw vehicle
// 		//increment vehichle position
		if(lane.direction == "east"){
			lane.vehicles[i].xPosition += lane.vehicles[i].velocity;
		}
		if(lane.direction == "west"){
			lane.vehicles[i].xPosition -= lane.vehicles[i].velocity;
		}
	}
}

function distanceToNextCar(lane, i){
	//TODO FIX!!!!
	if(lane.direction == "east"){
		lane.vehicles[i-1].xPosition - lane.vehicles[i].xPosition;
	}
	if(lane.direction == "west"){
		lane.vehicles[i].xPosition - lan.vehicles[i-1].xPosition;
	}
}

function addVehicle(lane){
	var size=getVehicleSize(lane.vehicleType);
	var colour=getVehicleColour(lane.vehicleType);
	var yPosition = getLaneCentre(lane);
	var xPosition = lane.direction == "east" ? 0 : app.renderer.width;
	let vehicle = new PIXI.Graphics()
	vehicle.velocity = 
	vehicle.beginFill(colour);
	vehicle.drawCircle(xPosition,yPosition,size);
	vehicles.push(vehicle);
	app.stage.addChild(vehicle);
}


