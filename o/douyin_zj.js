javascript:{
    let open_log = true;
    let target_count = ${money};
    let target_name = '${name}';

    function v(msg) {
        if (open_log) console.log(msg);
    }

    function ad(fun) {
        if (typeof ad_obj != 'undefined') {
            fun();
        }
    }

    function input_e(selector) {
        var a = document.createEvent("MouseEvents");
        a.initEvent("input", true, true);
        document.querySelector(selector).dispatchEvent(a);
    }

    let cur_url = window.location.href;
    if (cur_url.indexOf('https://www.douyin.com/pay') > -1) {
        setTimeout(() => {
            let is_confirm_click = false;
            let is_input_je = false;
            v('目标id:' + target_name + " je:" + target_count);
            let interval_id = setInterval(() => {
                if (!is_login()) {
                    v('等待登录中');
                    return false;
                }
                if (!is_input_je) {
                    input_je();
                    is_input_je = true;
                    return false;
                }

                if (is_need_confirm()) {
                    v('点击确认zf按钮');
                    document.querySelector('.check-content .footer-btn .right').click();
                    is_confirm_click = true;
                    return false;
                }

            }, 50);

            function is_login() {
                return document.querySelector('.nickname-container p') != null&&"（自己）" == document.querySelector('.nickname-container p').innerText;
            }


            function is_tr() {
                return "（他人）" == document.querySelector('.nickname-container p').innerText;
            }

            function qh_tr() {
                document.querySelector('.exchange-btn-container .btn').click();
                setTimeout(() => {
                    document.querySelector('input[placeholder="请输入抖音号或绑定的手机号"]').value = target_name;
                    input_e('input[placeholder="请输入抖音号或绑定的手机号"]');
                    setTimeout(()=>{
                        document.querySelector('.btn-container .douyin').click();
                    },100);
                }, 50);
            }

            function input_je() {
                document.querySelector('.custom-btn').click();
                setTimeout(() => {
                    document.querySelector('input[placeholder="最低6元，最高200,000元"]').value = target_count;
                    input_e('input[placeholder="最低6元，最高200,000元"]');
                    setTimeout(() => {
                        document.querySelector('.custom-recharge .footer-btn .right').click();
                    }, 100);
                }, 50);
            }

            function is_need_confirm() {
                return !is_confirm_click && document.querySelector('.check-content .footer-btn .right') != null
            }

            function show_web(show) {
                v('显示web' + show);
                if (show) {
                    document.querySelector('.g-captcha-full-wrapper').css('background', 'rgba(255,255,255,1)');
                }
                if (typeof ad_obj != 'undefined') {
                    ad_obj.show_web(show);
                }
            }
        }, 2500);

    } else if (cur_url.indexOf('mclient.alipay.com') > -1 && cur_url.indexOf('mclient.alipay.com') < 20) {
        let interval_id = setInterval(() => {
            if (document.body.innerText.indexOf('本次交易可能存在风险') > -1) {
                v('zfb风险提示');
                if (typeof ad_obj != 'undefined') {
                    ad_obj.fx_repay(-2);
                }
                clearInterval(interval_id);
                v('定时器关闭');
            }
        }, 50);

    } else if (cur_url.indexOf('https://tp-pay.snssdk.com/cashdesk') > -1) {
        setTimeout(()=>{
            document.querySelector('.btn-wrap .y-button-round').click();
        },2000);
    }
}