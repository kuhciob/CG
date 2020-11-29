function dragonIFS(step, layer) {
    var scale = 7;
    var ox = -layer.canvas.width / 2;
    var oy = -layer.canvas.height / 2;

    var c = c1 = c2 = c2x = c2y = x = y = 0, d = 1, step = 1 << step;

    console.log(step)
    ox = Number(ox);
    oy = Number(oy);
    x = y = layer.canvas.width / 2;

    //layer.fillStyle = "white";
    //fillRect(0, 0, layer.canvas.width, layer.canvas.height);
    //layer.beginPath();
    for (let i = 0; i <= step;)
    {
        layer.lineTo((x + ox) * scale, (y + oy) * scale);
        c1 = c & 1;
        c2 = c & 2;
        c2x = 1 * d;
        if (c2 > 0) { c2x = (-1) * d }; c2y = (-1) * c2x;
        if (c1 > 0)
        {
            y += c2y
        }
        else
        {
            x += c2x
        }
        i++;
        c += i / (i & -i);
    }
    layer.strokeStyle = "red";
    layer.stroke();
}
