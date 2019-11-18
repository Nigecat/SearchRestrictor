
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        chrome.storage.local.get(['status', 'urls'], function(data) {  
            status = data.status;
            urls = data.urls.split("\n");
        });

        var mode = "whitelist";  //      whitelist/blacklist

        new Promise(resolve => setTimeout(resolve, 100)).then(() => {   
            if (status == "true") {
                chrome.tabs.query({"currentWindow": true, "active": true}, function(tab) { 
                    if (tab[0].url.match(/www.google.com\/search/gi)) {
                        chrome.tabs.executeScript(tab[0].id, {
                            file: 'remove.js'
                        }, function() {
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