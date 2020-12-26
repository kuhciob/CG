var CurrentCanvasNbr = 0;


function ApplyChange() {
    let deltaLight = document.getElementById("myRange2").value;
    let deltaH = document.getElementById("myRange1").value;
    let deltaY = document.getElementById("myRange4").value;
    let deltaS = document.getElementById("myRange3").value;

    let canvasIDs = ["canvas1", "canvas2", "canvas3"];
    for (let i = 0; i < canvasIDs.length; ++i) {

        ApplyChangesToImage(document.getElementById(canvasIDs[i]), primatyColors[i], deltaY, deltaS, deltaLight, deltaH);
    }

}
function Saturation() {
    let incVal = document.getElementById("myRange3").value;
    let canvasIDs = ["canvas1", "canvas2", "canvas3"];
    for (let i = 0; i < canvasIDs.length; ++i) {

        changeSaturation(document.getElementById(canvasIDs[i]), incVal, primatyColors[i]);
    }
}
function SaturationYellow() {
    let incVal = document.getElementById("myRange4").value;
    let canvasIDs = ["canvas1", "canvas2", "canvas3"];
    for (let i = 0; i < canvasIDs.length; ++i) {
        changeSaturationYellow(document.getElementById(canvasIDs[i]), incVal, primatyColors[i]);
    }
}
function Lightness() {
    let incVal = document.getElementById("myRange2").value;
    let canvasIDs = ["canvas1", "canvas2", "canvas3"];
    for (let i = 0; i < canvasIDs.length; ++i) {

        changeLightness(document.getElementById(canvasIDs[i]), incVal, primatyColors[i]);
    }
}

function gotoModel(numb) {

    CurrentCanvasNbr = numb;
    switch (numb) {
        case 0:
            document.getElementById("model_btn_1").className = "color_output_tab_btn";
            document.getElementById("color_output_tab_1").style.display = "initial";

            document.getElementById("model_btn_2").className = "color_output_tab_btn_anactive";
            document.getElementById("color_output_tab_2").style.display = "none";
            document.getElementById("model_btn_3").className = "color_output_tab_btn_anactive";
            document.getElementById("color_output_tab_3").style.display = "none";

            getPixelStatus(id("canvas1"));
            break;
        case 1:
            document.getElementById("model_btn_2").className = "color_output_tab_btn";
            document.getElementById("color_output_tab_2").style.display = "initial";

            document.getElementById("model_btn_1").className = "color_output_tab_btn_anactive";
            document.getElementById("color_output_tab_1").style.display = "none";
            document.getElementById("model_btn_3").className = "color_output_tab_btn_anactive";
            document.getElementById("color_output_tab_3").style.display = "none";

            getPixelStatus(id("canvas2"));
            break;
        case 2:
            document.getElementById("model_btn_3").className = "color_output_tab_btn";
            document.getElementById("color_output_tab_3").style.display = "initial";

            document.getElementById("model_btn_1").className = "color_output_tab_btn_anactive";
            document.getElementById("color_output_tab_1").style.display = "none";
            document.getElementById("model_btn_2").className = "color_output_tab_btn_anactive";
            document.getElementById("color_output_tab_2").style.display = "none";

            getPixelStatus(id("canvas3"));
            break;
    }
}




function cmykToRgb(C, M, Y, K) {
    let r = 255 * (1 - C) * (1 - K);
    let g = 255 * (1 - M) * (1 - K);
    let b = 255 * (1 - Y) * (1 - K);

    return [Math.round(r), Math.round(g), Math.round(b)];
}

function rgbToHsl(r, g, b) {
    let step = 1 / 255;


    let normalizedR = step * r;
    let normalizedG = step * g;
    let normalizedB = step * b;

    let H;
    let S;

    let max = normalizedR;
    if (normalizedG > max)
        max = normalizedG;
    if (normalizedB > max)
        max = normalizedB;

    let min = normalizedR;
    if (normalizedG < min)
        min = normalizedG;
    if (normalizedB < min)
        min = normalizedB;
    //H calculate
    if (max == normalizedR && normalizedG >= normalizedB) {
        H = 60 * (normalizedG - normalizedB) / (max - min);
    }
    else if (max == normalizedR && normalizedG < normalizedB) {
        H = 60 * (normalizedG - normalizedB) / (max - min) + 360;
    }
    else if (max == normalizedG) {
        H = 60 * (normalizedB - normalizedR) / (max - min) + 120;
    }
    else if (max == normalizedB) {
        H = 60 * (normalizedR - normalizedG) / (max - min) + 240;
    }

    let L = (max + min) / 2;

    if (L == 0 || max == min) {
        S = 0;
    }
    else if (L > 0 && L <= 1 / 2) {
        S = (max - min) / (2 * L);
    }
    else if (L > 1 / 2) {
        S = (max - min) / (2 - 2 * L);
    }

    return [Math.round(H), S, L];
}

