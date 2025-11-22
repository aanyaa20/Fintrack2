import { ChevronDown, LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTranslation } from "react-i18next";

export function UserNav({
  userName,
  profilePicture,
  onLogout,
}: {
  userName: string;
  profilePicture: string;
  onLogout: () => void;
}) {
  const { t } = useTranslation();
  return (
    <DropdownMenu>
      {/* ---- FIXED TRIGGER ---- */}
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profilePicture || ""} />
            <AvatarFallback className="bg-gray-800 text-white border border-gray-700">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="w-3 h-3 text-white" />
        </div>
      </DropdownMenuTrigger>

      {/* ---- DROPDOWN CONTENT ---- */}
      <DropdownMenuContent
        className="w-56 bg-[var(--secondary-dark-color)] text-white border-gray-700"
        align="end"
        forceMount
      >
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-semibold">{userName}</span>
            <span className="text-[13px] text-gray-400 font-light">
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-700" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={onLogout}
            className="hover:bg-gray-800 hover:text-white cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t("common.log_out")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
