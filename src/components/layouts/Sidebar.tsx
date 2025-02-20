"use client";
import { useLayout } from "@/hooks/layout";
// import { URL_CDN } from "@/lib/config";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ButtonMinimizeSidebar } from "../button";
import { SIZE_ICON } from "@/constants/common";
import { MenuSidebar } from "./MenuSidebar";

export const Sidebar = () => {
  const { sidebarOpen, minimizeSidebar, setSidebarOpen, setMinimizeSidebar } =
    useLayout();
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  useEffect(() => {
    if (window.innerWidth > 1024) setMinimizeSidebar(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={() => setIsMouseEnter(false)}
      className={`w-full bg-white max-h-fit h-screen fixed top-0 bottom-0 flex flex-col z-10 group lg:w-64 ${
        sidebarOpen ? "left-0" : "-left-[100%]"
      } ${
        minimizeSidebar
          ? "max-w-64 lg:static"
          : "max-w-16 hover:max-w-64 xl:static"
      } transition-all duration-300 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)]`}
    >
      <div className="h-16 py-2 relative flex items-center px-4 border-b">
        <div className="relative h-12 aspect-[3/1] overflow-hidden flex items-center">
          <h1 className="text-2xl font-bold">LOGO</h1>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`absolute top-0 bottom-0 ${
            isMouseEnter || minimizeSidebar ? "right-4" : "-right-10"
          } transition-all duration-300 lg:hidden z-10`}
        >
          <AiOutlineClose size={SIZE_ICON} />
        </button>
      </div>
      <div className="flex flex-col h-full relative">
        <MenuSidebar setSidebarOpen={setSidebarOpen} />
        <div
          className={`flex justify-end ${
            !minimizeSidebar && "px-0"
          } px-3 absolute w-full py-2 bottom-0 bg-white transition-all duration-300`}
        >
          <ButtonMinimizeSidebar className="w-full flex justify-end" />
        </div>
      </div>
    </div>
  );
};
