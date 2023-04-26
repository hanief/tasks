#!/bin/bash

# Install main dependencies
yarn install

# Copy .env.example to .env
cp .env.example .env

# Clone submodule
git submodule update --init --recursive

# Install submodule dependencies
cd mocks
npm install

# Copy .env.example to .env
cp .env.example .env