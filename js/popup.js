var QueryURL = 'http://localhost/gadget.json' ;

function openTab(){
  chrome.tabs.create({url : 'http://localhost/gadget.json'}, function(tab) { });
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
    var alertline = chrome.i18n.getMessage("statusLabel") + " " + txtstatus + "<br>" + chrome.i18n.getMessage("dateLabel")+ data.lastupdate;
    var alertlineobj = document.getElementById('alertline')
    alertlineobj.innerHTML = alertline;
    alertlineobj.style.backgroundColor=bkcolor;
    alertlineobj.addEventListener("click", openTab);
    document.getElementById('alerts').innerHTML = data.alerts;
    document.getElementById('firstdispatch').innerText = chrome.i18n.getMessage("FirstDispLabel") + " " + data.firstdispatch;
    document.getElementById('seconddispatch').innerText = chrome.i18n.getMessage("SecondDispLabel") + " " + data.seconddispatch;
}

function GMCUpdate(){
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", QueryURL, false);
  xmlhttp.send(null);
  if (xmlhttp.status == 200) {
    var data = JSON.parse(xmlhttp.responseText)
    console.log("Status Retrieved:"+data.status);
    processData(data);
  } else {
    document.body.innerHTML("Failed to load the data !");
    chrome.browserAction.setIcon({path:"img/icon_gray.png"});
  }
};

document.addEventListener('DOMContentLoaded', function () {
  GMCUpdate();
});