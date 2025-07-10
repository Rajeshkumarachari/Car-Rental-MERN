import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { dot, currency, dash, user, axios } = useAppContext();

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/booking/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // console.log(bookings);
  useEffect(() => {
    user && fetchMyBookings();
  }, [user]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className=" px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl"
    >
      <h1></h1>
      <Title
        title="My Bookings"
        subTitle="View and manage your all car bookings"
        align="left"
      />
      {bookings.map((booking, i) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className=" grid grid-cols-1 md:grid-cols-4  gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
          key={i}
        >
          <div className="md:col-span-1">
            <div className=" rounded-md overflow-hidden mb-3">
              <img
                src={booking.car.image}
                alt="image"
                className=" w-full h-auto aspect-video object-cover"
              />
            </div>
            <p className=" text-lg font-medium mt-2">
              {booking.car.brand} {booking.car.model}
            </p>
            <p className=" text-gray-500">
              {booking.car.year} {dot} {booking.car.category} {dot}
              {booking.car.location}
            </p>
          </div>

          <div className="md:col-span-2">
            <div className=" flex items-center gap-2">
              <p>Booking #{i + 1} </p>
              <p
                className={`px-3 py-1 text-xs rounded-full ${
                  booking.status === "confirmed"
                    ? " text-green-600 bg-green-400/14"
                    : "bg-red-400/15 text-red-6 00"
                }`}
              >
                {booking.status}
              </p>
            </div>
            <div className="flex items-start gap-2 mt-3">
              <img
                src={assets.calendar_icon_colored}
                alt="calendar_icon_colored"
                className=" size-4 mt-1"
              />
              <div className="">
                <p className="text-gray-500">Rental Period</p>
                <p>
                  {booking.pickupDate.split("T")[0]} To{" "}
                  {booking.returnDate.split("T")[0]}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 mt-3">
              <img
                src={assets.location_icon_colored}
                alt="calendar_icon_colored"
                className=" size-4 mt-1"
              />
              <div className="">
                <p className="text-gray-500">Pick-up Location</p>
                <p>{booking.car.location}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 mt-3">
              <img
                src={assets.location_icon_colored}
                alt="calendar_icon_colored"
                className=" size-4 mt-1"
              />
              <div className="">
                <p className="text-gray-500">Pick-up Location</p>
                <p>{booking.car.location}</p>
              </div>
            </div>
          </div>
          <div className=" md:col-span-1 flex flex-col justify-between gap-6">
            <div className=" textsm text-gray-500 text-right">
              <p className="">Total Price</p>
              <h1 className=" text-2xl font-semibold text-primary">
                {currency} {booking.price}
                {dash}
              </h1>
              <p>Booked on {booking.createdAt.split("T")[0]} </p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MyBookings;
