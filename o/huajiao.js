{
    let open_log = true;
    let target_count = 998;
    let target_name = '194050346';

    function v(msg) {
        if (open_log) console.log(msg);
    }

    if (window.location.href.indexOf('https://h.huajiao.com/static/recharge/home2.html') > -1) {

        let click_confirm_ok = false;
        v('目标id:' + target_name + " je:" + target_count);
        setInterval(() => {
            if (click_confirm_ok) {
                v('已经点击确认zf,等待跳转,直接进入下一轮');
                return false;
            }
            if (!is_in_put()) {
                my_input();
            }
            if (!isLogin()) {
                v('没登录,等待下一轮检查');
                return false;
            }
            v('je按钮和zfb按钮已选中');
            click_confirm();
        }, 50);


        function isLogin() {
            let value = document.querySelector('.user-nickname').innerText;
            return value!=undefined && value != "" && value != '查询中...' && value != '不存在此花椒号';
        }


        function is_in_put() {
            let uid_ok = document.querySelector('.user-uid').value != "";
            let amount_ok = document.querySelector('.hasInput').getAttribute('price') != '0';
            return uid_ok && amount_ok;
        }

        function my_input() {
            document.querySelector('.user-uid').value = target_name;
            $('.user-uid').trigger('input');
            document.querySelector('.hasInput').click();
            document.querySelector('.hasInput').setAttribute('price', target_count);
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
            let confirm_btn = document.querySelector('.alipay');
            if (confirm_btn) {
                confirm_btn.click();
                v('已经点击zf按钮,应该跳转到zfb');
                setTimeout(() => {
                    let box_btn = document.querySelector('#rechargeConfirm');
                    if (box_btn) {
                        box_btn.click();
                        v('已经点击弹出框的确认按钮');
                        click_confirm_ok = true;
                    } else {
                        v('弹出框的确认按钮不存在');
                    }
                }, 50);

            } else {
                v('确认zf按钮不存在');
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