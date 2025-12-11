#!/bin/bash

# Start Backend
echo "Starting Backend on PORT 5001..."
cd server
export PORT=5001
node server.js &
BACKEND_PID=$!

# Wait a moment
sleep 2

# Start Frontend
echo "Starting Frontend..."
cd ..
npm start &
FRONTEND_PID=$!

# Handle shutdown
trap "kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT

wait
