import { IoSend as SendIcon } from "react-icons/io5";

function NewsLetter() {
  return (
    <div
      className="mb-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("/assets/img/newsletter/bg-crowd-metal.jpg")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundColor: '#161b1d',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="section-space-x flex flex-col items-center justify-center gap-3 py-16">
        <h1 className="text-4xl font-bold text-white">NewsLetter</h1>
        <p className="text-white">Get timely updates from your favorite products</p>
        <div className="flex items-center justify-center">
          <input type="email" placeholder="Your email" className="h-9 px-3" />
          <button className="h-9 bg-slate-900 px-5 text-white border-2 border-white">
            <SendIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
export default NewsLetter;
