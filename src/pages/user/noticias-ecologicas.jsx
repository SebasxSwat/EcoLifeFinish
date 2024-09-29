'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, RefreshCcw } from 'lucide-react';

const datosNoticias = [
  {
    id: 1,
    titulo: "Nuevo Estudio Muestra un Aumento Dramático en la Contaminación Plástica del Océano",
    resumen: "Investigadores han descubierto que la contaminación plástica en nuestros océanos ha aumentado un 50% en la última década, exigiendo una acción inmediata.",
    fuente: "Revista de Ciencias Ambientales",
    fecha: "2024-09-26"
  },
  {
    id: 2,
    titulo: "Las Energías Renovables Superan a los Combustibles Fósiles en Europa",
    resumen: "Por primera vez, las fuentes de energía renovable han generado más electricidad que los combustibles fósiles en Europa, marcando un hito significativo en la lucha contra el cambio climático.",
    fuente: "Comisión Europea de Energía",
    fecha: "2024-09-28"
  },
  {
    id: 3,
    titulo: "Nueva Especie de Árbol Descubierta en la Selva Amazónica",
    resumen: "Científicos han identificado una nueva especie de árbol en el Amazonas que podría jugar un papel crucial en la captura de carbono.",
    fuente: "Instituto de Investigación Botánica",
    fecha: "2024-09-27"
  },
  {
    id: 4,
    titulo: "Iniciativa Global Lanzada para Plantar 1 Billón de Árboles",
    resumen: "Líderes mundiales se han unido para lanzar un ambicioso proyecto destinado a plantar 1 billón de árboles en todo el mundo para combatir el cambio climático.",
    fuente: "Programa de las Naciones Unidas para el Medio Ambiente",
    fecha: "2024-09-29"
  },
  {
    id: 5,
    titulo: "Avance en Agricultura Sostenible: La Agricultura Vertical se Generaliza",
    resumen: "Se ha desarrollado una nueva técnica de agricultura vertical que podría revolucionar la producción de alimentos urbanos, reduciendo el uso de agua en un 95%.",
    fuente: "Revista de Tecnología Agrícola",
    fecha: "2024-09-28"
  }
];

const NoticiasEcologicas = () => {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerNoticias = () => {
    setCargando(true);
    setTimeout(() => {
      const mezcladas = datosNoticias.sort(() => 0.5 - Math.random());
      setNoticias(mezcladas.slice(0, 3));
      setCargando(false);
    }, 1000);
  };

  useEffect(() => {
    obtenerNoticias();
    const intervalo = setInterval(obtenerNoticias, 300000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gradient-to-br to-blue-50 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-green-800 flex items-center justify-between">
            <span className="flex items-center text-green-600">
              <Leaf className="h-8 w-8 mr-2" />
              Noticias Ecológicas
            </span>
            <Button onClick={obtenerNoticias} disabled={cargando} variant="outline" size="icon">
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </CardTitle>
          <CardDescription className="text-white">
            Mantente al día con las últimas noticias ambientales y avances ecológicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {cargando ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
              <p className="mt-4 text-green-800">Cargando las últimas noticias ecológicas...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {noticias.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-green-600">{item.titulo}</CardTitle>
                    <CardDescription className="text-sm text-white">
                      {item.fuente} - {item.fecha}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-200">{item.resumen}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="text-center text-sm text-gray-400">
          Las noticias se actualizan cada 5 minutos. Última actualización: {new Date().toLocaleTimeString()}
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoticiasEcologicas;
