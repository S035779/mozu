$( function() {
  if(!localStorage['numOfId']){ localStorage['numOfId'] = 0; }
  
   //ID設定の表示を変更
   var settingHtml = "";
   var idId;
   var passwordId;
   var buttonId;
   var loopNum = parseInt(localStorage['numOfId']) + 1;
   for(var i=1;i<=loopNum;i++){
       idId = "id" + i;
       passwordId = "pass" + i;
       buttonId = "button" + i;
       settingHtml += '    <form class="form-inline">';
       settingHtml += '       <input type="text" class="form-control" placeholder="ID" id="' + idId + '">';
       settingHtml += '       <input type="password" class="form-control" placeholder="Password" id="' + passwordId + '">';
       settingHtml += '       <button type="submit" class="btn btn-primary" id="' + buttonId + '">追加</button>';
       settingHtml += '    </form>';
   }
   $('#id_setting').html(settingHtml);
   
   var loopNum = parseInt(localStorage['numOfId']);
   for(var i=1;i<=loopNum;i++){
       idId = "id" + i;
       passwordId = "pass" + i;
       buttonId = "button" + i;
               
       //バニューを設定
       var undefined;
  
       //このブロック内では確実にundefinedはundefined値が入っている
       if (localStorage[idId] !== undefined) {
           $("#"+idId).val(localStorage[idId]);
           $("#"+buttonId).html('<i class="icon-edit"></i> 変更');
       }
       if (localStorage[passwordId] !== undefined) {
           $("#"+passwordId).val(localStorage[passwordId]);
       }
   }
  
   //表示形式
   var value = localStorage["link_target"];
   if(value){
     $('#link_target').val(value);
   }
   else{
     $('#link_target').val("link_target_top");
       localStorage["link_target"] = $( '#link_target' ).val();
   }
   //表示形式が変更された時の処理を設定
   $( '#link_target' ).change(function(){
     localStorage["link_target"] = $( '#link_target' ).val();
   });

   //保存ボタンが押された時の処理
   $(".btn").click(function(){
       var settingHtml = "";
       var idId;
       var localStorageId;
       var localStoragePass;
       var passwordId;
       var buttonId;
       var loopNum = parseInt(localStorage['numOfId']) + 1;
       var numOfId = 0;
       for(var i=1;i<=loopNum;i++){
           idId = "id" + i;
           passwordId = "pass" + i;
           
           if($('#'+idId).val() != ""){
               numOfId++;
               localStorageId = "id" + numOfId;
               localStorage[localStorageId] = $('#'+idId).val();
               localStoragePass = "pass" + numOfId;
               localStorage[localStoragePass] = $('#'+passwordId).val();
           }
       }
       localStorage['numOfId'] = numOfId;
   } );
  } );
