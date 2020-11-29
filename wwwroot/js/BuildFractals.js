function build(iterations, speed, fractType) {
	
	function render(layer, color) {
		layer.clearRect(0, 0, layer.canvas.width, layer.canvas.height);
		layer.beginPath();
		layer.strokeStyle = color;
			
		renderStep(layer, color);	
	}
	function renderStep(layer, color) {	
		clear(layer)
		layer.beginPath();
		var w = layer.canvas.width;
		var h = layer.canvas.height;
		console.log(fractType);
		switch (fractType) {
			case "Лінія коха(геометричний)":
				kochGeom([10, h / 2, 90], w - 20, step, layer);
				break;
			case "Лінія коха(IFS)":
				cx = layer.canvas.width;
				cy = layer.canvas.height / 2;
				kochIFS([0, cy], [cx, cy], step, layer);
				break;
			case "Папороть Барнслі":
				step = iterations;
				let scale = 60;
				paintFern(layer, step, scale);
				break;
			case "\"Дракон\" Хартера-Хейтуея(геометричний)":
				dragonGeom(step,layer);
				break;
			case "\"Дракон\" Хартера-Хейтуея(IFS)":
				step = iterations;
				dragonIFS(step,layer);
				break;

        }
				
		layer.stroke();

		if (step < iterations) {
			
			setTimeout(function () {
				++step;	
				renderStep(layer, color);
			}, speed * 100);
        }
			
    }
	var step = 0;

	render(document.getElementById('layer').getContext('2d'), '#000');
};