chrome.runtime.onMessage.addListener((request)=> {
    if (request.query == "alert"){
            chrome.notifications.create('NOTFICATION_ID', {
                type: 'basic',
                iconUrl: 'Google_Meet_Checker_Logo.png',
                title: 'Google Meet Code',
                message: 'The meet code is working!',
                priority: 2
            })
        }
})