import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { Team } from "@/components/sections/Team";
import { CallToAction } from "@/components/sections/CallToAction";
import { RichText } from "@/components/sections/RichText";

type Block = {
  _type: string;
  _key: string;
  [key: string]: unknown;
};

interface PageBuilderProps {
  content?: Block[];
}

export function PageBuilder({ content }: PageBuilderProps) {
  if (!Array.isArray(content) || content.length === 0) return null;

  return (
    <main>
      {content.map((block) => {
        switch (block._type) {
          case "heroBlock":
            return (
              <Hero
                key={block._key}
                badge={block.badge as string}
                headline={block.headline as string}
                subheadline={block.subheadline as string}
                primaryCta={block.primaryCta as { label: string; url: string }}
                secondaryCta={
                  block.secondaryCta as { label: string; url: string }
                }
                backgroundImage={block.backgroundImage as { asset?: { _id?: string; url?: string }; alt?: string }}
              />
            );

          case "statsBlock":
            return (
              <Stats
                key={block._key}
                stats={
                  block.stats as Array<{
                    _key?: string;
                    value: string;
                    label: string;
                  }>
                }
                backgroundColor={
                  block.backgroundColor as
                    | "teal"
                    | "purple"
                    | "cream"
                    | "white"
                }
              />
            );

          case "featuresBlock":
            return (
              <Features
                key={block._key}
                eyebrow={block.eyebrow as string}
                heading={block.heading as string}
                description={block.description as string}
                features={
                  block.features as Array<{
                    _key?: string;
                    icon?: string;
                    title: string;
                    description?: string;
                  }>
                }
                layout={block.layout as "grid" | "list" | "cards"}
              />
            );

          case "testimonialsBlock":
            return (
              <Testimonials
                key={block._key}
                heading={block.heading as string}
                testimonials={
                  block.testimonials as Array<{
                    _id: string;
                    quote: string;
                    author: {
                      name: string;
                      role?: string;
                      company?: string;
                      photo?: {
                        asset?: { _id?: string; url?: string };
                        alt?: string;
                      };
                    };
                  }>
                }
                displayStyle={block.displayStyle as "carousel" | "grid"}
              />
            );

          case "teamBlock":
            return (
              <Team
                key={block._key}
                heading={block.heading as string}
                description={block.description as string}
                members={
                  block.members as Array<{
                    _id: string;
                    name: string;
                    photo?: {
                      asset?: { _id?: string; url?: string };
                      alt?: string;
                    };
                    role?: string;
                    company?: string;
                    socialLinks?: {
                      linkedin?: string;
                      twitter?: string;
                      website?: string;
                    };
                  }>
                }
                showAllLink={block.showAllLink as boolean}
              />
            );

          case "ctaBlock":
            return (
              <CallToAction
                key={block._key}
                heading={block.heading as string}
                description={block.description as string}
                buttonLabel={block.buttonLabel as string}
                buttonUrl={block.buttonUrl as string}
                style={block.style as "purple" | "teal" | "gradient"}
              />
            );

          case "richTextBlock":
            return (
              <RichText
                key={block._key}
                content={
                  block.content as Array<{
                    _key: string;
                    _type: string;
                    [key: string]: unknown;
                  }>
                }
              />
            );

          default:
            console.warn(`Unknown block type: ${block._type}`);
            return (
              <div
                key={block._key}
                className="bg-red-50 p-4 text-red-600 text-center"
              >
                Unknown block type: {block._type}
              </div>
            );
        }
      })}
    </main>
  );
}
