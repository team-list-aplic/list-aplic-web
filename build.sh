#!/usr/bin/env bash

echo "Building Angular app for $NODE_ENV"

build_dev='ng build --prod --configuration=development'
if [ $NODE_ENV = "development" ]; then
 echo "running $build_dev ..."
 eval "$build_dev"
fi

build_prod='ng build --prod --configuration=production'
if [ $NODE_ENV = "production" ]; then
 echo "running $build_prod ..."
 eval "$build_prod"
fi
