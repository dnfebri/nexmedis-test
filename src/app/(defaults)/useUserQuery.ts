import { DOMAIN_API, ENDPOINT } from "@/constants/api.endpoint";
import { METADATA } from "@/constants/metadata";
import { ROUTES } from "@/constants/routes";
import { ApiAxios } from "@/helpers/axios";
import { ParamsCreateQuery } from "@/helpers/params";
import { useLayout } from "@/hooks/layout";
import { TInputForm } from "@/types/inputForm";
import { TUser } from "@/types/user.type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const useUserQuery = () => {
  const [metaData, setMetaData] = useState<typeof METADATA>(METADATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<TUser[]>([]);
  const [isUserById, setIsUserById] = useState<TUser | undefined>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToast } = useLayout();
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

  async function getUserById(id: number) {
    setIsLoading(true);
    try {
      const response = await ApiAxios.get(`${ENDPOINT.user.DEFAULT}/${id}`);
      const data = response.data.data;
      setIsUserById(data);
    } catch (error: any) {
      console.log("getUserById", error);
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

  const handleShowModal = async ({
    id,
    edit,
    isPage,
  }: {
    id: number;
    edit?: "edit";
    isPage?: string;
  }) => {
    try {
      await getUserById(id);
      const newSearchParams = new URLSearchParams(searchParams.toString());
      isPage && newSearchParams.set("page", isPage);
      newSearchParams.set("modal", "open");
      newSearchParams.set("id", id.toString());
      edit && newSearchParams.set("action", "edit");
      router.push(`${ROUTES.DASHBOARD}?${newSearchParams.toString()}`);
    } catch (error: any) {
      setToast({ error: true, massage: error.response.data.error });
    }
  };

  async function updateUser(inputs: TInputForm, id: number) {
    setIsLoading(true);
    try {
      const res = await ApiAxios.put(
        `${DOMAIN_API.domain}${ENDPOINT.user.DEFAULT}/${id}`,
        { ...inputs }
      );
      const data = await res.data;
      setToast({
        success: true,
        massage: "Update User " + data.name + " Success",
      });
      return data;
    } catch (error: any) {
      setToast({ error: true, massage: error.response.data.error });
    } finally {
      setIsLoading(false);
    }
  }

  async function approveDeleteUser(id: number) {
    setIsLoading(true);
    try {
      await ApiAxios.delete(
        `${DOMAIN_API.domain}${ENDPOINT.user.DEFAULT}/${id}`
      );
      Swal.fire({
        title: "Deleted!",
        text: "Your User has been deleted.",
        icon: "success",
      });
      router.push(ROUTES.DASHBOARD);
    } catch (error: any) {
      console.log("approveDeleteUser", error);
      setToast({
        error: true,
        massage: "Delete failed",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function deleteUser(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveDeleteUser(id);
      }
    });
  }

  return {
    getUsers,
    getIsPage,
    getUserById,
    handleShowModal,
    updateUser,
    deleteUser,
    isUser,
    metaData,
    isLoading,
    isUserById,
  };
};
