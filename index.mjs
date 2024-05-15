import puppeteer from 'puppeteer';
import cron from 'node-cron';
import fetch from 'node-fetch';
import { CREDENCIAIS } from './credenciais.mjs';

// Função para adicionar um atraso
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Função para enviar notificação
async function sendNotification() {
  const response = await fetch(CREDENCIAIS.GZAPPY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user_token_id': CREDENCIAIS.user_token_id
    },
    body: JSON.stringify({
      instance_id: CREDENCIAIS.instance_id,
      instance_token: CREDENCIAIS.instance_token,
      message: CREDENCIAIS.message,
      phone: CREDENCIAIS.phone
    })
  })

  const data = await response.json()

  console.log(data)
  // { msg: 'Messages sent' }
}

// Função para executar o script
async function runScript() {
  try {
    const browser = await puppeteer.launch({
      headless: true, // Mantido como false para abrir a janela do navegador
      args: ['--incognito', '--start-maximized'], // Adiciona a opção para iniciar maximizado
      defaultViewport: null // Define o viewport para o tamanho máximo da janela
    });
    await sleep(10000);

    const [page] = await browser.pages(); // Obtém a primeira página existente

    // Define o tamanho do viewport
    await page.setViewport({ width: 1366, height: 768 });
    await sleep(5000);

    // Substitui a função de geolocalização para fornecer uma localização fixa
    await page.evaluateOnNewDocument(() => {
      navigator.geolocation.getCurrentPosition = function (cb) {
        setTimeout(() => {
          cb({
            'coords': {
              accuracy: 21,
              altitude: -32768,
              altitudeAccuracy: null,
              heading: null,
              latitude: -27.596457728953755,
              longitude: -48.54817092418671,
              speed: null
            }
          })
        }, 1000)
      }
    });

    await page.goto('https://app2.pontomais.com.br/login');
    await sleep(10000);

    // Clica no campo de usuário antes de preencher
    await page.click('div.inside-icon input');
    await page.type('div.inside-icon input', CREDENCIAIS.email);
    await sleep(500); // Espera 1 segundos

    // Clica no campo de senha antes de preencher
    await page.click('div.password-input-content input');
    await page.type('div.password-input-content input', CREDENCIAIS.senha);
    await sleep(1000); // Espera 2 segundos

    // Clica no botão entrar depois de inserir a senha e o login
    await page.evaluate(() => {
      var xpath = "//div[contains(@class, 'login-form')]//span[contains(text(), 'Entrar')]";
      var botao = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      botao.click();
    });

    await sleep(10000);

    // Clica no botão ‘Bater Ponto’ após utilizar a última localização
    await page.evaluate(() => {
      var xpath = "//button[contains(@class, 'pm-button pm-primary')]//span[contains(text(), 'Bater ponto')]";
      var elemento = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (elemento) {
        elemento.click();
    }
    });

    await sleep(10000); // Espera 10 segundos

    await browser.close();

    // Envia a notificação após a conclusão do script
    await sendNotification();

  } catch (error) {
    console.log(`Erro ao executar o script: ${error.message}`);
  }
}

// Usado para testes
//cron.schedule('51 19 * * *', runScript);

// Agendar a tarefa para ser executada às 07:40, 12:00, 13:00 e 18:40 todos os dias
cron.schedule('40 7,12,13,18 * * 1-5', runScript);
