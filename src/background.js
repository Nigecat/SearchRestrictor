
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {  // Gets called when the current tab is updated
    if (changeInfo.status == 'complete' && tab.active) {    // If the tab is active and finished loading
        chrome.storage.local.get(['status', 'urls'], function(data) {   // Get the relevant data from the localstorage
            status = data.status;
            urls = data.urls.split("\n");
        });

        var mode = "whitelist";  //      TODO: whitelist/blacklist

        new Promise(resolve => setTimeout(resolve, 100)).then(() => {       // Make sure it has time to recieve
            if (status == "true" && urls[0] != "") { // Check if it is enabled
                chrome.tabs.query({"currentWindow": true, "active": true}, function(tab) {  // Get data from current tag
                    if (tab[0].url.match(/www.google.com\/search/gi)) {         // Make sure user is running on google's search page (the extension only has access to this page anyway)
                        chrome.tabs.executeScript(tab[0].id, {  // Execute the content script
                            file: 'remove.js'
                        }, function() {     // Callback function to send the required data to the content script
                            if (urls.length == 1) {
                                urls = urls[0];
                            }
                            console.log(urls);
                            chrome.tabs.sendMessage(tab[0].id, {job: 'remove_results', 'urls': urls, 'mode': mode});
                        });
                    }
                })
            }
        })
    }
});