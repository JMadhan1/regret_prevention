#!/bin/bash
# Build frontend and prepare for deployment
cd frontend
npm install
npm run build
cd ..
