/************************************************
	ヤフオクウォッチ ブラウザ拡張
************************************************/
var len = $('.a4').length;
var chlen = $('.ch01').length + $('.ch02').length + $('.ch03').length;
var storage = chrome.storage.local;

chrome.runtime.sendMessage({type: 'NG.csv'},function (response) {
	if (response) {

$(document).ready(function(){
	storage.get(null, function(option) {
		if(option.selected){
			$(option.selected).click();
		}
	});
});
//		storage.set({ngid: response}, function() {});
		for (var i = 0; i < len; i++) {
			if(response.match($('.a4').eq(i).find('a').eq(1).text())){
				$('.a1wrp').eq(i).parent().parent().css('background-color', '#888');
			}
		}


		$('#watch24').on('click', function(){
	$('.watchbutton').removeClass('selected').addClass('no-selected');
	$(this).removeClass('no-selected').addClass('selected');
	
	storage.set({selected: '#watch24'}, function() {});
	storage.get(null, function(option) {
	for (var i = 0; i < len; i++) {
		console.log(response);
		if(!response.match($('.a4').eq(i).find('a').eq(1).text())){
		if ($('.ti').eq(i).text() && $('.bi').eq(i).text() != '－'){
			if ($('.ti').eq(i).text().match(/(時間|分)/)) {
				if(i < len-1){
					if($('.s1').eq(i).find('.unwt').text()){
						$('.s1').eq(i).find('a').trigger('click');
					}
				}else{
					if($('.s2').eq(0).find('.unwt').text()){
						$('.s2').eq(0).find('a').trigger('click');
					}
				}
			}
		}
		}
	}
	});

	if ($('.bi').eq(len-chlen-chlen-1).text() != '－' && ! $('#resultMessage').text().match(/ウォッチリストの登録数が制限/)) {
		$('.next').find('a').click();
	}else{storage.set({selected: ''}, function() {$('.watchbutton').removeClass('selected').addClass('no-selected');alert('「24時間以内」ウォッチリスト登録が完了しました！')});}
});

$('#watch01').on('click', function(){
	$('.watchbutton').removeClass('selected').addClass('no-selected');
	$(this).removeClass('no-selected').addClass('selected');
	
	storage.set({selected: '#watch01'}, function() {});
	storage.get(null, function(option) {
	for (var i = 0; i < len; i++) {
		console.log(response);
		if(!response.match($('.a4').eq(i).find('a').eq(1).text())){
		if ($('.ti').eq(i).text() && $('.bi').eq(i).text() != '－'){
			if ($('.ti').eq(i).text().match(/(時間|分|1日)/)) {
				if(i < len-1){
					if($('.s1').eq(i).find('.unwt').text()){
						$('.s1').eq(i).find('a').trigger('click');
					}
				}else{
					if($('.s2').eq(0).find('.unwt').text()){
						$('.s2').eq(0).find('a').trigger('click');
					}
				}
			}
		}
		}
	}
	});

	if ($('.bi').eq(len-chlen-1).text() != '－' && ! $('#resultMessage').text().match(/ウォッチリストの登録数が制限/)) {
		$('.next').find('a').click();
	}else{storage.set({selected: ''}, function() {$('.watchbutton').removeClass('selected').addClass('no-selected');alert('「～1日」ウォッチリスト登録が完了しました！')});}
});

$('#watch02').on('click', function(){
	$('.watchbutton').removeClass('selected').addClass('no-selected');
	$(this).removeClass('no-selected').addClass('selected');
	
	storage.set({selected: '#watch02'}, function() {});
	storage.get(null, function(option) {
	for (var i = 0; i < len; i++) {
		console.log(response);
		if(!response.match($('.a4').eq(i).find('a').eq(1).text())){
		if ($('.ti').eq(i).text() && $('.bi').eq(i).text() != '－'){
			if ($('.ti').eq(i).text().match(/(時間|分|1日|2日)/)) {
				if(i < len-1){
					if($('.s1').eq(i).find('.unwt').text()){
						$('.s1').eq(i).find('a').trigger('click');
					}
				}else{
					if($('.s2').eq(0).find('.unwt').text()){
						$('.s2').eq(0).find('a').trigger('click');
					}
				}
			}
		}
		}
	}
	});

	if ($('.bi').eq(len-chlen-1).text() != '－' && ! $('#resultMessage').text().match(/ウォッチリストの登録数が制限/)) {
		$('.next').find('a').click();
	}else{storage.set({selected: ''}, function() {$('.watchbutton').removeClass('selected').addClass('no-selected');alert('「～2日」ウォッチリスト登録が完了しました！')});}
});

$('#watch03').on('click', function(){
	$('.watchbutton').removeClass('selected').addClass('no-selected');
	$(this).removeClass('no-selected').addClass('selected');
	
	storage.set({selected: '#watch03'}, function() {});
	storage.get(null, function(option) {
	for (var i = 0; i < len; i++) {
		console.log(response);
		if(!response.match($('.a4').eq(i).find('a').eq(1).text())){
		if ($('.ti').eq(i).text() && $('.bi').eq(i).text() != '－'){
			if ($('.ti').eq(i).text().match(/(時間|分|1日|2日|3日)/)) {
				if(i < len-1){
					if($('.s1').eq(i).find('.unwt').text()){
						$('.s1').eq(i).find('a').trigger('click');
					}
				}else{
					if($('.s2').eq(0).find('.unwt').text()){
						$('.s2').eq(0).find('a').trigger('click');
					}
				}
			}
		}
		}
	}
	});

	if ($('.bi').eq(len-chlen-1).text() != '－' && ! $('#resultMessage').text().match(/ウォッチリストの登録数が制限/)) {
		$('.next').find('a').click();
	}else{storage.set({selected: ''}, function() {$('.watchbutton').removeClass('selected').addClass('no-selected');alert('「～3日」ウォッチリスト登録が完了しました！')});}
});

$('#watch04').on('click', function(){
	$('.watchbutton').removeClass('selected').addClass('no-selected');
	$(this).removeClass('no-selected').addClass('selected');
	
	storage.set({selected: '#watch04'}, function() {});
	storage.get(null, function(option) {
	for (var i = 0; i < len; i++) {
		console.log(response);
		if(!response.match($('.a4').eq(i).find('a').eq(1).text())){
		if ($('.ti').eq(i).text() && $('.bi').eq(i).text() != '－'){
			if ($('.ti').eq(i).text().match(/(時間|分|1日|2日|3日|4日)/)) {
				if(i < len-1){
					if($('.s1').eq(i).find('.unwt').text()){
						$('.s1').eq(i).find('a').trigger('click');
					}
				}else{
					if($('.s2').eq(0).find('.unwt').text()){
						$('.s2').eq(0).find('a').trigger('click');
					}
				}
			}
		}
		}
	}
	});

	if ($('.bi').eq(len-chlen-1).text() != '－' && ! $('#resultMessage').text().match(/ウォッチリストの登録数が制限/)) {
		$('.next').find('a').click();
	}else{storage.set({selected: ''}, function() {$('.watchbutton').removeClass('selected').addClass('no-selected');alert('「～4日」ウォッチリスト登録が完了しました！')});}
});

$('#watch05').on('click', function(){
	$('.watchbutton').removeClass('selected').addClass('no-selected');
	$(this).removeClass('no-selected').addClass('selected');
	
	storage.set({selected: '#watch05'}, function() {});
	storage.get(null, function(option) {
	for (var i = 0; i < len; i++) {
		console.log(response);
		if(!response.match($('.a4').eq(i).find('a').eq(1).text())){
		if ($('.ti').eq(i).text() && $('.bi').eq(i).text() != '－'){
			if ($('.ti').eq(i).text().match(/(時間|分|1日|2日|3日|4日|5日)/)) {
				if(i < len-1){
					if($('.s1').eq(i).find('.unwt').text()){
						$('.s1').eq(i).find('a').trigger('click');
					}
				}else{
					if($('.s2').eq(0).find('.unwt').text()){
						$('.s2').eq(0).find('a').trigger('click');
					}
				}
			}
		}
		}
	}
	});

	if ($('.bi').eq(len-chlen-1).text() != '－' && ! $('#resultMessage').text().match(/ウォッチリストの登録数が制限/)) {
		$('.next').find('a').click();
	}else{storage.set({selected: ''}, function() {$('.watchbutton').removeClass('selected').addClass('no-selected');alert('「～5日」ウォッチリスト登録が完了しました！')});}
});

$('#watch06').on('click', function(){
	$('.watchbutton').removeClass('selected').addClass('no-selected');
	$(this).removeClass('no-selected').addClass('selected');
	
	storage.set({selected: '#watch06'}, function() {});
	storage.get(null, function(option) {
	for (var i = 0; i < len; i++) {
		console.log(response);
		if(!response.match($('.a4').eq(i).find('a').eq(1).text())){
		if ($('.ti').eq(i).text() && $('.bi').eq(i).text() != '－'){
			if ($('.ti').eq(i).text().match(/(時間|分|1日|2日|3日|4日|5日|6日)/)) {
				if(i < len-1){
					if($('.s1').eq(i).find('.unwt').text()){
						$('.s1').eq(i).find('a').trigger('click');
					}
				}else{
					if($('.s2').eq(0).find('.unwt').text()){
						$('.s2').eq(0).find('a').trigger('click');
					}
				}
			}
		}
		}
	}
	});

	if ($('.bi').eq(len-chlen-1).text() != '－' && ! $('#resultMessage').text().match(/ウォッチリストの登録数が制限/)) {
		$('.next').find('a').click();
	}else{storage.set({selected: ''}, function() {$('.watchbutton').removeClass('selected').addClass('no-selected');alert('「～6日」ウォッチリスト登録が完了しました！')});}
});

$('#watch07').on('click', function(){
	$('.watchbutton').removeClass('selected').addClass('no-selected');
	$(this).removeClass('no-selected').addClass('selected');
	
	storage.set({selected: '#watch07'}, function() {});
	storage.get(null, function(option) {
	for (var i = 0; i < len; i++) {
		console.log(response);
		if(!response.match($('.a4').eq(i).find('a').eq(1).text())){
		if ($('.ti').eq(i).text() && $('.bi').eq(i).text() != '－'){
			if ($('.ti').eq(i).text().match(/(時間|分|1日|2日|3日|4日|5日|6日|7日)/)) {
				if(i < len-1){
					if($('.s1').eq(i).find('.unwt').text()){
						$('.s1').eq(i).find('a').trigger('click');
					}
				}else{
					if($('.s2').eq(0).find('.unwt').text()){
						$('.s2').eq(0).find('a').trigger('click');
					}
				}
			}
		}
		}
	}
	});

	if ($('.bi').eq(len-chlen-1).text() != '－' && ! $('#resultMessage').text().match(/ウォッチリストの登録数が制限/)) {

		$('.next').find('a').click();
	}else{storage.set({selected: ''}, function() {$('.watchbutton').removeClass('selected').addClass('no-selected');alert('「～7日」ウォッチリスト登録が完了しました！')});}
});

$('#watch00').on('click', function(){
	storage.set({selected: ''}, function() {});
	$('.watchbutton').removeClass('selected').addClass('no-selected');
	$(this).removeClass('no-selected').addClass('selected');
	location.reload();
});
	}else{
		alert('reseller-ID_List.csvが見つかりませんでした。');
	}
});

