import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, [role="button"], .cursor-magnetic');
      
      if (isClickable) {
        setIsHovering(true);
        const rect = isClickable.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setTargetPosition({ x: centerX, y: centerY });
      } else {
        setIsHovering(false);
        setTargetPosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  const cursorX = isHovering ? targetPosition.x : position.x;
  const cursorY = isHovering ? targetPosition.y : position.y;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference transition-all duration-200 ease-out"
        style={{
          left: `${cursorX}px`,
          top: `${cursorY}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border-2 transition-all duration-300 ${
            isHovering
              ? 'w-12 h-12 bg-white border-white'
              : 'w-8 h-8 bg-transparent border-white'
          }`}
        />
      </div>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
