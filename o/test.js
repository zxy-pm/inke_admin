{
    let times = 0;
    let intervel = setInterval(() => {
        if ($('.J-success').css('display') == 'block' && typeof ad_obj != 'undefined') {
            ad_obj.noti(1);
            times++;
            if (times == 3) {
                clearInterval(intervel);
            }
        }
    }, 50);
    let times_bz = 0;
    let intervel_bz = setInterval(() => {
        let s= $('.am-dialog-text').text();
        if (s&&s.indexOf('余额不足')) {
            ad_obj.noti(-1);
            times_bz++;
            if (times_bz == 2) {
                clearInterval(intervel_bz);
            }
        }
    }, 50);
}

