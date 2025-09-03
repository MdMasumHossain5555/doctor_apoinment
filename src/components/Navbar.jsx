"use client"
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { useState, useEffect} from "react";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSelector } from "react-redux";






function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
     const role = useSelector((state) => state.auth.role);
     const token = useSelector((state) => state.auth.token);
     const [mounted, setMounted] = useState(false);
     const [activeItem, setActiveItem] = useState(false);

     useEffect(() => {
       setMounted(true);
     }, []);

     if (!mounted) {
       return null; // ✅ এখন safe, কারণ useState/useEffect সবসময় call হচ্ছে
     }

     const lowerRole = role ? role.toLowerCase() : null;
     if (!lowerRole) {
       return null;
     }
  const navigation = [
    { name: "Dashboard", href: `/${lowerRole}/dashboard`, current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
  ];
  console.log("navbar :",role);
  
  return (
    <Disclosure
      as="nav"
      className="relative after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-white/5 hover:text-blue-500 focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center text-blue-400">
              DOCTOR&#39;S
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    // aria-current={item.current ? "page" : undefined}
                    onClick={() => setActiveItem(item.name)}
                    className={classNames(
                      activeItem === item.name
                        ? "bg-gray-400 text-blue-300"
                        : "text-blue-300 hover:bg-gray-400 hover:text-blue-500",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Login and Register */}
            <Link href={token ? "#" : "/pages/login"} className="ml-3">
              <button className="w-[70px] h-10 rounded-[5px] text-white p-2 bg-blue-500 hover:bg-blue-700 ml-1.5">
                {token ? "Profile" : "Login"}
              </button>
            </Link>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-950/50 text-white"
                  : "text-gray-300 hover:bg-white/5 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
