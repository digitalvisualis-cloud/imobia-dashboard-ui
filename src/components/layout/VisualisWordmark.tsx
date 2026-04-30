export function VisualisWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={"inline-flex items-baseline gap-1 " + className}>
      <span className="font-display text-sm font-bold tracking-wide text-primary">VISUALIS.</span>
      <span className="text-xs font-light text-muted-foreground">Digital</span>
    </span>
  );
}
