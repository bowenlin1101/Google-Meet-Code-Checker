var code;
var checkInterval;
chrome.runtime.onMessage.addListener((request) => {
    document.getElementById("i3").focus()
    document.getElementById("i3").value = request.code
    clearInterval(announceInterval)
    clearInterval(checkInterval)
    chrome.storage.sync.set({code: request.code})
    checkInterval = setInterval(()=> {
        for (i of document.getElementsByTagName("button")){
            for (j of i.childNodes){
                if (j.tagName == "SPAN" && j.innerHTML == "Join"){
                    document.getElementById("i3").value = request.code
                    code = request.code
                    document.getElementById("i3").focus()
                    i.click()
                }
            }
        }     
    }, 5000)
})

var announceInterval = setInterval(() => {
    if (window.location.href.split(".com")[1].includes("-") ){
        alert("Meet is Ready!")
        clearInterval(announceInterval)
    }   
}, 1000)