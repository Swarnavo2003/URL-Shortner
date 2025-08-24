import { LayoutDashboard, Link, Settings } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const menuItems = [
  { name: "Links", path: "/dashboard/links", icon: Link },
  { name: "Analytics", path: "/dashboard/analytics", icon: LayoutDashboard },
];

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="h-full hidden md:block bg-white px-4 py-4 rounded-2xl w-1/6 space-y-4">
      <div className="px-2 flex items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold">
          Clipr
        </NavLink>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Settings className="w-5 h-5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ol className="space-y-2 text-sm">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <NavLink
              to={item.path}
              key={item.name}
              className={`flex items-center gap-2 group hover:bg-blue-500/10 hover:border-blue-500 rounded-lg p-2 cursor-pointer transition-colors duration-200 ease-in-out ${
                isActive
                  ? "bg-blue-500/10 border border-blue-500 text-blue-500"
                  : ""
              }`}
            >
              <item.icon className="w-4 h-4 mr-2 font-semibold group-hover:text-blue-500" />
              <span className="group-hover:text-blue-500 font-medium">
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </ol>
    </div>
  );
};

export default Sidebar;
