import Image from "next/image";
import type { Metadata } from "next";
import { PrimaryCTA } from "@/components/ui/PrimaryCTA";
import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { SanityImage } from "@/components/ui/SanityImage";

export const metadata: Metadata = {
  title: "Shop | UX Hawaii",
  description:
    "Show your UXHI pride with official merchandise. T-shirts, stickers, and more.",
};

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

export default async function ShopPage() {
  const { data: sanityProducts } = await sanityFetch({ query: PRODUCTS_QUERY });

  // Use Sanity products if available, otherwise fall back to placeholder data
  const displayProducts = sanityProducts && sanityProducts.length > 0 ? sanityProducts : products;

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative min-h-[564px] sm:min-h-[746px] md:min-h-[747px] lg:min-h-[700px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-6 pt-32 pb-8 sm:max-w-[411px] md:max-w-[434px] lg:pl-24 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[583px] xl:max-w-[733px]">
          <div className="flex flex-col gap-6">
            <h1 className="font-display text-4xl leading-[40px] lg:text-5xl lg:leading-[60px] xl:leading-[84px] text-black">
              Shop
            </h1>
            <p className="text-black text-lg lg:text-xl leading-relaxed">
              Show your UXHI pride with official merchandise. All proceeds support community events and programs.
            </p>
            <div>
              <PrimaryCTA href="#products">Browse merch</PrimaryCTA>
            </div>
          </div>
        </div>

        {/* Mobile Bento - Horizontal layout (shown on <sm only) */}
        <div className="sm:hidden px-6 pb-8">
          <div className="flex gap-3.5 items-center w-full">
            <div className="flex-1 h-[140px] rounded-[99px] overflow-hidden relative">
              <Image src="/images/bento/group-leis.jpg" alt="UXHI community members with leis" fill className="object-cover" />
            </div>
            <div className="w-[120px] shrink-0 flex items-center justify-center">
              <Image src="/images/bento/uxhi-motif-2.svg" alt="UXHI motif" width={120} height={120} className="w-[120px] h-[120px]" />
            </div>
            <div className="flex-1 h-[140px] rounded-t-xl rounded-b-[99px] overflow-hidden relative">
              <Image src="/images/bento/conference.jpg" alt="UXHI conference" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Desktop Bento Grid - Right side (shown on sm+) */}
        <div className="hidden sm:block sm:absolute sm:right-[calc(8.33%+22px)] sm:top-[50px] md:right-[25px] md:top-[50px] lg:right-[calc(8.33%+11px)] lg:top-0 xl:right-24 sm:w-[136px] md:w-[286px] lg:w-[320px] sm:h-[503px] md:h-[585px] lg:h-[655px]">
          {/* SM layout - Single column only */}
          <div className="sm:flex md:hidden flex-col gap-3.5 absolute bottom-0 left-0 w-full">
            <div className="w-full h-[180px] rounded-[88px] overflow-hidden relative">
              <Image src="/images/bento/group-leis.jpg" alt="UXHI community members with leis" fill className="object-cover" />
            </div>
            <div className="w-[114px] mx-auto flex items-center justify-center">
              <Image src="/images/bento/uxhi-motif-2.svg" alt="UXHI motif" width={114} height={114} className="w-[114px] h-[114px]" />
            </div>
            <div className="w-full h-[180px] rounded-t-[7px] rounded-b-[88px] overflow-hidden relative">
              <Image src="/images/bento/conference.jpg" alt="UXHI conference" fill className="object-cover" />
            </div>
          </div>

          {/* MD+ layout - Two columns with absolute positioning */}
          <div className="hidden md:block relative w-full h-full">
            {/* Column 1 - Left (positioned higher) */}
            <div className="absolute bottom-[82px] lg:bottom-[92px] left-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[114px] lg:h-[128px] rounded-[24px] overflow-hidden relative">
                <Image src="/images/bento/photobooth.jpg" alt="UXHI photobooth" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[88px] lg:rounded-[99px] overflow-hidden relative opacity-90">
                <Image src="/images/bento/group-leis.jpg" alt="UXHI community members with leis" fill className="object-cover" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/bento/uxhicon-25.jpg" alt="UXHICon 25" fill className="object-cover" />
              </div>
            </div>
            {/* Column 2 - Right (positioned at bottom) */}
            <div className="absolute bottom-0 right-0 w-[calc(50%-7px)] lg:w-[calc(50%-8px)] flex flex-col gap-3.5 lg:gap-4">
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-[7px] lg:rounded-t-lg rounded-b-[88px] lg:rounded-b-[99px] overflow-hidden relative">
                <Image src="/images/bento/conference.jpg" alt="UXHI conference" fill className="object-cover" />
              </div>
              <div className="w-[114px] lg:w-[128px] mx-auto flex items-center justify-center">
                <Image src="/images/bento/uxhi-motif-2.svg" alt="UXHI motif" width={128} height={128} className="w-[114px] lg:w-[128px] h-[114px] lg:h-[128px]" />
              </div>
              <div className="w-full h-[180px] lg:h-[201px] rounded-[7px] lg:rounded-lg overflow-hidden relative">
                <Image src="/images/bento/crowd-community.jpg" alt="UXHI community crowd" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section id="products" className="pt-12 pb-20 px-6 bg-white scroll-mt-24">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product: { _id?: string; id?: string; name: string; price?: number | string; description?: string; category?: string; variants?: string[]; images?: Array<{ asset?: { _id?: string; url?: string } }>; purchaseUrl?: string; comingSoon?: boolean; featured?: boolean }) => (
              <div
                key={product._id || product.id}
                className="bg-white border border-gray-200 rounded-[20px] overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="aspect-square bg-cream flex items-center justify-center relative">
                  {product.images && product.images[0]?.asset ? (
                    <SanityImage
                      value={product.images[0]}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-purple-300">
                      {getCategoryIcon(product.category || "default")}
                    </div>
                  )}
                  {product.category && (
                    <span className="absolute top-4 left-4 bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  )}
                  {product.featured && (
                    <span className="absolute top-4 right-4 bg-yellow text-gray-900 text-xs px-3 py-1 rounded-full font-medium">
                      Featured
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h2 className="font-semibold text-lg text-gray-900 mb-2">
                    {product.name}
                  </h2>
                  {product.description && (
                    <p className="text-sm text-gray-500 mb-3">
                      {product.description}
                    </p>
                  )}
                  {product.variants && (
                    <p className="text-sm text-gray-500 mb-3">
                      {product.variants.join(" · ")}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xl text-purple-700">
                      {typeof product.price === "number" ? `$${product.price}` : product.price}
                    </span>
                    {product.comingSoon ? (
                      <span className="text-gray-400 text-sm font-medium">
                        Coming soon
                      </span>
                    ) : product.purchaseUrl ? (
                      <a
                        href={product.purchaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-600 transition-colors"
                      >
                        Buy Now
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm font-medium">
                        Coming soon
                      </span>
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
            <PrimaryCTA href="/join">Join the community</PrimaryCTA>
          </div>
        </div>
      </section>
    </main>
  );
}
