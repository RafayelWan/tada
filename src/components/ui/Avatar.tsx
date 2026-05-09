import { cn } from "../../lib/utils";

const gradients = [
  "from-blush-200 to-blush-400",
  "from-mauve-200 to-mauve-400",
  "from-sage-200 to-sage-400",
  "from-blush-300 to-mauve-400",
  "from-mauve-200 to-blush-300",
  "from-sage-200 to-mauve-300",
];

function pickGradient(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return gradients[h % gradients.length];
}

export function Avatar({
  name,
  size = 48,
  className,
  emoji,
}: {
  name: string;
  size?: number;
  className?: string;
  emoji?: string;
}) {
  const initial = name?.[0] ?? "✿";
  const grad = pickGradient(name || "");
  return (
    <div
      className={cn(
        "relative shrink-0 rounded-full bg-gradient-to-br flex items-center justify-center overflow-hidden shadow-inner",
        grad,
        className
      )}
      style={{ width: size, height: size }}
    >
      <span
        className="text-white font-semibold"
        style={{ fontSize: size * 0.4 }}
      >
        {emoji ?? initial}
      </span>
    </div>
  );
}
