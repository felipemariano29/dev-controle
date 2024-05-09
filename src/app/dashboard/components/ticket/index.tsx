import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { FiCheckSquare, FiFile } from "react-icons/fi";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ customer, ticket }: TicketItemProps) {
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-slate-200 transition-colors">
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
          <button>
            <FiCheckSquare size={24} color="#131313" />
          </button>

          <button>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
