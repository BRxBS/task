import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
    request: Request,
    { params }: { params: { id: number } }
) {
    const origin = request.headers.get("origin");
    const id = params.id;
    const { product_name, quantity, value } = await request.json();

    try {
        const product = await prisma.products.findUnique({
            where: { id: Number(id) },
        });
        if (!product) {
            return new NextResponse("Product unique not found", {
                status: 404,
            });
        }
        const updateProduct = await prisma.products.update({
            where: { id: Number(id) },
            data: {
                quantity: Number(quantity),
                value: Number(value),
                product_name: String(product_name),
            },
        });
        if (!updateProduct) {
            return new NextResponse("Product not found", { status: 404 });
        }
        const json = JSON.stringify(updateProduct);
        return new NextResponse(json, {
            status: 200,
            headers: {
                "Acces-Control-Allow-Origin": origin || "*",
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse("Failed to update product", { status: 500 });
    }
}
