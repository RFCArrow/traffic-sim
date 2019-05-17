#!/bin/sh

if [ ! -x "$(command -v "docker")" ]; then
    echo "Could not find Docker"
    echo "Installing Docker"
	wget -qO- https://get.docker.com/ | sh
fi
echo "Detected Docker"
sudo docker build -t web-card-game:0.1 .
sudo docker run --rm -it --name testContainer --net="host" -p 5000:80 web-card-game:0.1 /bin/sh

