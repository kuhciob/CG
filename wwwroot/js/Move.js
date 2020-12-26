document.getElementById("inputLinePointK").value = 1;
document.getElementById("inputLinePointB").value = 0;

document.getElementById("inputPointAx").value = -10;
document.getElementById("inputPointAy").value = 0;

document.getElementById("inputPointBx").value = -5;
document.getElementById("inputPointBy").value = 10;

document.getElementById("inputPointCx").value = -2;
document.getElementById("inputPointCy").value = 9;

var Parallelogram = {
    A: { x: 0, y: 0 },
    B: { x: 0, y: 0 },
    C: { x: 0, y: 0 }
}

var Priama = {
    K: 0,
    B: 0
}

var CanvasConfig = { BaseImage: new Image() };
function BuildParallelogram() {
    let canvas = document.getElementById("MoveCanvas");

    let LineK = parseFloat(document.getElementById("inputLinePointK").value);
    let LineB = parseInt(document.getElementById("inputLinePointB").value);

    let ax = parseInt(document.getElementById("inputPointAx").value);
    let ay = parseInt(document.getElementById("inputPointAy").value);

    let bx = parseInt(document.getElementById("inputPointBx").value);
    let by = parseInt(document.getElementById("inputPointBy").value);

    let cx = parseInt(document.getElementById("inputPointCx").value);
    let cy = parseInt(document.getElementById("inputPointCy").value);

    let canvA = new MathDot(ax, ay).getInCanvasDot();
    let canvB = new MathDot(bx, by).getInCanvasDot();
    let canvC = new MathDot(cx, cy).getInCanvasDot();

    let A = [];
    let B = [];
    let C = [];

    A[0] = canvA.x;
    A[1] = canvA.y;

    B[0] = canvB.x;
    B[1] = canvB.y;

    C[0] = canvC.x;
    C[1] = canvC.y;

    Parallelogram.A.x = A[0];
    Parallelogram.A.y = A[1];

    Parallelogram.B.x = B[0];
    Parallelogram.B.y = B[1];

    Parallelogram.C.x = C[0];
    Parallelogram.C.y = C[1];

    Priama.K = LineK;
    Priama.B = LineB;

    ClearCoordCanvas();
    drawPriama_XD(canvas, LineK, LineB);
    CanvasConfig.BaseImage.src = canvas.toDataURL();
    drawParallelogram(canvas, A, B, C); 
    MirrorParall();
}
function drawParallelogram(canvas, A, B, C) {
   
    context = canvas.getContext("2d");
    context.beginPath();

    context.moveTo(A[0], A[1])
    context.lineTo(B[0], B[1]);
    context.lineTo(C[0], C[1]);

    let ACcentrX = (A[0] + C[0]) / 2.0; 
    let ACcentrY = (A[1] + C[1]) / 2.0; 


    context.lineTo(2 * ACcentrX - B[0], 2 * ACcentrY - B[1]);

    context.lineTo(A[0], A[1])

    context.closePath();
    context.strokeStyle = "orange";
    context.stroke();
}

function drawPriama_XD(canvas, K, LineB) {
    context = canvas.getContext("2d");
    context.beginPath();
    
    let x0 = new CanvasDot(0, 0).getInMathDot().x;
    let y0 = K * x0 + LineB;

    let x1 = new CanvasDot(canvas.width, 0).getInMathDot().x
    let y1 = K * x1 + LineB;

    let cd0 = new MathDot(x0, y0).getInCanvasDot();
    let cd1 = new MathDot(x1, y1).getInCanvasDot();
    context.moveTo(cd0.x, cd0.y)
    context.lineTo(cd1.x, cd1.y);

    context.closePath();
    context.strokeStyle = "red";
    context.stroke();
}

function MultMatrix(Matrix1, Matrix2) {
    let m = Matrix1.length;
    let n = Matrix1[0].length;
    let q = Matrix2[0].length;

    let resMatrix = new Array(m);

    for (let i = 0; i < m; ++i) {
        resMatrix[i] = new Array(q);
        for (let j = 0; j < q; ++j) {
            resMatrix[i][j] = 0
            for (let k = 0; k < n; ++k) {
                resMatrix[i][j] += Matrix1[i][k] * Matrix2[k][j]
            }
        }
    }
    return resMatrix;
}

