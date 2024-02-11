import { NextResponse } from "next/server";
import { auth } from '@clerk/nextjs';

import prismadb from "@/lib/prismadb";


export async function GET(req: Request, { params }: { params: { q: string } }) {
  try {
    const { q } = params;

    if (!q || q.trim().length === 0) {
      return new NextResponse("Search query is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { category: { name: { contains: q, mode: "insensitive" } } },
          // Add more fields as needed
        ],
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("[PRODUCT_SEARCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
