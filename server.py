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

thread = None

def background_thread():
    """Example of how to send server generated events to clients"""
    print("Starting background thread")
    count = 0
    while True:
        socketio.sleep(0.5)
        count += 1
        print("Sending packet: ", count)
        data = {'x1': random.randint(0,600),
                'y1': random.randint(0,600),
                'x2': random.randint(0,600),
                'y2': random.randint(0,600),
                'r': random.randint(0,40),
                'colour': random.randint(0,0xffffff),
                'type': 'line'}
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

@socketio.on('uplink')
def socket_uplink(data):
    socketio.emit(data)

if __name__ == '__main__':
    try:
        socketio.run(app, debug=False, host='0.0.0.0')

    finally:
        print('Shutting down server')


    

