
## Web-Pizza

### Como rodar:
```bash
yarn next build
yarn next start
# or
yarn next dev
```
**Webapp para a compra de uma pizza.**

### Preview: 
[Pizza Points](https://pizza-points.vercel.app)


### Link do Mock do backend: 
[Backend - JSON-server](https://pizza-score.herokuapp.com/)


## Features

- Compra feita em 3 etapas ( Escolha do sabor, escolha do tamanho e escolha da borda ).
- Produto com oferta do dia vindo do backend.
- Pizzas relacionadas vindo do backend são mostradas nos detalhes de um sabor.
- Mantendo borda e tamanho selecionado caso o usuário não confirme a compra.
 - Montar pizza com oferta do dia ( Usuário ganha 50 pontos ao concluir a compra ).
- Confirmação de compra com limpeza de valores de borda e tamanho.

### Issues
- [ ] O usuário deve ter a opção de modificar os ingredientes da pizza ( remover e adicionar itens ).
- [ ]  Loader no index rodando o conteúdo dentro do spinner.
- [ ] Adaptar 100% do app para mobile