if(window.location.href.match(/(auctions.yahoo.co.jp|auctions.search.yahoo.co.jp)/)){
//	ウォッチ追加ボタン追加
var watch_html = '<style>.buttonmenu{padding:5px;z-index:99;background-color:#eee;border-radius:6px;border:1px solid #ccc}'
+ '.watchbutton{text-align:center;display:inline-block;width:90px;margin:3px 9px;border:1px solid #CCC;line-height:26px}'
+ '.watchbutton:hover{cursor:pointer;text-decoration:none}'
+ '.no-selected{color:#333;background-image:linear-gradient(#FEFEFE,#EFEFEF)}.no-selected:before{margin-right:3px;content:"★";color:#F8C824}'
+ '.selected{font-weight:bold;color:#fff;background-image:linear-gradient(#CCCCCC,#DDDDDD)}.selected:before{margin-right:3px;content:"★";color:#aaa}</style>'
+ '<br><div class="buttonmenu">　ウォッチ追加　 '
+ '<a id="watch24" class="watchbutton no-selected">24時間以内</a>'
+ '<a id="watch01" class="watchbutton no-selected">～1日</a>'
+ '<a id="watch02" class="watchbutton no-selected">～2日</a>'
+ '<a id="watch03" class="watchbutton no-selected">～3日</a>'
+ '<a id="watch04" class="watchbutton no-selected">～4日</a>'
+ '<a id="watch05" class="watchbutton no-selected">～5日</a>'
+ '<a id="watch06" class="watchbutton no-selected">～6日</a>'
+ '<a id="watch07" class="watchbutton no-selected">～7日</a>'
+ '<a id="watch00" class="watchbutton no-selected">リセット</a></div>';

$('#nv2').after(watch_html);




/////////////////////////////////////////////////////////


//	自動更新ボタン追加
var reload_html = '<style>.buttonmenu1{padding:5px;z-index:99;background-color:#eee;border-radius:6px;border:1px solid #ccc}'
+ '.reloadbutton{text-align:center;display:inline-block;width:90px;margin:3px 9px;border:1px solid #CCC;line-height:26px}'
+ '.reloadbutton:hover{cursor:pointer;text-decoration:none}'
+ '.rno-selected{color:#333;background-image:linear-gradient(#FEFEFE,#EFEFEF)}'
+ '.rselected{font-weight:bold;color:#fff;background-image:linear-gradient(#CCCCCC,#DDDDDD)}</style>'
+ '<br><div class="buttonmenu">　自動リロード　 '
+ '<a id="reload01" class="reloadbutton rno-selected">1分</a>'
+ '<a id="reload02" class="reloadbutton rno-selected">2分</a>'
+ '<a id="reload03" class="reloadbutton rno-selected">3分</a>'
+ '<a id="reload05" class="reloadbutton rno-selected">5分</a>'
+ '<a id="reload10" class="reloadbutton rno-selected">10分</a>'
+ '<a id="reload15" class="reloadbutton rno-selected">15分</a>'
+ '<a id="reload20" class="reloadbutton rno-selected">20分</a>'
+ '<a id="reload30" class="reloadbutton rno-selected">30分</a>'
+ '<a id="reload00" class="reloadbutton rno-selected">リセット</a></div>';

$('#nv2').after(reload_html);

//	ボタンクリック時の処理

$('#reload01').on('click', function(){
	$('.reloadbutton').removeClass('rselected').addClass('rno-selected');
	$(this).removeClass('rno-selected').addClass('rselected');

	storage.set({rselected: '#reload01'}, function() {});

	$(function(){
		setTimeout(function(){
			storage.set({selected: ''}, function() {
				$('.reloadbutton').removeClass('selected').addClass('no-selected');
				location.reload();
			});
		},60000);
	});

});

$('#reload02').on('click', function(){
	$('.reloadbutton').removeClass('rselected').addClass('rno-selected');
	$(this).removeClass('rno-selected').addClass('rselected');

	storage.set({rselected: '#reload02'}, function() {});

	$(function(){
		setTimeout(function(){
			storage.set({selected: ''}, function() {
				$('.reloadbutton').removeClass('selected').addClass('no-selected');
				location.reload();
			});
		},120000);
	});

});

$('#reload03').on('click', function(){
	$('.reloadbutton').removeClass('rselected').addClass('rno-selected');
	$(this).removeClass('rno-selected').addClass('rselected');

	storage.set({rselected: '#reload03'}, function() {});

	$(function(){
		setTimeout(function(){
			storage.set({selected: ''}, function() {
				$('.reloadbutton').removeClass('selected').addClass('no-selected');
				location.reload();
			});
		},180000);
	});

});

$('#reload05').on('click', function(){
	$('.reloadbutton').removeClass('rselected').addClass('rno-selected');
	$(this).removeClass('rno-selected').addClass('rselected');

	storage.set({rselected: '#reload05'}, function() {});

	$(function(){
		setTimeout(function(){
			storage.set({selected: ''}, function() {
				$('.reloadbutton').removeClass('selected').addClass('no-selected');
				location.reload();
			});
		},300000);
	});

});

$('#reload10').on('click', function(){
	$('.reloadbutton').removeClass('rselected').addClass('rno-selected');
	$(this).removeClass('rno-selected').addClass('rselected');

	storage.set({rselected: '#reload10'}, function() {});

	$(function(){
		setTimeout(function(){
			storage.set({selected: ''}, function() {
				$('.reloadbutton').removeClass('selected').addClass('no-selected');
				location.reload();
			});
		},600000);
	});

});

$('#reload15').on('click', function(){
	$('.reloadbutton').removeClass('rselected').addClass('rno-selected');
	$(this).removeClass('rno-selected').addClass('rselected');

	storage.set({rselected: '#reload15'}, function() {});

	$(function(){
		setTimeout(function(){
			storage.set({selected: ''}, function() {
				$('.reloadbutton').removeClass('selected').addClass('no-selected');
				location.reload();
			});
		},900000);
	});

});

$('#reload20').on('click', function(){
	$('.reloadbutton').removeClass('rselected').addClass('rno-selected');
	$(this).removeClass('rno-selected').addClass('rselected');

	storage.set({rselected: '#reload20'}, function() {});

	$(function(){
		setTimeout(function(){
			storage.set({selected: ''}, function() {
				$('.reloadbutton').removeClass('selected').addClass('no-selected');
				location.reload();
			});
		},1200000);
	});

});

$('#reload30').on('click', function(){
	$('.reloadbutton').removeClass('rselected').addClass('rno-selected');
	$(this).removeClass('rno-selected').addClass('rselected');

	storage.set({rselected: '#reload30'}, function() {});

	$(function(){
		setTimeout(function(){
			storage.set({selected: ''}, function() {
				$('.reloadbutton').removeClass('selected').addClass('no-selected');
				location.reload();
			});
		},1800000);
	});

});

$('#reload00').on('click', function(){
	storage.set({rselected: ''}, function() {});
	$('.reloadbutton').removeClass('rselected').addClass('rno-selected');
	$(this).removeClass('rno-selected').addClass('rselected');
//	location.reload();
});

$(document).ready(function(){
	storage.get(null, function(option) {
		if(option.rselected){
			$(option.rselected).click();
		}
	});
});




}