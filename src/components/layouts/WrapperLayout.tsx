"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./navbar/Navbar";
import { Toaster } from "react-hot-toast";

const hiddenNavigation = ["login", "register"];

export const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <>
      <Toaster />
      <div className="flex flex-1 max-h-screen relative">
        {!hiddenNavigation.includes(pathname.split("/")[1]) && (
          <div className="lg:min-w-16">
            <Sidebar />
          </div>
        )}
        <div className="w-full flex flex-1 flex-col overflow-y-auto">
          {!hiddenNavigation.includes(pathname.split("/")[1]) && <Navbar />}
          <div className="p-4 lg:p-6">{children}</div>
        </div>
      </div>
    </>
  );
};
