import { CgCheckO as CheckIcon } from "react-icons/cg";
import Link from "next/link";

function SuccessPaymentPage() {
  return (
    <div className="section-space-x flex min-h-[calc(100vh-66px)] flex-col items-center justify-center gap-5">
      <div>
        <CheckIcon size={80} className="text-blue-800" />
      </div>
      <h1 className="text-4xl font-semibold">Payment Successfully</h1>
      <Link
        href="/products"
        className="border-2 border-black px-4 py-1 text-lg"
      >
        Back
      </Link>
    </div>
  );
}

export default SuccessPaymentPage;
