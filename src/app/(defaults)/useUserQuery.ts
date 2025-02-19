import { ENDPOINT } from "@/constants/api.endpoint";
import { METADATA } from "@/constants/metadata";
import { ROUTES } from "@/constants/routes";
import { ApiAxios } from "@/helpers/axios";
import { ParamsCreateQuery } from "@/helpers/params";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useUserQuery = () => {
  const [metaData, setMetaData] = useState<typeof METADATA>(METADATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  // eslint-disable-next-line prefer-const
  let page = searchParams.get("page");
  const ParamsCreate = ParamsCreateQuery(searchParams);

  async function getUsers({ qPage }: { qPage?: string }) {
    const keyPage = qPage ? `${qPage}` : 1;
    setIsLoading(true);
    try {
      const response = await ApiAxios.get(
        `${ENDPOINT.user.DEFAULT}?page=${keyPage}`
      );
      const data = response.data.data;
      setIsUser(data);
      setMetaData({
        current_page: response.data.page,
        per_page: response.data.per_page,
        total: response.data.total,
        total_pages: response.data.total_pages,
      });
    } catch (error: any) {
      console.log("getUsers", error);
    } finally {
      setIsLoading(false);
    }
  }

  function getIsPage(current_page: string) {
    router.push(
      `${ROUTES.DASHBOARD}?${ParamsCreate("page", current_page.toString())}`
    );
    getUsers({ qPage: current_page });
  }

  useEffect(() => {
    getUsers({ qPage: page ?? undefined });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { getUsers, getIsPage, isUser, metaData, isLoading };
};
