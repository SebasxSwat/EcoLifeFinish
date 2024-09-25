"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Leaf, TreeDeciduous, Recycle, Droplet, Award } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { jwtDecode } from "jwt-decode";

const AVERAGE_CARBON_FOOTPRINT = 4.65;

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    username: "",
    eco_score: 0, 
    carbon_footprint: 0,
    trees_planted: 0,
    waste_recycled: 0,
    water_saved: 0,
    activities: [],
    badges: [],
  });


  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const dataUser = jwtDecode(token);
        const userId = dataUser.id;

        // Obtener huella de carbono
        const carbonFootprintResponse = await fetch(`http://127.0.0.1:8080/carbon-footprint/get/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (carbonFootprintResponse.ok) {
          const carbonFootprintData = await carbonFootprintResponse.json();
          setUserData((prevUserData) => ({
            ...prevUserData,
            carbon_footprint: carbonFootprintData.value || 0,
          }));
        }

        // Obtener datos del usuario
        const userResponse = await fetch(`http://127.0.0.1:8080/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();

          const totalPoints = Array.isArray(userData.completedChallenges)
            ? userData.completedChallenges.reduce((sum, challenge) => sum + challenge.points, 0)
            : 0;

          setUserData((prevUserData) => ({
            ...prevUserData,
            id: userId,
            name: userData.name,
            username: userData.username || prevUserData.username,
            eco_score: (userData.eco_score || prevUserData.eco_score) + totalPoints,
            trees_planted: userData.trees_planted || 0,
            waste_recycled: userData.waste_recycled || 0,
            water_saved: userData.water_saved || 0,
            badges: userData.badges || [],
          }));
        }

        const activitiesResponse = await fetch(`http://127.0.0.1:8080/activities/all/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (activitiesResponse.ok) {
          const activitiesData = await activitiesResponse.json();
          setUserData((prevUserData) => ({
            ...prevUserData,
            activities: Array.isArray(activitiesData) ? activitiesData : [], 
          }));
        }
      }
    };

    fetchUserData();
  }, []);

  const formattedActivities = Array.isArray(userData.activities)
    ? userData.activities.map(activity => ({
        date: new Date(activity.date_completed).toLocaleDateString(), 
        score: userData.eco_score, 
      }))
    : [];

  const getEcoScoreColor = (score) => {
    if (score >= 450) return "text-green-600";
    if (score >= 280) return "text-yellow-600";
    return "text-red-600";
  };

  const carbonFootprintColor = userData.carbon_footprint > AVERAGE_CARBON_FOOTPRINT
    ? "text-red-600"
    : "text-green-600";

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br  to-blue-50 min-h-screen">
      <Card className="w-full max-w-6xl mx-auto shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
                <AvatarImage src="/placeholder.svg" alt={userData.name} />
                <AvatarFallback className="text-2xl">
                  {userData.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl sm:text-3xl font-bold p-4 text-green-600 dark:text-green-600">
                  Bienvenid@, {userData.name}
                </CardTitle>
              </div>
            </div>
            <div className="text-center sm:text-right mt-4 p-4 sm:mt-0">
              <p className="text-sm sm:text-lg font-medium text-gray-500 dark:text-gray-400">
                Eco-Score
              </p>
              <p
                className={`text-3xl sm:text-4xl font-bold ${getEcoScoreColor(
                  userData.eco_score
                )}`}
              >
                {userData.eco_score}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-300">
                      Huella de Carbono
                    </p>
                    <p className={`text-2xl font-bold ${carbonFootprintColor}`}>
                      {userData.carbon_footprint} ton
                    </p>
                  </div>
                  <Leaf className="h-10 w-10 text-green-500 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
               <div className="flex items-center justify-between ">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Árboles Plantados
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {userData.trees_planted}
                    </p>
                  </div>
                  <TreeDeciduous className="h-10 w-10 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Residuos Reciclados
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {userData.waste_recycled} kg
                    </p>
                  </div>
                  <Recycle className="h-10 w-10 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Agua Ahorrada
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {userData.water_saved} L
                    </p>
                  </div>
                  <Droplet className="h-10 w-10 text-blue-500" />
                </div>
              </CardContent>
            </Card> 
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3  gap-6 mb-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-green-800">
                  Tu Progreso Eco
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={formattedActivities}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#10B981"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-green-800">
                  Tus Logros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.badges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Award className="h-6 w-6 text-yellow-500" />
                      <span className="text-gray-700">{badge}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
