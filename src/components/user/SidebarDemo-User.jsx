import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconTrophy,
  IconUserBolt,
  IconNews
} from "@tabler/icons-react";
import { DarkMode } from "../ui/darkMode";
import { motion } from "framer-motion";
import UserDashboard from "@/pages/user/user-dashboard";
import UserProfile from "@/pages/user/user-profile";
import UserChallenges from "@/pages/user/user-challenges";
import { NoticiasEcologicas } from "@/pages/user/noticias-ecologicas";

export function SidebarDemoUser() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(false);

  // Default dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark"); // Añadir modo oscuro al cargar
  }, []);

  useEffect(() => {
    // Detect screen size changes
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Consider mobile if width <= 768px
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOptionClick = (id) => {
    setCurrentPage(id);
    if (isMobile) {
      setOpen(false); // Close sidebar on mobile when an option is selected
    }
  };

  const links = [
    {
      label: "Home",
      id: "home",
      icon: (
        <IconBrandTabler className="text-white dark:text-white h-8 w-10 flex-shrink-0" />
      ),
    },
    {
      label: "Perfil",
      id: "perfil",
      icon: (
        <IconUserBolt className="text-white dark:text-white h-8 w-10 flex-shrink-0" />
      ),
    },
    {
      label: "Desafios",
      id: "desafio",
      icon: (
        <IconTrophy className="text-white dark:text-white h-8 w-10 flex-shrink-0" />
      ),
    },
    {
      label: "Noticias",
      id: "noticias",
      icon: (
        <IconNews className="text-white dark:text-white h-8 w-10 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      id: "logout",
      icon: (
        <IconArrowLeft className="text-white dark:text-white h-8 w-10 flex-shrink-0" />
      ),
    },
  ];

  const renderMainContent = () => {
    switch (currentPage) {
      case "perfil":
        return <UserProfile />;
      case "desafio":
        return <UserChallenges />;
      case "noticias":
        return <NoticiasEcologicas/>;
      case "home":
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="rounded-md flex flex-col md:flex-row w-screen text-lg font-bold bg-gray-100 dark:bg-neutral-800 flex-1 max-w-8xl mx-auto border border-neutral-200 dark:border-black overflow-hidden min-h-screen">
      <Sidebar open={open} setOpen={setOpen} className="w-96">
        <SidebarBody className="justify-between gap-10 bg-gray-500 dark:bg-neutral-900 text-white dark:text-white border-2 border-neutral-700 dark:border-neutral-600 rounded-lg">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-5">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => handleOptionClick(link.id)}
                />
              ))}
            </div>
          </div>

          {open && (
            <div className="mt-4 p-4">
              <DarkMode />
            </div>
          )}
        </SidebarBody>
      </Sidebar>
      <main className="flex flex-1 min-h-screen overflow-y-auto">
        <div className="p-2 md:p-10 rounded-tl-2xl dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full min-h-full">
          {renderMainContent()}
        </div>
      </main>
    </div>
  );
}

export const Logo = () => {
  return (
    <div className="font-normal flex justify-center items-center text-sm text-white py-1 relative z-20 w-full">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-2xl text-white dark:text-white text-center whitespace-pre"
      >
        EcoLife
      </motion.span>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"></div>
  );
};
