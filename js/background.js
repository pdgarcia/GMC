var QueryURL = 'http://rkamv1175.kau.roche.com/mstats/gadget.html' ;

function onAlarm(alarm){
	//console.log('alarm fired',alarm);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", QueryURL, false);
	xmlhttp.send(null);
	if (xmlhttp.status == 200) {
		var data = JSON.parse(xmlhttp.responseText)
		console.log("Status Retrieved:"+data.status);
		if(data.status == 0){
			chrome.browserAction.setIcon({path:"img/icon_green.png"});
		}else{
			chrome.browserAction.setIcon({path:"img/icon_red.png"});
		}
	} else {
		document.body.innerHTML("Failed to load the data !");
		chrome.browserAction.setIcon({path:"img/icon_gray.png"});
	}
}

function onInit() {
	console.log('onInit');
	chrome.alarms.create('GMC_Gadget', {periodInMinutes: 1});
	onAlarm();
}

chrome.runtime.onInstalled.addListener(onInit);
chrome.alarms.onAlarm.addListener(onAlarm);
