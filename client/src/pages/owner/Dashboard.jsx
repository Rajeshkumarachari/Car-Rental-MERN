import React, { useEffect, useState } from "react";
import { assets, dummyDashboardData } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, isOwner, currency, dash } = useAppContext();
  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });
  // console.log(data);

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        // console.log(data);
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const dashboardCards = [
    {
      title: "Total Cars",
      value: data.totalCars,
      icons: assets.carIconColored,
    },
    {
      title: "Total Bookings",
      value: data.totalBookings,
      icons: assets.listIconColored,
    },
    {
      title: "Pending ",
      value: data.pendingBookings,
      icons: assets.cautionIconColored,
    },
    {
      title: "Confirmed",
      value: data.completedBookings,
      icons: assets.listIconColored,
    },
  ];
  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);
  //console.log(data);
  return (
    <div className=" px-4 pt-10 md:px-10 flex-1">
      <Title
        title={"Admin Dashboard"}
        subTitle={
          "Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
        }
      />
      <div className=" grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 my-8 max-w-3xl">
        {dashboardCards.map((card, index) => (
          <div
            className=" flex gap-2 justify-between items-center p-4 rounded-md border border-borderColor"
            key={index}
          >
            <div className="">
              <h1 className=" text-xs text-gray-500">{card.title} </h1>
              <p className=" text-lg font-semibold">{card.value} </p>
            </div>
            <div className=" flex justify-center items-center size-10  rounded-full bg-primary/10">
              <img src={card.icons} alt="car" className="ize-4 " />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* Recent Bookings */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full">
          <h1 className=" text-lg font-medium">Recent Bookings</h1>
          <p className=" text-gray-500">Latest customer bookings</p>

          {data.recentBookings.map((booking, i) => (
            <div className=" mt-4 flex justify-between items-center" key={i}>
              <div className="flex items-center gap-2">
                <div className=" hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 ">
                  <img
                    src={assets.listIconColored}
                    alt="listIconColored"
                    className=" size-5"
                  />
                </div>
                <div className="">
                  <p>
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className=" text-sm text-gray-500">
                    {booking.car.createdAt.split("T")[0]}{" "}
                  </p>
                </div>
              </div>

              <div className=" flex items-center gap-2 font-medium ">
                <p className=" text-sm text-gray-500">
                  {currency} {booking.price} {dash}
                </p>
                <p
                  className={` px-3 py-0.5 border border-borderColor rounded-full text-sm ${
                    booking.status === "confirmed"
                      ? " bg-green-200"
                      : "bg-red-200"
                  } `}
                >
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Monthly Revenue */}
        <div className=" p-4  md:p-6 border border-borderColor rounded-md w-full md:max-w-xs">
          <h1 className=" text-lg font-medium ">Monthly Revenue</h1>
          <p className=" text-gray-500">Revenue for current month</p>
          <p className=" text-primary text-3xl mt-6 font-semibold ">
            {currency} {data.monthlyRevenue}
            {dash}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
