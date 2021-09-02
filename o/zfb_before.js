{
    function fx_repay(i) {
        if (typeof ad_obj != "undefined") ad_obj.fx_repay(i);
    }

    if (typeof $ != "undefined") {
        if (document.querySelector('.v2020v2-header__price') && ad_obj) {
            ad_obj.show_money_box(true);
        } else {
            ad_obj.show_money_box(false);
        }

        let text_dialog_str = $(".J-failure .J-text").text();
        if (text_dialog_str != null && text_dialog_str.indexOf("余额不足") > -1 && typeof ad_obj != "undefined") {
            $(".J-failure .J-text").text("服务器繁忙,支付失败");
            $(".am-dialog-text").text("服务器繁忙,请返回重试!");
            $(".am-dialog-button a:eq(0)").hide();
            $(".am-dialog-button a:eq(1)").hide();
            $(".am-dialog-button").append("<a href='javascript:void(0);' onclick='fx_repay(-1)'>返回重试</a>");
        }
        if ($(".J-success .J-text")) {
            $(".J-success .J-text").text("支付失败,请重试");
            $(".v2020v2-needPayQuery.am-header-operate").text("返回重试");
            $(".J-success .J-text").css("color", "red");
            $(".v2020v2-needPayQuery.am-header-operate").css("color", "red");
            $(".v2020v2-needPayQuery.am-header-operate").attr('href', 'javascript:void(0);');
            $(".v2020v2-needPayQuery.am-header-operate").attr('onclick', 'fx_repay(1);');
            if(ad_obj){ad_obj.noti(1);}
        }
    }
}