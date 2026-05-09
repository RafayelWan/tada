import { cn } from "../../lib/utils";

export function Progress({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-1.5 w-full rounded-full bg-ink-100 overflow-hidden",
        className
      )}
    >
      <div
        className="h-full bg-gradient-to-r from-blush-300 to-mauve-300 transition-all duration-500 ease-out rounded-full"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
