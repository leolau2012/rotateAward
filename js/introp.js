document.addEventListener('DOMContentLoaded', function() {

    if (isClient()) {
        // 2.判断是否登陆.
        if (isLogin()) {
            play();
        } else {

            loginWin();
        };

    } else {
        downloadWin();

    };

    //游戏主体函数
    function play() {
            var urljson = url2json();
            var oImg = document.getElementById('cover');
             alert(window.location.href);
    // ios下免责声明
            oImg.src = "images/" + urljson.datalevel + ".jpg";
            var oInfo = document.getElementById('dataleveal' + urljson.datalevel);
            // console.log(urljson.datalevel);
            oInfo.style.display = "block";
        }
        // 判断是不是客户端
    function isClient() {
        var isClient = false;
        var ua = navigator.userAgent.toLowerCase();
        if ((ua.indexOf('ewifibrowser')) != -1) {

            isClient = true;

        }

        return isClient;
    }



    //客户端下载提示
    function downloadWin() {
        var mask = document.getElementById('mask');
        mask.style.display = 'block';
        var wrap = document.getElementById('content');
        var oMs = document.createElement("div");
        oMs.id = 'msg-box';
        oMs.classList.add('msg-box');
        oMs.classList.add('msg-box-confirm');
        oMs.innerHTML = '<div class="msg-header"><span class="msg-title">16 WiFi提醒您</span><span class="btn btn-close" id="close"><i class="icon icon-close"></i></span></div>' +

            '<div class="content">' +
            ' <div class="msg">本活动仅限客户端环境下参加！</div>' +
            '</div>' +
            '<div class="footer">' +

            ' <div class="btn-group">' +

            '<a class="btn btn-ok" href="http://m.16wifi.com/thirdinfo/share/index.html">下载客户端</a>' +
            ' </div>' +
            ' </div>';
        wrap.appendChild(oMs);
        var close = document.getElementById('close');
        close.onclick = function() {
            mask.style.display = 'none';
            this.parentNode.parentNode.parentNode.removeChild(oMs);
        };
    }

    // 没有登录提示

    //客户端下载提示
    function loginWin() {
            var mask = document.getElementById('mask');

            mask.style.display = 'block';
            var wrap = document.getElementById('content');
            var oMs = document.createElement("div");
            oMs.id = 'msg-box';
            oMs.classList.add('msg-box');
            oMs.classList.add('msg-box-confirm');
            oMs.innerHTML = '<div class="msg-header"><span class="msg-title">16 WiFi提醒您</span><span class="btn btn-close" id="close"><i class="icon icon-close"></i></span></div>' +

                '<div class="content">' +
                ' <div class="msg">本活动仅限注册用户参加！如已注册，请登录。</div>' +
                '</div>' +
                '<div class="footer">' +

                ' <div class="btn-group">' +

                '<a class="btn btn-ok" href="/thirdinfo/diaocha/userlogin">注册</a>' +
                ' </div>' +
                ' </div>';
            wrap.appendChild(oMs);
            var close = document.getElementById('close');
            close.onclick = function() {
                mask.style.display = 'none';
                this.parentNode.parentNode.parentNode.removeChild(oMs);
            };
        }
        // 判断是否登陆
    function isLogin() {
            var urlPare = window.location.search;
            // var urlPare = '?phone=13811966025&city=1101';
            return urlPare.match('phone') !== null ? true : false;
        }
        // url->json
    function url2json() {

        var result = {},
            queryString = location.search.substring(1),
            re = /([^&=]+)=([^&]*)/g,
            m;
        while (m = re.exec(queryString)) {
            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return result;
    }

    //来源
    function visitedFrom() {
        var source;
        var pattern = new RegExp(/iPad|iPod|iPhone/i);
        var iosUserAgent = pattern.test(navigator.userAgent);
        if (iosUserAgent) {
            source = 0;
        } else if (navigator.userAgent.match(/Android/i)) {
            source = 1;
        } else {

            source = 2;

        }
        return source;
    }

}, false);
