//数据返回结果处理函数
function result(data) {
        console.log(data);
        var timer = setTimeout(function() {
            showRotate(data);
            clearTimeout(timer);
        }, 1000);
    }
    // 转盘指针函数
function showRotate(data) {
        var oPointer = document.getElementById('lotteryBtn');
        oPointer.classList.remove('auto-rotate');
        var awardLevel = 1;
        switch (awardLevel) {
            case 1:
                oPointer.style.webkitTransform = "rotate(1020deg)";
                break;
            case 2:
                // 执行代码块 2
                break;
            default:

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
document.addEventListener('DOMContentLoaded', function() {
    var oPointer = document.getElementById('lotteryBtn');
    oPointer.onclick = function() {
        // 1.判断是不是客户端，如果是客户端可以玩如果不是提示下载客户端
        if (!isClient()) {
            // 2.判断是否登陆
            if (isLogin()) {
                play();
            } else{
                alert('没登陆');
            };

        } else {
            downloadWin();

        };
    };

    //游戏主体函数
    function play() {
            var oScript = document.createElement('script');
            oScript.src = 'http://api.16wifi.com/activity/turntable.php?dopost=AddErnieV2&phone=15801650827&fromid=2&callback=result';
            document.body.appendChild(oScript);
            oPointer.classList.add('auto-rotate');
            oPointer.style.transition = "";
            oPointer.style.webkitTransform = "";
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
        alert(1);
    }
    // 判断是否登陆
        function isLogin() {
            var urlPare = window.location.search;
            // var urlPare = '?phone=13811966025&city=1101';
            return urlPare.match('phone') !== null ? true : false;
        }
}, false);
