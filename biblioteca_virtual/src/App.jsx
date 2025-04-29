import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/livrosvirtual"; // URL do seu back-end

function App() {
  const [livros, setLivros] = useState([]);
  const [livroAtual, setLivroAtual] = useState({
    id: "",
    titulo: "",
    autor: "",
    genero: "",
    descricao: ""
  });
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [tela, setTela] = useState("home");

  // Função para listar os livros ao carregar a página
  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setLivros(response.data);
      })
      .catch((error) => {
        console.error("Erro ao carregar livros:", error);
        setMensagem("Erro ao carregar os livros.");
      });
  }, []);

  const handleChange = (e) => {
    setLivroAtual({ ...livroAtual, [e.target.name]: e.target.value });
  };

  // Função para salvar livro
  const salvarLivro = (e) => {
    e.preventDefault();

    if (!livroAtual.titulo || !livroAtual.autor || !livroAtual.genero || !livroAtual.descricao) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    const livro = { ...livroAtual };

    if (editando) {
      // Atualizar livro no back-end
      axios.put(`${API_URL}/${livro.id}`, livro)
        .then((response) => {
          setLivros(livros.map(l => (l.id === livro.id ? response.data : l)));
          setMensagem("Livro atualizado com sucesso!");
        })
        .catch((error) => {
          setMensagem("Erro ao atualizar o livro.");
          console.error(error);
        });
    } else {
      // Adicionar novo livro ao back-end
      axios.post(API_URL, livro)
        .then((response) => {
          setLivros([...livros, response.data]);
          setMensagem("Livro adicionado com sucesso!");
        })
        .catch((error) => {
          setMensagem("Erro ao adicionar o livro.");
          console.error(error);
        });
    }

    setLivroAtual({ id: "", titulo: "", autor: "", genero: "", descricao: "" });
    setEditando(false);
    setTela("home");
    setTimeout(() => setMensagem(""), 3000);
  };

  // Função para editar livro
  const editarLivro = (id) => {
    const livroSelecionado = livros.find((livro) => livro.id === id);
    if (livroSelecionado) {
      setLivroAtual(livroSelecionado);
      setEditando(true);
      setTela("formulario");
    }
  };

  // Função para excluir livro
  const excluirLivro = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setLivros(livros.filter((livro) => livro.id !== id));
        setMensagem("Livro excluído com sucesso!");
        setTimeout(() => setMensagem(""), 3000);
      })
      .catch((error) => {
        console.error("Erro ao excluir o livro:", error);
        setMensagem("Erro ao excluir o livro.");
        setTimeout(() => setMensagem(""), 3000);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 flex justify-between items-center shadow-lg rounded-b-lg">
        <h1 className="text-white text-3xl font-semibold">Biblioteca Virtual</h1>
        {tela === "home" && (
          <button
            onClick={() => {
              setLivroAtual({ id: "", titulo: "", autor: "", genero: "", descricao: "" });
              setEditando(false);
              setTela("formulario");
            }}
            className="bg-white text-black px-6 py-3 rounded-lg shadow-lg hover:bg-blue-200 transition-colors"
          >
            + Adicionar Livro
          </button>
        )}
      </header>

      <main className="p-6">
        {mensagem && (
          <div className="bg-blue-100 text-blue-800 px-4 py-3 rounded-lg mb-4 shadow-md">
            {mensagem}
          </div>
        )}

        {tela === "home" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {livros.length === 0 ? (
              <p className="text-lg text-gray-700">Nenhum livro adicionado ainda.</p>
            ) : (
              livros.map((livro) => (
                <div key={livro.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-blue-600">{livro.titulo}</h3>
                  <p className="text-blue-500"><strong>Autor:</strong> {livro.autor}</p>
                  <p className="text-blue-500"><strong>Gênero:</strong> {livro.genero}</p>
                  <p className="text-gray-700 mt-2">{livro.descricao}</p>
                  <div className="mt-4 flex gap-4">
                    <div className="flex-1">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <button
                          onClick={() => editarLivro(livro.id)}
                          className="text-blue-500 hover:text-blue-700 font-medium transition-colors w-full"
                        >
                          Editar
                        </button>
                      </div>
                    </div>
                    <div className="flex-3">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <button
                          onClick={() => excluirLivro(livro.id)}
                          className="text-red-500 hover:text-red-700 font-medium transition-colors w-full"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <form
            onSubmit={salvarLivro}
            className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-6">
              {editando ? "Editar Livro" : "Adicionar Novo Livro"}
            </h2>
            <input
              type="text"
              name="titulo"
              placeholder="Título do livro"
              value={livroAtual.titulo}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="autor"
              placeholder="Autor do livro"
              value={livroAtual.autor}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="genero"
              placeholder="Gênero do livro"
              value={livroAtual.genero}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              name="descricao"
              placeholder="Descrição do livro"
              value={livroAtual.descricao}
              onChange={handleChange}
              className="w-full p-3 mb-6 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
              >
                {editando ? "Atualizar" : "Salvar"}
              </button>
              <button
                type="button"
                onClick={() => setTela("home")}
                className="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors"
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
