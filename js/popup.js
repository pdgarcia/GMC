var QueryURL = 'http://rkamv1175.kau.roche.com/mstats/gadget.html' ;
var LinkURL  = 'http://rkamv1175.kau.roche.com/mstats/' ;

function openTab(){
  chrome.tabs.create({url : LinkURL}, function(tab) { });
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
    document.getElementById('tktunasigned').innerText = chrome.i18n.getMessage("tktunasigned") + " " + data.tktunasigned;
    document.getElementById('alerts').innerHTML = data.alerts;
    for (val of data.dispatcher) {
        console.log(val);
        var element = document.createElement('div');
        //element.id = "someID";
        element.setAttribute("class","dispatcher");
        element.innerText = chrome.i18n.getMessage("DispatcherDispLabel") + " " +val;
        document.getElementById('dispatchers').appendChild(element);
    }
    for (val of data.oof) {
        console.log(val);
        var element = document.createElement('div');
        //element.id = "someID";
        element.setAttribute("class","oof");
        element.innerText = chrome.i18n.getMessage("OOFDispLabel") + " " + val;
        document.getElementById('oof').appendChild(element);
    }
    //document.getElementById('firstdispatch').innerText = chrome.i18n.getMessage("FirstDispLabel") + " " + data.firstdispatch;
    //document.getElementById('seconddispatch').innerText = chrome.i18n.getMessage("SecondDispLabel") + " " + data.seconddispatch;
}

function GMCUpdate(){
  xmlhttp = new XMLHttpRequest();
  console.log(QueryURL);
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
  /*chrome.storage.sync.get({
    Dashlink: 'http://rkamv1175.kau.roche.com/mstats/',
    GadLink: 'http://rkamv1175.kau.roche.com/mstats/gadget.html'
  }, function(items) {
    LinkURL  =  items.Dashlink;
    QueryURL =  items.GadLink;
  });*/
  GMCUpdate();
});