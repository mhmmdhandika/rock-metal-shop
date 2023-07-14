'use client'

import { IoSend as SendIcon } from "react-icons/io5";

function NewsLetter() {
  return (
    <div
      className="mb-5 bg-[#FCF5F5]"
      style={{
        backgroundImage: `url("/assets/img/newsletter/bg-crowd-metal.jpg"), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
      }}
    >
      <div className="section-space-x flex flex-col items-center justify-center gap-3 py-16">
        <h1 className="text-4xl font-bold text-white">NewsLetter</h1>
        <p className="text-white">Get timely updates from your favorite products</p>
        <div className="flex items-center justify-center">
          <input type="email" placeholder="Your email" className="h-9 px-3" />
          <button className="h-9 bg-teal-400 px-5 text-white">
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
export default NewsLetter;
