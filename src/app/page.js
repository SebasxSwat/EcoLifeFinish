"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "@/components/lib/api";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "@/pages/components-login";
import LandingPage from "@/pages/landing/app-page";
import UserRegistration from "@/pages/components-user-registration";
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
        </Routes>
      </Router>
    </div>
  );
}

export default Page;
