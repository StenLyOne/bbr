import { useEffect, useState } from "react";

export const usePointerType = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      setIsTouch(e.pointerType === "touch");
    };

    window.addEventListener("pointerdown", handlePointer);
    return () => window.removeEventListener("pointerdown", handlePointer);
  }, []);

  return isTouch;
};
