'use client';
import { FC, useState, useCallback, useContext } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { GiSettingsKnobs } from 'react-icons/gi';
import MenuItem from './MenuItem';
import useSettingModal from '@/app/hooks/useSettingsModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { UserContext } from '@/app/context/user';

const UserMenu: FC = () => {
  const settingModal = useSettingModal();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { email, cognitoUser, signOut } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex w-full flex-row items-center gap-3">
        <div
          onClick={settingModal.onOpen}
          className="p-4 md:py-1 md:px-2  border-[1px] border-neutral-900 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <GiSettingsKnobs size={20} />
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-900 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu size={20} />
        </div>
      </div>
      {isOpen && !cognitoUser && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-40 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={loginModal.onOpen} label="Login" />
              <MenuItem onClick={registerModal.onOpen} label="SignUp" />
            </>
          </div>
        </div>
      )}
      {isOpen && cognitoUser && email && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-40 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={() => {}} label={email} />
              <MenuItem onClick={signOut} label="Sign Out" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
