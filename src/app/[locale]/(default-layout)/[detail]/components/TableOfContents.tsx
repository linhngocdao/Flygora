import React, { useState, useEffect } from "react";

interface TOCItem {
  id: string;
  title: string;
  icon?: string;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => document.getElementById(item.id)).filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(items[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 150; // Account for sticky header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-green-700 rounded-lg p-4 shadow-lg sticky top-24">
      <h3 className="font-semibold text-white mb-4">Điểm nội bật</h3>
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
              activeSection === item.id
                ? "bg-green-500 text-white font-medium"
                : "text-green-100 hover:bg-green-600 hover:text-white"
            }`}
          >
            <div className="flex items-center space-x-2">
              {item.icon && <span className="text-sm">{item.icon}</span>}
              <span>{item.title}</span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};
