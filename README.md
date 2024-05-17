# Automação de Ponto com Puppeteer

Este script automatiza o processo de bater o ponto no site do Pontomais utilizando o Puppeteer, uma biblioteca do Node.js para automação de navegadores.

## Dependências

O script depende das seguintes bibliotecas:

- puppeteer
- node-cron
- node-fetch

## Como executar

1. Primeiro, instale as dependências do projeto com o comando `npm install`.

2. Em seguida, crie um arquivo chamado `credenciais.mjs` no diretório raiz do projeto. Este arquivo deve exportar um objeto com as seguintes propriedades:

   - `GZAPPY_URL`: URL para enviar a notificação.
   - `user_token_id`: Token de usuário para autenticação.
   - `instance_id`: ID da instância.
   - `instance_token`: Token da instância.
   - `message`: Mensagem a ser enviada na notificação.
   - `phone`: Número de telefone para o qual a notificação será enviada.
   - `email`: Email para login no site do Pontomais.
   - `senha`: Senha para login no site do Pontomais.

3. Para executar o script, use o comando `node nome_do_arquivo.js`.

## Funcionamento

O script realiza as seguintes ações:

1. Inicia o navegador e abre uma nova página.
2. Navega até o site do Pontomais e faz login com as credenciais fornecidas.
3. Clica no botão 'Bater Ponto'.
4. Fecha o navegador.
5. Envia uma notificação para o número de telefone especificado.

O script é executado automaticamente às 07:40, 12:00, 13:00 e 18:40 de segunda a sexta-feira, graças à biblioteca node-cron.

## Observações

Este script foi criado apenas para fins de aprendizado e treinamento. O uso dessa automação não é de minha responsabilidade. Ele não deve ser usado para fraudar o sistema de ponto ou para qualquer outra atividade ilegal.
