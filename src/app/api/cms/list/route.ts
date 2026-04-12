import { listAllProducts } from "@/lib/cms";

export async function GET() {
  const products = listAllProducts();
  return Response.json(products);
}
