yes = document.getElementById("yes");
no = document.getElementById("no");

function setVal(val)
{
    chrome.storage.local.set({"enabled": val});
}
yes.onclick = function() {
    setVal(true);
}

no.onclick = function() {
    setVal(false);
}    

chrome.storage.local.get("enabled", function(v){
    if(v["enabled"])
    {
        yes.checked = true;
    }
    else
    {
        no.checked = true;
    }
});

