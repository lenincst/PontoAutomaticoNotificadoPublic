# Automação de Ponto com Puppeteer

> **Isenção de responsabilidade**: Este script foi criado apenas para fins de aprendizado e treinamento. O uso dessa automação não é de minha responsabilidade. Ele não deve ser usado para fraudar o sistema de ponto ou para qualquer outra atividade ilegal. Eu me isento de qualquer uso indevido deste script.

Este script automatiza o processo de bater o ponto no site do Pontomais utilizando o Puppeteer, uma biblioteca do Node.js para automação de navegadores.

## Dependências

O script depende das seguintes bibliotecas:

- puppeteer
- node-cron
- node-fetch

## Instalação

1. Primeiro, você precisa ter o Node.js instalado em seu computador. Se você não o tiver, pode baixá-lo aqui.

2. Clone este repositório para o seu computador usando o comando `git clone`.

3. Navegue até o diretório do projeto e instale as dependências com o comando `npm install`.

## Configuração

1. No diretório raiz do projeto, você encontrará um arquivo chamado `credenciais.mjs`. Este arquivo exporta um objeto com as seguintes propriedades:

   - `email`: (Obrigatório) Email para login no site do Pontomais.
   - `senha`: (Obrigatório) Senha para login no site do Pontomais.
   - `GZAPPY_URL`: (Opcional) URL para enviar a notificação.
   - `user_token_id`: (Opcional) Token de usuário para autenticação.
   - `instance_id`: (Opcional) ID da instância.
   - `instance_token`: (Opcional) Token da instância.
   - `message`: (Opcional) Mensagem a ser enviada na notificação.
   - `phone`: (Opcional) Número de telefone para o qual a notificação será enviada.

Você deve substituir os valores de `email` e `senha` pelas suas credenciais do Pontomais. Os outros valores são opcionais e só são necessários se você quiser receber notificações.

## Execução

Para executar o script, use o comando `node index.mjs` no prompt de comando.

## Funcionamento

O script realiza as seguintes ações:

1. Inicia o navegador e abre uma nova página.
2. Navega até o site do Pontomais e faz login com as credenciais fornecidas.
3. Clica no botão 'Bater Ponto'.
4. Fecha o navegador.
5. Envia uma notificação para o número de telefone especificado (se configurado).

O script é executado automaticamente às 07:40, 12:00, 13:00 e 18:40 de segunda a sexta-feira, graças à biblioteca node-cron. Estes horários estão configurados para dar 1h de extra todo dia para uma carga horária das 8h até as 18h.

## Personalização

- **Localização**: A localização é fixada para `-27.596457728953755, -48.54817092418671`. Se você quiser mudar a localização, você pode alterar os valores de `latitude` e `longitude` no script.

- **Horários de execução**: Os horários de execução são definidos pela biblioteca `node-cron`. Você pode personalizar os horários de execução alterando a string de cronograma no comando `cron.schedule`. A string de cronograma segue o formato `segundo minuto hora diaDoMês mês diaDaSemana`. Por exemplo, '00 8,12,13,18 * * 1-5' executa o script às 8:00, 12:00, 13:00 e 18:00 de segunda a sexta-feira.

- **Modo headless**: O script é executado em modo headless (`headless: true`), o que significa que o navegador não é exibido durante a execução. Se você quiser ver o navegador enquanto o script está sendo executado, você pode alterar o valor de `headless` para `false`.

Espero que isso ajude a tornar o README mais claro e didático!
