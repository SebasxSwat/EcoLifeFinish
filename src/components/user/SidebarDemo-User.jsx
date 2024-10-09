import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconTrophy,
  IconUserBolt,
  IconNews,
  IconBuildingStore
} from "@tabler/icons-react";
import { House } from "lucide-react";
import { DarkMode } from "../ui/darkMode";
import { motion } from "framer-motion";
import UserDashboard from "@/pages/user/user-dashboard";
import UserProfile from "@/pages/user/user-profile";
import UserChallenges from "@/pages/user/user-challenges";
import NoticiasEcologicas from "@/pages/user/noticias-ecologicas";
import EcoMarket from "@/pages/user/components-eco-market";

export function SidebarDemoUser() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOptionClick = (id) => {
    setCurrentPage(id);
    if (isMobile) {
      setOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  const links = [
    {
      label: "Home",
      id: "home",
      icon: (
        <House className="text-white dark:text-white h-8 w-10 flex-shrink-0" />
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
      label: "EcoMarket",
      id: "ecomarket",
      icon: (
        <IconBuildingStore className="text-white dark:text-white h-8 w-10 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      id: "logout",
      icon: (
        <IconArrowLeft className="text-white dark:text-white h-8 w-10 flex-shrink-0" />
      ),
      onClick: handleLogout,
    },
  ];

  const renderMainContent = () => {
    switch (currentPage) {
      case "perfil":
        return <UserProfile />;
      case "desafio":
        return <UserChallenges />;
      case "noticias":
        return <NoticiasEcologicas />;
      case "ecomarket":
        return <EcoMarket />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen overflow-hidden">
      <Sidebar
        open={open}
        setOpen={setOpen}
        className="w-full md:w-64 flex-shrink-0 z-10"
      >
        <SidebarBody className="justify-between gap-10 bg-gray-500 dark:bg-neutral-900 text-white dark:text-white border-2 border-neutral-700 dark:border-neutral-600 rounded-lg">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-16 flex flex-col gap-5">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  onClick={() => {
                    if (link.id === "logout") {
                      handleLogout();
                    } else {
                      handleOptionClick(link.id);
                    }
                  }}
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
      <main className="flex-1 overflow-y-auto bg-white dark:bg-neutral-900">
      <div className="p-2 md:p-10 rounded-tl-2xl dark:border-neutral-700">
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
