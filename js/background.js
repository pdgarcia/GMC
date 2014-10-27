var QueryURL = 'http://localhost/gadget.json' ;

function onAlarm(alarm){
	console.log('alarm fired',alarm);
	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", QueryURL, false);
	xmlhttp.send(null);
	if (xmlhttp.status == 200) {
		var data = JSON.parse(xmlhttp.responseText)
		console.log(data);
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
	chrome.alarms.onAlarm.addListener(onAlarm);
}

chrome.runtime.onInstalled.addListener(onInit);
