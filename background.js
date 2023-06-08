function sendMessageToContentScript(extensions) {
  // Create a message object with the extensions list
  var message = {
    extensions: extensions
  };

  // Send the message to the content script when the tab is updated
  browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      browser.tabs.sendMessage(tabId, message)
        .then(function(response) {
          console.log('Message sent to content script:', response);
        })
        .catch(function(error) {
          console.error('Error sending message to content script:', error);
        });
    }
  });
}

browser.management.getAll()
  .then(function(extensions) {
    sendMessageToContentScript(extensions);
  })
  .catch(function(error) {
    console.error('Error retrieving extension list:', error);
  });

  window.top.location.reload()
