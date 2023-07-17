export default function Loading() {
  const cardQuantity = 8;
  const cards = Array.from({ length: cardQuantity }, (_, index) => (
    <div
      key={index}
      className="h-[20rem] w-full group relative flex flex-col justify-center overflow-hidden bg-slate-100"
    ></div>
  ));

  return (
    <div className="section-space-x my-5">
      <div className="grid grid-cols-1 justify-between gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {cards}
      </div>
    </div>
  );
}
