import React, { useState } from 'react';
import ReactDOM from "https://esm.sh/react-dom";
import './App.css';

const dadosProdutos = [
  { id: 1, nome: "Maçã", preco: 1.5, imagem: "https://i.pinimg.com/originals/84/cc/dc/84ccdcf14badb1fe1030ef3e421dc374.png" },
  { id: 2, nome: "Banana", preco: 1.0, imagem: "https://i.pinimg.com/736x/38/1f/ae/381fae890b6d2e3aef851949e261a13a.jpg" },
  { id: 3, nome: "Laranja", preco: 2.0, imagem: "https://i.pinimg.com/originals/52/08/b0/5208b0e909679fb39313e644b59483d9.png" },
  { id: 4, nome: "Leite", preco: 3.0, imagem: "https://png.pngtree.com/png-vector/20240205/ourmid/pngtree-milk-bottle-dairy-product-png-image_11543900.png" },
  { id: 5, nome: "Pão", preco: 2.5, imagem: "https://i.pinimg.com/originals/b8/bd/dd/b8bdddabafd4892124d854dfecdb4a63.jpg" },
  { id: 6, nome: "Kiwi", preco: 3.00, imagem: "https://i.pinimg.com/736x/58/14/52/581452ef10a7cb0a8d0223e489bb5113.jpg" }
];

function formatarPreco(preco) {
  return `R$ ${preco.toFixed(2)}`;
}

function ListaProdutos({ produtos, adicionarAoCarrinho, termoPesquisa }) {
  const [quantidades, setQuantidades] = useState({});

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  const handleQuantidadeChange = (id, value) => {
    setQuantidades({
      ...quantidades,
      [id]: value
    });
  };

  const handleAdicionarAoCarrinho = (produto) => {
    const quantidade = quantidades[produto.id] || 1;
    adicionarAoCarrinho(produto, quantidade);
    handleQuantidadeChange(produto.id, 1);
  };

  return (
    <div>
      <h2>Produtos</h2>
      <ul>
        {produtosFiltrados.map((produto) => (
          <li key={produto.id}>
            <img 
              src={produto.imagem} 
              alt={produto.nome} 
              style={{ width: '50px', marginRight: '10px' }} 
            />
            {produto.nome} - {formatarPreco(produto.preco)}
            <input
              type="number"
              min="1"
              value={quantidades[produto.id] || 1}
              onChange={(e) => handleQuantidadeChange(produto.id, Number(e.target.value))}
              style={{ width: '60px', marginLeft: '10px', marginRight: '10px' }}
            />
            <button onClick={() => handleAdicionarAoCarrinho(produto)}>Adicionar ao Carrinho</button>
          </li>
        ))}
      </ul>
    </div>
  );  
}

function Carrinho({ itensCarrinho, setItensCarrinho }) {
  const [quantidadesParaEditar, setQuantidadesParaEditar] = useState({});
  const [itemEmEdicao, setItemEmEdicao] = useState(null);

  const handleQuantidadeChange = (index, value) => {
    setQuantidadesParaEditar({
      ...quantidadesParaEditar,
      [index]: value,
    });
  };

  const handleEditar = (index) => {
    setItemEmEdicao(index);
  };

  const handleSalvar = (index) => {
    const quantidade = quantidadesParaEditar[index] || 1;
    const item = itensCarrinho[index];

    if (quantidade === 0) {
      const novoCarrinho = itensCarrinho.filter((_, i) => i !== index);
      setItensCarrinho(novoCarrinho);
    } else {
      if (item) {
        item.quantidade = quantidade;
      }
    }

    setItemEmEdicao(null);
    setQuantidadesParaEditar({ ...quantidadesParaEditar, [index]: 1 });
  };

  const handleRemover = (index) => {
    const novoCarrinho = itensCarrinho.filter((_, i) => i !== index);
    setItensCarrinho(novoCarrinho);
  };

  const total = itensCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <div>
      <h2>Carrinho de Compras</h2>
      <ul>
        {itensCarrinho.map((item, index) => (
          <li key={index}>
            {item.nome} - {formatarPreco(item.preco)} (Quantidade: {item.quantidade})  
            <input
              type="number"
              min="0"
              value={itemEmEdicao === index ? (quantidadesParaEditar[index] || item.quantidade) : item.quantidade}
              onChange={(e) => handleQuantidadeChange(index, Number(e.target.value))}
              style={{ width: '60px', marginLeft: '10px', marginRight: '10px' }}
              disabled={itemEmEdicao !== index}
            />
            {itemEmEdicao === index ? (
              <button onClick={() => handleSalvar(index)} className="remove-btn">Salvar</button>
            ) : (
              <button onClick={() => handleEditar(index)} className="remove-btn">Editar</button>
            )}
            <button onClick={() => handleRemover(index)} className="remove-btn" style={{ backgroundColor: 'red', color: 'white' }}>Remover</button>
          </li>
        ))}
      </ul>
      <h3>Total: {formatarPreco(total)}</h3> 
    </div>
  );
}

