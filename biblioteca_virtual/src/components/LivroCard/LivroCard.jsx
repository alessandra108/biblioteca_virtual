export default function LivroCard({ livro, aoEditar, aoExcluir }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold text-xl">{livro.titulo}</h3>
      <p><strong>Autor:</strong> {livro.autor}</p>
      <p><strong>Gênero:</strong> {livro.genero}</p>
      <p>{livro.descricao}</p>
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => aoEditar(livro.id)}
          className="text-blue-600 hover:underline"
        >
          Editar
        </button>
        <button
          onClick={() => aoExcluir(livro.id)}
          className="text-red-600 hover:underline"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
