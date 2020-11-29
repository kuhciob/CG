function dragonGeom(step, layer) {

	let iterations = step;

	const cos45 = Math.cos(Math.PI / 4);
	const sin45 = Math.sin(Math.PI / 4);
	const cos135 = Math.cos(-Math.PI / 4);
	const sin135 = Math.sin(-Math.PI / 4);
	const sqrt2 = Math.sqrt(2);
	const length = (p1, p2) => {
		return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
	}

	let DRAGON_POINTS_SEQUENCE = [];

	let points = [[250, 250], [700, 250]];
	dragon(points, iterations);

	function dragon(points, order = 1) {
		if (order === 0) {
			drawLines(points);
		} else {
			let newPointsArray = [];
			for (let i = 0; i < points.length - 1; i++) {
				if (i % 2 === 0) {
					newPointsArray.push(f1(points[i], points[i + 1]));
				} else if (i % 2 === 1) {
					newPointsArray.push(f2(points[i], points[i + 1]));
				}
			}

			let newPoints = []
			// console.log("points: ", points);
			// console.log("new points: ", newPointsArray);
			for (let i = 0; i < newPointsArray.length; i++) {
				newPoints.push(points[i])
				newPoints.push(newPointsArray[i]);
			}
			newPoints.push(points[points.length - 1]);


			order--;

			DRAGON_POINTS_SEQUENCE.push(newPoints);

			dragon(newPoints, order);
		}
	}

	function f1(p1, p2) {
		const refVector = [
			(p2[0] - p1[0]) / sqrt2,
			(p2[1] - p1[1]) / sqrt2,
		];

		let newV = [
			refVector[0] * cos45 - refVector[1] * sin45,
			refVector[0] * sin45 + refVector[1] * cos45
		];

		newV = [newV[0] + p1[0], newV[1] + p1[1]];

		return newV;
	}

	function f2(p1, p2) {
		const refVector = [
			(p2[0] - p1[0]) / sqrt2,
			(p2[1] - p1[1]) / sqrt2,
		];

		let newV = [
			refVector[0] * cos45 - refVector[1] * -sin45,
			refVector[0] * -sin45 + refVector[1] * cos45
		];

		newV = [newV[0] + p1[0], newV[1] + p1[1]];

		return newV;
	}

	function line(startx, starty, endx, endy) {
		layer.beginPath();
		layer.moveTo(startx, starty);
		layer.lineTo(endx, endy);
		layer.stroke();
	}

	function drawLines(pointArray) {
		layer.beginPath();
		layer.moveTo(pointArray[0][0], pointArray[0][1]);
		for (let i = 1; i < pointArray.length; i++) {
			const nextPoint = pointArray[i];
			layer.lineTo(nextPoint[0], nextPoint[1]);
		}
		layer.stroke();
	}
}