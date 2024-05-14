"use client";

import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  description: z.string().min(1, { message: "A descrição é obrigatória." }),
});

type FormData = z.infer<typeof schema>;

export function FormTicket() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form className="bg-slate-100 mt-6 py-6 px-3 rounded border-2 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="mb-1 font-medium text-lg">Nome do chamado</label>
        <Input
          register={register}
          type="text"
          placeholder="Digite o nome do chamado..."
          name="name"
          error={errors.name?.message}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="mb-1 font-medium text-lg">Descreva o chamado</label>
        <textarea
          className="w-full border-2 rounded-md h-24 resize-none mb-2 px-2"
          placeholder="Descreva seu problema..."
          id="description"
          {...register("description")}
        />
        {errors.description?.message && (
          <p className="text-red-500 my-1">{errors.description?.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold"
      >
        Cadastrar
      </button>
    </form>
  );
}
