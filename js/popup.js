function JSONGet(url){
    $.ajaxSetup({ cache:false });
    $.getJSON( url, function( data ) {
    chrome.browserAction.setIcon({path:"img/icon_green.png"});
    txtstatus=chrome.i18n.getMessage("statusOK");
    bkcolor='green';

    if(data.status > 10){
        chrome.browserAction.setIcon({path:"img/icon_red.png"});
        txtstatus=chrome.i18n.getMessage("statusNOK");
        bkcolor='#FF9933';
    }
    if(data.status > 50){
        chrome.browserAction.setIcon({path:"img/icon_red.png"});
        txtstatus=chrome.i18n.getMessage("statusNOK");
        bkcolor='red';
    }

    $( 'div#alertline' )
        .html(chrome.i18n.getMessage("statusLabel") + " " + txtstatus + "<br>" + chrome.i18n.getMessage("dateLabel") + " " + data.lastupdate)
        .css( "background-color", bkcolor ).click(openTab);

    $('div#tktunasigned').html(chrome.i18n.getMessage("tktunassigned") + " " + data.tktunasigned);

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

    var items = [];
    $.each( data.dispatcher, function( key, val ) {
        items.push( "<div class='spoc' id='" + key + "'><small>" + chrome.i18n.getMessage("SPOCDispLabel") + " " + key + ": </small>" + val + "</div>" );
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

$(function() {
    chrome.storage.sync.get({
        DataLink: 'http://rkamv1175.kau.roche.com/mstats/gadget.html'
    }, function(items) {
        JSONGet(items.DataLink);
    });
});
