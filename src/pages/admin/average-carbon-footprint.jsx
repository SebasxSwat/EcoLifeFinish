'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Leaf, Users, ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';

const AverageCarbonFootprint = () => {
  const [averageFootprint, setAverageFootprint] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [trend, setTrend] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    // Simulating API call with setTimeout
    setTimeout(() => {
      const newAverage = Math.random() * 10 + 5; // Random number between 5 and 15
      setAverageFootprint(newAverage);
      setUserCount(Math.floor(Math.random() * 1000) + 500); // Random number between 500 and 1500
      setTrend(Math.random() * 2 - 1); // Random number between -1 and 1
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getFootprintColor = (value) => {
    if (value < 8) return "text-green-500";
    if (value < 12) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    (<div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-green-800">Promedio de Huella de Carbono</CardTitle>
          <CardDescription>Visión general de la huella de carbono de los usuarios de EcoLife</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-300">Promedio de Huella de Carbono</p>
                    <p className={`text-3xl font-bold ${getFootprintColor(averageFootprint)}`}>
                      {averageFootprint.toFixed(2)}
                    </p>
                  </div>
                  <Leaf className="h-10 w-10 text-green-500" />
                </div>
                <Progress value={(averageFootprint / 20) * 100} className="mt-4" />
                <p className="mt-2 text-sm text-gray-300">toneladas de CO2 por año</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-300">Usuarios Registrados</p>
                    <p className="text-3xl font-bold text-green-600">{userCount}</p>
                  </div>
                  <Users className="h-10 w-10 text-green-500" />
                </div>
                <div className="mt-4 flex items-center space-x-2">
                  {trend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={trend > 0 ? "text-green-500" : "text-red-500"}>
                    {Math.abs(trend * 100).toFixed(1)}% en el último mes
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-green-800">Interpretación de Datos</h3>
            <p className="text-gray-400">
              La huella de carbono promedio de nuestros usuarios es de {averageFootprint.toFixed(2)} toneladas de CO2 por año. 
              {averageFootprint < 8 
                ? " Este es un excelente resultado, indicando que nuestros usuarios están haciendo un gran trabajo en la reducción de sus emisiones."
                : averageFootprint < 12
                  ? " Este resultado es bueno, pero hay espacio para mejorar. Podríamos implementar más estrategias para ayudar a nuestros usuarios a reducir sus emisiones."
                  : " Este resultado indica que necesitamos trabajar más en estrategias para ayudar a nuestros usuarios a reducir significativamente sus emisiones de carbono."}
            </p>
            <p className="text-gray-400">
              Con {userCount} usuarios registrados, estamos haciendo un impacto significativo. 
              {trend > 0 
                ? ` El aumento del ${(trend * 100).toFixed(1)}% en el último mes es una señal positiva de que más personas se están uniendo a nuestra causa.`
                : ` La disminución del ${Math.abs(trend * 100).toFixed(1)}% en el último mes sugiere que podríamos necesitar nuevas estrategias de participación de usuarios.`}
            </p>
          </div>
          <div className="mt-6 flex justify-center">
            <Button
              onClick={fetchData}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white">
              <RefreshCcw className="mr-2 h-4 w-4" />
              {loading ? "Actualizando..." : "Actualizar Datos"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>)
  );
};

export default AverageCarbonFootprint;