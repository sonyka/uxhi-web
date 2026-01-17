import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | UX Hawaii",
  description:
    "Show your UXHI pride with official merchandise. T-shirts, stickers, and more.",
};

// Arrow Icon Component
function ArrowIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

// Placeholder products
const products = [
  {
    id: "1",
    name: "UXHI Sticker Pack",
    price: "$10",
    category: "Stickers",
    variants: ["Holographic", "Matte"],
    comingSoon: true,
  },
  {
    id: "2",
    name: "UXHI Classic Tee",
    price: "$28",
    category: "Shirts",
    variants: ["S", "M", "L", "XL", "2XL"],
    comingSoon: true,
  },
  {
    id: "3",
    name: "UXHI Conference Tee",
    price: "$32",
    category: "Shirts",
    variants: ["S", "M", "L", "XL"],
    comingSoon: true,
  },
  {
    id: "4",
    name: "UXHI Travel Mug",
    price: "$18",
    category: "Cups",
    variants: ["12oz", "16oz"],
    comingSoon: true,
  },
  {
    id: "5",
    name: "UXHI Gel Pen Set",
    price: "$12",
    category: "Pens",
    variants: ["Black", "Teal"],
    comingSoon: true,
  },
  {
    id: "6",
    name: "UXHI Canvas Tote",
    price: "$22",
    category: "Tote Bags",
    variants: ["Natural", "Black"],
    comingSoon: true,
  },
];

// Category icons
function getCategoryIcon(category: string) {
  switch (category) {
    case "Stickers":
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
        </svg>
      );
    case "Shirts":
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      );
    case "Cups":
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      );
    case "Pens":
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>
      );
    case "Tote Bags":
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      );
    default:
      return (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
        </svg>
      );
  }
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row pt-24 lg:pt-0 lg:min-h-[85vh]">
        {/* Left Side - Content */}
        <div className="lg:w-[60%] flex items-center px-8 lg:px-16 py-16 lg:py-24">
          <div className="max-w-[560px]">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-6 leading-[1.1]">
              Shop
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Show your UXHI pride with official merchandise. All proceeds support community events and programs.
            </p>
            <Link
              href="#products"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-900 font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Browse merch
              <span className="w-7 h-7 bg-[#f5c542] rounded-full flex items-center justify-center">
                <ArrowIcon className="w-3.5 h-3.5 text-gray-900" />
              </span>
            </Link>
          </div>
        </div>

        {/* Right Side - Image Grid */}
        <div className="lg:w-[40%] flex items-start justify-end pr-0 lg:pr-0 py-8 lg:py-0 overflow-hidden">
          <div className="grid grid-cols-2 gap-4 w-full max-w-[480px] lg:max-w-none lg:w-[480px] px-8 lg:px-0 lg:mr-[-40px]">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              {/* Rounded rectangle - cut off at top */}
              <div className="w-full h-[180px] lg:h-[220px] rounded-[24px] overflow-hidden lg:-mt-12 relative">
                <Image
                  src="/images/bento/photobooth.jpg"
                  alt="UXHI photobooth"
                  fill
                  className="object-cover"
                />
              </div>
              {/* UXHI Motif */}
              <div className="w-full aspect-square flex items-center justify-center">
                <Image
                  src="/images/bento/uxhi-motif-2.svg"
                  alt="UXHI motif"
                  width={200}
                  height={200}
                  className="w-full h-auto max-w-[200px]"
                />
              </div>
              {/* Tall pill shape */}
              <div className="w-full h-[280px] lg:h-[320px] rounded-[999px] overflow-hidden relative">
                <Image
                  src="/images/bento/group-leis.jpg"
                  alt="UXHI community members with leis"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-4 pt-8">
              {/* Rounded rectangle 1 */}
              <div className="w-full h-[200px] lg:h-[288px] rounded-[24px] overflow-hidden relative">
                <Image
                  src="/images/bento/uxhicon-25.jpg"
                  alt="UXHICon 25"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Rounded rectangle 2 */}
              <div className="w-full h-[200px] lg:h-[288px] rounded-[24px] overflow-hidden relative">
                <Image
                  src="/images/bento/conference.jpg"
                  alt="UXHI conference"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section id="products" className="py-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-[20px] overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image Placeholder */}
                <div className="aspect-square bg-cream flex items-center justify-center relative">
                  <div className="text-purple-300">
                    {getCategoryIcon(product.category)}
                  </div>
                  <span className="absolute top-4 left-4 bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h2 className="font-semibold text-lg text-gray-900 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">
                    {product.variants.join(" · ")}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xl text-purple-700">
                      {product.price}
                    </span>
                    {product.comingSoon ? (
                      <span className="text-gray-400 text-sm font-medium">
                        Coming soon
                      </span>
                    ) : (
                      <button className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-600 transition-colors">
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Notice */}
          <div className="mt-16 bg-purple-50 border border-purple-100 rounded-[24px] p-8 text-center">
            <h3 className="font-display text-2xl text-purple-700 mb-4">
              More products coming soon!
            </h3>
            <p className="text-gray-600 mb-6 max-w-[500px] mx-auto">
              We&apos;re working on expanding our merch collection. Join our mailing list to be notified when new products drop.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-6 pr-2 py-2 font-medium hover:bg-gray-50 transition-colors group"
            >
              <span className="text-gray-900">Join the community</span>
              <span className="w-9 h-9 rounded-full bg-[#f5c542] flex items-center justify-center group-hover:bg-[#e5b532] transition-colors">
                <ArrowIcon className="w-4 h-4 text-gray-900" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
