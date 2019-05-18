FROM python:slim

#RUN apk add python3
RUN pip3 install --upgrade pip
RUN pip3 install flask flask-socketio flask-bootstrap pandas numpy
COPY . /home/traffic-sim
ENTRYPOINT ["python3", "/home/traffic-sim/server.py"] # Commands to run on entry

