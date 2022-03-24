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
                    console.log("ran")
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
    console.log(code)
    chrome.storage.sync.get(["code"], (result) => {
        if (window.location.href.includes(result.code)){
            alert("Meet is Ready!")
            clearInterval(announceInterval)
            clearInterval(checkInterval)
        }   
    })
}, 1000)