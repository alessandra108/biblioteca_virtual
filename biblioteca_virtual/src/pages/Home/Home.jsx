import React, { useState, useEffect } from 'react';

function App() {
  const [livros, setLivros] = useState([]);
  const [livroAtual, setLivroAtual] = useState({
    id: '',
    titulo: '',
    autor: '',
    genero: '',
    descricao: ''
  });
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [tela, setTela] = useState('home');

  const handleChange = (e) => {
    setLivroAtual({ ...livroAtual, [e.target.name]: e.target.value });
  };

  const salvarLivro = (e) => {
    e.preventDefault();

    if (!livroAtual.titulo || !livroAtual.autor || !livroAtual.genero || !livroAtual.descricao) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    if (editando) {
      const livrosAtualizados = livros.map(l =>
        l.id === livroAtual.id ? livroAtual : l
      );
      setLivros(livrosAtualizados);
      setMensagem("Livro atualizado com sucesso!");
    } else {
      const novoLivro = { ...livroAtual, id: crypto.randomUUID() };
      setLivros([...livros, novoLivro]);
      setMensagem("Livro adicionado com sucesso!");
    }

    setLivroAtual({ id: '', titulo: '', autor: '', genero: '', descricao: '' });
    setEditando(false);
    setTela('home');
    setTimeout(() => setMensagem(''), 3000);
  };

  const editarLivro = (id) => {
    const livroSelecionado = livros.find(l => l.id === id);
    if (livroSelecionado) {
      setLivroAtual(livroSelecionado);
      setEditando(true);
      setTela('formulario');
    }
  };

  const excluirLivro = (id) => {
    const livrosRestantes = livros.filter(l => l.id !== id);
    setLivros(livrosRestantes);
    setMensagem("Livro excluído com sucesso!");
    setTimeout(() => setMensagem(''), 3000);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <header className="bg-blue-900 p-4 flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Biblioteca Virtual</h1>
        {tela === 'home' && (
          <button
            onClick={() => {
              setLivroAtual({ id: '', titulo: '', autor: '', genero: '', descricao: '' });
              setEditando(false);
              setTela('formulario');
            }}
            className="bg-white text-black px-4 py-2 rounded hover:bg-blue-100"
          >
            + Adicionar Livro
          </button>
        )}
      </header>

      <main className="p-6">
        {mensagem && (
          <div className="bg-blue-100 text-black px-4 py-2 rounded mb-4">{mensagem}</div>
        )}

        {tela === 'home' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {livros.length === 0 ? (
              <p>Nenhum livro adicionado ainda.</p>
            ) : (
              livros.map((livro) => (
                <div key={livro.id} className="bg-white p-4 rounded shadow">
                  <h3 className="text-xl font-bold">{livro.titulo}</h3>
                  <p><strong>Autor:</strong> {livro.autor}</p>
                  <p><strong>Gênero:</strong> {livro.genero}</p>
                  <p className="text-sm mt-2">{livro.descricao}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => editarLivro(livro.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => excluirLivro(livro.id)}
                      className="text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <form
            onSubmit={salvarLivro}
            className="max-w-md mx-auto bg-white p-6 rounded shadow"
          >
            <h2 className="text-xl font-bold mb-4">
              {editando ? 'Editar Livro' : 'Adicionar Livro'}
            </h2>
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              value={livroAtual.titulo}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="text"
              name="autor"
              placeholder="Autor"
              value={livroAtual.autor}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="text"
              name="genero"
              placeholder="Gênero"
              value={livroAtual.genero}
              onChange={handleChange}
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <textarea
              name="descricao"
              placeholder="Descrição"
              value={livroAtual.descricao}
              onChange={handleChange}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editando ? 'Atualizar' : 'Salvar'}
              </button>
              <button
                type="button"
                onClick={() => setTela('home')}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

export default App;
