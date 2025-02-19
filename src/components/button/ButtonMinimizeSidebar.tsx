import { SIZE_ICON_SM } from "@/constants/common";
import { useLayout } from "@/hooks/layout";
import React from "react";
import { GoSidebarCollapse } from "react-icons/go";
import { IoIosLock, IoIosUnlock } from "react-icons/io";

export const ButtonMinimizeSidebar = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  const { minimizeSidebar, setMinimizeSidebar } = useLayout();
  return (
    <button onClick={() => setMinimizeSidebar(!minimizeSidebar)} {...props}>
      <GoSidebarCollapse
        size={SIZE_ICON_SM}
        className={`transition-all duration-300 ${
          !minimizeSidebar ? "text-white-dark" : ""
        }`}
      />
      {minimizeSidebar ? (
        <IoIosLock size={SIZE_ICON_SM} />
      ) : (
        <IoIosUnlock size={SIZE_ICON_SM} className="text-white-dark" />
      )}
    </button>
  );
};
