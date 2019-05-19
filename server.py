#!/user/bin/env python
import time
import random
from metrics import calculateMetrics
from flask import Flask, render_template, session, request
from flask_socketio import SocketIO, emit, disconnect
from flask_bootstrap import Bootstrap

async_mode = None

app = Flask(__name__)
Bootstrap(app)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)

timeValue = 0

thread = None

def background_thread():
    """Example of how to send server generated events to clients"""
    print("Starting background thread")
    global timeValue
    global numberOfCarLanes
    global numberOfCycleLanes
    global numberOfPedestrianLanes
    timeValue = 0
    numberOfCarLanes = 2
    numberOfCycleLanes = 2
    numberOfPedestrianLanes = 4
    while True:
        socketio.sleep(0.25)
        timeValue += 15
        timeValue = timeValue % (24*60)
        # print("Sending packet: ", count)
        dataFromClient = { 'time':timeValue,
                            'flexi_count':numberOfCycleLanes,
                            'ped_dim':numberOfPedestrianLanes,
                            'road_count':numberOfCarLanes}
        dataToClient = calculateMetrics(dataFromClient);
        data = {'CarSaturation': dataToClient['saturations']['sat_vehicles'],
                'CycleSaturation': dataToClient['saturations']['sat_bikes'],
                'PedestrianSaturation': dataToClient['saturations']['sat_pedestrian'],
                'PollutionScore': dataToClient['metrics']['co2_emissions_kg'],
                'PassengerDelay': dataToClient['metrics']['pssgr_delay_seconds'],
                'AverageSpeed': dataToClient['metrics']['average_speed'],
                'Time': timeValue}
        socketio.emit('uplink', data)


# Route for serving up the index page
@app.route('/')
def index():
    global thread
    if thread is None:
        thread = socketio.start_background_task(background_thread)
    return render_template('index.html', async_mode=socketio.async_mode)

#This function is called when a web browser connects
@socketio.on('connect')
def socket_connect():
    print('Client connected', request.sid)
    #Do something useful

#This function is called when a web browser disconnects
@socketio.on('disconnect')
def socket_disconnect():
    print('Client disconnected', request.sid)

@socketio.on('time')
def time(receivedValue):
    global timeValue
    timeValue = int(receivedValue);
    #Round to nearest 5 minutes
    timeValue = timeValue - (timeValue%5)
    print('Updated Time Value: ', timeValue)

@socketio.on('cycles')
def cycles(receivedValue):
    global numberOfCycleLanes;
    numberOfCycleLanes = int(receivedValue);

@socketio.on('cars')
def cars(receivedValue):
    global numberOfCarLanes;
    numberOfCarLanes = int(receivedValue);

@socketio.on('pedestrians')
def pedestrians(receivedValue):
    global numberOfPedestrianLanes;
    numberOfPedestrianLanes = int(receivedValue);

@socketio.on('uplink')
def socket_uplink(data):
    socketio.emit(data)

if __name__ == '__main__':
    try:
        socketio.run(app, debug=False, host='0.0.0.0')

    finally:
        print('Shutting down server')

