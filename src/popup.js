
window.addEventListener('DOMContentLoaded', function() {            // Runs on page load  
    chrome.storage.local.get(['status', 'urls'], function(data) {   // Get the relevant data from chrome's local storage
        status = data.status
        urls = data.urls
    });

    new Promise(resolve => setTimeout(resolve, 50)).then(() => {    // Give the data enough time to properly recieve
        if (status == "true") {         // If it is enabled
            document.getElementById("status").checked = true;   // Check the status radio checkbox
            document.getElementById("background").className = "bg_enabled";    // Set background to enabled
        } else {        // Disabled
            document.getElementById("status").checked = false;
            document.getElementById("background").className = "bg_disabled"; 
        }
        document.getElementById("urls").value = urls;   // Display the urls in the textarea
    })
})


document.getElementById("status").onchange = function () {          // Onchange for the status toggle 
    try {
        chrome.storage.local.remove("status");      // Attempt to clear chrome's local storage from the status
    } catch (err) {
        console.log(err)
    }

    var status = document.getElementById("status").checked;  
    chrome.storage.local.set({'status': status}, function () {});   // Save the new status

    var property = document.getElementById("background");
    if (property.className !== 'bg_enabled') {
        property.className = 'bg_enabled'
    } else {
        property.className = 'bg_disabled';
    }
}

document.getElementById("urls").onchange = function () {    // This gets called when the textarea changes (saves the data)
    try {
        chrome.storage.local.remove("urls");  
    } catch (err) {
        console.log(err)
    }

    var urls = document.getElementById("urls").value;  
    chrome.storage.local.set({'urls': urls}, function () {});
}