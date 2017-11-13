
chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		resrest(request.type,  sendResponse);
	}
);

function resrest(type, callback) {
	var resturl = chrome.extension.getURL('csv/' + type);
	var restres;

	$.ajax({
		url: resturl,
		async: false,
		success: function(data) {restres = data;},
		error: function(data) {restres = '';alert('サーバー接続ができませんでした。');}
	});
	callback(restres);
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.method == "getLocalStorage"){
		sendResponse({data: localStorage[request.key]});
	}    
	else if (request.method == "clearLocalStorage"){
		localStorage[request.key] = "";
	}
	else{
		sendResponse({});
	}
});
