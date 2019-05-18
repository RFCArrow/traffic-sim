#!/user/bin/env python
import time
import random
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
    timeValue = 0 
    while True:
        socketio.sleep(1)
        timeValue += 5
        timeValue = timeValue % (24*60)
        # print("Sending packet: ", count)
        data = {'CarDemand': random.randint(0,1000),
                'CyleDemand': random.randint(0,1000),
                'PollutionScore': random.randint(0,100),
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

@socketio.on('uplink')
def socket_uplink(data):
    socketio.emit(data)

if __name__ == '__main__':
    try:
        socketio.run(app, debug=False, host='0.0.0.0')

    finally:
        print('Shutting down server')



