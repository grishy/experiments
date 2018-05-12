// HTML других сайтов
$.ajaxPrefilter(function(options) {
    if (options.crossDomain && jQuery.support.cors) {
        var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
        options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
    }
});


$(window).on("load", function() {
    $(".g-menu ").mCustomScrollbar({
        theme: "inset-2-dark",
        scrollButtons: { enable: true },
        scrollbarPosition: "inside"
    });
    $('.materialboxed').materialbox();

    $('.modal-trigger').leanModal();

    $('#tags').material_chip({
        placeholder: 'Добавить',
        secondaryPlaceholder: 'Теги',
    });


});


var cfg = {
    totalWidth: 0,
    totalHeight: 0,
    margins: {
        top: 15,
        bottom: 40,
        left: 20,
        right: 20
    },
    titleBar: {
        height: 36,
        leftWidth: 120,
        rightWidth: 18,
        offset: 130,
        data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAABIBAMAAACO6JO2AAAAMFBMVEUAAADi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uK7u7u+vr7d3d3R0dHV1dXJycnGxsaIaBZ/AAAACHRSTlMAmVXeBuQD1x8rCiYAAAEKSURBVFjD7ZY9CsJAEIUH8QQWYqnYWFtZ2ngDL+BRFISFiP3GvzqCtfEGWlnrCfQIgoVGjCvMyDQPEZlXfjw+yGYzEyIq1loOlXWpTVnqDplmpuw5bMpEVAE7+0QFh06VOnBnlxpw5yAcJ/BAW3DnkBw+5jSnOc35685onyyvqYhkpjujs79nnkpIZrrz6B9ZSUhkunPkn9nKiDPdecjLMxFxpjujJC/HqYg4U51j/8pJRJypzk0oT0TEmerchfJURJypzksoL0TEmepMQjkWEWeq079FRJx91Yl/dvw7wt8l/J3Hf5v4GYKfdfiZjN8d+B2n7+L4moqIsz/7DzGnOc1pTnOa05yfcwPXnJ+jWkDKqgAAAABJRU5ErkJggg=='
    },
    shadow: {
        color: 'rgba(0, 0, 0, 0.5)',
        blur: 30,
        offsetX: 0,
        offsetY: 15,
        edgeOffset: 3 // shrinks the box generating the shadow so it doesn't show in the rounded the titleBar corners
    }
};

function change(el) {
    // Изменить заголвок
    getTitle(el.value, document.getElementById('title'));

    var image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');

    image.onload = function() {
        var prev = document.getElementById('image');
        document.getElementById('imgload').style.display = "none";
        // Рамки
        drawBorder(image, prev);
    };
    // После изменения начать загрузку
    image.src = 'http://mini.s-shot.ru/1360x800/PNG/1360/Z100/?' + el.value;
    document.getElementById('imgload').style.display = "block";
}

function createHiDPICanvas(cfg) {
    var canvas = document.createElement("canvas");
    var w = cfg.totalWidth + cfg.margins.left + cfg.margins.right;
    var h = cfg.totalHeight + cfg.margins.top + cfg.margins.bottom + cfg.titleBar.height;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    return canvas;
}

function addTitleBar(ctx, titleBarImage, cfg) {
    var leftWidth = cfg.titleBar.leftWidth;
    var rightDx = cfg.margins.left + cfg.totalWidth - cfg.titleBar.rightWidth;
    var offset = cfg.titleBar.offset;

    var middleBar = {
        sx: offset,
        sy: 0,
        sw: 5,
        sh: leftWidth * 2,
        dx: cfg.margins.left + 5,
        dy: cfg.margins.top,
        dw: rightDx - cfg.margins.left,
        dh: leftWidth
    };
    var leftBar = {
        sx: 0,
        sy: 0,
        sw: offset * 2,
        sh: leftWidth * 2,
        dx: cfg.margins.left,
        dy: cfg.margins.top,
        dw: offset,
        dh: leftWidth
    };
    var rightBar = {
        sx: offset,
        sy: 0,
        sw: offset * 2,
        sh: leftWidth * 2,
        dx: rightDx,
        dy: cfg.margins.top,
        dw: offset,
        dh: leftWidth
    };

    addShadow(ctx, cfg);
    drawBar(ctx, titleBarImage, middleBar);
    drawBar(ctx, titleBarImage, leftBar);
    drawBar(ctx, titleBarImage, rightBar);
}

function drawBar(ctx, image, coords) {
    ctx.drawImage(image, coords.sx, coords.sy, coords.sw, coords.sh, coords.dx, coords.dy, coords.dw, coords.dh);
}

