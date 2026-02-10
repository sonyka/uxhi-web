const hoverVariants = {
  group: {
    out: "group-hover:-translate-y-full",
    in: "group-hover:translate-y-0",
  },
  "group/link": {
    out: "group-hover/link:-translate-y-full",
    in: "group-hover/link:translate-y-0",
  },
} as const;

export function TextSlideUp({
  children,
  className,
  group = "group",
}: {
  children: React.ReactNode;
  className?: string;
  /** Which group triggers the hover. Defaults to "group". Use "group/link" for named groups. */
  group?: keyof typeof hoverVariants;
}) {
  const { out, in: slideIn } = hoverVariants[group];

  return (
    <span className={`overflow-hidden relative inline-flex ${className || ""}`}>
      <span
        className={`transition-transform duration-300 ease-out ${out}`}
      >
        {children}
      </span>
      <span
        className={`absolute inset-0 translate-y-full transition-transform duration-300 ease-out ${slideIn}`}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
}
