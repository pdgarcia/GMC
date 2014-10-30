
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

function openTab(){
  chrome.storage.sync.get({
    Dashlink: 'http://rkamv1175.kau.roche.com/mstats/'
  }, function(items) {
    chrome.tabs.create({url: items.Dashlink}, function(tab) { });
  });
}

function processData(data){
    if(data.status == 0){
      chrome.browserAction.setIcon({path:"img/icon_green.png"});
      txtstatus=chrome.i18n.getMessage("statusOK");
      bkcolor='green';
    }else{
      chrome.browserAction.setIcon({path:"img/icon_red.png"});
      txtstatus=chrome.i18n.getMessage("statusNOK");
      bkcolor='red';
    }
    var alertlineobj = document.getElementById('alertline')
    alertlineobj.innerHTML = chrome.i18n.getMessage("statusLabel") + " " + txtstatus + "<br>" + chrome.i18n.getMessage("dateLabel")+ data.lastupdate;
    alertlineobj.style.backgroundColor=bkcolor;
    alertlineobj.addEventListener("click", openTab);
    document.getElementById('tktunasigned').innerText = chrome.i18n.getMessage("tktunassigned") + " " + data.tktunasigned;
    console.log(data);
    alertlist=data.alertlist;
    for (var cat in alertlist) {
        console.log(cat);
        var category = document.createElement('div');
        category.setAttribute("class","alertcategory");
        category.innerText = cat;
        document.getElementById('alerts').appendChild(category);
        for (var i in cat) {
            console.log(i.name);
            var element = document.createElement('div');
            element.setAttribute("class","alertitem");
            element.innerText = i.name;
            category.appendChild(element);
        }
    }
    for (val of data.dispatcher) {
        var element = document.createElement('div');
        element.setAttribute("class","dispatcher");
        element.innerText = chrome.i18n.getMessage("DispatcherDispLabel") + " " +val;
        document.getElementById('dispatchers').appendChild(element);
    }
    for (val of data.oof) {
        var element = document.createElement('div');
        element.setAttribute("class","oof");
        element.innerText = chrome.i18n.getMessage("OOFDispLabel") + " " + val;
        document.getElementById('oof').appendChild(element);
    }
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get({
    DataLink: 'http://rkamv1175.kau.roche.com/mstats/gadget.html'
  }, function(items) {
    ajaxJSONGet(items.DataLink+'?q=GMC', processData);
  });
});
