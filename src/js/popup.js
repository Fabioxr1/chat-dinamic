    /* eslint-disable no-undef */
  
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0].id,
                { UrlTabs: tabs[0].url },
                function (response) {
                    // do something with the response if you want.
                }
            );
        })
