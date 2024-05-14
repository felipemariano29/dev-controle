import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const ticket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!ticket) {
    return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
  }

  try {
    await prismaClient.ticket.update({
      where: {
        id: ticket.id,
      },
      data: {
        status: ticket.status === "open" ? "closed" : "open",
      },
    });

    return NextResponse.json({ message: "Ticket updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update ticket" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { name, description, customerId } = await request.json();

  if (!name || !description || !customerId) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    const ticket = await prismaClient.ticket.create({
      data: {
        name,
        description,
        customerId,
        status: "open",
      },
    });

    return NextResponse.json(
      { message: "Ticket created", ticket },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create ticket" },
      { status: 500 }
    );
  }
}
