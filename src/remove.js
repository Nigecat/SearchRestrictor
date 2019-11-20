

function cleanup() {
    /*
    clean = [
        ["title"], 
        ["no match 2", "spell_orig", 0]
        ["searchBar", "gLFyf gsfi", 0], 
        ["no match", "med card-section", 0],
        ["related", "gL9Hy", 1], 
        ["related", "e2BEnf U7izfe", 1]
    ];
    
    for (var i = 0; i < clean.length; i++) {
        try {
            cleanField.apply(this, clean[i])
        } catch (err) {}
    }
    */

    
    try {
        document.getElementsByClassName("spell_orig")[0].parentElement.removeChild(document.getElementsByClassName("spell_orig")[0]);
    } catch (err) {}
    try {
        cleanField("title");
    } catch (err) {}
    try {
        cleanField("searchBar", "gLFyf gsfi", 0);    
    } catch (err) {}
    try {
        cleanField("no match", "med card-section", 0);
    } catch (err) {}
    try {
        cleanField("related", "gL9Hy", 1);
    } catch (err) {}
    try {
        cleanField("related", "e2BEnf U7izfe", 1);
    } catch (err) {}
    
}

function cleanField(_type, _class = undefined, num = undefined) {   // Function to clean up after the script from a text field
    if (_type == "no match") {
        var text = document.getElementsByClassName(_class)[0].getElementsByTagName("p")[num].innerText.split(" - ");
        text[1] = text[1].split(" ");
        text[1].pop();
        text[1] = text[1].join(" ");
        document.getElementsByClassName(_class)[0].getElementsByTagName("p")[num].innerText = text.join(" - ");
    } else if (_type == "no match 2") {
        document.getElementsByClassName(_class)[num].parentElement.removeChild(document.getElementsByClassName(_class)[num]);
    } else if (_type == "related") {
        var text = document.getElementsByClassName(_class)[num].innerText.split(" ");
        text.pop();
        document.getElementsByClassName(_class)[num].innerText = text.join(" ");
    } else if (_type == "searchBar") {
        var text = document.getElementsByClassName(_class)[num].value.split(" ");
        text.pop();
        document.getElementsByClassName(_class)[num].value = text.join(" ");
    } else if (_type == "title") {
        var text = document.title.split(" ");
        text.pop();
        text.pop();
        text.pop();
        text.pop();
        document.title = text.join(" ") + " - Google";
    }
}


chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.job == "remove_results") {
        var urls = msg.urls;   
        window.urls = urls;   
        var mode = msg.mode;

        if (typeof urls === 'string') {     // Determine removal run mode based on how many urls are passed
            var runMode = "single";
        } else if (typeof urls === 'object') {
            var runMode = "multi";
        }

        if (runMode == "single") {
            if (!document.getElementsByClassName("gLFyf gsfi")[0].value.includes("site:")) {    // If it is the original search, use googles inbuilt thing to restrict results
                var query = document.getElementsByClassName("gLFyf gsfi")[0].value + " site:" + window.urls;
                document.getElementsByClassName("gLFyf gsfi")[0].value = query;
                document.getElementsByClassName("Tg7LZd")[0].click()
            } else {        // This is the second time the script runs after the page reset from the first time the script searches
                cleanup();
            }
        }

        else if (runMode == "multi") {
            var results = document.getElementsByClassName("rc");        // Get all website cards on the results
            for (var i = 0; i < results.length; i++) {
                if (results[i].getElementsByTagName("a")[2] != null) {
                    var url = results[i].getElementsByTagName("a")[2]["host"];  // Get the website url
                    var remove = true;
                    for (var x = 0; x < urls.length; x++) {
                        if (url.match(new RegExp(urls[x], "gi"))) {     // Generate a regex for each url and if it doesn't match any then flag it for deletion
                            remove = false;
                        }
                    }
                    if (remove) {
                        results[i].innerHTML = ""       // Clear the innerhtml of the element, therefor deleting it. This will shuffle the element upwards
                    }
                }
            }
        }
    }
})