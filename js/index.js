document.addEventListener('DOMContentLoaded', function() {

    window.waiting = function() {
        var mask = document.getElementById('mask');
        mask.style.display = 'block';
        var wrap = document.getElementById('content');
        var oLoading = document.createElement("div");
        oLoading.id = "loading";
        oLoading.innerHTML = '<img src="images/loading.gif" width="100%">';
        wrap.appendChild(oLoading);

    }

    window.removeWaiting =function() {
        var wrap = document.getElementById('content');
        var oLoading = document.getElementById('loading');
        mask.style.display = 'none';
        wrap.removeChild(oLoading);
    }

    waiting();
    // ios下免责声明
    (function() {
        var ios = document.getElementById('ios-note');
        if (visitedFrom() == 0) {
            ios.style.display = 'block';
        }
    })();

    //判断是不是第一次玩、
    (function() {
        var urljson = url2json();
        var url = 'http://api.16wifi.com/activity/turntable.php?dopost=GetTime&callback=checkTimes';
        $.getJSON(url, {
            phone: urljson.phone,
            city: urljson.city,
            fromid: visitedFrom()

        }, "checkTimes", function(data) {
            checkTimes();
        });
    })();

    // 如果是第一次，如果不是
    window.checkTimes = function(data) {

            removeWaiting();
            var choujiang = document.getElementById('dengluchou');
          if(isLogin()){
            
             isFirstTime(data)?choujiang.innerHTML = '免费<br>抽奖' : choujiang.innerHTML = '抽奖<br>20豆/次';   
            }
            
            var oPointer = document.getElementById('lotteryBtn');
            oPointer.onclick = function() {
               
                // 1.判断是不是客户端，如果是客户端可以玩如果不是提示下载客户端
                if (!isClient()) {
                    // 2.判断是否登陆
					
                    if (isLogin()) {
                        // 3.判断是不是第一次玩耍
                        if (isFirstTime(data)) {
                            var times =0;

                            play(data,times);



                        } else {
                            if(data.Money> 30){
                                var times =1;
                                play(data,times);
                            }else{
                                notEnough();
                            }
                            
                            
                        }
                    } else {
                        loginWin();
                    };

                } else {
                    downloadWin();
                };
            };

        }
        // 游戏主体开始
    function play(data,times) {
        waiting();
        var urljson = url2json();
        var oPointer = document.getElementById('lotteryBtn');
        // http://api.16wifi.com/activity/turntable.php?dopost=AddErnieV2
        // ?callback=
		//
        var url = 'http://api.16wifi.com/activity/turntable.php?dopost=AddErnieV2&callback=gameresult';
        //var url = 'http://api.16wifi.com/activity/test.php?dopost=AddErnieV2&callback=gameresult';
        $.getJSON(url, {
            phone: urljson.phone,
            times:times,
            city: urljson.city,
            fromid: visitedFrom()

        }, "gameresult", function(data) {
        
             gameresult(data);
        });
        prizecontent.classList.add('auto-rotate');
        oPointer.style.transition = "";
        oPointer.style.webkitTransform = "";
    }




    // 检查是不是第一次抽奖
    function isFirstTime(data) {
            return data.ReturnCode == 200 ? true : false;
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
        // 判断是否登陆
// 判断是否登陆
	function isLogin() {
		var urlPare = window.location.search;
		var urljson = url2json();
		// var urlPare = '?phone=13811966025&city=1101';
		if(urlPare.match('islogin')){
			return urljson.islogin == 1?true:false;
		}else{
			return urlPare.match('phone') !== null&&!urlPare.match('phone=&') ? true : false;
		}
		//return urlPare.match('phone') !== null&&!urlPare.match('phone=&') ? true : false;
	}
        //金币不足提示
    window.notEnough = function() {
        var mask = document.getElementById('mask');

        mask.style.display = 'block';


        var wrap = document.getElementById('content');
        var oMs = document.createElement("div");
        oMs.id = 'msg-box';
        oMs.classList.add('msg-box');
        oMs.classList.add('msg-box-confirm');
        oMs.innerHTML = '<div class="msg-header"><span class="msg-title">16WiFi提醒您</span><span class="btn btn-close" id="close"><i class="icon icon-close"></i></span></div>' +

            '<div class="content">' +
            ' <div class="msg">您的彩豆余额不足，请先赚取。</div>' +
            '</div>' +

            ' </div>';
        wrap.appendChild(oMs);
        var close = document.getElementById('close');
        close.onclick = function() {
            mask.style.display = 'none';
            this.parentNode.parentNode.parentNode.removeChild(oMs);
        };
    }
    window.status400 = function() {
            var mask = document.getElementById('mask');

            mask.style.display = 'block';


            var wrap = document.getElementById('content');
            var oMs = document.createElement("div");
            oMs.id = 'msg-box';
            oMs.classList.add('msg-box');
            oMs.classList.add('msg-box-confirm');
            oMs.innerHTML = '<div class="msg-header"><span class="msg-title">16WiFi提醒您</span><span class="btn btn-close" id="close"><i class="icon icon-close"></i></span></div>' +

                '<div class="content">' +
                ' <div class="msg">网络异常，抽奖失败。</div>' +
                '</div>' +
                '<div class="footer">' +

                ' <div class="btn-group">' +           
                ' </div>' +
                ' </div>';
            wrap.appendChild(oMs);
            var close = document.getElementById('close');
            close.onclick = function() {
                mask.style.display = 'none';
                this.parentNode.parentNode.parentNode.removeChild(oMs);
            };
        }
            window.status501 = function() {
            var mask = document.getElementById('mask');

            mask.style.display = 'block';


            var wrap = document.getElementById('content');
            var oMs = document.createElement("div");
            oMs.id = 'msg-box';
            oMs.classList.add('msg-box');
            oMs.classList.add('msg-box-confirm');
            oMs.innerHTML = '<div class="msg-header"><span class="msg-title">16WiFi提醒您</span><span class="btn btn-close" id="close"><i class="icon icon-close"></i></span></div>' +

                '<div class="content">' +
                ' <div class="msg">抽奖失败</div>' +
                '</div>' +
                '<div class="footer">' +

                ' <div class="btn-group">' +
                ' </div>' +
                ' </div>';
            wrap.appendChild(oMs);
            var close = document.getElementById('close');
            close.onclick = function() {
                mask.style.display = 'none';
                this.parentNode.parentNode.parentNode.removeChild(oMs);
            };
        }
        //数据返回结果处理函数
    window.gameresult = function(data) {


            console.log(data);
        var timer = setTimeout(function() {
            showRotate(data);
            clearTimeout(timer);
        }, 1000);
    }
    window.rotateAward = function(data) {
        var choujiang = document.getElementById('dengluchou');
        isFirstTime(data)?choujiang.innerHTML = '免费<br>抽奖' : choujiang.innerHTML = '抽奖<br>20豆/次';
        var prizecontent = document.getElementById('prizecontent');
      
        switch (data) {
            case '1':

                prizecontent.style.webkitTransform = 'rotate(210deg)';
                prizecontent.style.transform = 'rotate(210deg)';
                break;
            case '2':

                prizecontent.style.webkitTransform = 'rotate(90deg)';
                prizecontent.style.transform = 'rotate(90deg)';
                break;

            case '3':
                prizecontent.style.webkitTransform = 'rotate(330deg)';
                prizecontent.style.transform = 'rotate(330deg)';
                break;
            case '4':
                prizecontent.style.webkitTransform = 'rotate(30deg)';
                prizecontent.style.transform = 'rotate(30deg)';
                break;
            case '5':
                prizecontent.style.webkitTransform = 'rotate(270deg)';
                prizecontent.style.transform = 'rotate(270deg)';
                break;
            case '6':

                prizecontent.style.webkitTransform = 'rotate(150deg)';
                prizecontent.style.transform = 'rotate(150deg)';
                break;
            default:

                prizecontent.style.webkitTransform = 'rotate(0deg)';
                prizecontent.style.transform = 'rotate(0deg)';
        }
    }

}, false);





/*------------------------------------------工具函数--------------------------------------------------------------*/
// 跨域函数
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

// 转盘指针函数
window.showRotate = function(data) {
        removeWaiting();
        var oPointer = document.getElementById('lotteryBtn');
        var prizecontent = document.getElementById('prizecontent');
        prizecontent.classList.remove('auto-rotate');
        //200  成功 500 余额不足 //400摇奖失败 501 增加彩豆失败
     
        if (data.ReturnCode == 200) {
            rotateAward(data.Level);
            //判断中奖类型
            if (data.Type == 0) {
                awardWin(data);
                // presentWin(data);
            } else if (data.Type == 1) {
                presentWin(data);
            }
        } else if (data.ReturnCode == 400) {
            status400();

        } else if (data.ReturnCode == 401) {
            status400();
        } else if (data.ReturnCode == 500) {

            notEnough();

        } else if (data.ReturnCode == 501) {
            status501();
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
window.awardWin = function(data) {
    var mask = document.getElementById('mask');

    mask.style.display = 'block';
    var wrap = document.getElementById('content');
    var oAward = document.createElement("div");
    oAward.id = 'successsWindow';
    oAward.classList.add('successsWindow');
    oAward.innerHTML = '<h2 class="successsWindowTitle"><img src="images/xxx2.png" id="close">16WiFi提醒您：</h2>' +

        '<div class="successsWindowContent"><img src="images/' + data.pid + '.jpg" width="100%">' +
        '<p><a>详细中奖信息请在“彩豆详情”内查看！</a>' +
        '</p>' +
        '<p style="text-align:center;margin-top:15px;"><a class="winBtn" href="detail.html">立即查看</a>' +
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
window.presentWin = function(data) {
    var mask = document.getElementById('mask');

    mask.style.display = 'block';
    var wrap = document.getElementById('content');
    var oAward = document.createElement("div");
    oAward.id = 'successsWindow';
    oAward.classList.add('successsWindow');
    oAward.innerHTML = '<h2 class="successsWindowTitle"><img src="images/xxx2.png" id="close">16WiFi提醒您：</h2>' +

        '<div class="successsWindowContent"><img src="images/' + data.pid + '.jpg" width="100%">' +
        checkVerify(data) +
        '</p>' +
        '<p style="text-align:center;margin-top:15px;"><a class="winBtn" href="'+fuckLink(data.pid)+'">立即查看</a>' +
        '</p>' +
        '</div>';
    wrap.appendChild(oAward);
    var close = document.getElementById('close');
    close.onclick = function() {
        mask.style.display = 'none';
        this.parentNode.parentNode.parentNode.removeChild(oAward);
    };
}

window.checkVerify = function(data) {


        if (data.Prize) {

            return '<p><a>优惠码：<span style="color:red">' + data.Prize + '</span></a>';
        } else {
            return '<p><a><span style="color:red">请在客户端“兑换中心”查看详细使用规则。</span></a>'
        }
    }
    window.fuckLink = function(data){

        if(data==4){
            return 'intropro4.html';
        }else if(data ==5){
            return 'intropro5.html';
        }else if(data ==6){
            return 'intropro6.html';
        }else if(data == 7){
			return 'intropro7.html';
        }else if(data == 8){
			return 'intropro8.html';
        }else if(data == 9){
			return 'intropro9.html';
        }else if(data == 10){
			return 'intropro10.html';
		}

    }
    //客户端下载提示
window.downloadWin = function() {
    var mask = document.getElementById('mask');

    mask.style.display = 'block';


    var wrap = document.getElementById('content');
    var oMs = document.createElement("div");
    oMs.id = 'msg-box';
    oMs.classList.add('msg-box');
    oMs.classList.add('msg-box-confirm');
    oMs.innerHTML = '<div class="msg-header"><span class="msg-title">16WiFi提醒您</span><span class="btn btn-close" id="close"><i class="icon icon-close"></i></span></div>' +

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

//登陆提示
window.loginWin = function() {
    var mask = document.getElementById('mask');

    mask.style.display = 'block';
    var wrap = document.getElementById('content');
    var oMs = document.createElement("div");
    oMs.id = 'msg-box';
    oMs.classList.add('msg-box');
    oMs.classList.add('msg-box-confirm');
    oMs.innerHTML = '<div class="msg-header"><span class="msg-title">16WiFi提醒您</span><span class="btn btn-close" id="close"><i class="icon icon-close"></i></span></div>' +

        '<div class="content">' +
        ' <div class="msg">本活动仅限注册用户参加！如已注册，请登录。</div>' +
        '</div>' +
        '<div class="footer">' +

        ' <div class="btn-group">' +

        '<a class="btn btn-ok" href="/thirdinfo/diaocha/userlogin">登陆</a>' +
        ' </div>' +
        ' </div>';
    wrap.appendChild(oMs);
    var close = document.getElementById('close');
    close.onclick = function() {
        mask.style.display = 'none';
        this.parentNode.parentNode.parentNode.removeChild(oMs);
    };
}
