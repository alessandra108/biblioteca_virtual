import { useState, useEffect } from "react";

export default function Formulario({ aoSalvar, livro, voltar }) {
  const [form, setForm] = useState({
    id: crypto.randomUUID(),
    titulo: "",
    autor: "",
    genero: "",
    descricao: "",
  });

  useEffect(() => {
    if (livro) setForm(livro);
  }, [livro]);

  const atualizarCampo = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const enviar = (e) => {
    e.preventDefault();
    aoSalvar(form);
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-azulEscuro">
        {livro ? "Editar Livro" : "Adicionar Livro"}
      </h2>
      <form onSubmit={enviar} className="flex flex-col gap-4">
        <input name="titulo" placeholder="Título" value={form.titulo} onChange={atualizarCampo} required className="p-2 rounded" />
        <input name="autor" placeholder="Autor" value={form.autor} onChange={atualizarCampo} required className="p-2 rounded" />
        <input name="genero" placeholder="Gênero" value={form.genero} onChange={atualizarCampo} required className="p-2 rounded" />
        <textarea name="descricao" placeholder="Descrição" value={form.descricao} onChange={atualizarCampo} className="p-2 rounded" />
        <div className="flex gap-2">
          <button type="submit" className="bg-azulEscuro text-white px-4 py-2 rounded hover:bg-indigo-700">
            Salvar
          </button>
          <button type="button" onClick={voltar} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
