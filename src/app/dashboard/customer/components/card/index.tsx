export function CustomerCard() {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 transition-transform">
      <h2>
        <span className="font-bold">Nome: </span>
        Mercadinho
      </h2>

      <p>
        <span className="font-bold">Email: </span>
        teste@teste.com
      </p>

      <p>
        <span className="font-bold">Telefone: </span>
        (11) 99999-9999
      </p>

      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start text-sm">
        Deletar
      </button>
    </article>
  );
}
