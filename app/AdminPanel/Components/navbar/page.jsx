"use client"
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { DrawerWithNavigation } from "../sidebar/Drawer.jsx";

export default function NavbarAdmin() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="navbar px-7">
      <Navbar>
        <NavbarBrand>
          <img src="favicon.ico" alt="Ramble group" className="m-1" />
          <Link href="/">
            <a className="font-bold text-inherit" style={{ color: "white" }}>Ramble Group</a>
          </Link>
        </NavbarBrand>

        <NavbarContent className="flex gap-4" justify="center">
          <NavbarItem>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer" onClick={handleSidebarToggle} >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
            </svg>

          </NavbarItem>

        </NavbarContent>

        <NavbarContent as="div" justify="end">
          {/* <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
        </NavbarContent>

      </Navbar>
      {isSidebarOpen && <DrawerWithNavigation />}
    </div>
  );
}
