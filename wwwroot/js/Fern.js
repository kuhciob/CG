function paintFern(layer,step,scale) {
	var scale = scale;
	var numberOfPoints = step;//scale;
	var slant = -.625;
	layer.translate(6, layer.canvas.height + scale * Math.sin(Math.PI * slant));
	layer.rotate(Math.PI * slant);
	layer.fillStyle = 'darkgreen';
	x = y = a = b = c = d = f = 0;
	for (i = 0; i < numberOfPoints; i++) {
		let r = Math.random();

		if (r < 0.02) {
			a = b = c = f = 0;
			d = 0.16;

		} else if (r < 0.86) {
			a = d = 0.85;
			b = 0.04;
			c = -0.04;
			f = 1.6;
		} else if (r < 0.93) {
			a = 0.2;
			b = -0.26;
			c = 0.23;
			d = 0.22;
			f = 1.6;
		} else {
			a = -0.15;
			b = 0.28;
			c = 0.26;
			d = 0.24;
			f = 0.44;
		}

		let xs = x;
		x = a * x + b * y;
		y = c * xs + d * y + f;
		layer.fillRect(x * scale, y * scale, 1, 1);
	}
}


