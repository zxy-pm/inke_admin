javascript: {
    let open_log = true ;
    let target_count = 998;
    let target_name = '101130860';

    function v(msg) {
        if (open_log) console.log(msg);
    }

    if (window.location.href.indexOf('https://h5.inke.cn/app/home/hotlive') > -1) {
        if (document.querySelector('.go-charge')) {
            document.querySelector(".go-charge").click();
        } else {
            let interval = setInterval(() => {
                if (document.querySelector('.go-charge')) {
                    clearInterval(interval);
                    document.querySelector(".go-charge").click();
                }
            }, 50);
        }

    } else if (window.location.href.indexOf('https://pay.busi.inke.cn') > -1) {
        if (window.location.href.indexOf('?cc=') > -1) {
            window.location.href = 'https://pay.busi.inke.cn';
        } else {
            let click_confirm_ok = false;
            v('目标id:' + target_name + " je:" + target_count);
            setInterval(() => {
                if (click_confirm_ok) {
                    v('已经点击确认zf,等待跳转,直接进入下一轮');
                    return false;
                }
                if (isLoading()) {
                    v('加载中,直接进入下一轮');
                    return false;
                }
                if (!isLogin()) {
                    v('没登录,去登录,然后进入下一轮中');
                    my_login();
                    return false;
                }
                v('登录了');
                if (!isNameOk()) {
                    v('用户名与目标用户名不一致');
                    log_out();
                    return false;
                }
                v('目标id与实际登录id一致');
                if (!is_pay_btn_select()) {
                    v('je按钮和zfb按钮没有选');
                    select_pay_btn();
                    return false;
                }
                v('je按钮和zfb按钮已选中');
                click_confirm();
            }, 50);


            function isLoading() {
                return document.querySelector('#d-wrap').style.display != 'none';
            }

            function isLogin() {
                return document.querySelector('.js_recharge_user').className.indexOf('hide') == -1;
            }

            function isNameOk() {
                return document.querySelector('.js_user_id').innerText.trim() == target_name;
            }

            function log_out() {
                document.querySelector('#js-user-change-btn').click();
                console.log('账号不一致,登出');
            }

            function my_login() {
                if (typeof ad_obj != 'undefined') {
                    ad_obj.pre_login();
                }
                setTimeout(() => {
                    $('.js-uid-ipt').val(target_name);
                    $('#js-confirm-login').click();
                    v('登入');
                }, 50);
                if (typeof ad_obj != 'undefined') {
                    ad_obj.after_login();
                }
            }

            function is_pay_btn_select() {
                let je_btn = document.querySelector('.diamond_detail[data-money="' + target_count + '"]');
                let zfb_btn = document.querySelector('[data-channel=alipay_list]');
                return je_btn && zfb_btn && je_btn.className.indexOf('active') > -1 && zfb_btn.className.indexOf('active') > -1;
            }

            function select_pay_btn() {
                let je_btn = document.querySelector('.diamond_detail[data-money="' + target_count + '"]');
                if (je_btn) {
                    je_btn.click();
                    v('已经点击je按钮,应该选中对应je');
                } else {
                    v('当前金额不支持');
                }
                let zfb_btn = document.querySelector('[data-channel=alipay_list]');
                if (zfb_btn) {
                    zfb_btn.click();
                    v('已经点击zfb按钮,应该选中zfb');
                } else {
                    v('当前账号不支持zfb');
                }
            }

            function click_confirm() {
                let confirm_btn = document.querySelector('#js_pay_confirm');
                if (confirm_btn) {
                    confirm_btn.click();
                    v('已经点击zf按钮,应该跳转到zfb');
                    click_confirm_ok = true;
                } else {
                    v('确认zf按钮不存在');
                }
            }
        }
    } else if (window.location.href.indexOf('.alipay.com') > -1 && window.location.href.indexOf('.alipay.com') < 20) {
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

    }
}
