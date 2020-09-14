#! /bin/bash

echo "Rebuilding Game"
rm -rf dist
mkdir -p dist/js
cp index_dist.html dist/index.html
cp favicon.ico dist/favicon.ico

echo "Copying Assets"
cp -r assets dist/

echo "Transpiling with Babel"
npx babel library -d dist/js/library
npx babel testGame -d dist/js/game

echo "Browserifying"
npx browserify dist/js/game/init.js -o dist/game.js

echo "Cleaning up"
rm -rf dist/js

echo "Minifying"
npx google-closure-compiler --js=dist/game.js --js_output_file=dist/gameM.js --jscomp_off=checkVars
rm dist/game.js

echo "Done! (ignore the warnings)"