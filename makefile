./demo/common/index.js: ./demo/common/index.jsx ./event-emitter/src/event-emitter.js
	./node_modules/.bin/browserify ./demo/common/index.jsx -t babelify > ./demo/common/index.js
