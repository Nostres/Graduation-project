#!/usr/bin/env bash
##!/bin/bash

echo ""
echo ""
echo "Creating virtual environment..."
virtualenv math
echo "Ok..."

echo ""
echo ""
echo "Activating virtual environment..."
cd math
source bin/activate
echo "Ok..."

echo ""
echo ""
echo "Installing dependencies..."
pip install -r ./requirements.txt
echo "Ok..."

echo ""
echo ""
echo "Running python math server..."
python src/graduation/math.py
echo "Ok..."

echo ""
echo ""
echo "Deactivating virtual environment..."
deactivate
echo "Ok..."
echo "Bye!..."
