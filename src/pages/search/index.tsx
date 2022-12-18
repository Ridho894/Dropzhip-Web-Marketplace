import Seo from "@/components/Seo";
import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();

  const keyword: string = router.query.keyword as string;
  return (
    <section>
      <Seo
        templateTitle={`${keyword?.at(0)?.toUpperCase()}${keyword.substring(
          1
        )}`}
      />
      <h1>Search</h1>
    </section>
  );
};

export default Search;
