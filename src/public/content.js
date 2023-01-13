// Function called when a new message is received
const messagesFromReactAppListener = (msg, sender, sendResponse) => {
  console.log("[content.js]. Message received", msg);

  const headlines = Array.from(document.getElementsByTagName < "h1" > "h1").map(
    (h1) => h1.innerText
  );

  // Prepare the response object with information about the site
  const response = {
    title: document.title,
    headlines,
  };

  sendResponse(response);
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

document.addEventListener("pointermove", (e) => {
  console.log(e.clientX, e.clientY);
  chrome.runtime.sendMessage({
    type: "POINTER_MOVE",
    x: e.clientX,
    y: e.clientY,
  });
});
