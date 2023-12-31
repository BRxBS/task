import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const origin= request.headers.get('origin')
    const products = await prisma.products.findMany({
        select: {
            id: true,
            product_name: true,
            quantity: true,
            value: true,
        },
        orderBy: {
            id: "desc",
        },
    });

    const json = JSON.stringify(products);
    return new NextResponse(json, {
        status: 200,
        headers: {
            'Acces-Control-Allow-Origin': origin || "*",
            "Content-Type": "application/json",
        },
    });
}
