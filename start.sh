#!/bin/bash
kill `sudo lsof -t -i:3000` &
kill `sudo lsof -t -i:9001` &
kill `sudo lsof -t -i:9002` &

wait &
npm install &
npm install -g ts-node &

wait &
npm run racer1 & 
npm run racer2 &
wait &
npm run master &