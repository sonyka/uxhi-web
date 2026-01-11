import { sanityFetch } from "@/sanity/lib/live";
import { PRODUCTS_QUERY } from "@/sanity/lib/queries";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SanityImage } from "@/components/ui/SanityImage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merch | UX Hawaii",
  description:
    "Show your UXHI pride with official merchandise. T-shirts, stickers, and more.",
};

export default async function MerchPage() {
  const { data: products } = await sanityFetch({ query: PRODUCTS_QUERY });

  // Fallback products if Sanity is empty
  const defaultProducts = [
    {
      _id: "1",
      name: "UXHI Classic Tee",
      description: "Soft, comfortable t-shirt with the UXHI logo.",
      price: 25,
      featured: true,
    },
    {
      _id: "2",
      name: "UXHI Sticker Pack",
      description: "Set of 5 high-quality vinyl stickers.",
      price: 10,
      featured: false,
    },
    {
      _id: "3",
      name: "UXHI Conference Hoodie",
      description: "Limited edition hoodie from UXHI Conference 2025.",
      price: 55,
      featured: true,
    },
  ];

  const displayProducts = products?.length > 0 ? products : defaultProducts;

  return (
    <main className="py-20">
      <Container>
        <AnimatedSection>
          <h1 className="font-display text-4xl md:text-5xl text-purple-700 mb-4">
            Merch
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">
            Show your UXHI pride with official merchandise. All proceeds support
            community events and programs.
          </p>
        </AnimatedSection>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map(
            (
              product: {
                _id: string;
                name: string;
                description?: string;
                price?: number;
                images?: Array<{
                  asset?: { _id?: string; url?: string };
                  alt?: string;
                }>;
                purchaseUrl?: string;
                featured?: boolean;
              },
              index: number
            ) => (
              <AnimatedSection key={product._id} delay={index * 0.1}>
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
                  {/* Product Image */}
                  <div className="aspect-square bg-cream relative">
                    {product.images?.[0]?.asset ? (
                      <SanityImage
                        value={product.images[0]}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-purple-200">
                        <svg
                          className="w-24 h-24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4z" />
                        </svg>
                      </div>
                    )}
                    {product.featured && (
                      <span className="absolute top-4 left-4 bg-teal-500 text-white text-xs px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h2 className="font-semibold text-lg text-purple-700 mb-2">
                      {product.name}
                    </h2>
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-4">
                        {product.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      {product.price && (
                        <span className="font-bold text-xl text-purple-700">
                          ${product.price}
                        </span>
                      )}
                      {product.purchaseUrl ? (
                        <a
                          href={product.purchaseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-teal-600 transition-colors"
                        >
                          Buy Now
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )
          )}
        </div>

        {/* Empty state */}
        {(!displayProducts || displayProducts.length === 0) && (
          <AnimatedSection>
            <div className="text-center py-12">
              <p className="text-gray-500">
                No products available yet. Check back soon!
              </p>
            </div>
          </AnimatedSection>
        )}
      </Container>
    </main>
  );
}
