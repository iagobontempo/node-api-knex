# API
- Continuar aula para arrumar corretamente o código, ver exemplo de soft delete, .env e validar administradores
- Adicionar **order em todas as tabelas e fazer sempre vir ordenado por esta ordem**
- Fazer **soft delete**
- Criar as migrations de **fields** e **fields type** `(rever esta parte, nomes como será implementado)`
- Criar o relacionamento entre pages e os fields e fields_type
- Criar rota de send-mail [LINK 1](https://www.inelaah.com/node-send-email) [LINK 2](https://imasters.com.br/front-end/enviando-e-mail-usando-node-js)
- Criar a parte de **CRM** (mensagens)
- Criar log

# Functions frontend
- ```getPage()``` > pegará a pagina com os campos de configuração dela.
- ```getInternal()``` > pegará todas internas com os campos dela, onde o page (id) será setado.
- ```getUri()``` > pegará a uri de alguma page `(? nescessario ?)`
- ```orderArray()``` > ordenarArray com base em alguma coluna especifica
- ```getMenu()``` > pegará o menu com a página, uri, titulo

# 
Extras:
- Pensar em uma pagina inicial/dashboard com Stats
- Pensar em um jeito de criar um arquivo de constantes `???`
- Pensar o que posso usar com node-schedule p/ dashboard


#
- Para rodar as seeds: ```knex seed:run```

- Para rodar as migrations: ```knex migrate:latest``` ou ```knex migrate:rollback```