var code;
var checkInterval;
var announceInterval;
var id;

function getCode(array, id){
    for (i of array){
        if (i.tabId == id){
            return i.code
        }
    }
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.query == "start"){
        id = request.tabId
        chrome.storage.sync.get(["tabinfo"], (result) => {
            code = getCode(result.tabinfo,id)
            document.getElementById("i3").value = code
        })
        document.getElementById("i3").focus()
        clearInterval(checkInterval)
        checkInterval = setInterval(()=> {
            for (i of document.getElementsByTagName("button")){
                for (j of i.childNodes){
                    if (j.tagName == "SPAN" && j.innerHTML == "Join"){
                        document.getElementById("i3").value = code
                        document.getElementById("i3").focus()
                        i.click()
                    }
                }
            }     
        }, 5000)
    } else if (request.query == "tabId"){
        id = request.tabId
    }
})

chrome.storage.sync.get(["tabinfo"], (result) => {
    announceInterval = setInterval(() => {
        if (window.location.href.split(".com")[1].includes("-")){
            if (id == undefined){
                chrome.runtime.sendMessage({query: "tabId"})
            } else {
                if (result.tabinfo.some(object => object.tabId == id)){
                    if (document.getElementsByTagName("button")[0].innerText.includes("Check your audio and video") || document.getElementsByTagName("button")[0].innerText.includes("more_vert")){
                        chrome.runtime.sendMessage({query: "alert", tabId: id, code: getCode(result.tabinfo, id)})
                        clearInterval(announceInterval)
                    } else {
                        window.location.replace(window.location)
                        chrome.runtime.sendMessage({query:"mutetab", tabId: id})
                    }
                }
            }
        }   
    }, 1000)
})  