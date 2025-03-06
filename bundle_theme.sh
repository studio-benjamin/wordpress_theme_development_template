#!/bin/sh
sass ./main-theme/:./main-theme/
cp -r ./main-theme/ ./theme/
find ./theme -type f -name "*.scss" -delete
find ./theme -type f -name "*.css.map" -delete
