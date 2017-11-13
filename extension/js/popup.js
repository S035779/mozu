$(function(){

  if(!localStorage['numOfId'] || localStorage['numOfId'] == 0){
    $("#warn").show();
    $("#content").hide();
  } else {
    $("#warn").hide();
    $("#content").show();
    var html = "";
    var idId;
    var passwordId;
    var buttonId;
    var loopNum = parseInt(localStorage['numOfId']);
    for(var i=1;i<=loopNum;i++){
        idId = "id" + i;
        passwordId = "pass" + i;
        buttonId = "button" + i;
        
        html += '<tr><td>';
        html += '   <form class="form-inline" style="margin-bottom: 0px;">';
        html += '     <p class="account-name">' + localStorage[idId] + '</p>';
        html += '     <input type="hidden" id="' + idId + '">';
        html += '     <input type="hidden" id="' + passwordId + '">';
        html += '     <button type="submit" class="btn btn-primary" id="' + buttonId + '"><i class="icon-ok"></i> ログイン</button>';
        html += '   </form>';
        html += '</td></tr>';
    }
    $('tbody').html(html);    
    
    for(var i=1;i<=loopNum;i++){
        idId = "id" + i;
        passwordId = "pass" + i;
                
        //バニューを設定
        var undefined;

        //このブロック内では確実にundefinedはundefined値が入っている
        if (localStorage[idId] !== undefined) {
            $("#"+idId).val(localStorage[idId]);
        }
        if (localStorage[passwordId] !== undefined) {
            $("#"+passwordId).val(localStorage[passwordId]);
        }
    }
  }
 
   //ボタンが押された場合
   $('.input-password').keyup(function(ev) {
     if ((ev.which && ev.which === 13) || (ev.keyCode && ev.keyCode === 13)) {
           $(".btn").click();
     } else {
     }
   });
 $(".btn").click(function(){
       
       var hrefStr = "http://auctions.yahoo.co.jp/jp/";
       var botton_id = $(this).attr("id");
       var id_id = botton_id.replace("button", "id");
       localStorage["login_id"] = $("#"+id_id).val();
       var password_id = botton_id.replace("button", "pass");
       localStorage["login_pass"] = $("#"+password_id).val();

       if(localStorage["link_target"] == "link_target_top"){
         //現在のタブで開く時は、タブ操作が必要になる
           chrome.tabs.getSelected(function (tab) {
                chrome.tabs.update(tab.id, {url: hrefStr});
            window.close(); 
           });
             return false;
       }
       else{
               
               //新しいタブを作成する
           chrome.tabs.create({url: hrefStr});
               
         window.close(); 
             return false;
       }
   });
});
