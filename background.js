try {
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    try {
      if (changeInfo.status === "complete") {
        const url = new URL(tab.url);

        if (url.pathname.includes("/collection")) {
          chrome.scripting.executeScript({ files: ["app.js"], target: {tabId: tabId} })
        }
      }
    } catch (e) {
      console.log("error: ",e)
    }
  });
} catch (e) {
  console.log("error: ",e)
}
