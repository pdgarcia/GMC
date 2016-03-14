function JSONGet(url){
    $.ajaxSetup({ cache:false });
    $.getJSON( url, function( data ) {
    chrome.browserAction.setIcon({path: 'img/icon_green.png' });
    txtstatus=chrome.i18n.getMessage("statusOK");
    bkcolor='green';

    if(data.status > 10){
        chrome.browserAction.setIcon({path: 'img/icon_red.png' });
        txtstatus=chrome.i18n.getMessage("statusNOK");
        bkcolor='#FF9933';
    }
    if(data.status > 50){
        chrome.browserAction.setIcon({path: 'img/icon_red.png' });
        txtstatus=chrome.i18n.getMessage("statusNOK");
        bkcolor='red';
    }

    $( 'div#alertline' )
        .html(chrome.i18n.getMessage("statusLabel") + " " + txtstatus + "<br>" + chrome.i18n.getMessage("dateLabel") + " " + data.lastupdate)
        .css( "background-color", bkcolor ).click(openTab);

    //$('div#tktunasigned').html(chrome.i18n.getMessage("tktunassigned") + " " + data.tktunasigned);
    $('div#newevent').html(chrome.i18n.getMessage("neweventLabel")).click(openNewEvent);

    var items = [];
    $.each( data.alertlist, function( key, val ) {
        items.push( "<div class='alertcategory' id='" + key + "'>" + key);
        $.each( val , function( key, val ) {
            items.push( "<div class='alertitem' id='" + key + "'>" + key + ":" + val + "</div>" );
        });
        items.push(  "</div>" );
    });

    $('div#alerts').append(items.join( "" ));

    $('div.alertcategory').click(function(){ $(this).children().toggle(); })

///////////////////  Events ////////////////////////////////////////////////////

    var items = [];
    $.each( data.events, function( key, val ) {
        items.push( "<div class='eventtitle' id='" + key + "'>" + val.title);
        items.push( "<div class='eventtitem' id='" + key + "'>" + val.timestamp + ":" + val.description + "</div>" );
        items.push(  "</div>" );
    });

    $('div#events').append(items.join( "" ));

    $('div.eventtitle').click(function(){ $(this).children().toggle(); })

///////////////////////////////////////////////////////////////////////////////////////////////

    var items = [];
    $.each( data.spocs, function( key, val ) {
        items.push( "<div class='spoc' id='" + key + "'><small>" + chrome.i18n.getMessage("SPOCDispLabel") + " " + val.Shift + ": </small>" + val.Dispatcher + "</div>" );
    });
    $('div#spocs').append(items.join( "" ));

    var items = [];
    $.each( data.oof, function( key, val ) {
        items.push( "<div class='oof' id='" + key + "'><small>" + chrome.i18n.getMessage("OOFDispLabel") + ": </small>" + val + "</div>" );
    });
    $('div#oof').append(items.join( "" ));

    }).fail(function() {
        console.log( "error conectando" );
        chrome.browserAction.setIcon({path:"img/icon_gray.png"});
        $('body').html("<div class='errormessage'>" + chrome.i18n.getMessage("NoConnectionMessage") + "</div>");
  });
}

function openTab(){
    chrome.storage.sync.get({
        Dashlink: 'http://rkamv1175.kau.roche.com/mstats/'
    }, function(items) {
        chrome.tabs.create({url: items.Dashlink}, function(tab) { });
    });
}

function openNewEvent(){
    chrome.storage.sync.get({
        FormLnk: 'https://docs.google.com/a/roche.com/forms/d/1GpLYKJVn1aarrrPEgTYd2cqZtGxkx1ZjcaDjUFQrrD0/viewform?entry.969630452&entry.1103844286&entry.1925671173&entry.1151152595=Working+on&entry.1829425231=Low'
    }, function(items) {
        chrome.tabs.create({url: items.FormLnk}, function(tab) { });
    });
}

$(function() {
    chrome.storage.sync.get({
        DataLink: 'http://rkamv1175.kau.roche.com/mstats/gadget.html'
    }, function(items) {
        JSONGet(items.DataLink);
    });
});
