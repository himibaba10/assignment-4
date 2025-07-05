import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigationPages = [
    { path: "/books", title: "All Books" },
    { path: "/create-book", title: "Create a Book" },
    { path: "/borrow-summary", title: "Borrow Summary" },
  ];

  return (
    <nav>
      <div className="flex items-center justify-between">
        {/* Hamburger Icon */}
        <button
          className="text-2xl md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <IoMenu />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
              {navigationPages.map((page) => (
                <NavigationMenuItem key={page.path}>
                  <NavigationMenuLink asChild>
                    <Link to={page.path} className="hover:underline">
                      {page.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden mt-2 absolute left-0 bg-white w-full z-10">
          <NavigationMenu className="max-w-none py-2">
            <NavigationMenuList className="flex flex-col gap-2">
              {navigationPages.map((page) => (
                <NavigationMenuItem key={page.path}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={page.path}
                      className="block py-1 text-base hover:underline"
                      onClick={() => setMenuOpen(false)}
                    >
                      {page.title}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
