import { useEffect, useState } from "react";

export function useHeaderBgDetection() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-bg]");
    const observer = new IntersectionObserver(
      (entries) => {
        // Фильтруем только пересекающиеся секции
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top); // ближе к верху

        if (visibleSections.length > 0) {
          const topSection = visibleSections[0];
          const bg = topSection.target.getAttribute("data-bg");
          setIsDark(bg === "dark");
        }
      },
      {
        root: null,
        rootMargin: "136px 0px 0px 0px", // можно адаптировать под высоту хедера
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return isDark;
}
