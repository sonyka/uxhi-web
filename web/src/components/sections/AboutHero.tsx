"use client";

import Link from "next/link";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative bg-cream overflow-hidden">
      {/* Desktop Layout - Exact Framer measurements at 1727px viewport */}
      <div className="hidden lg:block relative w-full h-[920px]">
        <div className="relative h-full max-w-[1728px] mx-auto">
          {/* Title - Left side - Framer: x=40, y=324 */}
          <div className="absolute left-[32px] top-[316px] z-10">
            <h1 className="font-display text-[40px] leading-[48px] text-purple-700">
              Our Mission &amp;<br />Story
            </h1>
          </div>

          {/* Center - Main Oval Image (376x616px) - Framer: x=636, y=165 */}
          <div className="absolute left-1/2 -translate-x-[85%] top-[165px]">
            <Link
              href="/merch"
              className="relative group block w-[376px] h-[616px] rounded-[999px] overflow-hidden shadow-xl"
            >
              <Image
                src="/images/about/merch-store.jpg"
                alt="UXHI Merch Store"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="376px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-16 left-0 right-0 text-center">
                <span className="font-display text-5xl text-white leading-tight block">
                  Merch
                </span>
                <span className="font-display text-5xl text-white leading-tight block">
                  Store
                </span>
              </div>
            </Link>
          </div>

          {/* Right Side - Find UX Pro Card (244x192px) - Framer: x=1428, y=304 */}
          <div className="absolute right-[55px] top-[304px]">
            <Link
              href="/find-ux-pro"
              className="relative group block w-[244px] h-[192px] rounded-[10px] overflow-hidden shadow-lg"
            >
              <Image
                src="/images/about/find-ux-pro.jpg"
                alt="Find a UX Professional"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="244px"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-display text-xl text-white leading-tight block">
                  Find a UX
                </span>
                <span className="font-display text-xl text-white leading-tight block">
                  Professional
                </span>
              </div>
            </Link>
          </div>

          {/* Right Side - Teal Quote Card (244x300px, teardrop shape) - Framer: x=1428, y=516 */}
          <div className="absolute right-[55px] top-[516px]">
            <div
              className="bg-teal-500 w-[244px] h-[300px] px-5 py-6 shadow-lg flex flex-col justify-between"
              style={{ borderRadius: "80px 80px 999px 999px" }}
            >
              <p className="text-white text-lg leading-[24px] text-right mt-2">
                &ldquo;Local group explores user experience and interface
                design&rdquo;
              </p>
              <p className="text-white text-lg text-right mb-8">
                Hawai&apos;i Bulletin
              </p>
            </div>
          </div>

          {/* Purple Card (376x141px) - Framer: x=1032, y=676, overlaps oval right edge */}
          <div className="absolute left-1/2 translate-x-[80px] top-[676px]">
            <div className="bg-purple-700 rounded-[10px] px-6 py-5 w-[376px] h-[141px] shadow-lg flex flex-col justify-between">
              <p className="text-white/90 text-base">
                State of UX in Hawaii 2025 is here!
              </p>
              <Link
                href="/resources"
                className="inline-block bg-white text-purple-700 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors w-full text-center"
              >
                Read report
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout */}
      <div className="lg:hidden px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Title */}
          <div className="text-center">
            <h1 className="font-display text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-purple-700">
              Our Mission &amp; Story
            </h1>
          </div>

          {/* Main Oval Image */}
          <div>
            <Link
              href="/merch"
              className="relative group block w-[280px] md:w-[340px] h-[460px] md:h-[560px] rounded-[999px] overflow-hidden shadow-xl"
            >
              <Image
                src="/images/about/merch-store.jpg"
                alt="UXHI Merch Store"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 280px, 340px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-12 left-0 right-0 text-center">
                <span className="font-display text-4xl md:text-[44px] text-white leading-tight block">
                  Merch
                </span>
                <span className="font-display text-4xl md:text-[44px] text-white leading-tight block">
                  Store
                </span>
              </div>
            </Link>
          </div>

          {/* Cards row */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Find UX Pro Card */}
            <Link
              href="/find-ux-pro"
              className="relative group block w-[220px] h-[172px] rounded-[10px] overflow-hidden shadow-lg"
            >
              <Image
                src="/images/about/find-ux-pro.jpg"
                alt="Find a UX Professional"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="220px"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="font-display text-base text-white leading-tight block">
                  Find a UX
                </span>
                <span className="font-display text-base text-white leading-tight block">
                  Professional
                </span>
              </div>
            </Link>

            {/* Teal Quote Card */}
            <div
              className="bg-teal-500 w-[220px] h-[220px] p-5 shadow-lg flex flex-col justify-between"
              style={{ borderRadius: "60px 60px 999px 999px" }}
            >
              <p className="text-white text-base leading-[20px] text-right mt-2">
                &ldquo;Local group explores user experience and interface
                design&rdquo;
              </p>
              <p className="text-white text-base text-right mb-6">
                Hawai&apos;i Bulletin
              </p>
            </div>
          </div>

          {/* Purple Card */}
          <div>
            <div className="bg-purple-700 rounded-[10px] px-6 py-5 w-[280px] md:w-[340px] shadow-lg">
              <p className="text-white/90 text-base mb-3">
                State of UX in Hawaii 2025 is here!
              </p>
              <Link
                href="/resources"
                className="inline-block bg-white text-purple-700 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors w-full text-center"
              >
                Read report
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
