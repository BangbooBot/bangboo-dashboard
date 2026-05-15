import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

export function DashboardSidebar() {
	return (
    <Sidebar>
      <SidebarHeader className="bg-black" />
      <SidebarContent className="bg-black">
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-black" />
    </Sidebar>
  )
}
