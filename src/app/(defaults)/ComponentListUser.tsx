"use client";
import React from "react";
import { useUserQuery } from "./useUserQuery";
import { UsersTable } from "./UsersTable";
import { UserUpdateModal } from "./UserUpdateModal";

export const ComponentListUser = () => {
  const {
    isUser,
    metaData,
    getIsPage,
    isUserById,
    handleShowModal,
    isLoading,
    updateUser,
  } = useUserQuery();
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
        <div className="flex items-end gap-2">
          <h5 className="text-lg font-semibold dark:text-white-light">
            Users List
          </h5>
        </div>
      </div>
      <div>
        <UsersTable
          data={isUser}
          getIsPage={getIsPage}
          metadata={metaData}
          handleShowModal={handleShowModal}
        />
      </div>
      <UserUpdateModal
        userById={isUserById}
        isLoading={isLoading}
        updateUser={updateUser}
      />
    </div>
  );
};
