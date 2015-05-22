var memwatch = require('memwatch-next');
var Model = require('./src/model');

var start = new Date();
function msFromStart() {
	return new Date() - start;
}

var startheap = process.memoryUsage().heapUsed;

memwatch.on('stats', function(d) {
	console.log("postgc:  ", d.current_base/startheap);
});

memwatch.on('leak', function(d) {
	console.log("LEAK:", d);
});


var leaks = [];

setInterval(function() {
	for (var i = 0; i < 100; i++) {
		var model = new Model({
			x: 1,
			y: 2
		});

		model.when(['x','y'], function(x,y) {
			model.xy = x*y;
		});

		model.x = 3;
		model.y = 4;

		model.unobserve();

		//model = null;

		//leaks.push(model);
	}

	//console.error('Leaks: %d', leaks.length);
}, 100);

// also report periodic heap size (every 10s)
setInterval(function() {
	console.log("heapUsed:", process.memoryUsage().heapUsed/startheap);
}, 1000);
