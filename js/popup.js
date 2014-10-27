var QueryURL = 'http://localhost/gadget.json' ;

function GMCUpdate(){
  xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", QueryURL, false);
  xmlhttp.send(null);
  if (xmlhttp.status == 200) {
    var data = JSON.parse(xmlhttp.responseText)
    console.log(data);
    if(data.status == 0){
      chrome.browserAction.setIcon({path:"img/icon_green.png"});
      txtstatus=chrome.i18n.getMessage("statusOK");
    }else{
      chrome.browserAction.setIcon({path:"img/icon_red.png"});
      txtstatus=chrome.i18n.getMessage("statusNOK");
    }
    var alertline = chrome.i18n.getMessage("statusLabel") + " " + txtstatus + "<br>" + chrome.i18n.getMessage("dateLabel")+ data.lastupdate;
    document.getElementById('alertline').innerHTML = alertline;
    document.getElementById('alerts').innerHTML = data.alerts;
    document.getElementById('firstdispatch').innerText = chrome.i18n.getMessage("FirstDispLabel") + " " + data.firstdispatch;
    document.getElementById('seconddispatch').innerText = chrome.i18n.getMessage("SecondDispLabel") + " " + data.seconddispatch;
  } else {
    document.body.innerHTML("Failed to load the data !");
    chrome.browserAction.setIcon({path:"img/icon_gray.png"});
  }
};

document.addEventListener('DOMContentLoaded', function () {
  GMCUpdate();
});