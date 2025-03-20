#!/bin/bash
set -e

# Update package lists
echo "Updating package lists..."
sudo apt update

# Install Node.js & npm
echo "Installing Node.js and npm..."
sudo apt install -y nodejs npm

# Update Node.js to a compatible version if needed
echo "Checking Node.js version..."
node_ver=$(node -v)
echo "Current Node.js version: $node_ver"
if [[ $node_ver < "v16" ]]; then
    echo "Updating Node.js to v16..."
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs
    echo "Node.js updated to: $(node -v)"
fi

# Install Python & dependencies
echo "Installing Python 3 and pip..."
sudo apt install -y python3 python3-pip

# Create public directory if it doesn't exist
mkdir -p public

# Download the video file if it doesn't exist
if [ ! -f "public/exploreHD-Focus.mp4" ]; then
    echo "Downloading sample video..."
    curl -L "https://drive.google.com/uc?export=download&id=1h0vtWUQvB3bjYyGRKsDpHyVKVpz5jEnJ" -o public/exploreHD-Focus.mp4
fi

# Install required npm packages
echo "Installing npm packages..."
npm install

# Install required Python packages
echo "Installing Python packages..."
pip3 install flask opencv-python numpy

echo "Installation complete! Run './run.sh' to start the application."
