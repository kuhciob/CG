function to(angle, length) {
	if (angle < 0) {
		angle = 360 - ((angle * (-1)) % 360);
	}
	angle = angle % 360;
	if (length < 0) {
		length *= (-1);
	} else if (length == 0) {
		return [0, 0];
	}
	if (angle % 90 === 0) {
		angle = angle / 90;
		if (angle == 0) {
			return [0, -length];
		} else if (angle == 1) {
			return [length, 0];
		} else if (angle == 2) {
			return [0, length];
		}
		return [-length, 0];
	}
	return [Math.sin(angle * (Math.PI / 180)) * length,
	Math.sin((angle - 90) * (Math.PI / 180)) * length];
}

function line(start, angle, length, layer) {
	var z = false;
	if (typeof (start[2]) != "undefined") {
		angle += start[2];
		z = true;
	}
	var x2 = to(angle, length);
	var y2 = x2[1] + start[1];
	x2 = x2[0] + start[0];
	if (typeof (layer) != "undefined") {
		layer.moveTo(start[0], start[1]);
		layer.lineTo(x2, y2);
	}
	if (z === false) {
		return [x2, y2];
	} else {
		return [x2, y2, angle];
	}
}

function clear(layer) {
	layer.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
}

function kochGeom(start, length, repeat, layer) {
	repeat -= 1;
	if (repeat > 0) {
		kochGeom(start, length / 3, repeat, layer);
		var x = line(start, 0, length / 3);
		x[2] -= 60;
		kochGeom(x, length / 3, repeat, layer);
		x = line(x, 0, length / 3);
		x[2] += 120;
		kochGeom(x, length / 3, repeat, layer);
		kochGeom(line(start, 0, 2 * length / 3), length / 3, repeat, layer);
	} else {
		line(start, 0, length, layer);
	}
}
function kochIFS(start, end, repeat, layer) {
	var x1 = (end[0] - start[0]) * 1 / 3 + start[0];
	var y1 = (end[1] - start[1]) * 1 / 3 + start[1];
	var x2 = (end[0] - start[0]) * 2 / 3 + start[0];
	var y2 = (end[1] - start[1]) * 2 / 3 + start[1];
	var x3 = ((x1 + x2) + Math.sqrt(3) * (-y1 + y2)) / 2;
	var y3 = ((y1 + y2) + Math.sqrt(3) * (x1 - x2)) / 2;

	layer.beginPath();

	// One third Line and Two third Line
	layer.moveTo(start[0], start[1]);

	layer.lineTo(x1, y1);
	layer.moveTo(x2, y2);
	layer.lineTo(end[0], end[1]);

	// Triangle
	layer.moveTo(x1, y1);
	layer.lineTo(x3, y3);
	layer.moveTo(x2, y2);
	layer.lineTo(x3, y3);
	layer.closePath();
	layer.stroke();

	//clear middle line
	layer.strokeStyle = "white";
	layer.beginPath();
	layer.moveTo(x1, y1);
	layer.lineTo(x2, y2);
	layer.closePath();
	layer.stroke();
	layer.strokeStyle = "black";

	if (repeat > 0) {
		kochIFS([start[0], start[1]], [x1, y1], repeat - 1, layer);
		kochIFS([x1, y1], [x3, y3], repeat - 1, layer);
		kochIFS([x3, y3], [x2, y2], repeat - 1, layer);
		kochIFS([x2, y2], [end[0], end[1]], repeat - 1, layer);
	}
}