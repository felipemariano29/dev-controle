import { CustomerProps } from "@/utils/customer.type";

export function CustomerCard({ customer }: { customer: CustomerProps }) {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 transition-transform">
      <h2>
        <span className="font-bold">Nome: </span>
        {customer.name}
      </h2>

      <p>
        <span className="font-bold">Email: </span>
        {customer.email}
      </p>

      <p>
        <span className="font-bold">Telefone: </span>
        {customer.phone}
      </p>

      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start text-sm">
        Deletar
      </button>
    </article>
  );
}
