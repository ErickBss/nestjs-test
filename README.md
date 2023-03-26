# Nest JS + Jest
Testes unitários com Jest usando o framework NestJS;

## Comandos 

* yarn test -> Rodar os todos os testes
* yarn test:watch -> Rodar todos os testes em watch mode
* yarn test:watch "nome do arquivo" -> Rodar testes de um arquivo em específico


## Rotas
* (Get) users/ -> Retorna todos os usuários
* (Get) users/id -> Retorna um usuário em específico
* (Post) users/ ->  ```{"name": "John Doe", "email": "john@email.com"}```
* (Put) users/id -> ```{"name": "John Doe" }```
* (Delete) users/id -> Deleta um usuário em específico