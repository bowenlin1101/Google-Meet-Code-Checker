var code;
var checkInterval;
var announceInterval;
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
chrome.storage.sync.get(["code"], (result) => {
    if (result.code){
        announceInterval = setInterval(() => {
            if (window.location.href.split(".com")[1].includes("-") ){
                console.log(document.getElementsByTagName("button")[0].innerText)
                if (document.getElementsByTagName("button")[0].innerText.includes("Check your audio and video") || document.getElementsByTagName("button")[0].innerText.includes("more_vert")){
                    chrome.runtime.sendMessage({query: "alert"})
                    chrome.storage.sync.set({code: null})
                    clearInterval(announceInterval)
                } else {
                    window.location.replace(window.location)
                    chrome.runtime.sendMessage({query:"mutetab"})
                }
            }   
        }, 1000)
    }
})  