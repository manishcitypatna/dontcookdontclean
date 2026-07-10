type StatCardAccent = "default" | "primary" | "secondary" | "warning";

const accentClasses: Record<StatCardAccent, string> = {
  default: "text-text-primary",
  primary: "text-primary",
  secondary: "text-secondary",
  warning: "text-amber-600",
};

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  accent?: StatCardAccent;
}

export default function StatCard({ label, value, sublabel, accent = "default" }: StatCardProps) {
  return (
    <div className="card !p-5">
      <p className="small-text text-text-secondary mb-1">{label}</p>
      <p className={`h3 ${accentClasses[accent]}`}>{value}</p>
      {sublabel && <p className="small-text text-text-secondary mt-1">{sublabel}</p>}
    </div>
  );
}

const gridColsClasses: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

export function StatCardGrid({
  children,
  columns = 4,
}: {
  children: React.ReactNode;
  columns?: 2 | 3 | 4 | 5;
}) {
  return (
    <div className={`grid grid-cols-2 ${gridColsClasses[columns]} gap-4 mb-8`}>
      {children}
    </div>
  );
}
