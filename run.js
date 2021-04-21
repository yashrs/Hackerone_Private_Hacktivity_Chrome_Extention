console.log("Script init");
var s = document.createElement('script');

chrome.storage.local.get("enabled", function(v){
    if(v["enabled"] == true){
        console.log("Creating script");
        s.src = chrome.runtime.getURL('cs.js');
        s.onload = function() {
            this.remove();
        };
        (document.head || document.documentElement).appendChild(s);
    }
});
