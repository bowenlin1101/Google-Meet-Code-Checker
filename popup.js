document.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON"){
        chrome.storage.sync.get(['tabinfo'], (result) => {
            var code = document.getElementById("code_textbox").value.replace(/ /g,"") 
            if (code != ""){
                document.getElementById("error").style.display = "none"
                chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
                    if (result.tabinfo.some(object => object.tabId == tabs[0].id)){
                        var tabinfo = result.tabinfo
                        for (i of tabinfo){
                            if (i.tabId == tabs[0].id){
                                tabinfo.splice(tabinfo.indexOf(i),1)
                                chrome.storage.sync.set({tabinfo:tabinfo})
                            }
                        }
                    }  
                    var tabinfo = result.tabinfo 
                    tabinfo.push({tabId: tabs[0].id, code: code})
                    chrome.storage.sync.set({tabinfo:tabinfo})
                    chrome.tabs.sendMessage(tabs[0].id, {query: "start", tabId: tabs[0].id})
                    alert("Running")
                    window.close()
                })
            } else {
                document.getElementById("error").style.display = "block"
            }
            document.getElementById("code_textbox").value = ""
        })
    }
})

window.onload = ()=> {
    chrome.storage.sync.get(["tabinfo"], (result) => {
        if (result.tabinfo == undefined){
            chrome.storage.sync.set({tabinfo:[]})
        }
    })

    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        if (String(tabs[0].url).includes("meet.google.com")){
            document.getElementById("incorrect_page").style.display ="none"
        } else {
            document.getElementById("correct_page").style.display = "none"
        }
    })
}