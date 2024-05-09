import { Container } from "@/components/container";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  async function handleRegister(data: FormData) {
    "use server";

    const name = data.get("name");
    const description = data.get("description");
    const customerId = data.get("customer");

    if (!name || !description || !customerId) {
      throw new Error("Missing fields");
    }

    // try {
    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "open",
        userId: session?.user.id,
      },
    });

    redirect("/dashboard");
    // } catch (error) {
    //   throw new Error("Error creating ticket");
    // }
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customer"
            className="bg-gray-900 p-2.5 rounded-full"
          >
            <FiArrowLeft color="#fff" />
          </Link>

          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>

        <form className="flex flex-col mt-6" action={handleRegister}>
          <label className="mb-1 text-lg font-medium">Nome do chamado</label>
          <input
            className="w-full border-2 rounded-md p-2 mb-2 h-11"
            type="text"
            placeholder="Nome do chamado"
            required
            name="name"
          />

          <label className="mb-1 text-lg font-medium">
            Descreva o problema
          </label>
          <textarea
            className="w-full border-2 rounded-md p-2 mb-2 h-28 resize-none"
            placeholder="Descrição do problema"
            required
            name="description"
          />

          {customers.length !== 0 && (
            <>
              <label className="mb-1 text-lg font-medium">
                Selecione o cliente
              </label>
              <select
                className="w-full border-2 rounded-md p-2 mb-2 h-11 resize-none bg-white"
                name="customer"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <Link href="/dashboard/customer/new" className="text-red-500 my-1">
              Por favor,{" "}
              <span className="underline font-bold">clique aqui</span> para
              cadastrar um cliente antes de criar um chamado
            </Link>
          )}

          <button
            className="bg-blue-500 text-white font-bold h-11 px-4 py-1 mt-4 rounded disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
}
