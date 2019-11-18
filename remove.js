
chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.job == "remove_results") {
        var urls = msg.urls;      
        var mode = msg.mode;

        if (typeof urls === 'string') {
            var runMode = "single";
        } else if (typeof urls === 'object') {
            var runMode = "multi";
        }

        if (runMode == "single") {
            var orig = document.getElementsByClassName("gLFyf gsfi")[0].value;
            if (!orig.includes("site:")) {
                var query = document.getElementsByClassName("gLFyf gsfi")[0].value + " site:" + urls;
                document.getElementsByClassName("gLFyf gsfi")[0].value = query;
                document.getElementsByClassName("Tg7LZd")[0].click()
            } else {
                var query = document.getElementsByClassName("gLFyf gsfi")[0].value;
                query = query.split(" ");
                query.pop();
                query = query.join(" ");
                document.getElementsByClassName("gLFyf gsfi")[0].value = query;

                try {
                    var text = document.getElementsByClassName("med card-section")[0].getElementsByTagName("p")[0].innerText;
                    text = text.split(" - ");
                    text[1] = text[1].split(" ");
                    text[1].pop();
                    text[1] = text[1].join(" ");
                    text = text.join(" - ");
                    document.getElementsByClassName("med card-section")[0].getElementsByTagName("p")[0].innerText = text;
                } catch (err) {}
                try {
                    var text = document.getElementsByClassName("med card-section")[0].getElementsByTagName("p")[1].innerText;
                    text = text.split(" - ");
                    text[1] = text[1].split(" ");
                    text[1].pop();
                    text[1] = text[1].join(" ");
                    text = text.join(" - ");
                    document.getElementsByClassName("med card-section")[0].getElementsByTagName("p")[1].innerText = text;
                } catch (err) {}
                try {
                    var text = document.getElementsByClassName("gL9Hy")[1].innerText.split(" ");
                    text.pop();
                    text = text.join(" ");
                    document.getElementsByClassName("gL9Hy")[1].innerText = text;
                } catch (err) {}
            }
        }

        else if (runMode == "multi") {
            var results = document.getElementsByClassName("rc");
            for (var i = 0; i < results.length; i++) {
                if (results[i].getElementsByTagName("a")[2] != null) {
                    var url = results[i].getElementsByTagName("a")[2]["host"];
                    var remove = true;
                    for (var x = 0; x < urls.length; x++) {
                        if (url.match(new RegExp(urls[x], "gi"))) {
                            remove = false;
                        }
                    }
                    if (remove) {
                        results[i].innerHTML = ""
                    }
                }
            }
        }
    }
})