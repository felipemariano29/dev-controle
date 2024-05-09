"use client";

import { useContext } from "react";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

import { ModalContext } from "@/providers/modal";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
  const router = useRouter();
  const { handleModalVisible, setTicketDetail } = useContext(ModalContext);

  async function handleChangeStatus() {
    try {
      const response = await api.patch(`/api/ticket`, {
        id: ticket.id,
      });

      router.refresh();
    } catch (error) {
      throw new Error("Error changing status");
    }
  }

  function handleOpenModal() {
    handleModalVisible();
    setTicketDetail({
      customer,
      ticket,
    });
  }

  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-slate-200 transition-colors">
        <td className="text-left pl-2">{ticket?.name}</td>

        <td className="text-left pl-2">{customer?.name}</td>

        <td className="text-left">
          {ticket.created_at?.toLocaleDateString("pt-BR")}
        </td>

        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded text-white uppercase">
            {ticket.status}
          </span>
        </td>

        <td className="text-left space-x-2">
          <button onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="#131313" />
          </button>

          <button onClick={handleOpenModal}>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
