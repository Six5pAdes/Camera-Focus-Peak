# !/bin/bash
set -e

# start backend server
python3 backend/server.py

# start frontend application
npm start
