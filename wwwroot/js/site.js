// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function SaveFromCanvas(downloadBtn, canvas) {
    console.log(canvas);
    var img = canvas.toDataURL("image/png");
    downloadBtn.href = img;
}

function GetTips(content) {
    let tipsDiv = document.createElement('div');
    let row = document.createElement('div');
    let col1 = document.createElement('div');
    let col2 = document.createElement('div');
    let closeIcon = document.createElement('span');
    let closeBtn = document.createElement('button');

    tipsDiv.classList.add('tipbox');
    row.classList.add('row');
    row.style.padding = 'unset';
    row.style.margin = 'unset';
    col1.classList.add('col-11');
    col2.classList.add('col-1');

    closeIcon.setAttribute("class", "iconify tipbox_close_icon");
    
    closeIcon.setAttribute("data-inline", "false");
    closeIcon.setAttribute("data-icon", "mdi-light:plus-circle");
    closeBtn.className = 'tipbox_close_btn';
    closeBtn.clientHeight = closeBtn.clientWidth;
    closeBtn.onclick = function () { tipsDiv.remove(); }
    //closeDive.onclick += function () { tipsDiv.remove(); }
    closeBtn.appendChild(closeIcon);

    

    col2.appendChild(closeBtn);
    col2.style.padding = "0";
    tipsDiv.appendChild(row);
    row.appendChild(col1);
    row.appendChild(col2);

    col1.appendChild(document.createElement("br"));
    let div = document.createElement("span");
    div.innerHTML = content;
    col1.appendChild(div);
    //col1.innerHTML = content;

    document.getElementsByTagName("body")[0].appendChild(tipsDiv);
}

