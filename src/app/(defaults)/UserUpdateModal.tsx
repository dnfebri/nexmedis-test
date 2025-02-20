import IconX from "@/components/icon/icon-x";
import { ModalWrapper } from "@/components/modal";
import { ROUTES } from "@/constants/routes";
import { ParamsCreateQuery } from "@/helpers/params";
import { TInputForm } from "@/types/inputForm";
import { TUser } from "@/types/user.type";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

export const UserUpdateModal = ({
  userById,
  isLoading,
  updateUser,
}: {
  userById?: TUser;
  isLoading: boolean;
  updateUser: (inputs: TInputForm, id: number) => Promise<any>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idParams = searchParams.get("id");
  const paramsCreate = ParamsCreateQuery(searchParams);
  const [inputs, setInputs] = useState<TInputForm>({});

  useEffect(() => {
    if (userById) {
      setInputs({
        name: userById.first_name + " " + userById.last_name,
      });
    }
  }, [userById]);

  const handleShowModal = () => {
    router.push(`${ROUTES.DASHBOARD}?${paramsCreate("modal", "open")}`);
  };

  const handleCloseModal = (idParams?: string | null) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete("action");
    newSearchParams.delete("modal");
    newSearchParams.delete("id");
    if (idParams && idParams !== "null") {
      setInputs({});
    }
    router.push(`${ROUTES.DASHBOARD}?${newSearchParams.toString()}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputs.name || !inputs.job) {
      return alert("Please enter name and job");
    }
    const data = await updateUser(inputs, userById?.id ?? 0);
    if (data) {
      handleCloseModal();
    }
  };

  return (
    <ModalWrapper
      handleShowModal={handleShowModal}
      handleCloseModal={() => handleCloseModal(idParams)}
    >
      <div className="bg-[#fbfbfb] dark:bg-[#121c2c] px-5 py-3">
        <div className="flex items-start justify-between">
          <h5 className="font-bold text-lg mb-4">
            Edit {userById?.first_name + " " + userById?.last_name}
          </h5>
          <button
            onClick={() => handleCloseModal(idParams)}
            type="button"
            className="text-white-dark hover:text-dark"
          >
            <IconX />
          </button>
        </div>
        <form onSubmit={submitForm}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter Name"
                className="form-input"
                name="name"
                value={inputs.name || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="job">Job</label>
              <input
                id="job"
                type="text"
                placeholder="Enter Job"
                className="form-input"
                name="job"
                value={inputs.job || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-6"
            disabled={isLoading}
          >
            {isLoading ? (
              <p className="flex justify-center gap-4">
                <span className="animate-[spin_2s_linear_infinite] border-2 border-transparent border-l-white border-r-white rounded-full w-5 h-5 inline-block align-middle m-auto"></span>
                <span>Proses...</span>
              </p>
            ) : (
              "Save"
            )}
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};
