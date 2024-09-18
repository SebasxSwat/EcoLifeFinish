// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import {
//   Leaf,
//   TreeDeciduous,
//   Recycle,
//   Droplet,
//   Award,
// } from "lucide-react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend
// } from "recharts";
// import { jwtDecode } from "jwt-decode";

// const UserDashboard = () => {
//   const [userData, setUserData] = useState({
//     id: '',
//     name: '',
//     username: '',
//     eco_score: 0,
//     carbon_footprint: 0,
//     treesPlanted: 0,
//     wasteRecycled: 0,
//     waterSaved: 0,
//     activities: [],
//     badges: [],
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem("token");
      
//       if (token && typeof token === "string") {
//         try {
//           const dataUser = jwtDecode(token);

//           const response = await fetch(`http://127.0.0.1:8080/user/${dataUser.id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (response.ok) {
//             const data = await response.json();
//             setUserData((prevUserData) => ({
//               ...prevUserData,
//               id: dataUser.id,
//               name: data.name, 
//               username: data.username || prevUserData.username,
//               eco_score: data.eco_score || prevUserData.eco_score,
//               carbon_footprint: data.carbon_footprint || 0,
//               treesPlanted: data.trees_planted || 0,
//               wasteRecycled: data.waste_recycled || 0,
//               waterSaved: data.water_saved || 0,
//               activities: data.activities || [],
//               badges: data.badges || [],
//             }));
//           } else {
//             console.error("Error al obtener los datos del usuario");
//           }
//         } catch (error) {
//           console.error("Error al decodificar el token o hacer la solicitud:", error);
//         }
//       } else {
//         console.error("Token no disponible o no es una cadena.");
//       }
//     };

//     fetchUserData();
//   }, []);

//   const getEcoScoreColor = (score) => {
//     if (score >= 80) return "text-green-600";
//     if (score >= 60) return "text-yellow-600";
//     return "text-red-600";
//   };

//   return (
//     <div className="container mx-auto p-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 min-h-screen">
//       <Card className="w-full max-w-6xl mx-auto shadow-lg dark:bg-gray-800">
//         <CardHeader className="pb-4">
//           <div className="flex flex-col sm:flex-row items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <Avatar className="h-16 w-16 sm:h-20 sm:w-20">
//                 <AvatarImage src="/placeholder.svg" alt={userData.name} />
//                 <AvatarFallback className="text-2xl">
//                   {userData.name.charAt(0).toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>
//               <div>
//                 <CardTitle className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
//                   Bienvenid@, {userData.name}
//                 </CardTitle>
//               </div>
//             </div>
//             <div className="text-center sm:text-right mt-4 sm:mt-0">
//               <p className="text-sm sm:text-lg font-medium text-gray-500 dark:text-gray-400">
//                 Eco-Score
//               </p>
//               <p
//                 className={`text-3xl sm:text-4xl font-bold ${getEcoScoreColor(
//                   userData.eco_score
//                 )}`}
//               >
//                 {userData.eco_score}
//               </p>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <Card className="dark:bg-gray-700">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-400 dark:text-gray-300">
//                       Huella de Carbono
//                     </p>
//                     <p className="text-2xl font-bold text-green-600 dark:text-green-400">
//                       {userData.carbon_footprint} ton
//                     </p>
//                   </div>
//                   <Leaf className="h-10 w-10 text-green-500 dark:text-green-400" />
//                 </div>
//                 <Progress
//                   value={(userData.carbon_footprint / 20) * 100}
//                   className="mt-4"
//                 />
//               </CardContent>
//             </Card>
//             <Card className="dark:bg-gray-700">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-400 dark:text-gray-300">
//                       Árboles Plantados
//                     </p>
//                     <p className="text-2xl font-bold text-green-600 dark:text-green-400">
//                       {userData.treesPlanted}
//                     </p>
//                   </div>
//                   <TreeDeciduous className="h-10 w-10 text-green-500 dark:text-green-400" />
//                 </div>
//               </CardContent>
//             </Card>
//             <Card className="dark:bg-gray-700">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-400 dark:text-gray-300">
//                       Residuos Reciclados
//                     </p>
//                     <p className="text-2xl font-bold text-green-600 dark:text-green-400">
//                       {userData.wasteRecycled} kg
//                     </p>
//                   </div>
//                   <Recycle className="h-10 w-10 text-green-500 dark:text-green-400" />
//                 </div>
//               </CardContent>
//             </Card>
//             <Card className="dark:bg-gray-700">
//               <CardContent className="pt-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-medium text-gray-400 dark:text-gray-300">
//                       Agua Ahorrada
//                     </p>
//                     <p className="text-2xl font-bold text-green-600 dark:text-green-400">
//                       {userData.waterSaved} L
//                     </p>
//                   </div>
//                   <Droplet className="h-10 w-10 text-blue-500 dark:text-blue-400" />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <Card className="lg:col-span-2 dark:bg-gray-700">
//               <CardHeader>
//                 <CardTitle className="text-xl font-semibold text-green-800 dark:text-green-400">
//                   Tu Progreso Eco
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="h-80 sm:h-96">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <LineChart data={userData.activities}>
//                       <CartesianGrid strokeDasharray="3 3" stroke="#718096" />
//                       <XAxis 
//                         dataKey="date" 
//                         tick={{ fontSize: 12, fill: '#718096' }} 
//                         stroke="#718096"
//                       />
//                       <YAxis 
//                         tick={{ fontSize: 12, fill: '#718096' }} 
//                         stroke="#718096"
//                       />
//                       <Tooltip 
//                         contentStyle={{ 
//                           backgroundColor: 'rgba(255, 255, 255, 0.8)', 
//                           border: '1px solid #e2e8f0',
//                           borderRadius: '8px',
//                           boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
//                         }}
//                       />
//                       <Legend />
//                       <Line
//                         type="monotone"
//                         dataKey="score"
//                         name="Eco Score"
//                         stroke="#10B981"
//                         strokeWidth={2}
//                         dot={{ fill: '#10B981', strokeWidth: 2 }}
//                         activeDot={{ r: 8 }}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </CardContent>
//             </Card>
//             <Card className="dark:bg-gray-700">
//               <CardHeader>
//                 <CardTitle className="text-xl font-semibold text-green-800 dark:text-green-400">
//                   Tus Logros
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {userData.badges.map((badge, index) => (
//                     <div key={index} className="flex items-center space-x-2">
//                       <Award className="h-6 w-6 text-yellow-500 dark:text-yellow-400" />
//                       <span className="text-gray-700 dark:text-gray-300">{badge}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

// export default UserDashboard;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Leaf, TreeDeciduous, Recycle, Droplet, Zap, Award, TrendingUp, Calendar } from 'lucide-react';
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
    <div className="container mx-auto p-4 bg-gradient-to-br  to-blue-50 min-h-screen">
      <Card className="w-full max-w-6xl mx-auto shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-bold text-green-800">Bienvenida, {userData.name}</CardTitle>
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
                    <p className="text-sm font-medium text-gray-500">Huella de Carbono</p>
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
                    <p className="text-sm font-medium text-gray-500">Árboles Plantados</p>
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
                    <p className="text-sm font-medium text-gray-500">Residuos Reciclados</p>
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
                    <p className="text-sm font-medium text-gray-500">Agua Ahorrada</p>
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
                      <XAxis dataKey="date" />
                      <YAxis />
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