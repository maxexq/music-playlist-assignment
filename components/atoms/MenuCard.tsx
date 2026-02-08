import type { LucideIcon } from "lucide-react";
import React from "react";

export interface MenuCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  variant?: "dropdown" | "menu";
  onClick?: () => void;
}

const MenuCard = (props: MenuCardProps) => {
  const {
    title,
    description,
    icon: Icon,
    variant = "dropdown",
    onClick,
  } = props;

  const renderMenu = () => {
    switch (variant) {
      case "menu":
        return (
          <div
            className="cursor-pointer flex items-center gap-3 py-2 px-3 bg-transparent group hover:bg-[#ffffff1a] rounded-[2px]"
            onClick={onClick}
          >
            {Icon && <Icon className="size-3.5 text-[#ffffffe6]" />}
            <span className="text-[0.875rem] font-normal text-[#ffffffe6] truncate">
              {title}
            </span>
          </div>
        );
      case "dropdown":
      default:
        return (
          <div
            className="cursor-pointer text-white flex items-center h-16 gap-2 p-2 bg-transparent group hover:bg-[#ffffff1a] rounded-[6px]"
            onClick={onClick}
          >
            {Icon && (
              <div className="w-12 h-12 min-w-12 rounded-full bg-[#ffffff1a] flex items-center justify-center">
                <Icon className="size-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:text-[#1ed760]" />
              </div>
            )}
            <div className="flex flex-col justify-start gap-0.5 overflow-hidden">
              <p className="text-[1rem] font-semibold text-white truncate">
                {title}
              </p>
              {description && (
                <p className="text-[0.875rem] font-semibold text-[#b3b3b3] truncate">
                  {description}
                </p>
              )}
            </div>
          </div>
        );
    }
  };

  return renderMenu();
};

export default React.memo(MenuCard);
