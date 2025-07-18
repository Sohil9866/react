const getProducts = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.products; // return only the array
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

export default getProducts;
