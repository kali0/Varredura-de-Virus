chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'scanPage') {
      const url = window.location.href;

      // Configuração da API VirusTotal
      const apiKey = '95b44e7094f445eb4bd58b0caa778277229cdfa6baf315d11934ff21bc620dac';
      const apiUrl = `https://www.virustotal.com/api/v3/urls/${btoa(url)}`;

      fetch(apiUrl, {
          method: 'GET',
          headers: {
              'x-apikey': apiKey
          }
      })
      .then(response => response.json())
      .then(data => {
          let result = 'Nenhum vírus encontrado';
          if (data && data.data && data.data.attributes && data.data.attributes.last_analysis_stats) {
              const stats = data.data.attributes.last_analysis_stats;
              if (stats.malicious > 0) {
                  result = 'Vírus encontrado';
              }
          }
          sendResponse({ result: result });
      })
      .catch(error => {
          console.error('Erro ao consultar a API do VirusTotal:', error);
          sendResponse({ result: 'Erro ao realizar a varredura' });
      });

      return true; // Manter o canal de mensagem aberto para resposta assíncrona
  }
});
