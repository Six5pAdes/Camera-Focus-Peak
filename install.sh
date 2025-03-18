# !/bin/bash
set -e

# update package lists
sudo apt update

# install Node.js & npm
sudo apt install -y nodejs npm

# install Python & dependencies
sudo apt install -y python3 python3-pip

# install required npm packages
npm install

# install required Python packages
pip3 install opencv-python numpy flask

echo "Installation complete! Run './run.sh' to start the application."
