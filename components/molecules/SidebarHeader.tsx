import { Plus, type LucideIcon } from "lucide-react";
import React, { useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import MenuCard from "../atoms/MenuCard";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface MenuItems {
  title: string;
  description: string;
  callback?: () => void;
  icon: LucideIcon;
}

export interface SidebarHeaderProps {
  menuItems: MenuItems[];
}

const SidebarHeader = (props: SidebarHeaderProps) => {
  const { menuItems } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shadow-xl">
      <header className="p-4 pb-2">
        <div className="flex items-center gap-2 justify-between">
          <h1 className="text-base font-bold text-white">Your Library</h1>
          <div className="flex items-center gap-2">
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button className="w-max min-w-9 bg-[#282828] rounded-full p-2 lg:py-2 lg:px-4">
                      <Plus
                        className={`transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                      />
                      <span className="hidden lg:inline">Create</span>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Create a playlist</p>
                </TooltipContent>
              </Tooltip>
              <DropdownMenuContent
                align="start"
                className="bg-[#282828] border-none p-1"
              >
                {menuItems.map((item, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="p-0 focus:bg-transparent"
                  >
                    <MenuCard
                      title={item.title}
                      description={item.description}
                      icon={item.icon}
                      variant="dropdown"
                      onClick={item.callback}
                    />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
};

export default React.memo(SidebarHeader);
