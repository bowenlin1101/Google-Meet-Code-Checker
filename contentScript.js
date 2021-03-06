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
        id = request.tabId;
        chrome.runtime.sendMessage({query:"mutetab", tabId: id})
        chrome.storage.sync.get(["tabinfo"], (result) => {
            code = getCode(result.tabinfo,id)
            document.getElementsByTagName("input")[0].value = code
        })
        document.getElementsByTagName("input")[0].focus()
        clearInterval(checkInterval)
        checkInterval = setInterval(()=> {
            for (i of document.getElementsByTagName("button")){
                for (j of i.childNodes){
                    if (j.tagName == "SPAN" && j.innerHTML == "Join"){
                        document.getElementsByTagName("input")[0].value = code
                        document.getElementsByTagName("input")[0].focus()
                        i.click()
                    }
                }
            }     
        }, 5000)
    } else if (request.query == "tabId"){
        id = request.tabId
    } else if (request.query == "play_sound"){
        // var sound = new Audio("https://cdn.freesound.org/previews/545/545495_9616576-lq.mp3");
        // sound.play()
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
                        var sound = new Audio("https://cdn.freesound.org/previews/545/545495_9616576-lq.mp3");
                        console.log(sound)
                        sound.play()
                    } else {
                        window.location.replace(window.location)
                    }
                }
            }
        }   
    }, 1000)
})  