"use client";
import { SIZE_ICON } from "@/constants/common";
import React from "react";
import { HiMenu } from "react-icons/hi";
import { useLayout } from "@/hooks/layout";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarNotification } from "./NavbarNotification";
import { NavbarProfile } from "./NavbarProfile";

export const Navbar = () => {
  const { sidebarOpen, setSidebarOpen } = useLayout();

  return (
    <div className="bg-white flex justify-between items-center px-2 relative">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden"
      >
        <HiMenu size={SIZE_ICON} />
      </button>
      <div className="flex h-16 items-center justify-between w-full px-4">
        <NavbarSearch />
        <div className="flex items-center gap-4">
          <NavbarNotification />
          <NavbarProfile />
        </div>
      </div>
    </div>
  );
};
