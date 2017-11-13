$(function(){
  if((location.href).search("auctions.yahoo.co.jp/jp/") > 0){
      //自動ログインが意図されているか確認する
      chrome.extension.sendRequest({method: "getLocalStorage", key: "login_id"}, function(response) {
                     
          if(response.data != ""){
              location.href="http://login.yahoo.co.jp/config/login?.lg=jp&.intl=jp&logout=1&.src=auc&.done=http://auctions.yahoo.co.jp/";
          }
      });
      
  }
  else if(location.href == "http://login.yahoo.co.jp/config/login?.lg=jp&.intl=jp&logout=1&.src=auc&.done=http://auctions.yahoo.co.jp/&extension"
          || location.href == "http://login.yahoo.co.jp/config/login?.lg=jp&.intl=jp&logout=1&.src=auc&.done=http://auctions.yahoo.co.jp/&extension"
          || (location.href).search("logout") > 0 && (location.href).search("login.yahoo.co.jp/config/login") > 0 ){
  
      //自動ログインが意図されているか確認する
      chrome.extension.sendRequest({method: "getLocalStorage", key: "login_id"}, function(response) {
          if(response.data != ""){
              //location.href="http://urd.yahoo.co.jp/reg/logout_logbackin/auc/*https://login.yahoo.co.jp/config/login?.src=auc&.pd=&.v=4&.done=http%3A//auctions.yahoo.co.jp/&extension";
              location.href = $('#anotherID a').attr('href');
              //console.log($('#anotherID a').attr('href'));
          }
      });
  }
  else if(location.href == "https://login.yahoo.co.jp/config/login?.src=auc&.pd=&.v=4&.done=http%3A//auctions.yahoo.co.jp/"
          || (location.href).search("login.yahoo.co.jp/config/login") > 0){
      
    chrome.extension.sendRequest({method: "getLocalStorage", key: "login_id"}, function(response) {
      if(response.data != "" && !!$("#username")){
        $("#username").val(response.data);
        $("#btnNext").click();
      }

      chrome.extension.sendRequest({method: "getLocalStorage", key: "login_pass"}, function(response) {
        if(response.data != ""){
          $("#passwd").val(response.data);
          if($("#username").val() != "" && $("#username").val() != undefined){
              chrome.extension.sendRequest({method: "clearLocalStorage", key: "login_id"})
              setTimeout(function(){
                  $('#btnSubmit').click();
              }, 500);
          }
        }
      });
    });
  }
  else if(location.href == "http://auctions.yahoo.co.jp/"){
     // 自動ログインが意図されているか確認する
     chrome.extension.sendRequest({method: "getLocalStorage", key: "login_id"}, function(response) {
                    
      if(response.data != ""){
          chrome.extension.sendRequest({method: "clearLocalStorage", key: "login_id"});
      }
     });
  }
});
