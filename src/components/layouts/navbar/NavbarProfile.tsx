import Dropdown from "@/components/dropdown/Dropdown";
import IconLockDots from "@/components/icon/icon-lock-dots";
import IconLogout from "@/components/icon/icon-logout";
import IconMail from "@/components/icon/icon-mail";
import IconUser from "@/components/icon/icon-user";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const NavbarProfile = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="dropdown flex shrink-0">
      <Dropdown
        offset={[0, 8]}
        // placement={`${false ? "bottom-start" : "bottom-end"}`}
        btnClassName="relative group block"
        button={
          <Image
            className="rounded-full object-cover saturate-50 group-hover:saturate-100"
            src="/assets/images/user-profile.jpeg"
            alt="userProfile"
            height={36}
            width={36}
          />
        }
      >
        <ul className="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
          <li>
            <div className="flex items-center px-4 py-4">
              <Image
                className="h-10 w-10 rounded-md object-cover"
                src="/assets/images/user-profile.jpeg"
                alt="userProfile"
                height={40}
                width={40}
              />
              <div className="truncate pl-4">
                <h4 className="text-base">
                  John Doe
                  <span className="rounded bg-success-light px-1 text-xs text-success ml-2">
                    Pro
                  </span>
                </h4>
                <button
                  type="button"
                  className="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                >
                  johndoe@gmail.com
                </button>
              </div>
            </div>
          </li>
          <li>
            <Link href="/users/profile" className="dark:hover:text-white">
              <IconUser className="h-4.5 w-4.5 shrink-0 mr-2" />
              Profile
            </Link>
          </li>
          <li>
            <Link href="/apps/mailbox" className="dark:hover:text-white">
              <IconMail className="h-4.5 w-4.5 shrink-0 mr-2" />
              Inbox
            </Link>
          </li>
          <li>
            <Link
              href="/auth/boxed-lockscreen"
              className="dark:hover:text-white"
            >
              <IconLockDots className="h-4.5 w-4.5 shrink-0 mr-2" />
              Lock Screen
            </Link>
          </li>
          <li className="border-t border-white-light dark:border-white-light/10">
            {/* <form className="px-[1rem]" onSubmit={handleLogout}>
              <div className="!py-3 text-danger flex items-center gap-2">
                <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2" />
                <button type="submit">Sign Out</button>
                </div>
                </form> */}
            <button onClick={handleLogout} className="!py-3 text-danger">
              <IconLogout className="h-4.5 w-4.5 shrink-0 rotate-90 mr-2" />
              Sign Out
            </button>
          </li>
        </ul>
      </Dropdown>
    </div>
  );
};
