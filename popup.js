document.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON"){
        var code = document.getElementById("code_textbox").value.replace(/ /g,"") 
        if (code != ""){
            document.getElementById("error").style.display = "none"
            chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
                chrome.tabs.sendMessage(tabs[0].id, {code: code})
                alert("Running")
                window.close()
            })
        } else {
            document.getElementById("error").style.display = "block"
        }
        document.getElementById("code_textbox").value = ""
    }
})

window.onload = ()=> {
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs){
        console.log(tabs[0].url)
        if (String(tabs[0].url).includes("meet.google.com")){
            document.getElementById("incorrect_page").style.display ="none"
        } else {
            document.getElementById("correct_page").style.display = "none"
        }
    })
}

