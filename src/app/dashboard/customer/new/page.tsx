import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { NewCustomerForm } from "../components/form";

export default async function NewCustomer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/customer"
            className="bg-gray-900 p-2.5 rounded-full"
          >
            <FiArrowLeft color="#fff" />
          </Link>

          <h1 className="text-3xl font-bold">Novo cliente</h1>
        </div>

        <NewCustomerForm />
      </main>
    </Container>
  );
}
