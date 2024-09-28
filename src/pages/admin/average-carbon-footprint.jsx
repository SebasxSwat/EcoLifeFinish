"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Users,
  RefreshCcw,
} from "lucide-react";

const AverageCarbonFootprint = () => {
  const [averageFootprint, setAverageFootprint] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUserCount = async () => {
    setLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:8080/user-count");
      const data = await response.json();
      
      if (response.ok) {
        setUserCount(data.userCount); // Ajusta 'data.userCount' según la estructura de la respuesta de tu API
      } else {
        console.error("Error al obtener los datos del conteo de usuarios", data);
      }
    } catch (error) {
      console.error("Error en la solicitud del conteo de usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAverageFootprint = async () => {
    setLoading(true);
    
    try {
      const response = await fetch("http://127.0.0.1:8080/average-carbon-footprint");
      const data = await response.json();
      
      if (response.ok) {
        setAverageFootprint(data.averageCarbonFootprint);
      } else {
        console.error("Error al obtener los datos del promedio de huella de carbono", data);
      }
    } catch (error) {
      console.error("Error en la solicitud del promedio de huella de carbono:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCount();
    fetchAverageFootprint();
  }, []);

  const getFootprintColor = (value) => {
    if (value < 8) return "text-green-500";
    if (value < 12) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto dark:bg-black">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-600">
            Promedio de Huella de Carbono
          </CardTitle>
          <CardDescription>
            Visión general de la huella de carbono de los usuarios de EcoLife
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-300">
                      Promedio de Huella de Carbono
                    </p>
                    <p
                      className={`text-3xl font-bold ${getFootprintColor(
                        averageFootprint
                      )}`}
                    >
                      {averageFootprint.toFixed(2)}
                    </p>
                  </div>
                  <Leaf className="h-10 w-10 text-green-500" />
                </div>
                <Progress
                  value={(averageFootprint / 20) * 100}
                  className="mt-4"
                />
                <p className="mt-2 text-sm text-gray-300">
                  toneladas de CO2 por año
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-5">
                    <p className="text-sm font-medium text-gray-300">
                      Usuarios Registrados
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {userCount}
                    </p>
                  </div>
                  <Users className="h-10 w-10 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-green-800">
              Interpretación de Datos
            </h3>
            <p className="text-gray-400">
              La huella de carbono promedio de nuestros usuarios es de{" "}
              {averageFootprint.toFixed(2)} toneladas de CO2 por año.
              {averageFootprint < 8
                ? " Este es un excelente resultado, indicando que nuestros usuarios están haciendo un gran trabajo en la reducción de sus emisiones."
                : averageFootprint < 12
                ? " Este resultado es bueno, pero hay espacio para mejorar. Podríamos implementar más estrategias para ayudar a nuestros usuarios a reducir sus emisiones."
                : " Este resultado indica que necesitamos trabajar más en estrategias para ayudar a nuestros usuarios a reducir significativamente sus emisiones de carbono."}
            </p>
            <p className="text-gray-400">
              Con {userCount} usuarios registrados, estamos haciendo un impacto
              significativo.
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => {
                fetchUserCount();
                fetchAverageFootprint();
              }}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              {loading ? "Actualizando..." : "Actualizar Datos"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AverageCarbonFootprint;