function hslToRgb(h, s, l) {
    let a = s * Math.min(l, 1 - l);
    let f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

function rgbToCmyk(r, g, b) {
    let step = 1 / 255;

    let normalizedR = step * r;
    let normalizedG = step * g;
    let normalizedB = step * b;

    let C = 1 - normalizedR;
    let M = 1 - normalizedG;
    let Y = 1 - normalizedB;

    let K = C;
    if (M < K)
        K = M;
    if (Y < K)
        K = Y;

    C = (C - K) / (1 - K);
    M = (M - K) / (1 - K);
    Y = (Y - K) / (1 - K);

    return [C, M, Y, K];
}

function ImageRGBToCmyk(canvas) {

    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let red, green, blue;
    let cyan, magenta, black;

    for (let i = 0; i < imageData.data.length; i += 4) {
        red = imageData.data[i]; // 
        green = imageData.data[i + 1];  
        blue = imageData.data[i + 2];   

        let cmyk = rgbToCmyk(red, green, blue);
        
        let newRgb = cmykToRgb(cmyk[0], cmyk[1], cmyk[2], cmyk[3]);
        imageData.data[i] = newRgb[0];  
        imageData.data[i + 1] = newRgb[1];
        imageData.data[i + 2] = newRgb[2];
    }

    ctx.putImageData(imageData, 0, 0);
}

function ImageRGBToHSL(canvas) {

    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let red, green, blue;
    let cyan, magenta, black;

    for (let i = 0; i < imageData.data.length; i += 4) {
        red = imageData.data[i]; // 
        green = imageData.data[i + 1];
        blue = imageData.data[i + 2];

        let HSL = rgbToHsl2(red, green, blue);

        let newRgb = hslToRgb2(HSL[0], HSL[1], HSL[2]);
        imageData.data[i] = newRgb[0];
        imageData.data[i + 1] = newRgb[1];
        imageData.data[i + 2] = newRgb[2];
    }

    ctx.putImageData(imageData, 0, 0);
}

function ApplyChangesToImage(canvas, origimageData, deltaYellow, deltaSaturation, deltaLight, deltaH) {

    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let red, green, blue;

    console.log(canvasCoords);

    SelectedArea.x = canvasCoords[parseInt(CurrentCanvasNbr)].Sx;
    SelectedArea.y = canvasCoords[parseInt(CurrentCanvasNbr)].Sy;
    SelectedArea.w = canvasCoords[parseInt(CurrentCanvasNbr)].Ex;
    SelectedArea.h = canvasCoords[parseInt(CurrentCanvasNbr)].Ey;

    if (SelectedArea.x === '' || SelectedArea.y === '' || SelectedArea.h === '' || SelectedArea.w === '' ||
        (SelectedArea.x == 0 && SelectedArea.y == 0 && SelectedArea.h == 0 && SelectedArea.w == 0)) {

        SelectedArea.x = parseInt(0);
        SelectedArea.y = parseInt(0);
        SelectedArea.h = parseInt(canvas.height);
        SelectedArea.w = parseInt(canvas.width);
    }

    for (let i = 0; i < imageData.data.length; i += 4) {

        let currX = (i / 4) % canvas.width;
        let currY = ((i / 4) - currX) / canvas.width;

        if ((parseInt(currX) >= parseInt(SelectedArea.x)) && (currX <= parseInt(SelectedArea.w))
            && (parseInt(currY) >= parseInt(SelectedArea.y)) && (currY <= parseInt(SelectedArea.h))) {
            red = origimageData.data[i];
            green = origimageData.data[i + 1];
            blue = origimageData.data[i + 2];

            let cmyk = rgbToCmyk(red, green, blue);
            let yellow = cmyk[2] * (1 + (deltaYellow / 100));
            if (yellow < 0) {
                yellow = 0;
            }
            if (yellow >= 100)
                yellow = 100;

            let newRgb = cmykToRgb(cmyk[0], cmyk[1], yellow, cmyk[3]);
            imageData.data[i] = newRgb[0];
            imageData.data[i + 1] = newRgb[1];
            imageData.data[i + 2] = newRgb[2];

            red = imageData.data[i];
            green = imageData.data[i + 1];
            blue = imageData.data[i + 2];

            var hsv = RGBtoHSV([red, green, blue]);
            hsv[2] *= 1 + (deltaLight / 100);
            hsv[1] *= 1 + (deltaSaturation / 100);
            //hsv[0] *= 1 + (deltaH / 100);
            let dH = Math.abs((360 * deltaH / 100));
            if (dH > 360)
                hsv[0] += 360 - dH;
            else
                hsv[0] += dH;

            newRgb = HSVtoRGB(hsv);


            imageData.data[i] = newRgb[0];
            imageData.data[i + 1] = newRgb[1];
            imageData.data[i + 2] = newRgb[2];
        }

    }
    ctx.putImageData(imageData, 0, 0);
}



RGBtoHSV = function (color) {
    var r, g, b, h, s, v;
    r = color[0];
    g = color[1];
    b = color[2];
    min = Math.min(r, g, b);
    max = Math.max(r, g, b);


    v = max;
    delta = max - min;
    if (max != 0)
        s = delta / max;        // s
    else {
        // r = g = b = 0        // s = 0, v is undefined
        s = 0;
        h = -1;
        return [h, s, undefined];
    }
    if (r === max)
        h = (g - b) / delta;      // between yellow & magenta
    else if (g === max)
        h = 2 + (b - r) / delta;  // between cyan & yellow
    else
        h = 4 + (r - g) / delta;  // between magenta & cyan
    h *= 60;                // degrees
    if (h < 0)
        h += 360;
    if (isNaN(h))
        h = 0;
    return [h, s, v];
};

HSVtoRGB = function (color) {
    var i;
    var h, s, v, r, g, b;
    h = color[0];
    s = color[1];
    v = color[2];
    if (s === 0) {
        // achromatic (grey)
        r = g = b = v;
        return [r, g, b];
    }
    h /= 60;            // sector 0 to 5
    i = Math.floor(h);
    f = h - i;          // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));
    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        default:        // case 5:
            r = v;
            g = p;
            b = q;
            break;
    }
    return [r, g, b];
}

