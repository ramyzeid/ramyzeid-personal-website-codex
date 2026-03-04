export function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
      {label}
    </span>
  );
}
