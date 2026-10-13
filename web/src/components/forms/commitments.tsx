import { FormAgreement } from "@/components/ui/form-elements";
import { PrincipleList } from "@/components/ui/PrincipleList";

// The values each form asks people to agree to before submitting. Joining and
// listing ask for different things, so each has its own wording; the four
// principles are the same ideas, phrased for each.

interface CommitmentProps {
  errors?: Record<string, string[]>;
}

export function MemberCommitment({ errors }: CommitmentProps) {
  return (
    <FormAgreement
      title="Our Shared Commitment to Aloha-Centered Design"
      commitmentTitle="Member commitment"
      commitment="By joining UXHI, I commit to representing these values in my work and interactions, practicing aloha-centered design to the best of my ability, and continuing to learn alongside our community."
      label="I agree to uphold UXHI's values and champion aloha-centered design through my practice, relationships, and contributions to the community."
      name="agreement"
      errors={errors}
    >
      <p>
        At UXHI, we believe good design begins with aloha—with genuine care for people,
        respect for culture, meaningful relationships, and an understanding of place.
      </p>
      <p>
        As a member of UXHI, you are part of a community committed to championing and
        elevating aloha-centered design. We ask our members to embody these values in
        their practice, remain open to learning, and help foster a more thoughtful,
        inclusive, and community-minded approach to design in Hawaiʻi.
      </p>
      <p>Our approach is grounded in four principles:</p>
      <PrincipleList
        tone="dark"
        size="sm"
        className="pt-1"
        principles={[
          { term: "People", description: "We lead with genuine care for the people affected by our decisions. We design with people, inviting them into the process rather than studying them from a distance." },
          { term: "Culture", description: "We honor local knowledge as expertise, not anecdote. We approach each context with respect for what people already know rather than importing frameworks wholesale." },
          { term: "Community", description: "We build pilina through relationships and shared understanding. We recognize that meaningful design happens with people and communities, not in isolation." },
          { term: "Place", description: "We recognize that context matters. The land, history, and people who shape a place influence what good design looks like, and what works in one place may not translate to another." },
        ]}
      />
    </FormAgreement>
  );
}

export function DirectoryCommitment({ errors }: CommitmentProps) {
  return (
    <FormAgreement
      title="Represent Aloha-Centered Design"
      commitmentTitle="Directory commitment"
      commitment="By requesting inclusion in the UXHI Directory, I commit to representing UXHI's values and striving to practice aloha-centered design in my work and interactions with others."
      label="I agree to represent UXHI's values and strive to practice aloha-centered design in my work and interactions with others."
      name="agreement"
      errors={errors}
    >
      <p>
        The UXHI Directory connects people who are passionate about improving experiences
        and making a positive impact in Hawaiʻi. As part of this community, we ask
        directory members to help champion and elevate aloha-centered design in their
        work and relationships.
      </p>
      <p>Our approach is grounded in four principles:</p>
      <PrincipleList
        tone="dark"
        size="sm"
        className="pt-1"
        principles={[
          { term: "People", description: "Leading with genuine care for the people affected by our decisions and designing with them, not just for them." },
          { term: "Culture", description: "Honoring local knowledge as expertise and approaching each context with respect rather than applying frameworks without consideration." },
          { term: "Community", description: "Building pilina and meaningful relationships with the people and communities our work touches." },
          { term: "Place", description: "Recognizing how the land, history, and local context shape what good design looks like." },
        ]}
      />
      <p className="pt-2">
        You don&apos;t need to have all the answers. We believe aloha-centered design is
        an ongoing practice of listening, learning, and building relationships with care.
      </p>
    </FormAgreement>
  );
}
