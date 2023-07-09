import { MdOutlineCancel as CancelIcon } from 'react-icons/md'
import Link from 'next/link'

function CancelPaymentPage() {
  return (
    <div className="section-space-x flex min-h-[calc(100vh-66px)] flex-col items-center justify-center gap-5">
      <div>
        <CancelIcon size={80} className="text-red-600" />
      </div>
      <h1 className="text-4xl font-semibold">Payment Canceled</h1>
      <Link
        href="/products"
        className="border-2 border-black px-4 py-1 text-lg"
      >
        Back
      </Link>
    </div>
  );
}

export default CancelPaymentPage
