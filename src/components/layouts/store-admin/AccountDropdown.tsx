import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import Button from "@/components/core/Button";
import { ReactSVG } from "react-svg";
import { useSession, signOut } from "next-auth/react";
import Avatar from "@/components/common/Avatar";

const AccountDropdown = () => {
  const { data: session, status } = useSession();

  const user = session?.user;

  const [modalLogoutShow, setModalLogoutShow] = useState(false);

  return (
    <div className="group relative z-50">
      <div className="rounded-full transition-all cursor-pointer duration-200 outline-none h-[35px] w-[35px] hover:ring-[2px] hover:ring-dropzhip_blue-light">
        <Avatar name={session?.user?.username} height={35} width={35} />
      </div>
      <div className="absolute z-0 right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-in-out pt-[15px] whitespace-nowrap">
        <div className="p-4 bg-base-100 w-[300px] shadow-xl rounded-lg">
          <p className="text-sub1 text-base-900 font-medium mb-2">
            Hi, {user?.name}
          </p>
          <div>
            <div className="text-sub2 text-base-800 font-normal">
              {user?.is_admin ? "Admin" : null}
            </div>
            <div className="text-sub3 text-base-600 font-normal">
              Valid until 30 Jun 2022
            </div>
          </div>
          <hr className="h-px w-full bg-base-200 my-2.5" />
          <div className="space-y-2">
            <Link href="/account" passHref>
              <a href="" className="block">
                <Button
                  type="button"
                  size="m"
                  className="flex items-center justify-center"
                  full
                >
                  <ReactSVG
                    width={24}
                    height={24}
                    wrapper="svg"
                    src="/icons/line/Setting.svg"
                  />
                  <span className="text-base-100 text-sub3 font-medium">
                    Account Settings
                  </span>
                </Button>
              </a>
            </Link>
            {/* ADMIN */}
            {user?.is_admin && (
              <Link href="/users" passHref>
                <a href="" className="block">
                  <Button
                    size="m"
                    type="button"
                    className="flex items-center justify-center"
                    full
                  >
                    <ReactSVG
                      width={24}
                      height={24}
                      wrapper="svg"
                      src="/icons/line/Setting.svg"
                    />
                    <span className="text-base-100 text-sub3 font-medium">
                      Manage Users
                    </span>
                  </Button>
                </a>
              </Link>
            )}
            <Button
              size="m"
              type="button"
              variant="secondary"
              className="flex items-center justify-center"
              onClick={() => signOut()}
              full
            >
              <ReactSVG
                width={24}
                height={24}
                wrapper="svg"
                src="/icons/line/Logout.svg"
              />
              <span className="text-sub3 font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDropdown;
