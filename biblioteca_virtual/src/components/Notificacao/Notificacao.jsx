export default function Notificacao({ mensagem }) {
    return (
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4 max-w-xl mx-auto rounded">
        <p>{mensagem}</p>
      </div>
    );
  }