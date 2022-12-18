import Seo from "@/components/Seo";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";

const ReportsPage = () => {
  // Hooks
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <section className="p-6">
      <Seo templateTitle="My Reports" />
      <h1 className="text-2xl font-bold">Reports</h1>
      <p className="my-1 text-sm">Reports based on product sale</p>
    </section>
  );
};

export default ReportsPage;
