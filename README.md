
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


### Features
- Resetar os dados com contador de pontos /reset
- Compra feita em 3 etapas ( Escolha do sabor, escolha do tamanho e escolha da borda ).
- Produto com oferta do dia vindo do backend.
- Pizzas relacionadas vindo do backend são mostradas nos detalhes de um sabor.
- Mantendo borda e tamanho selecionado caso o usuário não confirme a compra.
 - Montar pizza com oferta do dia ( Usuário ganha 50 pontos ao concluir a compra ).
- Confirmação de compra com limpeza de valores de borda e tamanho.

### Backlog
- [ ] First render of details page is not working correctly. ( You need to refresh the page );
- [ ] User should remove sone ingredients ( Create a textarea to receive the details );
- [ ] There is a issue with the loader spinner;
- [ ] Finish the mobile version ( Responsive ) 
