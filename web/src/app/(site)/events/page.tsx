import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | UX Hawaii",
  description:
    "Discover upcoming UX events, workshops, and meetups in Hawaii. Connect with local UX professionals and grow your skills.",
};

export default function EventsPage() {
  // In a full implementation, this would fetch events from Sanity
  const upcomingEvents = [
    {
      id: "1",
      title: "UXHI Monthly Meetup",
      date: "2026-02-15",
      type: "meetup",
      location: "Honolulu, HI",
      description:
        "Join us for our monthly meetup where we discuss the latest trends in UX design and network with fellow professionals.",
    },
    {
      id: "2",
      title: "Design Systems Workshop",
      date: "2026-03-01",
      type: "workshop",
      location: "Online",
      description:
        "Learn how to build and maintain design systems that scale. Hands-on workshop with practical exercises.",
    },
    {
      id: "3",
      title: "UXHI Annual Conference 2026",
      date: "2026-06-15",
      type: "conference",
      location: "Hawaii Convention Center",
      description:
        "Our flagship annual event featuring speakers, workshops, and networking opportunities.",
    },
  ];

  return (
    <main className="py-20">
      <Container>
        <AnimatedSection>
          <h1 className="font-display text-4xl md:text-5xl text-purple-700 mb-4">
            Events
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl">
            Connect with Hawaii&apos;s UX community through our workshops,
            meetups, and annual conference.
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {upcomingEvents.map((event, index) => (
            <AnimatedSection key={event.id} delay={index * 0.1}>
              <div className="bg-cream rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                  {/* Date */}
                  <div className="flex-shrink-0 text-center md:w-24">
                    <div className="bg-teal-500 text-white rounded-lg py-2 px-4 md:py-4">
                      <div className="text-sm uppercase">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                        })}
                      </div>
                      <div className="text-2xl md:text-3xl font-bold">
                        {new Date(event.date).getDate()}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-wide bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {event.type}
                      </span>
                    </div>
                    <h2 className="font-semibold text-xl md:text-2xl text-purple-700 mb-2">
                      {event.title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-3">
                      {event.location}
                    </p>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {upcomingEvents.length === 0 && (
          <AnimatedSection>
            <div className="text-center py-12">
              <p className="text-gray-500">
                No upcoming events. Check back soon or join our Slack to stay
                updated!
              </p>
            </div>
          </AnimatedSection>
        )}
      </Container>
    </main>
  );
}
