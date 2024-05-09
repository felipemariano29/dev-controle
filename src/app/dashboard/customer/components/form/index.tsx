"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  email: z
    .string()
    .email({ message: "Digite um email válido" })
    .min(1, { message: "O email é obrigatório" }),
  phone: z.string().refine(
    (value) => {
      return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value);
    },
    {
      message: "O telefone estar no formato: (11) 999999999",
    }
  ),
  address: z.string(),
});

type FormData = z.infer<typeof schema>;

export function NewCustomerForm({ userId }: { userId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  async function handleRegister(data: FormData) {
    const response = await api.post("/api/customer", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      userId,
    });

    router.refresh();
    router.replace("/dashboard/customer");
  }

  return (
    <form
      className="flex flex-col mt-6"
      onSubmit={handleSubmit(handleRegister)}
    >
      <label className="mb-1 text-lg font-medium">Nome Completo: </label>
      <Input
        type="text"
        name="name"
        placeholder="Digite o nome completo"
        error={errors.name?.message}
        register={register}
      />

      <section className="flex gap-2 my-4 flex-col sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Telefone: </label>
          <Input
            type="phone"
            name="phone"
            placeholder="Digite o telefone"
            error={errors.phone?.message}
            register={register}
          />
        </div>

        <div className="flex-1">
          <label className="mb-1 text-lg font-medium">Email: </label>
          <Input
            type="email"
            name="email"
            placeholder="Digite o email"
            error={errors.email?.message}
            register={register}
          />
        </div>
      </section>

      <label className="text-lg font-medium">Endereço: </label>
      <Input
        type="text"
        name="address"
        placeholder="Digite o endereço completo"
        error={errors.address?.message}
        register={register}
      />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 transition-colors my-4 px-2 h-11 rounded text-white font-bold "
      >
        Cadastrar
      </button>
    </form>
  );
}