"use client";

import { Suspense } from "react";
import ShoppingProductListServer from "@/components/ShoppingProductList/ServerComponent";
import ShoppingProductListLoading from "@/components/ShoppingProductList/Loading";
import Loading from "@/components/Loading";
import Link from "next/link";
import { AiOutlineArrowRight as ArrowRight } from "react-icons/ai";

import { headerItems } from "@/data/content";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/autoplay";

export default function Home() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <header className="overflow-hidden">
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
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${item.img}")`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundBlendMode: "multiply",
                  }}
                >
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 text-center text-white">
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
      </Suspense>
      <Suspense fallback={<ShoppingProductListLoading />}>
        <div className="section-space-x mt-5 flex items-center justify-between">
          <h2 className="text-xl">Featured products</h2>
          <Link
            href="/products"
            className="flex items-center gap-2 px-2 py-1 text-lg hover:underline"
          >
            Show all <ArrowRight size={15} />
          </Link>
        </div>
        <ShoppingProductListServer limit={12} />
      </Suspense>
    </>
  );
}
