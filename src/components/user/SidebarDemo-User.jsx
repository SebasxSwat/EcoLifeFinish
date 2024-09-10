import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { DarkMode } from "../ui/darkMode";
import { motion } from "framer-motion";
import UserDashboard from "@/pages/user/user-dashboard";
import UserProfile from "@/pages/user/user-profile";
import UserChallenges from "@/pages/user/user-challenges";

export function SidebarDemoUser() {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  const links = [
    {
      label: "Dashboard",
      id: "dashboard",
      icon: (
        <IconBrandTabler className="text-white dark:text-white h-8 w-10 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      id: "profile",
      icon: (
        <IconUserBolt className="text-white dark:text-white h-8 w-10 flex-shrink-0" />
      ),
    },
    {
      label: "Challenge",
      id: "challenge",
      icon: (
        <IconSettings className="text-white dark:text-white h-8 w-10 flex-shrink-0" />
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

  const [profileOpen, setProfileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
    setUserOpen(false);
    setCurrentPage("profile");
  };

  const handleUserClick = () => {
    setUserOpen(!userOpen);
    setProfileOpen(false);
  };

  const handleSubMenuClick = (id) => {
    setProfileOpen(false);
    setUserOpen(false);
    setCurrentPage(id);
  };

  const renderMainContent = () => {
    switch (currentPage) {
      case "profile":
        return <UserProfile />;
      case "challenge":
        return <UserChallenges />;
      case "average-carbon-footprint":
        return <AverageCarbonFootprint />;
      case "dashboard":
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="rounded-md flex flex-col md:flex-row w-screen text-lg font-bold bg-gray-100 dark:bg-neutral-800 flex-1 max-w-8xl mx-auto border border-neutral-200 dark:border-black overflow-hidden min-h-screen">
      <Sidebar open={open} setOpen={setOpen} className="w-96">
        <SidebarBody className="justify-between gap-10 bg-gray-800 dark:bg-neutral-900 text-white dark:text-white border-2 border-neutral-700 dark:border-neutral-600 rounded-lg">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-5">
              {links.map((link, idx) =>
                link.submenu ? (
                  <div key={idx}>
                    <SidebarLink
                      link={{
                        label: link.label,
                        icon: link.icon,
                      }}
                      onClick={() => {
                        link.label === "Profile"
                          ? handleProfileClick()
                          : handleUserClick();
                      }}
                    />
                    {((profileOpen && link.label === "Profile") ||
                      (userOpen && link.label === "User")) &&
                      link.submenu.map((subLink, subIdx) => (
                        <SidebarLink
                          key={subIdx}
                          link={subLink}
                          className="ml-6"
                          onClick={() => handleSubMenuClick(subLink.id)}
                        />
                      ))}
                  </div>
                ) : (
                  <SidebarLink
                    key={idx}
                    link={link}
                    onClick={() => setCurrentPage(link.id)}
                  />
                )
              )}
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
        className="font-bold text-2xl text-green-600 dark:text-white text-center whitespace-pre"
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
