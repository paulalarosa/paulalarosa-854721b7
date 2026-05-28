import grain from "@/assets/grain.png";

const GrainOverlay = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[55]"
    style={{
      backgroundImage: `url(${grain})`,
      backgroundRepeat: "repeat",
      backgroundSize: "128px 128px",
      mixBlendMode: "overlay",
      opacity: 0.035,
    }}
  />
);

export default GrainOverlay;
