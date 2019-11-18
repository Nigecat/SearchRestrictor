

window.addEventListener('DOMContentLoaded', function() {      
    chrome.storage.local.get(['status', 'urls'], function(data) {  
        status = data.status
        urls = data.urls
    });

    new Promise(resolve => setTimeout(resolve, 10)).then(() => {   
        if (status == "true") { 
            document.getElementById("status").checked = true;
        } else {
            document.getElementById("status").checked = false;
        }
        document.getElementById("urls").value = urls;
    })
})


document.getElementById("status").onchange = function () {      
    try {
        chrome.storage.local.remove("status");  
    } catch (err) {
        console.log(err)
    }

    var status = document.getElementById("status").checked;  
    chrome.storage.local.set({'status': status}, function () {});
}

document.getElementById("urls").onchange = function () {
    try {
        chrome.storage.local.remove("urls");  
    } catch (err) {
        console.log(err)
    }

    var urls = document.getElementById("urls").value;  
    chrome.storage.local.set({'urls': urls}, function () {});
}


document.getElementById("urls").onfocus = function () {
    if (document.getElementById("urls").innerHTML.includes("Please enter each url on a new line.")) {
        document.getElementById("urls").innerHTML = "";
    }
}

document.getElementById("urls").onblur = function () {
    if (document.getElementById("urls").innerHTML == "") {
        document.getElementById("urls").innerHTML = "        Please enter each url on a new line.";
    }   
}
