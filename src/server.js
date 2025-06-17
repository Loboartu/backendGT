// src/server.js
/**
 * @file Ponto de entrada principal da aplicação.
 * @description Inicia o servidor HTTP e carrega as configurações.
 * @aula O Papel de server.js: É o arquivo que dá "vida" à sua API. Ele se encarrega de ligar o servidor web e dizer a ele em qual "porta" ele deve escutar por requisições. Ele também é o primeiro a ser executado pelo Node.js.
 */
require('dotenv').config(); // Carrega as variáveis de ambiente do .env
const app = require('./app'); // Importa o aplicativo Express configurado em app.js

// Define a porta do servidor. Prioriza a variável de ambiente PORT,
// caso contrário, usa a porta 3000 como padrão.
const PORT = process.env.PORT || 3000;

/**
 * Inicia o servidor HTTP.
 * @listens PORT
 */
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}/api/v1/`); // Mensagem inicial da API
});
