document.getElementById('scanButton').addEventListener('click', function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'scanPage' }, function(response) {
          document.getElementById('result').textContent = response.result;
      });
  });
});
