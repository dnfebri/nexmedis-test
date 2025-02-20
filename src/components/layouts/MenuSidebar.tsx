import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Link from "next/link";
import { MENU_ITEMS } from "@/constants/menu_items";
import { ICONS_MENU } from "@/constants/IconsMenu";

export const MenuSidebar = ({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) => {
  return (
    <div className="sidebar overflow-auto no-scrollbar">
      <PerfectScrollbar className="relative h-[calc(100vh-80px)] py-4">
        <ul className="relative space-y-0.5 p-3 py-0 font-semibold">
          <li className="nav-item">
            <ul>
              {MENU_ITEMS.map((item, idx) => {
                if (item.link) {
                  return (
                    <li className="nav-item" key={idx}>
                      <Link
                        href={item.link ?? ""}
                        className="group"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <div className="flex items-center">
                          {ICONS_MENU[item.icon as keyof typeof ICONS_MENU]}
                          <span className="text-black pl-3 dark:text-[#506690] dark:group-hover:text-white-dark">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </li>
        </ul>
      </PerfectScrollbar>
    </div>
  );
};
