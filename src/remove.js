

function cleanField(_class, _type, num) {
    if (_type == 1) {
        var text = document.getElementsByClassName(_class)[0].getElementsByTagName("p")[num].innerText.split(" - ");
        text[1] = text[1].split(" ");
        text[1].pop();
        text[1] = text[1].join(" ");
        document.getElementsByClassName(_class)[0].getElementsByTagName("p")[num].innerText = text.join(" - ");
    } else if (_type == 2) {
        var text = document.getElementsByClassName(_class)[num].innerText.split(" ");
        text.pop();
        document.getElementsByClassName(_class)[num].innerText = text.join(" ");
    } else if (_type == 3) {
        var text = document.getElementsByClassName(_class)[num].value.split(" ");
        text.pop();
        document.getElementsByClassName(_class)[num].value = text.join(" ");
    }
}


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
                try {
                    cleanField("gLFyf gsfi", 3, 0);
                } catch (err) {}
                try {
                    cleanField("med card-section", 1, 0);
                } catch (err) {}
                try {
                    cleanField("med card-section", 1, 1);
                } catch (err) {}
                try {
                    cleanField("gL9Hy", 2, 1);
                } catch (err) {}
                try {
                    cleanField("e2BEnf U7izfe", 2, 1);
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