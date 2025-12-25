#!/bin/bash
# Build script for Render deployment

echo "Installing dependencies..."
npm install

echo "Building TypeScript..."
npm run build

echo "Copying package files..."
cp package.json dist/
cp package-lock.json dist/ 2>/dev/null || true

echo "Build completed successfully!"
