import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { BarChart3, Activity, ChevronUp } from "lucide-react";

interface FloatingNavigationProps {
  sections: { id: string; label: string; icon: React.ReactNode }[];
}

export function FloatingNavigation({ sections }: FloatingNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating nav after scrolling down 100px
      setIsVisible(window.scrollY > 100);

      // Determine active section
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id)
      })).filter(item => item.element);

      for (const { id, element } of sectionElements) {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-2 space-y-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={activeSection === section.id ? "default" : "ghost"}
            size="sm"
            onClick={() => scrollToSection(section.id)}
            className={`w-full justify-start gap-2 ${
              activeSection === section.id 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            {section.icon}
            <span className="text-xs">{section.label}</span>
          </Button>
        ))}
        
        <div className="border-t pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="w-full text-gray-500 hover:text-blue-600 hover:bg-blue-50"
          >
            <ChevronUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}