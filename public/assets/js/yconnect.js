const AppID = 'dj00aiZpPTBoc0JrMFFVN2U5ViZzPWNvbnN1bWVyc2VjcmV0Jng9MTU-'

var makeRandStr = function(length) {
  var chars =
'abcdefghijklmnopqrstuvwxyzABCDEFGHIJLKMNOPQRSTUVWXYZ0123456789';
  var str = '';
  for (var i = 0; i < length; ++i) {
    str += chars[ Math.floor( Math.random() * 62 ) ];
  }
  return str;
}

window.yconnectInit = function() {
  YAHOO.JP.yconnect.Authorization.init({
    button: {
      format: "image",
      type: "a",
      textType:"a",
      width: 196,
      height: 38,
      className: "yconnectLogin"
    },
    authorization: {
      clientId: AppID,
      redirectUri: "http://localhost:8080/app",
      scope: "openid",
      windowWidth: "500",
      windowHeight: "400",
      responseType: "token",
      state: makeRandStr(8),
      //nonce: makeRandStr(8)
    },
    onSuccess: function(res) {
    },
    onError: function(res) {
    },
    onCancel: function(res) {
    }
  });
};

(function(){
  var fs = document.getElementsByTagName("script")[0];
  var s  = document.createElement("script");
  s.setAttribute("src", "https://s.yimg.jp/images/login/yconnect/auth/2.0.1/auth-min.js");
  fs.parentNode.insertBefore(s, fs);
})();