function MoveParallUp() {
    MoveParall(0, -canvasScale);
}
function MoveParallDown() {
    MoveParall(0, canvasScale);
}
function MoveParallLeft() {
    MoveParall(-canvasScale, 0);
}
function MoveParallRight() {
    MoveParall(canvasScale, 0);
}
function MoveParall(deltax, deltay) {

    let canvas = document.getElementById("MoveCanvas");

    let PointA = [Parallelogram.A.x, Parallelogram.A.y];
    let PointB = [Parallelogram.B.x, Parallelogram.B.y];
    let PointC = [Parallelogram.C.x, Parallelogram.C.y];

    PointA = MovePoint(PointA, deltax, deltay);
    PointB = MovePoint(PointB, deltax, deltay);
    PointC = MovePoint(PointC, deltax, deltay);

    console.log(PointA);

    Parallelogram.A.x = PointA[0];
    Parallelogram.A.y = PointA[1];

    Parallelogram.B.x = PointB[0];
    Parallelogram.B.y = PointB[1];

    Parallelogram.C.x = PointC[0];
    Parallelogram.C.y = PointC[1];

    ClearCoordCanvas();
    drawPriama_XD(canvas, Priama.K, Priama.B);
    drawParallelogram(canvas, PointA, PointB, PointC);
    MirrorParall();
}

function MovePoint(Point, deltax, deltay) {
    let pointMtrx = new Array(3);
    pointMtrx[0] = [[Point[0]]];
    pointMtrx[1] = [[Point[1]]];
    pointMtrx[2] = [[1]]; 
    let transMatrix = [[1, 0, deltax], [0, 1, deltay], [0, 0, 1]];
    let newCoord = MultMatrix(transMatrix, pointMtrx);

    return [newCoord[0][0], newCoord[1][0]];
}
function MirrorParall() {
    let canvas = document.getElementById("MoveCanvas");

    let PointA = [Parallelogram.A.x, Parallelogram.A.y];
    let PointB = [Parallelogram.B.x, Parallelogram.B.y];
    let PointC = [Parallelogram.C.x, Parallelogram.C.y];

    PointA = MirrorPoint(PointA, Priama.K, Priama.B);
    PointB = MirrorPoint(PointB, Priama.K, Priama.B);
    PointC = MirrorPoint(PointC, Priama.K, Priama.B);

    drawParallelogram(canvas, PointA, PointB, PointC);
}
function MirrorPoint(Point, k, b) {

     return ApplyAfin(Point,GetMirrorMatrix(k, b));
}
function GetMirrorMatrix(k, b) {
    let atg = -1 * Math.atan(k);

    let matrix1 = [
        [1, 0, 0],
        [0, 1, 0],
        [0, b * (-1), 1]
    ]

    let matrix2 = [
        [Math.cos(atg), Math.sin(atg), 0],
        [-1 * Math.sin(atg), Math.cos(atg), 0],
        [0, 0, 1]
    ]

    let matrix3 = [
        [1, 0, 0],
        [0, -1, 0],
        [0, 0, 1]
    ]


    let matrix4 = [
        [Math.cos(atg), -1 * Math.sin(atg), 0],
        [Math.sin(atg), Math.cos(atg), 0],
        [0, 0, 1]
    ]

    let matrix5 = [
        [1, 0, 0],
        [0, 1, 0],
        [0, b, 1]
    ]

    let triangleMatrix = [
        [2, 4, 1],
        [4, 6, 1],
        [2, 6, 1]
    ]


    let matrix12 = MultMatrix(matrix1, matrix2);
    let matrix123 = MultMatrix(matrix12, matrix3);
    let matrix1234 = MultMatrix(matrix123, matrix4);
    let TranspontMatrix = MultMatrix(matrix1234, matrix5)
    let finalMatrix = MultMatrix(triangleMatrix, TranspontMatrix)

    return TranspontMatrix;
}
function ApplyAfin(Point, AfinMatrix) {
    let pointMtrx = new Array(3);
    pointMtrx[0] = [[Point[0]]];
    pointMtrx[1] = [[Point[1]]];
    pointMtrx[2] = [[1]]; 
    let newCoord = MultMatrix(AfinMatrix, pointMtrx);

    return [newCoord[0][0], newCoord[1][0]];
}


const multiplyMatrices = (a, b) => {
    if (!Array.isArray(a) || !Array.isArray(b) || !a.length || !b.length) {
        throw new Error('arguments should be in 2-dimensional array format');
    }
    let x = a.length,
        z = a[0].length,
        y = b[0].length;
    if (b.length !== z) {
        // XxZ & ZxY => XxY
        throw new Error('number of columns in the first matrix should be the same as the number of rows in the second');
    }
    let productRow = Array.apply(null, new Array(y)).map(Number.prototype.valueOf, 0);
    let product = new Array(x);
    for (let p = 0; p < x; p++) {
        product[p] = productRow.slice();
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            for (let k = 0; k < z; k++) {
                product[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return product;
}