
function LauchNotification(){
    var opt = {
        type: 'basic',
        title: 'GMC',
        message: chrome.i18n.getMessage("NotificationMessage"),
        priority: 2,
        iconUrl:'img/icon128.png'
    };
    chrome.notifications.create('notify1', opt, function(id) { });
}

function ajaxJSONGet(url, callback){
    var http_request = new XMLHttpRequest();
    http_request.open("GET", url, true);
    http_request.onreadystatechange = function () {
        var done = 4;
        var ok = 200;
        if (http_request.readyState === done && http_request.status === ok){
            callback(JSON.parse(http_request.responseText));
        } else {
            chrome.browserAction.setIcon({path:"img/icon_gray.png"});
        }
    };
    http_request.send();
}

function processData(data){
    console.log("Status Retrieved:"+data.status);
    if(data.status == 0){
        chrome.browserAction.setIcon({path:"img/icon_green.png"});
        localStorage['PreviousStatus']=0;
    }else{
        if( localStorage['PreviousStatus'] == 0 ){ LauchNotification() }
        chrome.browserAction.setIcon({path:"img/icon_red.png"});
        localStorage['PreviousStatus']=1;
    }
}

function onAlarm(alarm){
    chrome.storage.sync.get({
        DataLink: 'http://rkamv1175.kau.roche.com/mstats/gadget.html'
    }, function(items) {
        ajaxJSONGet(items.DataLink+'?q=GMC', processData);
    });
}

function onInit() {
    console.log('onInit');
    chrome.alarms.create('GMC_Gadget', {periodInMinutes: 0.5});
    onAlarm();
}

localStorage['PreviousStatus'] = 0;

chrome.runtime.onInstalled.addListener(onInit);
chrome.alarms.onAlarm.addListener(onAlarm);
