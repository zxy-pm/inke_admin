javascript:{
    let open_log = false;
    let target_count = ${money};
    let target_name = '${name}';

    function v(msg) {
        if (open_log) console.log(msg);
    }

    let cur_url = window.location.href;
    if (cur_url.indexOf('https://www.immomo.com') > -1 && cur_url.indexOf('https://www.immomo.com/pay') == -1) {
        setTimeout(() => {
            $('.right-text').click();
        }, 2000);
    } else if (cur_url.indexOf('https://www.immomo.com/pay') > -1) {
        setTimeout(() => {
            let is_confirm_click = false;
            let is_yzm_tc = false;
            v('目标id:' + target_name + " je:" + target_count);
            let interval_id = setInterval(() => {
                if (!is_input()) {
                    my_input();
                    return false;
                }
                if (!is_nick_ok()) {
                    v('昵称没有加载');
                    return false;
                }
                if (!is_confirm_click) {
                    v('点击确认zf按钮');
                    $('.pay-btn').click();
                    is_confirm_click = true;
                    return false;
                }
                if (is_yzm_show() && !is_yzm_tc) {
                    v('验证码弹出');
                    show_web(true);
                    is_yzm_tc = true;
                    return false;
                } else {
                    show_web(false);
                }
                if (is_confirm_box_show()) {
                    v('第二次确认框弹出');
                    $('.confirm-btn-right').click();
                    clearInterval(interval_id);
                }
            }, 50);

            function is_input() {
                return $('#other-number').val() != '';
            }

            function is_nick_ok() {
                return $('.other-name').text() != '';
            }

            function is_yzm_show() {
                return $('.g-captcha-full-wrapper').css('display') != 'none';
            }

            function is_confirm_box_show() {
                return $('#confirmPop').css('display') == 'block';
            }

            function my_input() {
                $('#other-number').val(target_name);
                $('#other-number').trigger('input');
                $('.user-defined-btn').click();
                let spans = $('.tap-cell-des span');
                for (let i = 0; i < spans.length; i++) {
                    let span = spans[i];
                    if (span.innerText == target_count) {
                        span.click();
                        return false;
                    }
                }
            }

            function show_web(show) {
                v('显示web' + show);
                if (show) {
                    $('.g-captcha-full-wrapper').css('background', 'rgba(255,255,255,1)');
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

    }
}


