"use client";

import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";
import { FormTicket } from "./components/FormTicket";
import { api } from "@/lib/api";

const schema = z.object({
  email: z
    .string()
    .email({ message: "Digite um email válido" })
    .min(1, { message: "O email é obrigatório" }),
});

type FormData = z.infer<typeof schema>;

export interface CustomerProps {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerProps | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    const response = await api.get(`/api/customer`, {
      params: {
        email: data.email,
      },
    });

    if (!response.data.customer) {
      setError("email", {
        type: "custom",
        message: "Cliente não encontrado",
      });
      return;
    }

    setCustomer({
      id: response.data.customer.id,
      name: response.data.customer.name,
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>

      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="bg-slate-100 py-6 px-3 rounded border-2 flex items-center justify-between">
            <p className="text-lg">
              <strong>Cliente selecionado: </strong>
              {customer.name}
            </p>

            <button
              onClick={handleClearCustomer}
              className="h-11 px-2 items-center justify-center"
            >
              <FiX size={30} color="#ff0000" />
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleSearchCustomer)}
            className="bg-slate-100 py-6 px-3 rounded border-2"
          >
            <div className="flex flex-col gap-3">
              <Input
                name="email"
                placeholder="Digite o e-mail do cliente"
                type="text"
                error={errors.email?.message}
                register={register}
              />

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 transition-colors flex flex-row gap-3 px-2 h-11 items-center justify-center text-white font-bold rounded"
              >
                Procurar clientes <FiSearch size={24} color="#fff" />
              </button>
            </div>
          </form>
        )}

        {customer && <FormTicket customer={customer} />}
      </main>
    </div>
  );
}
