
console.log("Hello from your extension!");
var extensionNames = [];
var missingExtensionIds = [];

browser.runtime.onMessage.addListener(function (message, sender, sendResponse) {

  var extensions = message.extensions;
console.log(extensions);


  var hasExtension = extensions.some(function (extension) {
    return extension.id === "68dfa633889b115e68e7a1bf27b5081dbf32a264";
  });



  if (hasExtension) {
    console.log("Extension with ID '68dfa633889b115e68e7a1bf27b5081dbf32a264' found.");
    sessionStorage.setItem('extensionInstalled', 'YES');
  } else {
    console.log("Extension with ID '68dfa633889b115e68e7a1bf27b5081dbf32a264' not found.");
    sessionStorage.setItem('extensionInstalled', 'No');

  }


  // Do something with the extensions list
  // ...

  var targetExtensionIds = ["{b9db16a4-6edc-47ec-a1f4-b86292ed211d}", "{368a2797-3061-4023-8ed0-2d6e41df141e}", "ffext_basicvideoext@startpage24", "@video_downloader_pro", "{b9a672d6-0a2c-470e-9bed-1ca2e2a900c5}", "{ab1dae9c-0ccc-4e48-9ea5-a01f3770ccc2}"];

  targetExtensionIds.forEach(function (targetId) {
    var foundExtension = extensions.find(function (extension) {
      return extension.id === targetId;
    });
  
    if (foundExtension) {
      extensionNames = [...extensionNames, foundExtension.name];
    } else {
      missingExtensionIds = [...missingExtensionIds, targetId];
    }
  });
  
  if (missingExtensionIds.length === 0) {
    console.log("All extensions found:", extensionNames.join(", "));
    sessionStorage.setItem('hastargetExtensionIds', 'YES');
    sessionStorage.setItem('foundExtensionNames', JSON.stringify(extensionNames));
  } else {
    console.log("Missing extensions with IDs:", missingExtensionIds.join(", "));
    sessionStorage.setItem('missingExtensionIds', JSON.stringify(missingExtensionIds));
    sessionStorage.setItem('hastargetExtensionIds', 'No');
  }

});


