import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Manjunath",
      location: "Chennai India",
      image: assets.rajni,
      rating: 5,
      testimonial:
        "I've rented cars from various companies, but the experience with CarRental was exceptional.",
    },
    {
      name: "Nayeem Nakeeb",
      location: "Nellore, India",
      image: assets.ajith,
      rating: 5,
      testimonial:
        "CarRental made my trip so much easier. The car was delivered right to my door, and the customer service was fantastic!",
    },
    {
      name: "Saravanan",
      address: "Barcelona, Spain",
      location: "Chennai India",
      image: assets.suriya,
      rating: 5,
      testimonial:
        "I highly recommend CarRental! Their fleet is amazing, and I always feel like I'm getting the best deal with excellent service.",
    },
  ];

  return (
    <div className=" py-28 md:px-16 lg:px-24 xl:px-44">
      <Title
        title="What Our Customers Say"
        subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
        {testimonials.map((testimonial, i) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
            viewport={{ once: "true", amount: 0.3 }}
            key={i}
            className="bg-white p-6 rounded-xl shadow-lg  hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl">{testimonial.name}</p>
                <p className="text-gray-500">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <img
                    key={index}
                    src={assets.star_icon}
                    alt="Star"
                    className=""
                  />
                  //   <Star key={index} filled={testimonial.rating > index} />
                ))}
            </div>
            <p className="text-gray-500 max-w-90 mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
