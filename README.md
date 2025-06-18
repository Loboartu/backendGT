├── prisma/
│   └── schema.prisma       # Arquivo de definição do schema do Prisma
├── src/
│   ├── config/             # Configurações gerais (ex: conexão com banco)
│   ├── controllers/        # Lógica dos controladores (recebe requisições)
│   ├── Middleware/         # Middlewares (ex: autenticação, logs)
│   ├── models/             # (Se usado) Modelos de dados/entidades (não confundir com o schema do Prisma)
│   ├── Repositories/       # Comunicação direta com o banco de dados (funções de acesso a dados)
│   ├── Routes/             # Definição das rotas da aplicação
│   ├── Services/           # Regras de negócio da aplicação
│   ├── app.js              # Arquivo principal da aplicação Express
│   └── server.js           # Inicialização do servidor
├── .env                    # Variáveis de ambiente
├── .env.example            # Exemplo das variáveis de ambiente
├── .gitignore              # Arquivos/pastas ignorados pelo Git
├── index.js                # Ponto de entrada alternativo ou script utilitário
├── package.json            # Dependências e scripts do projeto
└── package-lock.json       # Controle de versão das dependências

🛠️ Tecnologias Utilizadas
	•	Node.js
	•	Express
	•	Prisma ORM
	•	PostgreSQL
	•	JavaScript
	•	Dotenv para variáveis de ambiente

🚀 Como executar

1. Clone do repositório:
 

2. intale as dependeciais:
 

3. Configure o arquivo.env com Base no .env.example.
  

4. Gere o cliente do prisma:
 

5.Execute as migrações:
 

6.Inicie o servidor:

✅ Funcionalidades 
	• CRUD de produtos
	•	
	•	
	•	


