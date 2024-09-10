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
    name: "Ana García",
    avatar: "https://i.pravatar.cc/150?img=5",
    ecoScore: 85,
    carbonFootprint: 7.2,
    treesPlanted: 12,
    wasteRecycled: 145,
    waterSaved: 2800,
    energySaved: 320,
    badges: ["Eco Warrior", "Tree Hugger", "Water Saver"],
    activities: [
      { date: "2023-05-01", score: 75 },
      { date: "2023-05-08", score: 80 },
      { date: "2023-05-15", score: 78 },
      { date: "2023-05-22", score: 82 },
      { date: "2023-05-29", score: 85 },
    ]
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getEcoScoreColor = (score) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    (<div
      className="container mx-auto p-4 bg-gradient-to-br to-blue-50 min-h-screen">
      <Card className="w-full max-w-6xl mx-auto shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-bold text-green-600">Bienvenida, {userData.name}</CardTitle>
                <CardDescription className="text-lg text-green-600">
                  Tu Eco-Dashboard Personal
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">Tu Eco-Score</p>
              <p className={`text-4xl font-bold ${getEcoScoreColor(userData.ecoScore)}`}>
                {userData.ecoScore}
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
                    <p className="text-2xl font-bold text-green-600">{userData.carbonFootprint} ton</p>
                  </div>
                  <Leaf className="h-10 w-10 text-green-500" />
                </div>
                <Progress value={(userData.carbonFootprint / 20) * 100} className="mt-4" />
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
                      <XAxis dataKey="date" 
                      tick={{ fontSize: 12 }}/>
                      <YAxis 
                       tick={{ fontSize: 14 }}/>
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#10B981" strokeWidth={2 } />
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

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-800">Próximos Desafíos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                    <span className="text-gray-700">Reduce tu huella de carbono un 5% más</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                    En Progreso
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-6 w-6 text-purple-500" />
                    <span className="text-gray-700">Participa en el próximo evento de limpieza comunitaria</span>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-purple-100 text-purple-800 border-purple-300">
                    Próximamente
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>)
  );
};

export default UserDashboard;