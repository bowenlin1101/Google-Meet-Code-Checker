chrome.runtime.onMessage.addListener((request,sender)=> {
    if (request.query == "alert"){
        //alert user
        chrome.notifications.create('NOTFICATION_ID', {
            type: 'basic',
            iconUrl: 'Google_Meet_Checker_Logo.png',
            title: 'Google Meet Code',
            message: `The meet code: ${request.code} is working!`,
            priority: 2
        })
        //unmute the tab
        chrome.tabs.get(request.tabId, async (tab) => {
            if (tab.mutedInfo.muted){
                await chrome.tabs.update(request.tabId, { muted:false });
            }
        });
        //remove alerted tab from tabinfo storage 
        chrome.storage.sync.get(["tabinfo"], (result) => {
            var tabinfo = result.tabinfo
            for (i of tabinfo){
                if (i.tabId == request.tabId){
                    tabinfo.splice(tabinfo.indexOf(i),1)
                    chrome.storage.sync.set({tabinfo:tabinfo})
                }
            }
        })
    } else if (request.query == "mutetab"){
        chrome.tabs.get(request.tabId, async (tab) => {
            if (!tab.mutedInfo.muted){
                await chrome.tabs.update(request.tabId, { muted:true });
            }
        });
    } else if (request.query == "tabId"){
        chrome.tabs.sendMessage(sender.tab.id, {query: "tabId", tabId: sender.tab.id});
    }
})

chrome.tabs.onRemoved.addListener(function(tabid) {
    chrome.storage.sync.get(["tabinfo"], (result) => {
        if (result.tabinfo.some(object => object.tabId == tabid)){
            var tabinfo = result.tabinfo
            for (i of tabinfo){
                if (i.tabId == tabid){
                    tabinfo.splice(tabinfo.indexOf(i),1)
                    chrome.storage.sync.set({tabinfo:tabinfo})
                }
            }
        }
    })
})