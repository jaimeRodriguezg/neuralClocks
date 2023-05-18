"use client";

import Container from "../container/Container";
import Logo from "./Logo";
import Tabs from "./Tabs";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-[rgba(255,255,255,0.65)] z-10 shadow-sm">
      <div className="py-4 ">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Tabs />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
