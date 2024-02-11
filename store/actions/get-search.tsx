import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/search`;

const getSearch = async (query: string): Promise<Product[]> => {
  try {
    const res = await fetch(`${URL}/search?q=${query}`);

    if (!res.ok) {
      throw new Error(`API request failed: ${res.status}`);
    }

    const products = await res.json();

    // Optional: Handle potential errors in the server response
    if (!Array.isArray(products)) {
      throw new Error(`Invalid response: Expected an array of products, got ${typeof products}`);
    }

    return products;
  } catch (error) {
    console.error("[GET_SEARCH]", error);
    throw new Error("Failed to fetch search results"); // Re-throw for handling in calling code
  }
};

export default getSearch;