function changeSaturation(canvas, value, origimageData) {
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let red, green, blue;
    let cyan, magenta, yellow, black;

    for (let i = 0; i < imageData.data.length; i += 4) {
        red = origimageData.data[i];
        green = origimageData.data[i + 1];
        blue = origimageData.data[i + 2];

        var hsv = RGBtoHSV([red, green, blue]);
        hsv[1] *= 1 + (value / 100);
        let newRgb = HSVtoRGB(hsv);

        imageData.data[i] = newRgb[0];  
        imageData.data[i + 1] = newRgb[1];
        imageData.data[i + 2] = newRgb[2];
    }

    ctx.putImageData(imageData, 0, 0);
}

function changeLightness(canvas, value, origimageData) {
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let red, green, blue;
    let cyan, magenta, yellow, black;

    for (let i = 0; i < imageData.data.length; i += 4) {
        red = origimageData.data[i];
        green = origimageData.data[i + 1];
        blue = origimageData.data[i + 2];

        var hsv = RGBtoHSV([red, green, blue]);
        hsv[2] *= 1 + (value / 100);
        let newRgb = HSVtoRGB(hsv);

        imageData.data[i] = newRgb[0];
        imageData.data[i + 1] = newRgb[1];
        imageData.data[i + 2] = newRgb[2];
    }

    ctx.putImageData(imageData, 0, 0);
}
function changeSaturationYellow(canvas, yellowDelta, origimageData) {
    //need CMYK
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let red, green, blue;
    let cyan, magenta, yellow, black;

    for (let i = 0; i < imageData.data.length; i += 4) {
        red = origimageData.data[i];
        green = origimageData.data[i + 1];
        blue = origimageData.data[i + 2];

        let cmyk = rgbToCmyk(red, green, blue);
        yellow = cmyk[2] * (1 + (yellowDelta / 100));
        if (yellow < 0) {
            yellow = 0;
        }
        if (yellow >= 100)
            yellow = 100;

        let newRgb = cmykToRgb(cmyk[0], cmyk[1], yellow, cmyk[3]);
        imageData.data[i] = newRgb[0];  // установка серого цвета
        imageData.data[i + 1] = newRgb[1];
        imageData.data[i + 2] = newRgb[2];
    }

    ctx.putImageData(imageData, 0, 0);
}

function rgbToHsl2(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [h, s, l];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb2(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}