"use client";
import { FC } from "react";
import { useRouter, usePathname } from "next/navigation";

interface TabProp {
  title: string;
  route: string;
}

const Tab: FC<TabProp> = ({ title, route }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      onClick={() => router.push(route)}
      className={`${
        pathname === route ? "bg-gray-100" : "null"
      } flex justify-center w-[200px] border-[1px] border-neutral-900 rounded-full cursor-pointer hover:shadow-md transition`}
    >
      {title}
    </div>
  );
};

const Tabs: FC = () => {
  return (
    <div className="hidden md:flex gap-5">
      <Tab title="Pomodoro" route="/" />
      <Tab title="Short Break" route="/shortBreak" />
      <Tab title="Long Break" route="/longBreak" />
    </div>
  );
};

export default Tabs;
