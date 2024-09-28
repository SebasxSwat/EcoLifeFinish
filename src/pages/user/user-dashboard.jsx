"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Leaf, TreeDeciduous, Recycle, Droplet, Award, X } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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
    badges: {
      unlocked: [],
      locked: [],
    },
  });

  const [newBadge, setNewBadge] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const dataUser = jwtDecode(token);
        const userId = dataUser.id;

        const carbonFootprintResponse = await fetch(
          `http://127.0.0.1:8080/carbon-footprint/get/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (carbonFootprintResponse.ok) {
          const carbonFootprintData = await carbonFootprintResponse.json();
          setUserData(prevUserData => ({
            ...prevUserData,
            carbon_footprint: carbonFootprintData.value || 0,
          }));
        }

        const userResponse = await fetch(
          `http://127.0.0.1:8080/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (userResponse.ok) {
          const userData = await userResponse.json();

          const totalPoints = Array.isArray(userData.completedChallenges)
            ? userData.completedChallenges.reduce(
                (sum, challenge) => sum + challenge.points,
                0
              )
            : 0;

          setUserData(prevUserData => ({
            ...prevUserData,
            id: userId,
            name: userData.name,
            username: userData.username || prevUserData.username,
            eco_score:
              (userData.eco_score || prevUserData.eco_score) + totalPoints,
            trees_planted: userData.trees_planted || 0,
            waste_recycled: userData.waste_recycled || 0,
            water_saved: userData.water_saved || 0,
            badges: userData.badges || [],
          }));
        }

        const badgesResponse = await fetch(
          `http://127.0.0.1:8080/badges/all/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (badgesResponse.ok) {
          const badgesData = await badgesResponse.json();
          setUserData(prevUserData => ({
            ...prevUserData,
            badges: {
              unlocked: badgesData.unlocked || [],
              locked: badgesData.locked || [],
            },
          }));
        }

        const activitiesResponse = await fetch(
          `http://127.0.0.1:8080/activities/all/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (activitiesResponse.ok) {
          const activitiesData = await activitiesResponse.json();
          setUserData(prevUserData => ({
            ...prevUserData,
            activities: Array.isArray(activitiesData) ? activitiesData : [],
          }));
        }
      }
    };

    fetchUserData();
  }, []);

  const formattedActivities = Array.isArray(userData.activities)
    ? userData.activities.reduce((acc, activity, index) => {
        const previousScore = index > 0 ? acc[index - 1].score : 0;
        const updatedScore = previousScore + (activity.challenge?.points || 0);
        return [
          ...acc,
          {
            date: new Date(activity.date_completed).toLocaleDateString(),
            score: updatedScore,
          },
        ];
      }, [])
    : [];

  const getEcoScoreColor = score => {
    if (score >= 450) return "text-green-600";
    if (score >= 280) return "text-yellow-600";
    return "text-red-600";
  };

  const carbonFootprintColor =
    userData.carbon_footprint > AVERAGE_CARBON_FOOTPRINT
      ? "text-red-600"
      : "text-green-600";

  const handleBadgeClick = badge => {
    setSelectedBadge(badge);
  };

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
                  Hola, {userData.name}
                </CardTitle>
              </div>
            </div>
            <div className="text-center sm:text-right mt-4 p-4 sm:mt-0">
              <p className="text-sm sm:text-lg font-bold text-black dark:text-gray-300">
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
                    <p className="text-sm font-medium dark:text-gray-300">
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
                    <p className="text-sm font-medium dark:text-gray-300">
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
                    <p className="text-sm font-medium dark:text-gray-300">
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
                    <p className="text-sm font-medium dark:text-gray-300">
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
                <CardTitle className="text-xl font-semibold text-green-600">
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
                        dot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-green-600">
                  Insignias desbloqueadas:
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userData.badges?.unlocked &&
                userData.badges.unlocked.length > 0 ? (
                  userData.badges.unlocked.map(badge => (
                    <motion.div
                      key={badge.id}
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Award className="h-8 w-8 text-yellow-500" />
                      <span className="text-sm font-medium m-3">
                        {badge.name}
                      </span>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">
                    No has desbloqueado ninguna insignia.
                  </p>
                )}
                {userData.badges?.locked &&
                  userData.badges.locked.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-semibold text-lg text-green-600">
                        Insignias por desbloquear:
                      </h3>
                      {userData.badges.locked.map(badge => (
                        <div
                          key={badge.id}
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => handleBadgeClick(badge)}
                        >
                          <Award className="h-8 w-8 text-gray-300" />
                          <span className="text-sm font-medium m-3">
                            {badge.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {newBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => setNewBadge(null)}
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-lg text-center"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
            >
              <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">
                ¡Nueva Insignia Desbloqueada!
              </h2>
              <p className="text-lg">{newBadge.name}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog
        open={!!selectedBadge}
        onOpenChange={() => setSelectedBadge(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-white justify-between">
              <span>Requisitos de la Insignia</span>
              <Button size="icon" onClick={() => setSelectedBadge(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {selectedBadge && (
            <>
              <div className="flex items-center space-x-4 mb-4">
                <Award className="h-12 w-12 text-gray-300" />
                <h3 className="text-xl text-white font-semibold">
                  {selectedBadge.name}
                </h3>
              </div>
              <DialogDescription>
                {selectedBadge ? (
                  <div>
                    <h3 className="text-lg font-semibold text-green-600">
                      {selectedBadge.name}
                    </h3>
                    <p className="mt-2">{selectedBadge.description}</p>
                    <div className="mt-4">
                      <ul>
                        {selectedBadge.required_challenges > 0 && (
                          <li className="mb-2">
                            <strong>Desafíos requeridos:</strong>{" "}
                            {selectedBadge.required_challenges}{" "}
                            {userData.activities.length >=
                            selectedBadge.required_challenges ? (
                              <span className="text-green-500 ml-2">
                                ✓ Completado
                              </span>
                            ) : (
                              <span className="text-red-500 ml-2">
                                ✗ Pendiente
                              </span>
                            )}
                          </li>
                        )}
                        {selectedBadge.eco_points_required > 0 && (
                          <li className="mb-2">
                            <strong>Puntos Ecológicos requeridos:</strong>{" "}
                            {selectedBadge.eco_points_required}{" "}
                            {userData.eco_score >=
                            selectedBadge.eco_points_required ? (
                              <span className="text-green-500 ml-2">
                                ✓ Completado
                              </span>
                            ) : (
                              <span className="text-red-500 ml-2">
                                ✗ Pendiente
                              </span>
                            )}
                          </li>
                        )}
                        {selectedBadge.trees_planted_required > 0 && (
                          <li className="mb-2">
                            <strong>Árboles Plantados requeridos:</strong>{" "}
                            {selectedBadge.trees_planted_required}{" "}
                            {userData.trees_planted >=
                            selectedBadge.trees_planted_required ? (
                              <span className="text-green-500 ml-2">
                                ✓ Completado
                              </span>
                            ) : (
                              <span className="text-red-500 ml-2">
                                ✗ Pendiente
                              </span>
                            )}
                          </li>
                        )}
                        {selectedBadge.water_saved_required > 0 && (
                          <li className="mb-2">
                            <strong>Agua Ahorrada requerida:</strong>{" "}
                            {selectedBadge.water_saved_required} L{" "}
                            {userData.water_saved >=
                            selectedBadge.water_saved_required ? (
                              <span className="text-green-500 ml-2">
                                ✓ Completado
                              </span>
                            ) : (
                              <span className="text-red-500 ml-2">
                                ✗ Pendiente
                              </span>
                            )}
                          </li>
                        )}
                        {selectedBadge.waste_recycled_required > 0 && (
                          <li className="mb-2">
                            <strong>Residuos Reciclados requeridos:</strong>{" "}
                            {selectedBadge.waste_recycled_required} kg{" "}
                            {userData.waste_recycled >=
                            selectedBadge.waste_recycled_required ? (
                              <span className="text-green-500 ml-2">
                                ✓ Completado
                              </span>
                            ) : (
                              <span className="text-red-500 ml-2">
                                ✗ Pendiente
                              </span>
                            )}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p>Cargando...</p>
                )}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
