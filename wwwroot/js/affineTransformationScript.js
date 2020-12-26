let canvas = document.getElementById("MoveCanvas");
let ctx = canvas.getContext("2d");

var canvasScale = 20;

let canvasCenterX = parseInt(canvas.width / 2);
let canvasCenterY = parseInt(canvas.height / 2);




class MathDot {

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    getInCanvasDot(){
        let canvasX = canvasCenterX + this.x * canvasScale;
        let canvasY = canvasCenterY - this.y * canvasScale;
        return new CanvasDot(canvasX, canvasY)
    }

    clone(){
        let mathDot = new MathDot();
        mathDot.x = this.x;
        mathDot.y = this.y;

        return mathDot;
    }
}

class CanvasDot{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    getInMathDot() {
        let mathX = Number(((this.x - canvasCenterX) / canvasScale).toFixed(0));
        let mathY = Number(((canvasCenterY + this.y) / canvasScale).toFixed(0))
        return new MathDot(mathX, mathY)
    }
}

function drawLabelOnDot(label, dot){

    ctx.font = "15px Consolas";
    ctx.fillStyle = "black";
    ctx.fillText(label, dot.x, dot.y);
}
function drawLine(from, to, color, width){
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();  
}
function drawCanvasBackground(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function setLabelAtX(x){

    let mathDot = new MathDot(x, 0);
    let canvasDot = mathDot.getInCanvasDot();
    
    drawLine(new CanvasDot(canvasDot.x, 0), new CanvasDot(canvasDot.x, canvas.height), "#3A3A3A", 1);

    ctx.fillStyle = "blue";
    ctx.font = "15px Consolas";
    ctx.fillText(x, canvasDot.x, canvasDot.y - 2);
}
function setLabelAtY(y){
    let mathDot = new MathDot(0, y);
    let canvasDot = mathDot.getInCanvasDot();

    drawLine(new CanvasDot(0, canvasDot.y), new CanvasDot(canvas.width, canvasDot.y), "#3A3A3A", 1);

    ctx.fillStyle = "blue";
    ctx.font = "15px Consolas";
    ctx.fillText(y, canvasDot.x, canvasDot.y - 2);
}
function setLabelAtCanvas(label, canvasDot){

    ctx.fillStyle = "black";
    ctx.font = "20px Consolas";
    ctx.fillText(label, canvasDot.x, canvasDot.y);
}
function drawGrid() {
    const point = 5;
    drawCanvasBackground();
    for(let i = canvasCenterX, j = 0; i <= canvas.width; i += canvasScale, j+= 1){
        if (j % point == 0){
            setLabelAtX(j);
        }
        let width = i == canvasCenterX ? 2 : 1;
        let color = i == canvasCenterX ? "#636060" : "#C4C4C4";
        let from = new CanvasDot(i, 0);
        let to = new CanvasDot(i, canvas.height);
        drawLine(from, to, color, width);
    }

    for(let i = canvasCenterX, j = 0; i >= 0; i -= canvasScale, j+= 1){
        if (j % point == 0){
            setLabelAtX(-j);
        }
        let width = i == canvasCenterX ? 2 : 1;
        let color = i == canvasCenterX ? "#636060" : "#C4C4C4";
        let from = new CanvasDot(i, 0);
        let to = new CanvasDot(i, canvas.height);
        drawLine(from, to, color, width);
    }

    for(let i = canvasCenterY, j = 0; i <= canvas.height; i += canvasScale, j+= 1){
        if (j % point == 0){
            setLabelAtY(j);
        }
        let width = i == canvasCenterY ? 2 : 1;
        let color = i == canvasCenterY ? "#636060" : "#C4C4C4";
        let from = new CanvasDot(0, i);
        let to = new CanvasDot(canvas.width, i);
        drawLine(from, to, color, width);
    }

    for(let i = canvasCenterY, j = 0; i >= 0; i -= canvasScale, j+= 1){
        if (j % point == 0){
            setLabelAtY(-j);
        }
        let width = i == canvasCenterY ? 2 : 1;
        let color = i == canvasCenterY ? "#636060" : "#C4C4C4";
        let from = new CanvasDot(0, i);
        let to = new CanvasDot(canvas.width, i);
        drawLine(from, to, color, width);
    }



}


drawGrid();

function ClearCoordCanvas() {
    drawGrid();
}


//////////////////////////////////////////////////////
/////////////////////   SCRIPT   /////////////////////
//////////////////////////////////////////////////////
