import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }:  {params: { id: number } } ) {
    const id = params.id;

    try {
        const productId = Number(id);

        const product = await prisma.products.findUnique({
            where: { id: Number(productId) },
        });
        if (!product) {
            return new NextResponse("Product unique not found", {
                status: 404,
            });
        }
        const updateProduct = await prisma.products.delete({
            where: { id: Number(id) },
        });
        if (!updateProduct) {
            return new NextResponse("Product not found", { status: 404 });
        }
        const json = JSON.stringify(updateProduct);
        return new NextResponse(json, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error(error);
        return new NextResponse("Failed to update product", { status: 500 });
    }
}
