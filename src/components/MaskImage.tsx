import { motion } from "framer-motion";
import type { ImgHTMLAttributes } from "react";

interface MaskImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  fallbackSrc?: string;
  /** Reveal direction. "diagonal" = bottom-left → top-right wipe. */
  direction?: "left" | "top" | "diagonal";
  delay?: number;
  duration?: number;
}

const clipMap = {
  left: { initial: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" },
  top: { initial: "inset(100% 0 0 0)", visible: "inset(0% 0 0 0)" },
  diagonal: {
    initial: "polygon(0 100%, 0 100%, 0 100%, 0 100%)",
    visible: "polygon(0 100%, 0 0, 100% 0, 100% 100%)",
  },
} as const;

const MaskImage = ({
  src,
  fallbackSrc,
  direction = "diagonal",
  delay = 0,
  duration = 1.1,
  className,
  alt = "",
  ...rest
}: MaskImageProps) => {
  const clip = clipMap[direction];
  return (
    <motion.div
      initial={{ clipPath: clip.initial }}
      whileInView={{ clipPath: clip.visible }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.76, 0, 0.24, 1] }}
      style={{ willChange: "clip-path" }}
    >
      {fallbackSrc ? (
        <picture>
          <source srcSet={src} type="image/webp" />
          <img src={fallbackSrc} alt={alt} className={className} {...rest} />
        </picture>
      ) : (
        <img src={src} alt={alt} className={className} {...rest} />
      )}
    </motion.div>
  );
};

export default MaskImage;
