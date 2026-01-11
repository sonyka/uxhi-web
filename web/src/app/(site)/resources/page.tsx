import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources | UX Hawaii",
  description:
    "Curated UX resources including articles, tools, templates, and courses to help you grow as a UX professional.",
};

export default function ResourcesPage() {
  // In a full implementation, this would fetch resources from Sanity
  const resources = [
    {
      id: "1",
      title: "Design System Checklist",
      category: "template",
      description:
        "A comprehensive checklist for building and maintaining design systems.",
      url: "#",
    },
    {
      id: "2",
      title: "UX Research Methods Guide",
      category: "article",
      description:
        "An overview of different UX research methods and when to use them.",
      url: "#",
    },
    {
      id: "3",
      title: "Figma for Beginners",
      category: "course",
      description:
        "Free course covering the basics of Figma for UX/UI designers.",
      url: "#",
    },
    {
      id: "4",
      title: "Accessibility Testing Tools",
      category: "tool",
      description:
        "A curated list of tools for testing accessibility in your designs.",
      url: "#",
    },
  ];

  const categories = ["all", "article", "tool", "template", "course"];

  return (
    <main className="py-20">
      <Container>
        <AnimatedSection>
          <h1 className="font-display text-4xl md:text-5xl text-purple-700 mb-4">
            Resources
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Curated resources to help you grow as a UX professional. From
            articles to tools to templates.
          </p>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors bg-cream text-gray-700 hover:bg-teal-100 hover:text-teal-700"
              >
                {category}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <AnimatedSection key={resource.id} delay={index * 0.05}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-teal-300 transition-all group"
              >
                <span className="text-xs uppercase tracking-wide bg-purple-100 text-purple-700 px-2 py-1 rounded mb-3 inline-block">
                  {resource.category}
                </span>
                <h2 className="font-semibold text-lg text-purple-700 mb-2 group-hover:text-teal-600 transition-colors">
                  {resource.title}
                </h2>
                <p className="text-gray-600 text-sm">{resource.description}</p>
                <div className="mt-4 text-teal-500 text-sm font-medium flex items-center gap-1">
                  View resource
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </main>
  );
}
