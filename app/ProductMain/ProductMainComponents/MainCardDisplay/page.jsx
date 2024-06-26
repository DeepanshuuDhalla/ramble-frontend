"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Image,
} from "@material-tailwind/react";
import "./productpage.css";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Carousel } from "@material-tailwind/react";
import { Spinner } from "@nextui-org/react";
export default function HorizontalCard({ serviceID }) {
  const [deviceSize, setDeviceSize] = React.useState("sm");
  const [serviceData, setServiceData] = React.useState(null); // Add this state for storing service data
  const [quantity, setQuantity] = React.useState(1);
  const [showSpinner, setShowSpinner] = React.useState(true);
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setDeviceSize("sm");
      } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
        setDeviceSize("md");
      } else {
        setDeviceSize("lg");
      }
    }

    // Add the event listener
    window.addEventListener("resize", handleResize);

    // Call it once to set the initial size
    handleResize();

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        if (serviceID) {
          const response = await fetch(
            `/api/search/service-details?serviceId=${serviceID}`
          );

          if (response.ok) {
            const data = await response.json();
            setServiceData(data.data.service);
            setShowSpinner(false);
          } else {
            console.error("Error fetching service details");
          }
        }
      } catch (error) {
        console.error("Error fetching service details", error);
      }
    }

    fetchData();
  }, []);
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const response = await fetch("/api/cart/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          serviceId: serviceData.id,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        console.log("Item added to cart successfully");
        toast.success("Added Successfully");
        // Optionally, you can show a success message or update the UI
      } else {
        console.error("Error adding item to cart");
        // Handle the error, show an error message, or update the UI accordingly
      }
    } catch (error) {
      console.error("Error adding item to cart", error);
      toast.error("Error adding Product", error);
    }
  };


  return (
    <>
      <div className="lg:p-14 md:p-16 p-11">
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="">
            <div className="lg:w-5/5 mx-auto flex flex-wrap justify-between m-auto lg:ml-9 md:ml-0 ml-0">
              {serviceData && (
                <Carousel
                  transition={{ duration: 2 }}
                  className="rounded-xl lg:w-3/5 w-full lg:h-full md:h-auto h-auto lg:mt-20 mt-auto mb-8"
                >
                  {serviceData.image_url.map((image) => (
                    <img
                      key={image}
                      src={image}
                      alt="image 1"
                      className="h-full w-full object-cover"
                    />
                  ))}
                </Carousel>
              )}
              {serviceData && (
                <div className="lg:w-2/5 w-full lg:pl-10 lg:py-6 mt-8 lg:mt-0 border-orange-500">

                  <h2 className="text-sm title-font text-gray-500 tracking-widest mb-5">
                    {serviceData.category_name}
                  </h2>
                  <h1 className="text-white text-3xl title-font font-medium mb-3">
                    {" "}
                    {serviceData.name}
                  </h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <span className="text-gray-300">{serviceData.code}</span>
                    </span>
                  </div>
                  <p className="leading-relaxed"></p>
                  <div className="flex mt-12 items-center  mb-5">
                    <div className="flex w-72">
                      <span className="mr-3 font-bold text-xl text-white">
                        Media
                      </span>
                    </div>
                    <div className="flex ml-6 items-center  w-72">
                      <span className="mr-3 font-bold text-xl text-white">
                        Size
                      </span>
                    </div>
                    <div className=" flex ml-6 items-center  w-72">
                      <span className="mr-3 font-bold text-xl text-white">
                        Total area
                      </span>
                    </div>
                  </div>
                  <div className="flex mt-6 items-center ">
                    <div className="flex w-72">
                      <span className="mr-3">{serviceData.media}</span>
                    </div>
                    <div className="flex ml-6 items-center  w-72">
                      <span className="mr-3">{serviceData.size}</span>
                    </div>
                    <div className="flex ml-6 w-72">
                      <span className="mr-3">{serviceData.total_area}</span>
                    </div>
                    {/* <div className="flex ml-6 items-center w-24">
                    <span className="mr-3">{serviceData.ftf}</span>
                  </div> */}
                  </div>
                  <div className="flex mt-20 items-center  mb-5">
                    <div className=" w-72">
                      <span className="mr-3 font-bold text-xl text-white">
                        Used For
                      </span>
                    </div>
                    <div className="flex ml-6 items-center  w-72">
                      <span className="mr-3 font-bold text-xl text-white">
                        Location
                      </span>
                    </div>
                    <div className="flex ml-6 items-center w-18"></div>
                  </div>
                  <div className="flex mt-6 items-center ">
                    <div className="flex w-72">
                      <span className="mr-3">{serviceData.ftf}</span>
                    </div>
                    <div className="flex ml-6 items-center  lg:w-80 md:w-80 w-96">
                      <span className="mr-3">{serviceData.location}</span>
                    </div>
                  </div>
                  {/* <p className="leading-relaxed text-xs md:text-sm lg:text-base mt-9">{serviceData.description}</p> */}
                  <div className="flex justify-evenly items-center">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="w-16 h-10 mr-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mt-12"
                    />
                    <Button
                      size="sm"
                      color="warning"
                      className="m-auto flex justify-between gap-3 p-2 lg:text-sm md:text-md text-sm mt-12 text-white hover:bg-gradient-to-r from-[#F5A524] to-[#FF705B] to-danger transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300"
                      onClick={handleAddToCart}
                    >
                      {" "}
                      Add To Cart
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {serviceData && (
              <div>
                <div >
                  <h1 className="font-bold lg:text-3xl md:text-xl text-xl text-white mt-6 mb-6">
                    Description
                  </h1>
                  <div className="flex flex-wrap w-full">
                    <pre className="w-full overflow-x-auto break-all whitespace-pre-wrap text-white font-sans flex items-center">
                      {serviceData?.description}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      {serviceData && (
        <div className="pt-0 flex justify-center items-center text-base md:text-lg lg:text-xl font-bold">
          <span className="border-solid border-1 p-2 ">
            Daily spend :{" "}
            <span className="bg-gradient-to-r from-[#F5A524] to-[#FF705B] to-danger bg-clip-text text-transparent">
              ₹{serviceData.price}
            </span>
          </span>
        </div>
      )}
      {showSpinner && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <Spinner color="white" />
        </div>
      )}
    </>
  );
}
