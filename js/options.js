// Saves options to chrome.storage
function save_options() {
    var Dashlink = document.getElementById('Dashlink').value;
    var DataLink = document.getElementById('DataLink').value;
    var FormLnk = document.getElementById('FormLnk').value;
    var NotConf  = document.getElementById('NotConf').checked;
    chrome.storage.sync.set({
        Dashlink: Dashlink,
        DataLink: DataLink,
        FormLnk: FormLnk,
        NotConf : NotConf
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        Dashlink: 'http://rkamv1175.kau.roche.com/mstats/',
        DataLink: 'http://rkamv1175.kau.roche.com/mstats/gadget.html',
        FormLnk:  'https://docs.google.com/a/roche.com/forms/d/1GpLYKJVn1aarrrPEgTYd2cqZtGxkx1ZjcaDjUFQrrD0/viewform?entry.969630452&entry.1103844286&entry.1925671173&entry.1151152595=Working+on&entry.1829425231=Low',
        NotConf : true
    }, function(items) {
        document.getElementById('Dashlink').value  = items.Dashlink;
        document.getElementById('DataLink').value  = items.DataLink;
        document.getElementById('FormLnk').value  = items.FormLnk;
        document.getElementById('NotConf').checked = items.NotConf;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
