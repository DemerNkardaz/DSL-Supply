console.log("DSL Supply Background Script активирован.");


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Сообщение от content.js: ", message);
  sendResponse({ status: "ok" });
});

browser.runtime.onStartup.addListener(() => {

});
