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
    // 数据组织
function orgHtml(data) {

    var wrap = document.getElementById('coinlist');
    var oList = document.createElement("div");


    if (data.ReturnCode == 200) {

        //判断中奖类型


        var str = ''
        for (var attr in data.data) {
            var awardCover = data.data[attr].type == 0 ? 'coin' : 'quan';
            console.log(data.data[attr].time);

            if (data.data[attr].type == 0) {
                str += '<li>' +
                    '<a href="#">' +
                    '   <img src="images/' + awardCover + '.jpg">' +
                    '  <div id="awardCont">' +
                    '<h2 class="title">' + data.data[attr].Prize + '彩豆</h2>' + '<p class="desc">恭喜您在幸运大抽奖中抽得奖品！<br><time id="time">' + data.data[attr].time + '</time></p>' +
                    '  </div>' +
                    '  </a>' +
                    ' </li>';
            } else {
                str += '<li>' +
                    proContent(data.data[attr]) +
                    ' </li>';
            }

        }
        oList.innerHTML = str;
        wrap.appendChild(oList);

    } else if (data.ReturnCode == 400) {

    } else if (data.ReturnCode == 401) {

    } else if (data.ReturnCode == 500) {

    } else if (data.ReturnCode == 501) {

    }


}

function proContent(data) {
    var awardCover = data.type == 0 ? 'coin' : 'quan';

    if (data.pid == 4) {
        return '<a href="intropro4.html"><img src="images/' + awardCover + '.jpg"><div id="awardCont"><h2 class="title">鲜农乐蔬菜礼盒35元代金券</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">' + data.Prize + '</p>' + '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p></div></a>';
    } else if (data.pid == 5) {
        return '<a href="intropro5.html"><img src="images/' + awardCover + '.jpg"><div id="awardCont"><h2 class="title">鲜农乐木瓜50元券</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">' + data.Prize + '</p>' + '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p></div></a>';

        // return '<h2 class="title">老百姓大药房20元优惠券</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">'+data.Prize+'</p>'+ '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p>';
    } else if (data.pid == 6) {
        return '<a href="intropro6.html"><img src="images/' + awardCover + '.jpg"><div id="awardCont"><h2 class="title">知我药妆100代金券</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">' + data.Prize + '</p>' + '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p></div></a>';

        // return '<h2 class="title">知我药妆100代金券</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">'+data.Prize+'</p>'+ '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p>';
    }else if (data.pid == 7) {
        return '<a href="intropro7.html"><img src="images/' + awardCover + '.jpg"><div id="awardCont"><h2 class="title">老百姓大药房20元优惠券</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">' + data.Prize + '</p>' + '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p></div></a>';

        // return '<h2 class="title">知我药妆100代金券</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">'+data.Prize+'</p>'+ '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p>';
    }else if (data.pid == 8) {
        return '<a href="intropro8.html"><img src="images/' + awardCover + '.jpg"><div id="awardCont"><h2 class="title">酒仙网20元直减劵</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">' + data.Prize + '</p>' + '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p></div></a>';

        // return '<h2 class="title">知我药妆100代金券</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">'+data.Prize+'</p>'+ '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p>';
    }else if (data.pid == 9) {
        return '<a href="intropro9.html"><img src="images/' + awardCover + '.jpg"><div id="awardCont"><h2 class="title">惠家有20元全场立减券</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">' + data.Prize + '</p>' + '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p></div></a>';

        // return '<h2 class="title">知我药妆100代金券</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">'+data.Prize+'</p>'+ '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p>';
    }else if (data.pid == 10) {
        return '<a href="intropro10.html"><img src="images/' + awardCover + '.jpg"><div id="awardCont"><h2 class="title">懒人与海鳕鱼25元立减券</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">' + data.Prize + '</p>' + '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p></div></a>';

        // return '<h2 class="title">知我药妆100代金券</h2><p class="desc"><span style="font-size:12px;float:left;">优惠码:</span><time id="time">'+data.Prize+'</p>'+ '<p class="desc">点击查看使用详情。<time id="time">' + data.time + '</time></p>';
    }

}

document.addEventListener('DOMContentLoaded', function() {
    // ios下免责声明

    if (!isClient()) {
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
            var url = 'http://api.16wifi.com/activity/turntable.php?dopost=GetListV2&callback=orgHtml';
            $.getJSON(url, {
                phone: urljson.phone,
                city: urljson.city,
                fromid: visitedFrom()

            }, "orgHtml", function(data) {
                orgHtml(data);
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
