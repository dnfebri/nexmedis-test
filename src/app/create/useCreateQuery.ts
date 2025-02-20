import { DOMAIN_API, ENDPOINT } from "@/constants/api.endpoint";
import { ROUTES } from "@/constants/routes";
import { ApiAxios } from "@/helpers/axios";
import { useLayout } from "@/hooks/layout";
import { TInputForm } from "@/types/inputForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useCreateQuery = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setToast } = useLayout();

  const createUser = async (inputs: TInputForm) => {
    setIsLoading(true);
    try {
      const res = await ApiAxios.post(
        `${DOMAIN_API.domain}${ENDPOINT.user.DEFAULT}`,
        { ...inputs }
      );
      const data = await res.data;
      setToast({
        success: true,
        massage: "Create User " + data.name + " Success",
      });
      router.push(ROUTES.DASHBOARD);
    } catch (error: any) {
      console.log("Login", error);
      setToast({ error: true, massage: error.response.data.error });
    } finally {
      setIsLoading(false);
    }
  };
  return { createUser, isLoading };
};
