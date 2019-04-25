export default {
    getUrl(s) {
        var redirect_urls = encodeURIComponent("http://lawyertest.niuer.cn" + s);
        var urls = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf61bf443f28e7e29&redirect_uri=" + redirect_urls + "&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect";
        return urls;
    }
    , getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
     isweixin() {
        const ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        } else {
            return false;
        }
    },
}