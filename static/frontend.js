// Main Function
var socket_handle;
init_socket(socket_handle);

// End of Main

function handle_render(data){
    // Just test to make sure data is received
    // TODO: DELETE this v
    // alert("Data received!");
    console.log(data);
    // Pass data into relevant rendering fuction
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
            handle_render(data);
        });

        //To disconnect get something to call
        /*
            socket.emit('disconnect_request');
        */
    });
}


