import { FiFile, FiTrash2 } from "react-icons/fi";

interface TicketProps {
  client: string;
  date: Date;
  status: boolean;
}

export function TicketItem() {
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-slate-200 transition-colors">
        <td className="text-left pl-2">John Doe</td>

        <td className="text-left">01/01/2022</td>

        <td className="text-left">
          <span className="bg-green-500 px-2 py-1 rounded">Aberto</span>
        </td>

        <td className="text-left space-x-2">
          <button>
            <FiTrash2 size={24} color="#ef4444" />
          </button>

          <button>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
