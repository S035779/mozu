/************************************************
	ヤフオクウォッチ ブラウザ拡張
************************************************/
var storage = chrome.storage.local;


if(window.location.href.match(/openwatchlist|closedwatchlist/)){
//http://openwatchlist.auctions.yahoo.co.jp/jp/show/mystatus?select=watchlist&watchclosed=0
var query = window.location.search.split('watchclosed=')[1].split('&')[0];
//if(query){query = query.split('&')[0];}

if(window.location.href.match(/mystatus/)){
$(document).ready(function(){
	storage.get(null, function(option) {
		if(option.deleted){
			delwatchall();
		}
	});
});

//	削除ボタン追加
var del_html =  '<style>.buttonmenu{padding:5px;z-index:99;background-color:#eee;border-radius:6px;border:1px solid #ccc}'
+ '.watchbutton{text-align:center;display:inline-block;width:90px;margin:3px 9px;border:1px solid #CCC;line-height:26px}'
+ '.watchbutton:hover{cursor:pointer;text-decoration:none}'
+ '.no-selected{color:#333;background-image:linear-gradient(#FEFEFE,#EFEFEF)}.no-selected:before{margin-right:3px;content:"★";color:#F8C824}'
+ '.selected{font-weight:bold;color:#fff;background-image:linear-gradient(#CCCCCC,#DDDDDD)}.selected:before{margin-right:3px;content:"★";color:#aaa}</style>'
+ '<input type="button" id="delwatch" value="すべて削除"> '
+ '<input type="button" id="delwatchstop" value="ストップ"> '

$('[value="一覧から選択して削除"]').before(del_html);


//	ボタンクリック時の処理
$('#delwatch').on('click', function(){
storage.set({deleted: 1}, function() {});
//alert($('[name="aidlist"]').length);
	delwatchall();
});

$('#delwatchstop').on('click', function(){
storage.set({deleted: ''}, function() {});
//alert($('[name="aidlist"]').length);
	$('[value="解除"]').click();
});


}



if(window.location.href.match(/ucomplete/)){

$(document).ready(function(){
	storage.get(null, function(option) {
		if(option.deleted){
			window.location.href = 'http://auctions.yahoo.co.jp/jp/show/mystatus?select=watchlist&s1=end&watchclosed=' + query;
		}
	});
});

}
}



/////////////////////////////////////////
function delwatchall(){
	var len = $('[name="aidlist"]').length;
	if (len > 0){
		$('[value="選択"]').click();
		$('[value="一覧から選択して削除"]').click();
		
	}else{
		storage.set({deleted: ''}, function() {});
	}
}