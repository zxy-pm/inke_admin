{
    console.log('页面加载结束');
    setInterval(() => {
        if (document.querySelector('.v2020v2-header')) {
            console.log('更新高度');
            ad_obj.update_height(document.querySelector('.v2020v2-header').offsetTop, document.querySelector('.v2020v2-header').offsetHeight);
        }
    }, 50);

    let interval = setInterval(() => {
        if (document.querySelector('.J-startapp')) {
            clearInterval(interval);
            setTimeout(() => {
                console.log('到达跳转页面');
                document.querySelector('.J-startapp').click();
                setTimeout(() => {
                    document.querySelector(".J-h5Pay,.J-h5pay").click();
                }, 150);
            }, 100);
        }
    }, 100);

}