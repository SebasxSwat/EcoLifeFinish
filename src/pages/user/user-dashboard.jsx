'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Leaf, TreeDeciduous, Recycle, Droplet, Award, TrendingUp, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    username: '',
    eco_score: 0,
    carbon_footprint: 0,
    treesPlanted: 0,
    wasteRecycled: 0,
    waterSaved: 0,
    activities: [],
    badges: []
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await fetch('http://localhost:8080/auth/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserData({
            username: data.username,
            eco_score: data.eco_score,
            carbon_footprint: data.carbon_footprint,
            treesPlanted: data.trees_planted || 0,
            wasteRecycled: data.waste_recycled || 0,
            waterSaved: data.water_saved || 0,
            activities: data.activities || [],
            badges: data.badges || []
          });
        } else {
          console.error("Error al obtener los datos del usuario");
        }
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
      }
    };
  
    fetchUserData();
  }, []);

  const getEcoScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br to-blue-50 min-h-screen">
      <Card className="w-full max-w-6xl mx-auto shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10 lg:h-20 lg:w-20">
                <AvatarImage src="/placeholder.svg" alt={userData.username} />
                <AvatarFallback>{userData.username.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg lg:text-3xl font-bold text-green-600">Bienvenido, {userData.username}</CardTitle>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs lg:text-sm font-medium text-gray-500">Eco-Score</p>
              <p className={`text-lg lg:text-4xl font-bold ${getEcoScoreColor(userData.eco_score)}`}>
                {userData.eco_score}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Huella de Carbono</p>
                    <p className="text-2xl font-bold text-green-600">{userData.carbon_footprint} ton</p>
                  </div>
                  <Leaf className="h-10 w-10 text-green-500" />
                </div>
                <Progress value={(userData.carbon_footprint / 20) * 100} className="mt-4" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Árboles Plantados</p>
                    <p className="text-2xl font-bold text-green-600">{userData.treesPlanted}</p>
                  </div>
                  <TreeDeciduous className="h-10 w-10 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Residuos Reciclados</p>
                    <p className="text-2xl font-bold text-green-600">{userData.wasteRecycled} kg</p>
                  </div>
                  <Recycle className="h-10 w-10 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">Agua Ahorrada</p>
                    <p className="text-2xl font-bold text-green-600">{userData.waterSaved} L</p>
                  </div>
                  <Droplet className="h-10 w-10 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-green-800">Tu Progreso Eco</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userData.activities}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }}/>
                      <YAxis tick={{ fontSize: 14 }}/>
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-green-800">Tus Logros</CardTitle>
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