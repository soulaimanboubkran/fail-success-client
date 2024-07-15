"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";


export const StickyScroll = ({
  content,
 
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the overflow container and want to have it change on the entire page scroll
    // target: ref
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

 




  return (
    <div className=" relative flex justify-center  px-4">
    <motion.div
    className="h-[30rem] w-full  max-w-[1800px] dark:bg-slate-950 overflow-y-scroll flex justify-center relative space-x-10 rounded-md p-10 scrollbar-hide "
    ref={ref}
  >
      <div className="div relative flex items-start px-4">
        <div className="w-12/12">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-black dark:text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg  text-zinc-900 dark:text-slate-300 max-w-lg mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-56" />
        </div>
      </div>
      <div
       
        className={cn(
          "hidden lg:block h-5/12  mb-12  w-5/12 rounded-2xl bg-transparent sticky top-10 overflow-hidden",
         
        )}
      >
        {content[activeCard].content ?? null}
      </div>
    </motion.div></div>
  );
};
