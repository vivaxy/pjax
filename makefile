./dest/pjax.js: ./src/pjax.js ./dest
	./node_modules/.bin/babel ./src/pjax.js -o ./dest/pjax.js --modules umd --module-id Pjax

./dest:
	mkdir ./dest
