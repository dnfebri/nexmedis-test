"use client";
import IconSearch from "@/components/icon/icon-search";
import IconXCircle from "@/components/icon/icon-x-circle";
import React, { useState } from "react";

export const NavbarSearch = () => {
  const [search, setSearch] = useState(false);
  return (
    <div className="sm:mr-auto">
      <form
        className={`${
          search && "!block z-20"
        } absolute inset-x-0 top-1/2 mx-4 hidden z-0 -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0`}
        onSubmit={() => setSearch(false)}
      >
        <div className="relative">
          <input
            type="text"
            className="peer form-input bg-gray-100 placeholder:tracking-widest pl-9 pr-9 sm:bg-transparent sm:pr-4"
            placeholder="Search..."
          />
          <button
            type="button"
            className="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary right-auto"
          >
            <IconSearch className="mx-auto" />
          </button>
          <button
            type="button"
            className="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 right-2 sm:hidden"
            onClick={() => setSearch(false)}
          >
            <IconXCircle />
          </button>
        </div>
      </form>
      <button
        type="button"
        onClick={() => setSearch(!search)}
        className="search_btn rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 dark:bg-dark/40 dark:hover:bg-dark/60 sm:hidden"
      >
        <IconSearch className="mx-auto h-4.5 w-4.5 dark:text-[#d0d2d6]" />
      </button>
    </div>
  );
};
