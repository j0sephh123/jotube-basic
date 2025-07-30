import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Monitor,
  Palette,
  Sparkles,
  Building2,
  Leaf,
} from "lucide-react";

const themeCategories = [
  {
    name: "Basic",
    icon: Sun,
    themes: [
      { name: "light", icon: Sun, label: "Light" },
      { name: "dark", icon: Moon, label: "Dark" },
      { name: "night", icon: Moon, label: "Night" },
    ],
  },
  {
    name: "Popular",
    icon: Sparkles,
    themes: [
      { name: "cyberpunk", icon: Monitor, label: "Cyberpunk" },
      { name: "synthwave", icon: Monitor, label: "Synthwave" },
      { name: "dracula", icon: Monitor, label: "Dracula" },
      { name: "luxury", icon: Monitor, label: "Luxury" },
      { name: "retro", icon: Monitor, label: "Retro" },
    ],
  },
  {
    name: "Colorful",
    icon: Palette,
    themes: [
      { name: "valentine", icon: Monitor, label: "Valentine" },
      { name: "aqua", icon: Monitor, label: "Aqua" },
      { name: "forest", icon: Monitor, label: "Forest" },
      { name: "pastel", icon: Monitor, label: "Pastel" },
      { name: "fantasy", icon: Monitor, label: "Fantasy" },
      { name: "lofi", icon: Monitor, label: "Lo-Fi" },
    ],
  },
  {
    name: "Professional",
    icon: Building2,
    themes: [
      { name: "business", icon: Monitor, label: "Business" },
      { name: "wireframe", icon: Monitor, label: "Wireframe" },
      { name: "black", icon: Monitor, label: "Black" },
      { name: "cmyk", icon: Monitor, label: "CMYK" },
    ],
  },
  {
    name: "Seasonal",
    icon: Leaf,
    themes: [
      { name: "autumn", icon: Monitor, label: "Autumn" },
      { name: "winter", icon: Monitor, label: "Winter" },
      { name: "coffee", icon: Monitor, label: "Coffee" },
    ],
  },
  {
    name: "Unique",
    icon: Monitor,
    themes: [
      { name: "acid", icon: Monitor, label: "Acid" },
      { name: "lemonade", icon: Monitor, label: "Lemonade" },
    ],
  },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setIsOpen(false);
  };

  const findCurrentTheme = () => {
    for (const category of themeCategories) {
      const found = category.themes.find((t) => t.name === currentTheme);
      if (found) return found;
    }
    return themeCategories[0]?.themes[1]; // fallback to dark
  };

  const currentThemeData = findCurrentTheme();
  const IconComponent = currentThemeData?.icon || Moon;

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconComponent className="w-4 h-4" />
      </button>
      <div
        tabIndex={0}
        className={`dropdown-content z-[1] p-4 shadow-lg bg-base-100 rounded-box border border-base-300 w-80 max-h-96 overflow-y-auto ${
          isOpen ? "dropdown-open" : ""
        }`}
      >
        <div className="space-y-4">
          {themeCategories.map((category) => (
            <div key={category.name}>
              <div className="flex items-center gap-2 mb-2 px-1">
                <category.icon className="w-4 h-4 text-base-content/60" />
                <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wide">
                  {category.name}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {category.themes.map((theme) => {
                  const ThemeIcon = theme.icon;
                  return (
                    <button
                      key={theme.name}
                      className={`flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                        currentTheme === theme.name
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-200/50"
                      }`}
                      onClick={() => changeTheme(theme.name)}
                    >
                      <ThemeIcon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium truncate">
                        {theme.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
