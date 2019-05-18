// Main Function
var socket_handle;
init_socket(socket_handle);

function handleSlider(data){
	var slider = document.getElementById("timeSlider");
	slider.value = data.Time;
	displayTimeOnSlider();
}

function convertSaturationToColour(saturation){
	var greenValue = Math.min((2-saturation), 1);
	var redValue = Math.min(Math.max(saturation-0.7, 0), 1);
	var colour = PIXI.utils.rgb2hex([redValue, greenValue, 0]);
	return colour;
}

function handleCarLanes(data){
	var laneColour = convertSaturationToColour(data.CarSaturation);
	for(let i=0; i<lanes.length; i++){
		if(lanes[i].vehicleType=="car"){
			updateLaneColour(lanes[i], laneColour);
			//updateLaneColour(lanes[i], 0xFF0000);
			console.log(laneColour);
		}
	}
}

function handleCycleLanes(data){
	var laneColour = convertSaturationToColour(data.CycleSaturation);
	for(let i=0; i<lanes.length; i++){
		if(lanes[i].vehicleType=="cycle"){
			updateLaneColour(lanes[i], laneColour);
		}
	}
}

function handlePedestrianLanes(data){
	var laneColour = convertSaturationToColour(data.PedestrianSaturation);
	for(let i=0; i<lanes.length; i++){
		if(lanes[i].vehicleType=="pedestrian"){
			updateLaneColour(lanes[i], laneColour);
		}
	}
}

function handle_uplink(data){
	handleCarLanes(data);
	handleCycleLanes(data);
	handlePedestrianLanes(data);
	handleSlider(data);
}

function displayTimeOnSlider(){
	var slider = document.getElementById("timeSlider");
	var sliderText = document.getElementById("timeSliderPara")
	var minutes = slider.value % 60;
	var hours = (slider.value-minutes) / 60;
	sliderText.innerHTML = hours.toString()+':'+minutes.toString();
}

function setup_downlink(socket){
	var slider = document.getElementById("timeSlider");
	var sliderText = document.getElementById("timeSliderPara")
	slider.oninput = function(){
		// Round slider to nearest 15 minutes
		slider.value = slider.value - (slider.value % 15)
		socket.emit('time', slider.value);
		displayTimeOnSlider();
	};
}


function init_socket(socket){
    $(document).ready(function() {
        namespace = '';

        //Connect to the Socket.IO server
        //The connection URL has the following format:
        //  http[s]://<domain>:<port>[/<namespace>]
        socket = io.connect(location.protocol + '//' +document.domain + ':' + location.port + namespace);

        socket.on('connect', function(){
            //Send connection message
            socket.send('Connected');
			setup_downlink(socket);
        });

        //Handle data from server
        socket.on('uplink', (data) => {
            handle_uplink(data);
        });

        //To disconnect get something to call
        /*
            socket.emit('disconnect_request');
        */
    });
}


