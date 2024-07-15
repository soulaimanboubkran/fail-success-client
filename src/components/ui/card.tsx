import React from "react";
import { useId } from "react";
import { TbHttpDelete } from "react-icons/tb";

interface Feature {
  _id: string;
  thing: string;
  description: string;
  state: any;
}

interface FeaturesSectionDemoProps {
  grid: Feature[];
  updateFeatureState: (id: string, state: string) => Promise<void>;
  deleteFeature: (id: string) => Promise<void>;
}

const FeaturesSectionDemo: React.FC<FeaturesSectionDemoProps> = ({
  grid,
  updateFeatureState,
  deleteFeature,
}) => {
  const handleDelete = async (id: string) => {
    try {
      await deleteFeature(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-16 h-screen">
      <div className="grid dark:bg-slate-950 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-5 max-w-full px-5 mx-auto">
        {grid.map((feature, index) => (
          <div
            key={`${feature._id}-${index}`}
            className="relative rounded-md bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-gray-100 p-6 overflow-hidden flex flex-col justify-between"
          >
            <Grid
              size={20}
              color={
                feature.state === "success"
                  ? "green"
                  : feature.state === "faild"
                  ? "red"
                  : "gray"
              }
            />
            <p className="text-base font-bold text-neutral-800 dark:text-white relative">
              {feature.thing}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative">
              {feature?.description}
            </p>
            <div className="flex flex-wrap ">
              {feature.state === null || feature.state === undefined ? (
                <>
                  <button
                    onClick={() => updateFeatureState(feature._id, "success")}
                    className="mt-6 z-[1] shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-6 py-2 bg-[#fff] text-[#696969] rounded-l-md font-light transition duration-200 ease-linear"
                  >
                    Success
                  </button>
                  <button
                    onClick={() => updateFeatureState(feature._id, "faild")}
                    className="mt-6 z-[1]  shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-6 py-2 bg-[#fff] text-[#696969] rounded-r-md font-light transition duration-200 ease-linear"
                  >
                    Faild
                  </button>
                </>
              ) : feature.state === "success" ? (
                <span className="mt-6 text-white font-light bg-lime-600 shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-6 py-2 rounded-md transition duration-200 ease-linear">
                  Success
                </span>
              ) : (
                <span className="mt-6 text-white font-light bg-orange-600 shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-6 py-2 rounded-md transition duration-200 ease-linear">
                  Faild
                </span>
              )}
              <button
                onClick={() => handleDelete(feature._id)}
                className="mt-6 ml-3 text-2xl z-[1] shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-6 py-2 bg-[#fff] text-[#696969] rounded-md font-light transition duration-200 ease-linear"
              >
              <TbHttpDelete/>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSectionDemo;

export const Grid = ({
    pattern,
    size,
    color
  }: {
    pattern?: number[][];
    size?: number;
    color?: string;
  }) => {
    const generatePatternEntry = () => [Math.floor(Math.random() * 4) + 6, Math.floor(Math.random() * 6) + 1];

    // Function to generate the entire pattern
    const generatePattern = (length = 7) => Array.from({ length }, generatePatternEntry);
    
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
            {squares.map(([x, y]: any) => (
              <rect
                strokeWidth="0"
                key={`${x}-${y}`}
                width={width + 1}
                height={height + 1}
                x={x * width}
                y={y * height}
                fill={color}
              />
            ))}
          </svg>
        )}
      </svg>
    );
  }
  