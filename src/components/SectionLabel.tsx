interface SectionLabelProps {
  children: React.ReactNode;
  dark?: boolean;
}

export default function SectionLabel({ children, dark = false }: SectionLabelProps) {
  return (
    <p
      className="
        font-quicksand
        text-[12px]
        font-semibold
        tracking-[0.2em]
        uppercase
        mb-4
        leading-[1.2]
      "
      style={{
        color: dark ? "rgba(255,255,255,0.7)" : "var(--text-secondary)",
      }}
    >
      {children}
    </p>
  );
}
