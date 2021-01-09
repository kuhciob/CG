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
    let div = document.createElement("div");
    console.log(content);
    

    div.innerHTML = content.trim();
    col1.appendChild(div);
    //col1.innerHTML = content;

    document.getElementsByTagName("body")[0].appendChild(tipsDiv);
}

function GetVideoTips(content) {
    let tipsDiv = document.createElement('div');
    let row = document.createElement('div');
    let col1 = document.createElement('div');
    let col2 = document.createElement('div');
    let closeIcon = document.createElement('span');
    let closeBtn = document.createElement('button');

    tipsDiv.classList.add('video_tipbox');
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
    let iframe = document.createElement("iframe");
    let div = document.createElement("div");
    div.innerHTML = "<iframe  width=\"1080px\" height=\"720px\" src=\" " + content + "\" frameborder =\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
    iframe.src = content;
    iframe.frameborder = 0;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe;
    col1.appendChild(div);
    //col1.innerHTML = content;

    document.getElementsByTagName("body")[0].appendChild(tipsDiv);
}
function GetAffinTips() {
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
    let div = document.createElement("div");



    div.innerHTML = "<div>\
    Афінне перетворення(лат.affinis, «пов'язаний з») — відображення <img src=\"https://wikimedia.org/api/rest_v1/media/math/render/svg/6140d51b228f9fcba26dda5db65f7a403ac3868b\">, яке можна записати у вигляді:\
        <img src = \"https://wikimedia.org/api/rest_v1/media/math/render/svg/137c2e2d49bfa8cb74205f4b9bc32d07ebc88486\" >\
        Властивості афінних перетворень:\
        <ul>\
            <li> n-вимірний об’єкт відображається в n-вимірний, точка – в точку, лінія – в лінію, поверхня – в поверхню</li>\
            <li> зберігається паралельність ліній і площин</li>\
            <li>зберігаються пропорції паралельних об’єктів (довжин відрізків на паралельних прямих і площ на паралельних площинах)</li>\
        </ul>\
        <hr />\
Афінні перетворення трьох видів є основою для рухомих зображень:\
        <ul>\
            <li> переміщення/зсув</li>\
            <li> масштабування</li>\
            <li>поворот на кут</li>\
        </ul>\
</div> ";
    col1.appendChild(div);
    //col1.innerHTML = content;

    document.getElementsByTagName("body")[0].appendChild(tipsDiv);
}