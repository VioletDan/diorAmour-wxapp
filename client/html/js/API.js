var API = {
    DOMAIN: "https://fendi.beats-digital.com/waystorome/Api/",               //正式
    DEBUG: true,

    _send: function(method, data, success){
        //有自己的openid并且data里面不带openid才赋值
        // if (API.OpenID && !data.hasOwnProperty('OpenID'))data.OpenID = API.OpenID;

        $.ajax({
            url: API.DOMAIN + "BeatsFendiAPI.ashx?method=" + method,
            type:"POST",
            data: data,
            dataType: 'json',
            //async: true,
            success: function(res) {
                if (API.DEBUG){
                    console.log(method + "——success");
                    console.log(res);
                }
                
                if(res && res.errcode != 0){
                    if (success) success(res);
                }else{
                    if (success) success(res);
                }
                
            },
            error: function(res) {
                if (API.DEBUG) {
                    console.log(method + "——fail");
                    console.log(res);
                }
                
                if (success) success(null);
            }
        });

    },


    /**
     * @params String backurl 回调URL 需要URL编码 不传默认index.html页面
     * @params Function success 回调函数 如果回调为null说明服务器报错了或者errcod非0
     */
    Login: function(backurl, success){
        API._send('Login', { backurl: backurl }, success);
    },

   

}
