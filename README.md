<p> Nome da disciplina - DESENVOLVIMENTO DE APLICAÇÕES MÓVEIS 2024/2 </p>
<p> Código da Turma - 123 </p>
<p> Nome e matrícula do aluno -  Vitor de Brito Pereira 2011100014 </p>


> Carrinho de compras

<p> Trabalho em React: Gerenciador de Serviços
Este trabalho consiste na criação de um aplicativo web em React para gerenciar um carrinho de
compras. O aplicativo permite que os usuários adicionem produtos ao carrinho, consultem a lista de
produtos no carrinho, editem as quantidades e removam produtos do carrinho.</p>

>Requisitos:
<p>Considere o projeto abaixo em REACTJS: </p>
<p>Funcionalidades:</p>
<p>1. Adição de Produtos ao Carrinho:</p>
<p>- Os usuários podem adicionar novos produtos ao carrinho clicando no botão “Adicionar ao Carrinho” ao
lado de cada produto.</p>
<p>- Cada produto possui um nome e um preço, que serão exibidos na interface do usuário.</p>
<p>- Quando um produto é adicionado, ele aparece na lista de itens no carrinho.</p>
<p>2. Consulta de Produtos no Carrinho:</p>
<p>- O carrinho de compras exibe uma lista de todos os produtos adicionados.</p>
<p>- Para cada produto no carrinho, são exibidos o nome, preço e a quantidade.</p>
<p>- O preço total do carrinho é calculado e exibido automaticamente.</p>
<p>3. Edição da Quantidade de Produtos:</p>
<p>- Os usuários podem alterar a quantidade de qualquer produto no carrinho.</p>
<p>- Ao clicar em "Editar", o usuário poderá modificar a quantidade diretamente.</p>
<p>- Após a edição, o total é atualizado para refletir o novo valor.</p>

<p>4. Remoção de Produtos do Carrinho:</p>
<p>- Os usuários podem remover produtos do carrinho clicando no botão “Remover”.</p>
<p>- Ao remover um produto, ele desaparece da lista de itens no carrinho e o total é recalculado.</p>
<p>Implementação:</p>
<p>1. Lista de Produtos Disponíveis: Será criada uma lista com produtos predefinidos, contendo
informações como nome e preço.</p>
<p>2. Carrinho de Compras: O estado será gerenciado com `useState` para armazenar os produtos
adicionados ao carrinho e suas quantidades.</p>
<p>3. Funções de Adição, Edição e Remoção: Através de eventos de clique, o usuário poderá adicionar,
editar a quantidade ou remover produtos do carrinho.</p>
<p>4. Exibição Total do Carrinho: O preço total dos itens será calculado com base na quantidade de
produtos no carrinho e exibido dinamicamente.</p>

>Passo a passo:
<p>Primeiro, você precisará criar um projeto React. Você pode fazer isso usando o Create React
App, que é uma ferramenta oficial para criar aplicativos React.</p>

<ol> 
  <li> Se você ainda não tem o Create
React App instalado, você pode instalar globalmente usando npm:</li>
  <p> npm install -g create-react-app </p>

  <li> Crie um novo projeto React chamado "carrinho-compras": </li>
  <p> npx create-react-app carrinho-compras </p>
  <li> Acesse o diretório do projeto: </li>
  <p> cd carrinho-compras </p>
  <li> Execute o aplicativo React:</li>
  <p> npm start </p>
  <li> Monte o ambiente do NodeJS e VSCode paara executar o projeto </li>
</ol>


----------------------------

<p>Há quatro arquivos:</p>

<p>index.js, index.html, App.css e App.js</p>

<p>-index.js</p>
<p>   > usamos esse arquivo para o programa rodar via VSCode, e uma aplicação React. Ele configura a renderização do componente principal (App) dentro do elemento com o ID root no HTML permitindo que você dividindo o código em componentes reutilizáveis e mantenha uma estrutura de projeto modular.</p>
<p>-index.html</p>
<p>   > usams esse arquivo para o programa rodar via Codepen.io,  um contêiner onde uma aplicação JavaScript, criada com React ou outra biblioteca de frontend, será renderizada. Esse é o ponto de entrada padrão onde a aplicação insere seu conteúdo na página.</p>
<p>-App.css</p>
<p>   > esse arquivo é de layout , aplicação responsiva, destacando listas e botões.</p>
<p>-App.js</p>
<p>   >  componente principal de uma aplicação React para um sistema de carrinho de compras, implementando funcionalidades para gerenciar produtos, adicionar itens ao carrinho, e realizar operações administrativas básicas, como adicionar novos produtos. </p>

