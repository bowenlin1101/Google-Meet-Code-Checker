chrome.runtime.onMessage.addListener((request)=> {
    if (request.query == "alert"){
            chrome.notifications.create('NOTFICATION_ID', {
                type: 'basic',
                iconUrl: 'Google_Meet_Checker_Logo.png',
                title: 'Google Meet Code',
                message: 'The meet code is working!',
                priority: 2
            })
            chrome.storage.sync.get(["tabId"], (result) => {
                chrome.tabs.get(result.tabId, async (tab) => {
                    if (tab.mutedInfo.muted){
                        console.log("should be unmuted")
                        await chrome.tabs.update(result.tabId, { muted:false });
                    }
                  });
            }) 
            chrome.storage.sync.set({tabId: null})
        } else if (request.query == "mutetab"){
            chrome.storage.sync.get(["tabId"], (result) => {
                chrome.tabs.get(result.tabId, async (tab) => {
                    if (!tab.mutedInfo.muted){
                        await chrome.tabs.update(result.tabId, { muted:true });
                    }
                  });
            }) 
        
        }
})