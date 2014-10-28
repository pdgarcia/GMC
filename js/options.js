// Saves options to chrome.storage
function save_options() {
  var Dashlink = document.getElementById('Dashlink').value;
  var GadLink = document.getElementById('GadLink').value;
  chrome.storage.sync.set({
    Dashlink: Dashlink,
    GadLink: GadLink
  }, function() {
    // Update status to let user know options were saved.
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
    GadLink: 'http://rkamv1175.kau.roche.com/mstats/gadget.html'
  }, function(items) {
    document.getElementById('Dashlink').value = items.Dashlink;
    document.getElementById('GadLink').value = items.GadLink;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
    