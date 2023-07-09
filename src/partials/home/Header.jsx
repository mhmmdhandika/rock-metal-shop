"use client";

import { headerItems } from "@/data/content";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";

function Header() {
  return (
    <header className="overflow-hidden relative -top-[66px]">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {headerItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative min-h-screen w-full"
              style={{
                backgroundImage: `url("${item.img}"), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundBlendMode: "multiply",
              }}
            >
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white flex flex-col justify-center items-center gap-2">
                <h1 className="text-5xl font-bold">{item.title}</h1>
                <p>{item.desc}</p>
                <a
                  href="#"
                  className="block w-fit border border-white px-3 py-2"
                >
                  SHOP NOW
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </header>
  );
}
export default Header;
