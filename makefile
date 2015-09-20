./dest/pjax.js: ./dest build-js
	./node_modules/.bin/browserify ./build/pjax.js > ./dest/pjax.js

build-js: ./build ./src ./src/pjax.js
	./node_modules/.bin/babel ./src -d ./build

./build/event-emitter.js: ./build ./event-emitter/src/event-emitter.js
	./node_modules/.bin/babel ./event-emitter/src/event-emitter.js -o ./build/event-emitter.js

./dest:
	mkdir ./dest

./build:
	mkdir ./build

.PHONY: build-js
