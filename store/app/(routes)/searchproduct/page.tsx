
import ProductList from "@/components/product-list";
import CustomeButton from "@/components/shared/customebutton";
import Container from "@/components/ui/container";
import getProducts from "@/actions/get-products";
export const revalidate = 0;


const SearchPage = async () => {
  // const router = useRouter();
  // const SearchParams = router.query;

  // const query = SearchParams?.get("q") ?? ""; // Get the "q" query parameter with optional chaining and provide a default value

 // const products = await getSearch("shoes");
 const products = await getProducts({ isFeatured: true });
   
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <CustomeButton/>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Searched Products" items={products} />
        </div>
      </div>
    </Container>
  )
}

export default SearchPage