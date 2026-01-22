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
      <div className="relative min-h-[700px] lg:min-h-[702px]">
        {/* Left Side - Content */}
        <div className="relative z-10 px-8 pt-24 pb-16 lg:pl-32 lg:pr-0 lg:pt-[200px] lg:pb-0 lg:max-w-[733px]">
          <div className="flex flex-col gap-6 max-w-[605px]">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl lg:leading-hero text-black">
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

        {/* Right Side - Bento Grid (Variation 2) */}
        <div className="relative lg:absolute lg:right-[calc(8.33%+22px)] lg:top-0 h-auto lg:h-[655px] w-full lg:w-[320px] px-8 lg:px-0 pb-8 lg:pb-0">
          <div className="grid grid-cols-2 gap-4 w-full max-w-[320px] mx-auto lg:mx-0">
            {/* Column 1 - Left */}
            <div className="flex flex-col gap-4 lg:mt-[92px]">
              {/* Rounded rectangle (cut off at top) */}
              <div className="w-full h-[100px] lg:h-[128px] rounded-[24px] overflow-hidden relative lg:-mt-8">
                <Image
                  src="/images/bento/photobooth.jpg"
                  alt="UXHI photobooth"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Full tall pill */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-[99px] overflow-hidden relative opacity-90">
                <Image
                  src="/images/bento/group-leis.jpg"
                  alt="UXHI community members with leis"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Pill-bottom shape */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-lg rounded-b-[99px] overflow-hidden relative">
                <Image
                  src="/images/bento/uxhicon-25.jpg"
                  alt="UXHICon 25"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            {/* Column 2 - Right */}
            <div className="flex flex-col gap-4">
              {/* Pill-bottom shape */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-t-lg rounded-b-[99px] overflow-hidden relative">
                <Image
                  src="/images/bento/conference.jpg"
                  alt="UXHI conference"
                  fill
                  className="object-cover"
                />
              </div>
              {/* UXHI Motif Pattern */}
              <div className="w-[128px] mx-auto flex items-center justify-center">
                <Image
                  src="/images/bento/uxhi-motif-2.svg"
                  alt="UXHI motif"
                  width={128}
                  height={128}
                  className="w-[128px] h-[128px]"
                />
              </div>
              {/* Regular rectangle */}
              <div className="w-full h-[180px] lg:h-[201px] rounded-lg overflow-hidden relative">
                <Image
                  src="/images/bento/crowd-community.jpg"
                  alt="UXHI community crowd"
                  fill
                  className="object-cover"
                />
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
