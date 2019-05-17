// Main Function
var socket_handle;
init_socket(socket_handle);

// End of Main

function handle_uplink(data){
    // Just test to make sure data is received
    // TODO: DELETE this v
    // alert("Data received!");
    //console.log(data);
    // Pass data into relevant rendering fuction
	var slider = document.getElementById("timeSlider");
	slider.value = data.Time;
}

function handle_downlink(data){
	var slider = document.getElementById("timeSlider");
	slider.oninput = function(){
		socket.emit('time', slider.value);
	};
	slider.value = data.Time;
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


