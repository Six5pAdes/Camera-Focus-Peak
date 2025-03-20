#!/bin/bash
set -e

echo "Starting the Focus Peaking application..."

# Start backend server in the background
echo "Starting Python backend server..."
python3 backend/server.py &
BACKEND_PID=$!

# Give the backend time to start
sleep 2

# Start frontend application
echo "Starting React frontend..."
npm start

# Cleanup: kill the backend process when frontend is closed
kill $BACKEND_PID