function addShadow(ctx, cfg) {
    ctx.save();
    var rect = {
        x: cfg.margins.left + cfg.shadow.edgeOffset,
        y: cfg.margins.top + cfg.shadow.edgeOffset,
        w: cfg.totalWidth - (cfg.shadow.edgeOffset * 2),
        h: cfg.totalHeight + cfg.titleBar.height - cfg.shadow.edgeOffset
    };
    ctx.rect(rect.x, rect.y, rect.w, rect.h);
    ctx.shadowColor = cfg.shadow.color;
    ctx.shadowBlur = cfg.shadow.blur;
    ctx.shadowOffsetX = cfg.shadow.offsetX;
    ctx.shadowOffsetY = cfg.shadow.offsetY;
    ctx.fill();
    ctx.restore();
}

function drawBorder(image, prev) {
    cfg.totalWidth = image.naturalWidth;
    cfg.totalHeight = image.naturalHeight;
    var canvas = createHiDPICanvas(cfg, image);
    var ctx = canvas.getContext('2d');

    var titleBarImage = new Image();
    titleBarImage.onload = function() {
        addTitleBar(ctx, titleBarImage, cfg);
        var coords = {
            x: cfg.margins.left,
            y: cfg.margins.top + cfg.titleBar.height,
            w: cfg.totalWidth,
            h: cfg.totalHeight
        };
        ctx.drawImage(image, coords.x, coords.y, coords.w, coords.h);
        prev.src = scale(canvas, 700);
        prev.style.display = "block";
    };
    titleBarImage.src = cfg.titleBar.data;
}

function getTitle(url, el) {
    el.setAttribute('disabled', '');
    el.setAttribute('placeholder', 'Загрузка');

    $.get(url, function(response) {
        el.removeAttribute('disabled');
        var a = $('<div></div>');
        a.html(response);
        el.className += " valid";
        el.value = $('title', a)[0].innerText;
    }).fail(function() {
        el.removeAttribute('disabled');
        el.className += " invalid";
    });
}
// canvas, width => base64
function scale(cnv, w) {
    var cw = cnv.width;
    var ch = cnv.height;
    var h = ch / cw * w
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    var ctx = canvas.getContext('2d');
    ctx.drawImage(cnv, 0, 0, w, h);
    return canvas.toDataURL("image/png");
}


function editRecord(id) {
    $('#modaladd').openModal();
    $.get('/edit/' + id, function(data) {
        data = JSON.parse(data);

        $("#link").addClass("valid");
        $("#link").val(data[2]);
        $("#title").addClass("valid");
        $("#title").val(data[1]);
        $("#image").attr('src', data[3]);
        $("#image").css("display", "block");
        $("#about").val(data[4]);
        $("#del").css("display", "block");

        //Удалить теги
        $("#tags .chip").remove();
        for (var x = data[5].length; x--;) {
            $("#tags").prepend('<div class="chip">' + data[5][x] + '<i class="material-icons close">close</i></div>');
        }
        // Событие
        $("#del").attr('onClick', 'delRecord(' + id + ')');
        $("#save").attr('onClick', 'changeRecord(' + id + ')');
    });
}

function addRecord() {
    $('#modaladd').openModal();
    $("#link").removeClass("valid");
    $("#link").val("");
    $("#title").removeClass("valid");
    $("#title").val("");
    $("#image").attr('src', "");
    $("#image").css("display", "none");
    $("#about").val("");
    $("#del").css("display", "none");
    $("#tags .chip").remove();

    $("#save").attr('onClick', 'newRecord()');
}

function delRecord(id) {
    $.get('/del/' + id);

    $("#card" + id).animate({
        opacity: 'toggle',
        height: 'toggle'
    }, {
        duration: 400,
        specialEasing: {
            opacity: 'linear',
            height: 'swing'
        }
    }, function() {
        $("#card" + id).remove();
    });
}

function changeRecord(id) {
    var clone = $('#tags .chip').clone();
    var tags = [];
    clone.each(function(i, elem) {
        tags.push(elem.childNodes[0].textContent)
    });

    var data = {
        id: id,
        title: $("#title").val(),
        url: $("#link").val(),
        img: $("#image").attr('src'),
        about: $("#about").val(),
        tags: tags.join(',')
    }
    $.post('/save', data, function() {}, 'json');
    // Edit html view
    $("#card" + id + " .title-card").text(data.title);
    $("#card" + id + " .about-card").text(data.about);
    $("#card" + id + " .link").text(data.url.replace(/.*?:\/\//g, ""));
    $("#card" + id + " .link").attr('href', data.url);
    $("#card" + id + " .card-image a").attr('href', data.url);
    $("#card" + id + " .card-image img").attr('src', data.img);

    $("#card" + id + " .tags .non-style").remove();
}

function newRecord() {
    // body...
}
