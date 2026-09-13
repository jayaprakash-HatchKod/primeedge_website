import type { ReactNode } from "react";

export function LegalClause({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {number}. {title}
      </h2>
      <div className="mt-3 space-y-2 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
