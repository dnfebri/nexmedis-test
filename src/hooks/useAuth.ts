import { DOMAIN_API, ENDPOINT } from "@/constants/api.endpoint";
import { COOKIES } from "@/constants/common";
import { ApiAxios } from "@/helpers/axios";
import { TInputForm } from "@/types/inputForm";
import { setCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useLayout } from "./layout";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";

export const useAuth = () => {
  const router = useRouter();
  const { setToast } = useLayout();
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const login = async (inputs: TInputForm, isRememberMe?: boolean) => {
    const optionCookie: { maxAge?: number } = {
      maxAge: 60 * 60,
    };
    if (isRememberMe) {
      optionCookie.maxAge = 60 * 60 * 24 * 7;
    }
    setLoading(true);
    try {
      const res = await ApiAxios.post(
        `${DOMAIN_API.domain}${ENDPOINT.auth.login}`,
        { ...inputs, remember_me: isRememberMe }
      );
      const data = await res.data;
      setCookie(COOKIES.tokenName, data.token, optionCookie);
      router.push(ROUTES.DASHBOARD);
    } catch (error: any) {
      console.log("Login", error);
      setToast({ error: true, massage: error.response.data.error });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await ApiAxios.delete(`${DOMAIN_API.domain}${ENDPOINT.auth.logout}`);
      deleteCookie(COOKIES.tokenName);
      router.push(ROUTES.LOGIN);
    } catch (error) {
      console.log("Logout", error);
    } finally {
    }
  };
  return {
    isAuthenticated: false,
    login,
    logout,
    loading,
    isRemember,
    setIsRemember,
  };
};
