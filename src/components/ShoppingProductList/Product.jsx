import Image from 'next/image'
import ActionButtons from "./ActionButtons";

function Product({ item }) {
  return (
    <div
      key={item.id}
      className="group relative flex flex-col justify-center overflow-hidden bg-slate-100"
    >
      <Image 
        src={item.img} 
        alt={item.title}
        width={500}
        height={500}
        className="w-full px-5" 
      />
      <div className="duration-800 ease absolute z-10 h-full w-full bg-black/30  opacity-0 transition-all group-hover:opacity-100">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="mb-2 text-center text-lg font-semibold text-white">
            {item.title}
          </h1>
          <ActionButtons product={item} itemId={item._id} />
        </div>
      </div>
    </div>
  );
}

export default Product;
