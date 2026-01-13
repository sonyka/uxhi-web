import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find UX Pro | UX Hawaii",
  description:
    "Connect with UX professionals in Hawaii. Browse our member directory to find designers, researchers, and UX specialists.",
};

export default function FindUXProPage() {
  // In a full implementation, this would fetch members from Sanity
  const members = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "UX Designer",
      company: "Tech Hawaii",
      skills: ["UI Design", "Prototyping", "Design Systems"],
    },
    {
      id: "2",
      name: "Marcus Johnson",
      role: "UX Researcher",
      company: "Island Innovations",
      skills: ["User Research", "Usability Testing", "Data Analysis"],
    },
    {
      id: "3",
      name: "Emma Williams",
      role: "Product Designer",
      company: "Pacific Digital",
      skills: ["Product Strategy", "Interaction Design", "Mobile Design"],
    },
    {
      id: "4",
      name: "David Kim",
      role: "Design Lead",
      company: "Aloha Studios",
      skills: ["Team Leadership", "Design Strategy", "Mentoring"],
    },
    {
      id: "5",
      name: "Lisa Nakamura",
      role: "UX/UI Designer",
      company: "Freelance",
      skills: ["Visual Design", "Branding", "Web Design"],
    },
    {
      id: "6",
      name: "James Oahu",
      role: "Service Designer",
      company: "State of Hawaii",
      skills: ["Service Design", "Journey Mapping", "Stakeholder Management"],
    },
  ];

  return (
    <main className="py-20">
      <Container>
        <AnimatedSection>
          <h1 className="font-display text-4xl md:text-5xl text-purple-700 mb-4">
            Find UX Pro
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            Welcome to the UXHI Member Directory, your hub for connecting with UX design professionals in Hawaii and those with Hawaii ties, across all experience levels. Not only does this serve as a go-to resource for companies and recruiters seeking talented local UX professionals, but it also fosters connections between UX practitioners themselves.
          </p>
        </AnimatedSection>

        {/* Search/Filter - Placeholder */}
        <AnimatedSection delay={0.1}>
          <div className="bg-cream rounded-2xl p-4 mb-8">
            <input
              type="text"
              placeholder="Search by name, skill, or company..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
            />
          </div>
        </AnimatedSection>

        {/* Members Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <AnimatedSection key={member.id} delay={index * 0.05}>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-teal-300 transition-all">
                {/* Avatar Placeholder */}
                <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-semibold text-purple-300">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>

                <div className="text-center">
                  <h2 className="font-semibold text-lg text-purple-700">
                    {member.name}
                  </h2>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                  <p className="text-teal-500 text-sm mb-4">{member.company}</p>

                  <div className="flex flex-wrap justify-center gap-2">
                    {member.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-cream px-2 py-1 rounded text-gray-600"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.3}>
          <div className="text-center mt-12 p-8 bg-purple-700 rounded-2xl text-white">
            <h2 className="font-display text-2xl mb-4">Want to be listed?</h2>
            <p className="text-purple-200 mb-6">
              Join UXHI to get your profile in our member directory.
            </p>
            <a
              href="/join"
              className="inline-flex items-center gap-2 bg-white text-purple-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Join UXHI
            </a>
          </div>
        </AnimatedSection>
      </Container>
    </main>
  );
}
