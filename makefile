./dest/pjax.js: ./dest ./build/pjax.js ./build/event-emitter.js
	./node_modules/.bin/browserify ./build/pjax.js > ./dest/pjax.js

./build/pjax.js: ./build ./src/pjax.js
	./node_modules/.bin/babel ./src/pjax.js -o ./build/pjax.js

./build/event-emitter.js: ./build ./event-emitter/src/event-emitter.js
	./node_modules/.bin/babel ./event-emitter/src/event-emitter.js -o ./build/event-emitter.js --module-id EventEmitter

./dest:
	mkdir ./dest

./build:
	mkdir ./build
