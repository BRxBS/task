import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const origin = request.headers.get("origin");
    const { product_name, quantity, value } = await request.json();

    const product = await prisma.products.create({
        data: {
            product_name,
            quantity,
            value,
        },
    });
    const json = JSON.stringify({
        product_name: product.product_name,
        quantity: product.quantity,
        value: product.value,
    });
    return new NextResponse(json, {
        status: 200,
        headers: {
            "Acces-Control-Allow-Origin": origin || "*",
            "Content-Type": "application/json",
        },
    });
}
