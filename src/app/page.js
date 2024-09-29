"use client";

import React, { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { fetchData } from "@/components/lib/api";
import LandingPage from "@/pages/landing/app-page";
import Login from "@/pages/components-login";
import UserRegistration from "@/pages/components-user-registration";
import { SidebarDemoUser } from "@/components/user/SidebarDemo-User";
import CuestionarioHuellaCarbono from "@/pages/cuestionario";
import RestablecerContrasena from "@/pages/componente-restablecer-contra";
import RecuperarContrasena from "@/pages/componente-recuperar-contra";
import { SidebarDemo } from "@/components/admin/SidebarDemo";
import Loading from "@/components/ui/loading";


function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData("/api/some-endpoint")
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="my-56"><Loading/></div>;
  if (!data) return <div>No data available</div>;

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<UserRegistration/>}/>
          <Route path="/dashboardUser" element={<SidebarDemoUser/>}/>
          <Route path="/cuestionario" element={<CuestionarioHuellaCarbono/>}/>
          <Route path="/restablecer-contrasena" element={<RestablecerContrasena/>}/>
          <Route path="/recuperar" element={<RecuperarContrasena/>}/>
          <Route path="/dashboardAdmin" element={<SidebarDemo/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default Page;
