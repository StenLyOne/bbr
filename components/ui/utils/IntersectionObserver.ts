import { useEffect, useState } from "react";

export function useHeaderBgDetection() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-bg]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length > 0) {
          const bg = visibleSections[0].target.getAttribute("data-bg");
          setIsDark(bg === "dark");
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -60% 0px", // более чувствительно к смене
        threshold: 0, // реагирует на любое пересечение
      }
    );

    sections.forEach((section) => {
      observer.observe(section);

      // 👇 триггерим вручную при маунте, если в зоне видимости
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const bg = section.getAttribute("data-bg");
        if (bg) setIsDark(bg === "dark");
      }
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

