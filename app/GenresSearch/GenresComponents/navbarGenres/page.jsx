"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Divider,
} from "@nextui-org/react";
import {
  NavbarMenuToggle,
  NavbarContent,
  NavbarMenuItem,
  NavbarMenu,
  Button,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={height || size}
    role="presentation"
    viewBox="0 0 24 24"
    width={width || size}
    {...props}
  >
    <path
      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
    <path
      d="M22 22L20 20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
    />
  </svg>
);
const animals = [
  "Lion",
  "Tiger",
  "Elephant",
  "Giraffe",
  "Zebra",
  "Monkey",
  "Penguin",
];
const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);


export default function NavbarG() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isOpenFirstModal, setOpenFirstModal] = React.useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const openFirstModal = () => setOpenFirstModal(true);
  const closeFirstModal = () => setOpenFirstModal(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  return (
    <div className="navbar px-7">
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="flex justify-between"
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent justify="start" className="max-w-full ">
          <NavbarBrand className="mr-4 ">
            <AcmeLogo />
            <p className="hidden sm:block font-bold text-inherit text-xl">
              Ramble Group
            </p>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent>
          <Input
            onClick={openFirstModal}
            classNames={{
              base: "md:w-full lg:w-full h-10 w-48",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            startContent={<SearchIcon size={18} />}
            type="search"
          >
            {" "}
          </Input>
          <Modal
            isOpen={isOpenFirstModal}
            onOpenChange={closeFirstModal}
            placement="top-center"
            backdrop="blur"
            className="lg:mt-0 md:mt-0 mt-6"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {" "}
                    <Input
                      autoFocus
                      label="Location"
                      placeholder="Search by Location"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      variant="bordered"
                      className="p-2"
                    />
                  </ModalHeader>
                  <Divider />
                  <ModalBody>
                    {searchQuery.trim() === "" ? (
                      <p>No results found.</p>
                    ) : (
                      animals
                        .filter((animal) =>
                          animal
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((filteredAnimal, index) => (
                          <Card key={index}>
                            <CardBody className=" hover:bg-gradient-to-tr from-[#F5A524] to-[#FF705B] transition-transform-background cursor-pointer" >
                              <p >{filteredAnimal}</p>
                            </CardBody>
                          </Card>

                        ))
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={onClose}>
                      Search
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </NavbarContent>

        <NavbarContent
          as="div"
          className="items-center hidden md:flex lg:flex gap-12"
          justify="end"
        >
          <NavbarItem>
            <Link color="foreground" href="#">
              About us
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-orange-800"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              <Button color="warning" variant="flat" onClick={onOpen}>
                Login
              </Button>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Log in
                      </ModalHeader>
                      <ModalBody>
                        <Input
                          autoFocus
                          label="Email"
                          placeholder="Enter your email"
                          variant="bordered"
                        />
                        <Input
                          label="Password"
                          placeholder="Enter your password"
                          type="password"
                          variant="bordered"
                        />
                        <div className="flex py-2 px-1 justify-between">
                          <Checkbox
                            classNames={{
                              label: "text-small",
                            }}
                          >
                            Remember me
                          </Checkbox>
                          <Link color="primary" href="#" size="sm">

                          </Link>
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                          Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Sign in
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
