"use client";
import { FC } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { GiSettingsKnobs } from "react-icons/gi";
import MenuItem from "./MenuItem";
import useSettingModal from "@/app/hooks/useSettingsModal";

const UserMenu: FC = () => {
  const settingModal = useSettingModal();

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={settingModal.onOpen}
          className="p-4 md:py-1 md:px-2  border-[1px] border-neutral-900 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <GiSettingsKnobs size={20} />
        </div>
        <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-900 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
          <AiOutlineMenu size={20} />
        </div>
      </div>
      {/* {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={loginModal.onOpen} label="Login" />
              <MenuItem onClick={registerModal.onOpen} label="SignUp" />
            </>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default UserMenu;
