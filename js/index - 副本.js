var $ = {
    getJSON: function(url, params, callbackFuncName, callback) {
        var paramsUrl = "",
            jsonp = this.getQueryString(url)[callbackFuncName];
        for (var key in params) {
            paramsUrl += "&" + key + "=" + encodeURIComponent(params[key]);
        }
        url += paramsUrl;
        window[jsonp] = function(data) {
            window[jsonp] = undefined;
            try {
                delete window[jsonp];
            } catch (e) {}
            if (head) {
                head.removeChild(script);
            }
            callback(data);
        };
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.charset = "UTF-8";
        script.src = url;
        head.appendChild(script);
        return true;
    },
    getQueryString: function(url) {
        var result = {},
            queryString = (url && url.indexOf("?") != -1 && url.split("?")[1]) || location.search.substring(1),
            re = /([^&=]+)=([^&]*)/g,
            m;
        while (m = re.exec(queryString)) {
            result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return result;
    }
};
//数据返回结果处理函数
function gameresult(data) {

        var timer = setTimeout(function() {
            showRotate(data);
            clearTimeout(timer);
        }, 1000);
    }
    // 转盘指针函数
function showRotate(data) {
        console.log(data.Level);
        var oPointer = document.getElementById('lotteryBtn');
        var prizecontent = document.getElementById('prizecontent');
        prizecontent.classList.remove('auto-rotate');
        //200  成功 500 余额不足 //400摇奖失败 501 增加金币失败
        console.log('旋转角度' + (((data.Level - 1) * 30) + 30));
        if (data.ReturnCode == 200) {
            prizecontent.style.webkitTransform = 'rotate(' + (((data.Level - 1) * 30) + 30) + 'deg)';
            //判断中奖类型
            if (data.Type == 0) {
                awardWin(data);
            } else if (data.Type == 1) {
                presentWin(data);
            }
        } else if (data.ReturnCode == 400) {

        } else if (data.ReturnCode == 401) {

        } else if (data.ReturnCode == 500) {

        } else if (data.ReturnCode == 501) {

        }
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

//成功弹窗
function awardWin(data) {
    var mask = document.getElementById('mask');

    mask.style.display = 'block';
    var wrap = document.getElementById('content');
    var oAward = document.createElement("div");
    oAward.id = 'successsWindow';
    oAward.classList.add('successsWindow');
    oAward.innerHTML = '<h2 class="successsWindowTitle"><img src="images/xxx2.png" id="close">16 WiFi提醒您：</h2>' +

        '<div class="successsWindowContent"><img src="images/' + data.Level + '.jpg" width="100%">' +
        '<p><a>详细中奖信息请在“金币详情”内查看！</a>' +
        '</p>' +
        '<p style="text-align:center;margin-top:15px;"><a class="winBtn" href="detail.html?phone=13811966025&city=0000">立即查看</a>' +
        '</p>' +
        '</div>';
    wrap.appendChild(oAward);
    var close = document.getElementById('close');
    close.onclick = function() {
        mask.style.display = 'none';
        this.parentNode.parentNode.parentNode.removeChild(oAward);
    };
}

//有邀请码的弹窗
function presentWin(data) {
        var mask = document.getElementById('mask');

        mask.style.display = 'block';
        var wrap = document.getElementById('content');
        var oAward = document.createElement("div");
        oAward.id = 'successsWindow';
        oAward.classList.add('successsWindow');
        oAward.innerHTML = '<h2 class="successsWindowTitle"><img src="images/xxx2.png" id="close">16 WiFi提醒您：</h2>' +

            '<div class="successsWindowContent"><img src="images/' + data.Level + '.jpg" width="100%">' +
            '<p><a>邀请码：<br><span style="color:red">' + data.Prize + '</span></a>' +
            '</p>' +
            '<p style="text-align:center;margin-top:15px;"><a class="winBtn" href="detail.html?phone=13811966025&city=0000">立即查看</a>' +
            '</p>' +
            '</div>';
        wrap.appendChild(oAward);
        var close = document.getElementById('close');
        close.onclick = function() {
            mask.style.display = 'none';
            this.parentNode.parentNode.parentNode.removeChild(oAward);
        };
    }
    // 判断是不是第一次
function checkTimes(data) {

    console.log(data);

    // 如果是第一次play

    if (data.ReturnCode == 200) {

         play();

    } else {

    }
}
    //游戏主体函数
    function play() {

            var urljson = url2json();

            var url = 'http://api.16wifi.com/activity/turntable.php?dopost=AddErnieV2&callback=gameresult';
            $.getJSON(url, {
                phone: urljson.phone,
                city: urljson.city,
                fromid: visitedFrom()

            }, "gameresult", function(data) {
                gameresult(data);
            });
            prizecontent.classList.add('auto-rotate');
            oPointer.style.transition = "";
            oPointer.style.webkitTransform = "";
        }
document.addEventListener('DOMContentLoaded', function() {
    // ios下免责声明
    (function() {
        var ios = document.getElementById('ios-note');
        if (visitedFrom() == 0) {
            ios.style.display = 'block';
        }
    })();
    var oPointer = document.getElementById('lotteryBtn');
    oPointer.onclick = function() {
        // 1.判断是不是客户端，如果是客户端可以玩如果不是提示下载客户端
        if (!isClient()) {
            // 2.判断是否登陆
            if (isLogin()) {
                // 判断是不是首次抽奖，如果是低于30金币也可以，如果不是提示金币不足

                isFirst();


            } else {
                loginWin();
            };

        } else {
            downloadWin();

        };
    };

    function isFirst() {
        var urljson = url2json();
        var url = 'http://api.16wifi.com/activity/turntable.php?dopost=GetTime&callback=checkTimes';
        $.getJSON(url, {
            phone: urljson.phone,
            city: urljson.city,
            fromid: visitedFrom()

        }, "checkTimes", function(data) {

            checkTimes(data);

        });

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


}, false);
