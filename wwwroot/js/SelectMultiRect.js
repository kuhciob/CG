"use strict";

var canvasClobalCoord;
var canvasCoords = [];

class CanvasRectCoord {
    constructor() {
        this.Sx = 0;
        this.Sy = 0;
        this.Ex = 0;
        this.Ey = 0;
        this.IsDown = false;
        this.baseImg = new Image();
    }
}
function SupportSelected(canvas, canvasNbr) {
    let currCanvasCoords = new CanvasRectCoord();
    
    canvasCoords[canvasNbr] = currCanvasCoords;

    canvas.onmousedown = function (event) {
        let baseImage = new Image();
        baseImage.src = this.toDataURL();
        currCanvasCoords.IsDown = true;
        currCanvasCoords.Sx = event.layerX;
        currCanvasCoords.Sy = event.layerY;
        currCanvasCoords.baseImg = baseImage;
    }


    canvas.onmouseup = function (event){
        let baseImage = currCanvasCoords.baseImg
        let ctx = this.getContext("2d");
        currCanvasCoords.IsDown = false;
        currCanvasCoords.Ex = event.layerX;
        currCanvasCoords.Ey = event.layerY;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(baseImage, 0, 0, baseImage.width, baseImage.height, 0, 0, this.width, this.height);

        //ctx.strokeStyle = "red";
        //ctx.strokeRect(currCanvasCoords.Sx, currCanvasCoords.Sy, currCanvasCoords.Ex - currCanvasCoords.Sx, currCanvasCoords.Ey - currCanvasCoords.Sy);
    }

    canvas.onmousemove = function (event) {
        let baseImage = currCanvasCoords.baseImg;

        if (currCanvasCoords.IsDown) {
            currCanvasCoords.Ex = event.layerX;
            currCanvasCoords.Ey = event.layerY;

            let ctx = this.getContext("2d");
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(baseImage, 0, 0, baseImage.width, baseImage.height, 0, 0, this.width, this.height);
            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;
            ctx.strokeRect(currCanvasCoords.Sx, currCanvasCoords.Sy, currCanvasCoords.Ex - currCanvasCoords.Sx, currCanvasCoords.Ey - currCanvasCoords.Sy);
        }
    }
}
function BuildRectByMouse(canvas) {

    let ctx = canvas.getContext("2d");
    let currCanvasCoords = new CanvasRectCoord();
    canvasCoords.push(currCanvasCoords);

    canvas.onmousedown = function (event) {
        let baseImage = new Image();
        baseImage.src = this.toDataURL();
        currCanvasCoords.IsDown = true;
        currCanvasCoords.Sx = event.layerX;
        currCanvasCoords.Sy = event.layerY;
        currCanvasCoords.baseImg = baseImage;
    }


    canvas.onmouseup = (event) => {
        let baseImage = currCanvasCoords.baseImg

        currCanvasCoords.IsDown = false;
        currCanvasCoords.Ex = event.layerX;
        currCanvasCoords.Ey = event.layerY;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.drawImage(baseImage, 0, 0, baseImage.width, baseImage.height, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "red";
        ctx.strokeRect(currCanvasCoords.Sx, currCanvasCoords.Sy, currCanvasCoords.Ex - currCanvasCoords.Sx, currCanvasCoords.Ey - currCanvasCoords.Sy);
    }

    canvas.onmousemove = (event) => {
        let baseImage = currCanvasCoords.baseImg;

        if (currCanvasCoords.IsDown) {
            currCanvasCoords.Ex = event.layerX;
            currCanvasCoords.Ey = event.layerY;

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(baseImage, 0, 0, baseImage.width, baseImage.height, 0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "red";
            ctx.strokeRect(currCanvasCoords.Sx, currCanvasCoords.Sy, currCanvasCoords.Ex - currCanvasCoords.Sx, currCanvasCoords.Ey - currCanvasCoords.Sy);
        }
    }
}

