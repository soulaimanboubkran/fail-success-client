
import { useId } from "react";

export const Grid = ({ pattern, size, color }: { pattern?: number[][]; size?: number; color?: string }) => {
  const generatePatternEntry = () => [Math.floor(Math.random() * 50) + 3, Math.floor(Math.random() * 10) + 3];

  // Function to generate the entire pattern
  const generatePattern = (length = 20) => Array.from({ length }, generatePatternEntry);

  // Use the existing pattern if provided, otherwise generate a new one
  const p = pattern ?? generatePattern();
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-600/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          color={color}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, color, ...props }: any) {
  const patternId = useId();

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy]: any) => (
            <rect
              strokeWidth="0"
              key={`${sx}-${sy}`}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
              fill={getRandomColor()}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}