function Recibo({ itensCarrinho, total, onVoltar }) {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f7f9fc' }}> 
      <h2>Recibo</h2>
      <ul>
        {itensCarrinho.map((item, index) => (
          <li key={index}> 
            {item.nome} - {formatarPreco(item.preco)} (Quantidade: {item.quantidade}) - Total: {formatarPreco(item.preco * item.quantidade)}  
          </li>
        ))}
      </ul>
      <h3>Total da Compra: {formatarPreco(total)}</h3> 
      <button onClick={onVoltar} className="voltar-btn">Voltar</button>  
    </div>
  );
}

function App() {
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [finalizarCompra, setFinalizarCompra] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemErro, setMensagemErro] = useState("");
  const [showAddProdutoModal, setShowAddProdutoModal] = useState(false);
  const [novoProduto, setNovoProduto] = useState({ id: '', nome: '', preco: '', imagem: '' });

  const adicionarAoCarrinho = (produto, quantidade) => {
    const produtoExistente = itensCarrinho.find(item => item.id === produto.id);

    if (produtoExistente) {
      produtoExistente.quantidade += quantidade;
      setItensCarrinho([...itensCarrinho]);
    } else {
      setItensCarrinho([...itensCarrinho, { ...produto, quantidade }]);
    }
  };

  const handleFinalizarCompra = () => {
    setFinalizarCompra(true);
  };

  const handleVoltar = () => {
    setItensCarrinho([]);
    setFinalizarCompra(false);
    setTermoPesquisa("");
  };

  const handleAcessoAdministrativo = () => {
    if (usuario === "admin" && senha === "admin") {
      setShowModal(false);
      setMensagemErro("");
      setShowAddProdutoModal(true); // Abre o modal para adicionar produtos
    } else {
      setMensagemErro("Acesso não autorizado");
    }
  };

  const handleSalvarProduto = () => {
    const produtoExistente = dadosProdutos.find(prod => prod.id === novoProduto.id);
    if (produtoExistente) {
      alert("Produto com esse ID já existe.");
      return;
    }

    dadosProdutos.push({
      id: novoProduto.id,
      nome: novoProduto.nome,
      preco: parseFloat(novoProduto.preco),
      imagem: novoProduto.imagem
    });

    // Resetar campos e fechar modal
    setNovoProduto({ id: '', nome: '', preco: '', imagem: '' });
    setShowAddProdutoModal(false);
  };

  const total = itensCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  return (
    <div>
      <h1>Aplicativo de Carrinho de Compras</h1> 
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>  
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={termoPesquisa}
          onChange={(e) => setTermoPesquisa(e.target.value)}
          style={{ padding: '10px', width: '50%' }}
        />
      </div>
      <button
        onClick={() => setShowModal(true)}
        style={{
          backgroundColor: 'blue',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          marginRight: '10px',
        }}
      >
        Acesso Administrativo
      </button>
      <button
        onClick={handleFinalizarCompra}
        style={{
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          float: 'right',
        }}
      >
        Finalizar Compra
      </button>

      {/* Modal de Acesso Administrativo */}
      {showModal && (
        <div className="modal" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          border: '1px solid #ccc',
          zIndex: 1000,
        }}>
          <h2>Acesso Administrativo</h2>
          <div>
            <label>Usuário:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              style={{ display: 'block', marginBottom: '10px' }}
            />
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={{ display: 'block', marginBottom: '10px' }}
            />
            {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>}
            <button onClick={handleAcessoAdministrativo}>Entrar</button>
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal para Adicionar Produto */}
      {showAddProdutoModal && (
        <div className="modal" style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          border: '1px solid #ccc',
          zIndex: 1000,
        }}>
          <h2>Adicionar Novo Produto</h2>
          <div>
            <label>ID:</label>
            <input
              type="text"
              value={novoProduto.id}
              onChange={(e) => setNovoProduto({ ...novoProduto, id: e.target.value })}
              style={{ display: 'block', marginBottom: '10px' }}
            />
            <label>Nome:</label>
            <input
              type="text"
              value={novoProduto.nome}
              onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
              style={{ display: 'block', marginBottom: '10px' }}
            />
            <label>Preço:</label>
            <input
              type="text"
              value={novoProduto.preco}
              onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
              style={{ display: 'block', marginBottom: '10px' }}
            />
            <label>Imagem:</label>
            <input
              type="text"
              value={novoProduto.imagem}
              onChange={(e) => setNovoProduto({ ...novoProduto, imagem: e.target.value })}
              style={{ display: 'block', marginBottom: '10px' }}
            />
            <button onClick={handleSalvarProduto}>Salvar</button>
            <button onClick={() => setShowAddProdutoModal(false)}>Fechar</button>
          </div>
        </div>
      )}

      <div className="container" style={{ marginTop: '20px' }}> 
        {!finalizarCompra ? (
          <>
            <ListaProdutos produtos={dadosProdutos} adicionarAoCarrinho={adicionarAoCarrinho} termoPesquisa={termoPesquisa} /> 
            <Carrinho 
              itensCarrinho={itensCarrinho} 
              setItensCarrinho={setItensCarrinho} 
            /> 
          </>
        ) : (
          <Recibo itensCarrinho={itensCarrinho} total={total} onVoltar={handleVoltar} />
        )}
      </div>
    </div>
  );
}


//ReactDOM.render(<App />, document.getElementById("root")); necessario utilizar para rodar no Codepen.io
export default App; // Exporta o componente App para uso em outros lugares 
