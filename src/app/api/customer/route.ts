import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email || email === "") {
    return NextResponse.json({ message: "Missing email" }, { status: 400 });
  }

  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        email,
      },
    });

    return NextResponse.json(
      { message: "Customer found", customer },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to get customer" },
      { status: 400 }
    );
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        phone,
        address: address || "",
        userId,
      },
    });

    return NextResponse.json(
      { message: "Customer created", customer },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create customer" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Missing id" }, { status: 400 });
  }

  const findTickets = await prismaClient.ticket.findFirst({
    where: {
      customerId: id as string,
    },
  });

  if (findTickets) {
    return NextResponse.json(
      { message: "Customer has active tickets" },
      { status: 400 }
    );
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: id as string,
      },
    });

    return NextResponse.json({ message: "Customer deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete customer" },
      { status: 400 }
    );
  }
}
