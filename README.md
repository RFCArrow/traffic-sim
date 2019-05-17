# Dynamic Road Configuration Traffic Simulator

A basic implementation web-app based traffic simulator for dynamicaly configurable roads.

The backend in written in python using flask. The frontend is written in JS. At the moment, there are no JS frameworks in use for animating the frontend. Websockets are used to connected the user interface in the browser back to the server.

---


## Deploying with Docker (Reccomended)

To deploy call 
`./run.sh` 
in the root directory of the project. And provide the super-user password when requested. This will automatically build a Docker container with the correct dependencies and deploy the server. If Docker
is not installed, the run scripts will automatically install the latest version.

To view the web app, simply go to 'localhost:5000' in any browser.

---

## Deploying Manually with Python

In order to deploy the flask server a few steps are necessary, it is reccomended that a virtual environment is setup for deploying the server to avoid dependency issues with other packages.

At present setup instructions are for Ubuntu (Linux) only. Hopefully Windows setup instructions will be added shortly.

### Installing Python

Ensure that Python3 is installed with a version higher than 3.4.
This will ensure that pip (the python package manager) is already installed.

### Setting up Virtual Environment

To install the virtual environment tool using pip call 
'pip install virtualenv'


Ensure you are in the repo root directory and then create the virtual environment called "venv" with `virtualenv venv`

### Activating and Disactivating the Virtual Environment

In order to use the virtual environment it must first be activated.
This can be done by calling `source venv/bin/activate`

In order to deactivate the virtual environment, call `deactivate`.

### Installing Python dependencies

`pip install flask`
`pip install flask-socketio flask-bootstrap`
`pip install eventlet`


### Trying it Out

Run the server in the repo root by calling `python3 sever.py`

Access the webapp at `localhost:5000` in your browser, once you have set the server running.
Initial proof of concept will render html canvas as sent from the flask sever

---

